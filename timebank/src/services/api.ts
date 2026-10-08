import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Error 401: No autorizado. Token JWT inválido o ausente.');
        localStorage.removeItem('token');
      } else {
        console.error(`Error del Servidor (${error.response.status}):`, error.response.data);
      }
    } else if (error.request) {
      console.error('Error de red: El servidor backend no responde.');
    } else {
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;