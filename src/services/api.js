import axios from 'axios';

// Configuración base de axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación a las solicitudes
api.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funciones de la API
export const authAPI = {
  login: (token) => api.post('/auth/login', { token }),
};

export const postsAPI = {
  getAll: () => api.get('/posts'),
  getById: (id) => api.get(`/posts/${id}`),
  create: (postData) => api.post('/posts', postData),
  update: (id, postData) => api.put(`/posts/${id}`, postData),
  delete: (id) => api.delete(`/posts/${id}`),
  schedule: (id, scheduleData) => api.post(`/posts/${id}/schedule`, scheduleData),
};

export const socialAccountsAPI = {
  getAll: () => api.get('/social-accounts'),
  connect: (platform, authData) => api.post('/social-accounts/connect', { platform, ...authData }),
  disconnect: (id) => api.delete(`/social-accounts/${id}`),
};

export const mediaAPI = {
  upload: (formData) => api.post('/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  getAll: () => api.get('/media'),
  delete: (id) => api.delete(`/media/${id}`),
};

export default api;