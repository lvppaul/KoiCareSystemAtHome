import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Carousel, Breadcrumb } from 'react-bootstrap';
import { getProductById, getProductImagesByProductId } from '../../Config/ProductApi';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import { FaShoppingCart } from 'react-icons/fa';
import { getCartByUserId, addItemToCart } from '../../Config/CartApi';
import { useAuth } from '../Login/AuthProvider';

const Product = () => {
  const { productId } = useParams();
  const [productImages, setProductImages] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { user } = useAuth(); 
  const userId = user.userId;

  const getCartItems = async () => {
    try {
      const cart = await getCartByUserId(userId);
      return cart.cartItems || [];
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
  };

  const saveCartItems = async (items) => {
    try {
      for (const item of items) {
        await addItemToCart(userId, { productId: item.productId, quantity: item.quantity });
      }
      console.log("Cart items saved successfully");
    } catch (error) {
      console.error("Error saving cart items:", error);
    }
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const addToCart = async (product) => {
    const currentCart = await getCartItems();
    const existingItem = currentCart.find((item) => item.id === product.id);
  
    if (existingItem) {
      existingItem.quantity += quantity;
      console.log("Item already exists in cart. Quantity updated.", quantity);
    } else {
      currentCart.push({ ...product, quantity });
    }
  
    await saveCartItems(currentCart);
  };

  const fetchProductImages = useCallback(async () => {
    try {
      const allImages = await getProductImagesByProductId(productId);
      const updatedImages = await Promise.all(allImages.map(async image => {
        if (image.imageUrl) {
          try {
            const storageRef = ref(storage, image.imageUrl);
            image.imageUrl = await getDownloadURL(storageRef);
          } catch (error) {
            console.error('The file does not exist in firebase anymore!', error);
            const storageRef = ref(storage, 'others/NotFound.jpg');
            image.imageUrl = await getDownloadURL(storageRef);
          }

        }
        return image;
      }));
      setProductImages(updatedImages);
      setCarouselLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    };
  }, [productId]);

  useEffect(() => {
    fetchProductImages();
    getProductById(productId)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [productId, fetchProductImages]);

  if (!product && loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" size="xl" role="status" />
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Container className="d-flex flex-column justify-content-between" >
        <Row className="mb-3">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/shop">
              Shop
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="w-100">
          <Col md={8} className="product-image mb-4 mb-md-0">
            <div style={{ maxWidth: '624px', width: '100%' }}>
              {carouselLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                  <Spinner animation="border" size="xl" role="status" />
                </div>
              ) : (
                <Carousel variant="dark">
                  {productImages.map((productImage) => (
                    <Carousel.Item key={productImage.imageId}>
                      <Image src={productImage.imageUrl} alt={`${product.name} image ${productImage.imageId}`} fluid />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </div>
          </Col>
          <Col md={4} className="product-details d-flex flex-column">
            <h1 className="mb-3">{product.name}</h1>
            <p className="mb-3">{product.description}</p>
            <p className="product-price mb-4" style={{ fontSize: "1.24rem", fontWeight: "bold" }}>${product.price}</p>
            <div className="d-flex justify-content-around mb-3">
              <Button variant="secondary" onClick={() => handleQuantityChange(-1)}>-</Button>
              <input type="number" value={quantity} readOnly className="text-center" style={{ width: "50px" }} />
              <Button variant="secondary" onClick={() => handleQuantityChange(1)}>+</Button>
            </div>
            <div className="d-flex justify-content-around">
              <Col md={9} className="d-flex">
                <Button className="flex-grow-1 me-2" variant="primary">Buy Now</Button>
              </Col>
              <Col md={3} className="d-flex">
                <Button onClick={() => addToCart(product)}
                className="flex-grow-1 d-flex flex-column align-items-center" variant="secondary">
                  <FaShoppingCart />
                  <span style={{ fontSize: '0.9rem' }}>Add to Cart</span>
                </Button>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Product;