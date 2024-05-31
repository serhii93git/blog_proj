
import axios from 'axios';
import AuthService from '@/services/AuthService';

axios.defaults.baseURL = 'http://localhost:8000/api/';

// Додавання інтерцептора для додавання ключа до заголовків запитів
axios.interceptors.request.use(config => {
  const user = AuthService.getCurrentUser();
  if (user && user.key) {
    config.headers.Authorization = `Token ${user.key}`;
  }
  return config;
});

export default axios;
