import axios from 'axios';

const configuredUrl = import.meta.env.VITE_API_URL?.trim();

if (!configuredUrl) {
  throw new Error('VITE_API_URL is required');
}

const backendOrigin = configuredUrl
  .replace(/\/+$/, '')
  .replace(/\/api$/, '');

const api = axios.create({
  baseURL: `${backendOrigin}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default api;