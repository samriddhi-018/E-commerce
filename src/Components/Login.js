import React, { useState } from 'react';
import { login, setToken } from '../API/api';
import '../styles/ProductForm.css';

const Login = ({ onClose, onLoggedIn }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(credentials);
      const token = res.data?.token;
      if (token) {
        setToken(token);
        onLoggedIn();
        onClose();
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>Login</h3>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label className="form-label">Username</label>
        <input name="username" value={credentials.username} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button">Login</button>
        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default Login;
