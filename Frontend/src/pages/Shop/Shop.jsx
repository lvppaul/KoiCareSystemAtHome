import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Spinner, Pagination, Image } from "react-bootstrap";
import { getProducts, getProductsByCategoryId } from "../../Config/ProductApi";
import { getCategories } from "../../Config/CategoryApi";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../Config/firebase";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const fetchCategories = async () => {
    getCategories()
      .then((data) => {
        const validCategories = data.filter((category) => category && category.categoryId && category.name);
        setCategories([{ categoryId: "All", name: "All" }, ...validCategories]);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const fetchProducts = useCallback(async () => {
    try {
      if (selectedCategory === "All") {
        const allProducts = await getProducts();
        const updatedProducts = await Promise.all(
          allProducts.map(async (product) => {
            if (product.thumbnail) {
              try {
                const storageRef = ref(storage, product.thumbnail);
                product.thumbnail = await getDownloadURL(storageRef);
              } catch (error) {
                console.error("The file does not exist in firebase anymore!", error);
                const storageRef = ref(storage, "others/NotFound.jpg");
                product.thumbnail = await getDownloadURL(storageRef);
              }
            }
            return product;
          })
        );
        setProducts(updatedProducts);
      } else {
        const filteredProducts = await getProductsByCategoryId(selectedCategory);
        const updatedFilteredProducts = await Promise.all(
          filteredProducts.map(async (product) => {
            if (product.thumbnail) {
              try {
                const storageRef = ref(storage, product.thumbnail);
                product.thumbnail = await getDownloadURL(storageRef);
              } catch (error) {
                console.error("The file does not exist in firebase anymore!", error);
                const storageRef = ref(storage, "others/NotFound.jpg");
                product.thumbnail = await getDownloadURL(storageRef);
              }
            }
            return product;
          })
        );
        setProductByCategory(updatedFilteredProducts);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, fetchProducts]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setLoading(true);
    setCurrentPage(1);
  };

  const filteredProducts = selectedCategory === "All" ? products : productByCategory;

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

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <Container>
      <h1 className="d-flex justify-content-center mt-3" style={{ color: "#E47E39" }}>
        Koi Care Shops
      </h1>
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
      <Container className="p-3">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" size="xl" role="status" />
          </div>
        ) : (
          <div>
            <Row>
              {currentProducts.map((product) => (
                <Col key={product.productId} md={3} className="mb-3">
                  <Link to={`/product/${product.productId}`} className="productLink">
                    <div className="product-card">
                      <Image src={product.thumbnail} alt={product.name} className="img-fluid mb-1" rounded />
                      <h5 style={{ fontWeight: "bolder", color: "#9e4a11" }}>{product.name}</h5>
                      <p style={{ fontWeight: "bold" }}>{formatPrice(product.price)}</p>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Pagination>
                  <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
                  {[...Array(totalPages).keys()].map((number) => (
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
          </div>
        )}
      </Container>
    </Container>
  );
};

export default Shop;
