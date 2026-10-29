import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor de peticiones
api.interceptors.request.use(
  (config) => {
    // 1. Buscamos el paquete 'session' que guardó el authService
    const sessionStr = localStorage.getItem('session');
    
    if (sessionStr && config.headers) {
      // 2. Lo abrimos (parseamos el JSON)
      const sessionObj = JSON.parse(sessionStr);
      
      // 3. Sacamos el token y lo pegamos en la cabecera
      if (sessionObj.token) {
        config.headers.Authorization = `Bearer ${sessionObj.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Error 401: No autorizado. Token JWT inválido o ausente.');
        // Si nos da error 401, borramos el paquete correcto ('session')
        localStorage.removeItem('session'); 
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