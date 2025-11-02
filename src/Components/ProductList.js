import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../API/api';
import '../styles/ProductList.css';

const CATEGORIES = ['All', 'Fruits', 'Vegetables'];

const ProductList = ({ onEdit, refreshFlag }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [refreshFlag]);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products...');
      const response = await getProducts();
      console.log('Products received:', response.data);
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      // You might want to show an error message to the user here
    }
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts(); // Refresh list
  };

  const filteredProducts = products.filter(product =>
    selectedCategory === 'All' ? true : product.description === selectedCategory
  );

  return (
    <div className="product-list-container">
      <div className="filters">
        <label className="form-label">Filter by Category:</label>
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {CATEGORIES.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div className="product-category">Category: {product.description}</div>
              <div className="product-price">${product.price.toFixed(2)}</div>
              <div className="product-stock">
                Stock: {product.stockQuantity} units
              </div>
            </div>
            <div className="card-actions">
              <button
                className="btn btn-edit"
                onClick={() => onEdit(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;