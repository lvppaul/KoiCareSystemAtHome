import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Button, Spinner, Carousel, Breadcrumb, Form } from "react-bootstrap";
import { getProductById, getProductImagesByProductId, getProductsByCategoryId } from "../../Config/ProductApi";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../Config/firebase";
import { FaShoppingCart } from "react-icons/fa";
import { addItemToCart } from "../../Config/CartApi";
import { useAuth } from "../Login/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getAccountByUserId } from "../../Config/UserApi";
import { createOrder } from "../../Config/OrderApi";
import LoginNeeded from "../../components/LoginNeeded/LoginNeeded";
import { ToastContext } from "../../App";
import { getShopByShopId } from "../../Config/ShopApi";

const Product = () => {
  const { setToastMessage } = useContext(ToastContext);
  const { productId } = useParams();
  const [productImages, setProductImages] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessages, setErrorMessages] = useState("");
  const [showLoginNeeded, setShowLoginNeeded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [shopDetails, setShopDetails] = useState({});

  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.userId;

  const fetchShopDetails = useCallback(async () => {
    try {
      const response = await getShopByShopId(product.shopId);
      setShopDetails(response);
    } catch (error) {
      console.error("Error fetching shop details:", error);
    }
  }, [product]);

  const fetchRelatedProducts = useCallback(async () => {
    if (!product) return;
    try {
      const products = await getProductsByCategoryId(product.category.categoryId);
      const filtered = products.filter((p) => p.productId !== product.productId).slice(0, 6);

      const productsWithImages = await Promise.all(
        filtered.map(async (prod) => {
          try {
            const storageRef = ref(storage, prod.thumbnail);
            const url = await getDownloadURL(storageRef);
            return { ...prod, thumbnail: url };
          } catch (error) {
            const fallbackRef = ref(storage, "others/NotFound.jpg");
            const url = await getDownloadURL(fallbackRef);
            return { ...prod, thumbnail: url };
          }
        })
      );
      setRelatedProducts(productsWithImages);
      setLoadingRelated(false);
    } catch (error) {
      console.error("Error fetching related products:", error);
      setLoadingRelated(false);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      fetchShopDetails();
      fetchRelatedProducts();
      setTotalPrice(product.price * quantity);
    }
  }, [product, quantity, fetchRelatedProducts, fetchShopDetails]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vn-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value > 0 ? value : 1);
  };

  const addToCart = async (product) => {
    if (!userId) {
      setShowLoginNeeded(true);
      return;
    }
    try {
      await addItemToCart(userId, {
        productId: product.productId,
        quantity: quantity,
      });
      setToastMessage("Item added to cart successfully");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setToastMessage(error.response.data);
    }
  };

  const fetchProductImages = useCallback(async () => {
    try {
      const allImages = await getProductImagesByProductId(productId);
      const updatedImages = await Promise.all(
        allImages.map(async (image) => {
          try {
            const storageRef = ref(storage, image.imageUrl);
            const url = await getDownloadURL(storageRef);
            return { ...image, imageUrl: url };
          } catch (error) {
            console.error("Error loading image:", error);
            const fallbackRef = ref(storage, "others/NotFound.jpg");
            const fallbackUrl = await getDownloadURL(fallbackRef);
            return { ...image, imageUrl: fallbackUrl };
          }
        })
      );
      setProductImages(updatedImages);
      setCarouselLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setCarouselLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductImages();
    getProductById(productId)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [productId, fetchProductImages]);

  if (!product && loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" size="xl" role="status" />
      </Container>
    );
  }

  const handleCreateOrder = async () => {
    if (!userId) {
      setShowLoginNeeded(true);
      return;
    }

    try {
      const userDetails = await getAccountByUserId(userId);
      const orderData = {
        userId: userId,
        fullName: userDetails.firstName + " " + userDetails.lastName,
        phone: userDetails.phoneNumber,
        email: userDetails.email,
        street: userDetails.street,
        district: userDetails.district,
        city: userDetails.city,
        country: userDetails.country,
        orderDetails: [
          {
            productId: product.productId,
            quantity: quantity,
          },
        ],
      };

      const response = await createOrder(orderData);
      console.log(response);
      if (response.orderId) {
        navigate(`/order/${response.orderId}`);
      } else {
        console.error("Error creating order:", response);
        setErrorMessages("Please fill your information in the profile page before proceeding to checkout");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <Container fluid className="py-4">
      <Container className="d-flex flex-column justify-content-between">
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/shop">Shop</Breadcrumb.Item>
            <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <hr
          style={{
            height: "3px",
            backgroundColor: "#000000",
            border: "none",
          }}
        />
        <Row className="w-100">
          <Col md={8} className="product-image mb-4 mb-md-0">
            <div style={{ maxWidth: "624px", width: "100%" }}>
              {carouselLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                  <Spinner animation="border" size="xl" role="status" />
                </div>
              ) : (
                <Carousel variant="dark">
                  {productImages.map((productImage) => (
                    <Carousel.Item key={productImage.imageId}>
                      <Image
                        style={{
                          width: "700px",
                          height: "600px",
                          objectFit: "fill",
                        }}
                        src={productImage.imageUrl}
                        alt={`${product.name} image ${productImage.imageId}`}
                        fluid
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </div>
          </Col>
          <Col md={4} className="product-details d-flex flex-column">
            <h1 className="mb-3">{product.name}</h1>
            <div className="d-flex justify-content-between align-items-center">
              <p
                className="product-price"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#E47E39",
                }}
              >
                {formatPrice(product.price)}
              </p>
              <p className="product-status" style={{ fontSize: "1rem", fontWeight: "bold" }}>
                Status: {product.status}
              </p>
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <p style={{ fontSize: "1rem", fontWeight: "bold", margin: 0, marginRight: "0.5rem" }}>Storage:</p>
              <p style={{ fontSize: "1rem", fontWeight: "bold", margin: 0 }}>{product.quantity}</p>
            </div>
            <hr />
            <p className="mb-2" style={{ fontWeight: "bolder" }}>
              Supplier: {shopDetails.shopName}
            </p>
            <Form.Label style={{ fontWeight: "bold" }}>Description:</Form.Label>
            <p className="mb-3">{product.description}</p>
            <hr />
            <div className="d-flex justify-content mb-3">
              <Form.Label className="me-3" style={{ fontWeight: "bold" }}>
                Quantity:
              </Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="text-center"
                style={{ width: "80px" }}
                min="1"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-3" style={{ fontWeight: "bold" }}>
                Total Price:{" "}
              </p>
              <p
                className="product-price"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#E47E39",
                }}
              >
                {formatPrice(totalPrice)}
              </p>
            </div>
            <div className="d-flex justify-content-around">
              <Col md={9} className="d-flex">
                <Button className="flex-grow-1 me-2" variant="primary" onClick={() => handleCreateOrder()}>
                  Buy Now
                </Button>
              </Col>
              <Col md={3} className="d-flex">
                <Button
                  onClick={() => addToCart(product)}
                  className="flex-grow-1 d-flex flex-column align-items-center"
                  variant="secondary"
                >
                  <FaShoppingCart />
                  <span style={{ fontSize: "0.9rem" }}>Add to Cart</span>
                </Button>
              </Col>
            </div>
            {errorMessages && <p className="error-message mt-3">{errorMessages}</p>}
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <h3 className="mb-4 fw-bold">Related Products</h3>
          {loadingRelated ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <Carousel variant="dark" interval={3000} indicators={false}>
              {chunkArray(relatedProducts, 3).map((chunk, idx) => (
                <Carousel.Item key={idx}>
                  <div className="d-flex justify-content-center gap-4">
                    {chunk.map((relatedProduct) => (
                      <Link to={`/product/${relatedProduct.productId}`} className="productLink">
                        <div className="product-card">
                          <Image
                            src={relatedProduct.thumbnail}
                            alt={relatedProduct.name}
                            className="img-fluid mb-1"
                            rounded
                          />
                          <h5 style={{ fontWeight: "bolder", color: "#9e4a11" }}>{relatedProduct.name}</h5>
                          <p style={{ fontWeight: "bold" }}>{formatPrice(relatedProduct.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Row>
        <LoginNeeded show={showLoginNeeded} handleClose={() => setShowLoginNeeded(false)} />
      </Container>
    </Container>
  );
};

export default Product;
