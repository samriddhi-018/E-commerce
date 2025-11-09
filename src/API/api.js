import axios from 'axios';

const BASE_URL = 'http://localhost:5207/api';

const api = axios.create({
	baseURL: BASE_URL,
});

// attach token automatically
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Products
export const getProducts = () => api.get('/products');
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (credentials) => api.post('/auth/register', credentials);

export const setToken = (token) => {
	if (token) localStorage.setItem('token', token);
	else localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token');