import api from './axios';

export const registerUser = (payload) => api.post('/auth/register', payload);
export const loginUser = (payload) => api.post('/auth/login', payload);
export const getCurrentUser = () => api.get('/auth/me');
export const logoutUser = () => api.get('/auth/logout');
