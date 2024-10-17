import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert, Carousel } from 'react-bootstrap';
import { getProductById, getProductImageByProductId } from '../../Config/ProductApi';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import './Product.css';

const Product = () => {
  const { productId } = useParams();
  const [ProductImage, setProductImage] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductImages = async () => {
    try {
      const allImages = await getProductImageByProductId();
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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    };
  }

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
  }, [productId]);

  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center">
        <Alert variant="danger">Product not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="product-container">
      <Row>
        <Col md={6} className="product-image">
          <Carousel>
            {ProductImage.map((productImage) => (
              <Carousel.Item key={productImage.imageId}>
                <Image src={productImage.imageUrl} alt={`${product.name} image ${productImage.imageId}`} fluid />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6} className="product-details">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="product-price">${product.price}</p>
          <Button as={Link} to="/shop" variant="primary">Back to Shop</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;