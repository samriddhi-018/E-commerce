import React, { useState } from 'react';
import { register } from '../API/api';
import '../styles/ProductForm.css';

const Signup = ({ onClose }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(credentials);
      setSuccess('Registered successfully. You can now login.');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>Signup</h3>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="form-group">
        <label className="form-label">Username</label>
        <input name="username" value={credentials.username} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button">Signup</button>
        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default Signup;
