import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getShopProducts, getCategories } from '../../API/AxiosConfig'; // Adjust the path as necessary

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    getShopProducts()
      .then(data => {
        console.log('Fetched products:', data); // Debugging
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));

    getCategories()
      .then(data => {
        console.log('Fetched categories:', data); // Debugging
        setCategories(['All', ...data.map(category => category.Name)]);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.CategoryID === selectedCategory);

  return (
    <div>
      <header>
        <h1>Koi Care Shop</h1>
      </header>
      <main>
        <div>
          <label>
            Sort by Category:
            <select value={selectedCategory} onChange={handleCategoryChange}>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>
        <ul>
          {filteredProducts.map(product => (
            <li key={product.ProductID}>
              <Link to={`/product/${product.ProductID}`}>
                {product.Name} - {product.Price}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Shop;