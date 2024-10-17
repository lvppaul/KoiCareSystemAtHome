import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Pagination, Image } from 'react-bootstrap';
import { getProducts } from '../../Config/ProductApi';
import { getCategories } from '../../Config/CategoryApi';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const fetchCategories = async () => {
    getCategories()
      .then(data => {
        const validCategories = data.filter(category => category && category.categoryId && category.name);
        setCategories([{ categoryId: 'All', name: 'All' }, ...validCategories]);
      })
      .catch(error => console.error('Error fetching categories:', error));
  };


  const fetchProducts = async () => {
    try {
      const allProducts = await getProducts();
      const updatedProducts = await Promise.all(allProducts.map(async product => {
        console.log('Fetched product:', product);
        if (product.thumbnail) {
          try {
            const storageRef = ref(storage, product.thumbnail);
            product.thumbnail = await getDownloadURL(storageRef);
          } catch (error) {
            console.error('The file does not exist in firebase anymore!', error);
            const storageRef = ref(storage, 'others/NotFound.jpg');
            product.thumbnail = await getDownloadURL(storageRef);
          }
        }
        return product;
      }));
      setProducts(updatedProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    };
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category.categoryId.toString() === selectedCategory);

  console.log('Filtered products:', filteredProducts);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" size="xl" role="status"/>
      </Container>
    );
  }

  return (
    <Container>
      <header className="shop-header">
        <h1>Koi Care Shop</h1>
      </header>
      <Button as={Link} to="/manageshop" variant="primary" className="my-3">
        Manage Shop
      </Button>
      <Row className="my-3">
        <Col md={2}>
          <Form.Group controlId="categorySelect">
          <Form.Label>Sort by Category:</Form.Label>
            <Form.Select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {currentProducts.map(product => (
          <Col key={product.productId} md={3} className="mb-3">
            <Link to={`/product/${product.productId}`} className='productLink'>
            <div className="product-card">
              <Image src={product.thumbnail} alt={product.name} className="img-fluid" rounded />
              <h5>{product.name}</h5>
              <p>${product.price}</p>
            </div>
            </Link>
          </Col>
        ))}
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
            {[...Array(totalPages).keys()].map(number => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => setCurrentPage(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};
export default Shop;