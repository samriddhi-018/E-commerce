import React, { useState, useEffect } from 'react';
import ProductList from './Components/ProductList';
import ProductForm from './Components/ProductForm';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { getToken, setToken } from './API/api';
import './styles/App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleSave = () => {
    setSelectedProduct(null);
    setShowForm(false);
    setRefreshFlag(f => !f);
  };

  return (
    <div className="app-container">
      <Navbar
        onAddProduct={() => setShowForm(true)}
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
        onLogout={() => { setToken(null); setIsAuthenticated(false); }}
        isAuthenticated={isAuthenticated}
      />

      {showForm && (
        <div className="form-overlay">
          <ProductForm 
            selectedProduct={selectedProduct} 
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setSelectedProduct(null);
            }}
          />
        </div>
      )}
      {showLogin && (
        <div className="form-overlay">
          <Login onClose={() => setShowLogin(false)} onLoggedIn={() => { setIsAuthenticated(true); setShowLogin(false); }} />
        </div>
      )}
      {showSignup && (
        <div className="form-overlay">
          <Signup onClose={() => setShowSignup(false)} />
        </div>
      )}
      
      <ProductList 
        onEdit={handleEdit} 
        refreshFlag={refreshFlag} 
      />
    </div>
  );
}export default App;