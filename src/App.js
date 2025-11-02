import React, { useState } from 'react';
import ProductList from './Components/ProductList';
import ProductForm from './Components/ProductForm';
import Navbar from './Components/Navbar';
import './styles/App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
      <Navbar onAddProduct={() => setShowForm(true)} />

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
      
      <ProductList 
        onEdit={handleEdit} 
        refreshFlag={refreshFlag} 
      />
    </div>
  );
}export default App;