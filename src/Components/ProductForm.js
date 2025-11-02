import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../API/api';
import '../styles/ProductForm.css';

const CATEGORIES = ['Fruits', 'Vegetables'];

const ProductForm = ({ selectedProduct, onSave, onCancel }) => {
  const [product, setProduct] = useState({ 
    name: '', 
    description: '', 
    price: 0, 
    stockQuantity: 0
  });

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert number inputs to proper numbers instead of strings
    const parsedValue = (name === 'price' || name === 'stockQuantity') 
      ? parseFloat(value) 
      : value;
    setProduct({ ...product, [name]: parsedValue });
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Log the data being sent to API
      console.log('Sending product data:', product);
      
      if (product.id) {
        await updateProduct(product.id, product);
      } else {
        try {
          const response = await createProduct(product);
          console.log('Server response:', response);
        } catch (error) {
          console.error('Detailed error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
          });
          throw error; // Re-throw to be caught by the outer try-catch
        }
      }
      onSave(); // Refresh list
      setProduct({ name: '', description: '', price: 0, stockQuantity: 0 });
    } catch (err) {
      console.error('API error:', err);
      setError('Failed to save product. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>{product.id ? 'Edit Product' : 'Add New Product'}</h3>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Product Name</label>
        <input
          className="form-input"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        >
          {CATEGORIES.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Price ($)</label>
        <input
          className="form-input"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Enter price"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Stock Quantity</label>
        <input
          className="form-input"
          name="stockQuantity"
          type="number"
          value={product.stockQuantity}
          onChange={handleChange}
          placeholder="Enter stock quantity"
          min="0"
          required
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className={`submit-button ${product.id ? 'update' : ''}`}
        >
          {product.id ? 'Update Product' : 'Add Product'}
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;