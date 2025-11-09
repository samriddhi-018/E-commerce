import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({ onAddProduct, onLoginClick, onSignupClick, onLogout, isAuthenticated }) => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <a href="#" className="nav-brand">
          Fresh Market
        </a>
        <div className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Products</a>
          <button onClick={onAddProduct} className="add-product-btn">
            + Add Product
          </button>
          {!isAuthenticated ? (
            <>
              <button onClick={onLoginClick} className="auth-btn">Login</button>
              <button onClick={onSignupClick} className="auth-btn">Signup</button>
            </>
          ) : (
            <button onClick={onLogout} className="auth-btn">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;