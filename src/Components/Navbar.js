import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({ onAddProduct }) => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <a href="/" className="nav-brand">
          Fresh Market
        </a>
        <div className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Products</a>
          <button onClick={onAddProduct} className="add-product-btn">
            + Add Product
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;