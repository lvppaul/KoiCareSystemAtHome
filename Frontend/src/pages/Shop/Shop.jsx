import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    return <div>Loading...</div>;
  }

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>Koi Care Shop</h1>
      </header>
      <main className="shop-main">
        <Link to={`/manageshop`} className="productLink">Manage Shop</Link>
        <div className="shop-filter">
          <label>
            Sort by Category:
            <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <ul className="productList">
          {currentProducts.map(product => (
            <li key={product.productId} className="productItem">
              <Link to={`/product/${product.productId}`} className="productLink">
                <img src={product.thumbnail} alt={product.name} className="productImage" />
                <div>{product.name} - ${product.price}</div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="shop-pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </main>
    </div>
  );

};
export default Shop;