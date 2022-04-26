import UserLogin from '@/components/UserLogin';
import axios from 'axios';
import compShowApi from './compShowApi';
import { tokenHelper } from './token';

const request = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL as string,
});

request.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization:
      config?.headers?.Authorization || `Bearer ${tokenHelper.token}`,
  };
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 401) {
      tokenHelper.clearToken();
      compShowApi(UserLogin);
    }
    return Promise.reject(err);
  }
);

export default request;
