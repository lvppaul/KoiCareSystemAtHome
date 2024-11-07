import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button, Spinner, Carousel, Breadcrumb, Form } from "react-bootstrap";
import { getProductById, getProductImagesByProductId } from "../../Config/ProductApi";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../Config/firebase";
import { FaShoppingCart } from "react-icons/fa";
import { addItemToCart } from "../../Config/CartApi";
import { useAuth } from "../Login/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getAccountByUserId } from "../../Config/UserApi";
import { createOrder } from "../../Config/OrderApi";
import LoginNeeded from "../../components/LoginNeeded/LoginNeeded";

const Product = () => {
  const { productId } = useParams();
  const [productImages, setProductImages] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessages, setErrorMessages] = useState("");
  const [showLoginNeeded, setShowLoginNeeded] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.userId;

  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [product, quantity]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
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
      console.log("Item added to cart successfully");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const fetchProductImages = useCallback(async () => {
    try {
      const allImages = await getProductImagesByProductId(productId);
      const updatedImages = await Promise.all(
        allImages.map(async (image) => {
          if (image.imageUrl) {
            try {
              const storageRef = ref(storage, image.imageUrl);
              image.imageUrl = await getDownloadURL(storageRef);
            } catch (error) {
              console.error("The file does not exist in firebase anymore!", error);
              const storageRef = ref(storage, "others/NotFound.jpg");
              image.imageUrl = await getDownloadURL(storageRef);
            }
          }
          return image;
        })
      );
      setProductImages(updatedImages);
      setCarouselLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
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
                        style={{ width: "700px", height: "600px", objectFit: "cover" }}
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
                {totalPrice} ₫
              </p>
              <p className="product-status" style={{ fontSize: "1rem", fontWeight: "bold" }}>
                Status: {product.status ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            <hr />
            <Form.Label style={{ fontWeight: "bold" }}>Description:</Form.Label>
            <p className="mb-3">{product.description}</p>
            <hr />
            <div className="d-flex justify-content mb-3">
              <Form.Label className="me-3" style={{ fontWeight: "bold" }}>
                Quantity:
              </Form.Label>
              <Form.Control
                as="select"
                value={quantity}
                onChange={handleQuantityChange}
                className="text-center"
                style={{ width: "60px" }}
              >
                {[...Array(12).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </Form.Control>
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
                {errorMessages && <p className="error-message mt-3">{errorMessages}</p>}
              </Col>
            </div>
          </Col>
        </Row>
        <LoginNeeded show={showLoginNeeded} handleClose={() => setShowLoginNeeded(false)} />
      </Container>
    </Container>
  );
};

export default Product;
