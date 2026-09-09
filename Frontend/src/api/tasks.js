import api from './axios';

export const getTasks = (params = {}) => api.get('/tasks', { params });
export const getTask = (id) => api.get(`/tasks/${id}`);
export const createTask = (payload) => api.post('/tasks', payload);
export const updateTask = (id, payload) => api.patch(`/tasks/${id}`, payload);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
