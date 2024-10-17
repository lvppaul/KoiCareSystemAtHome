import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Carousel } from 'react-bootstrap';
import { getProductById, getProductImageByProductId } from '../../Config/ProductApi';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import { FaShoppingCart } from 'react-icons/fa';

const Product = () => {
  const { productId } = useParams();
  const [ProductImage, setProductImage] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(true);

  const fetchProductImages = useCallback(async () => {
    try {
      const allImages = await getProductImageByProductId(productId);
      console.log('All images:', allImages);
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
      setProductImage(updatedImages);
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
      <Row className="mb-3">
        <Col className="d-flex justify-content-start">
          <Button as={Link} to="/shop" variant="link">Back to Shop</Button>
        </Col>
      </Row>
      <Container className="d-flex justify-content-between" style={{ minHeight: '80vh' }}>
        <Row className="w-100">
          <Col md={8} className="product-image mb-4 mb-md-0">
            <div style={{ maxWidth: '624px', width: '100%' }}>
              {carouselLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                  <Spinner animation="border" size="xl" role="status" />
                </div>
              ) : (
                <Carousel variant="dark">
                  {ProductImage.map((productImage) => (
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
            <div className="d-flex justify-content-around">
              <Col md={9} className="d-flex">
                <Button className="flex-grow-1 me-2" variant="primary">Buy Now</Button>
              </Col>
              <Col md={3} className="d-flex">
                <Button className="flex-grow-1 d-flex flex-column align-items-center" variant="secondary">
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