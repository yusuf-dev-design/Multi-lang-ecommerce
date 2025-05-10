import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8002',
});

// Auth
export const login = (data) => apiClient.post('/auth/login', data);

// Products
export const getProducts = () => apiClient.get('/products');

// Orders
export const createOrder = (data, token) =>
  apiClient.post('/orders', data, {
    headers: { Authorization: `Bearer ${token}` }
  });

// User
export const getUserProfile = (token) =>
  apiClient.get('/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  });