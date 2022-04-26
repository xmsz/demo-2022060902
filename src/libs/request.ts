import UserLogin from '@/components/UserLogin';
import axios from 'axios';
import compShowApi from './compShowApi';
import { tokenHelper } from './token';

let unauthorized = false;

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
  (response) => {
    unauthorized = false;
    return response;
  },
  (err) => {
    if (err.response.status === 401 && !unauthorized) {
      tokenHelper.clearToken();
      compShowApi(UserLogin);
      unauthorized = true;
    }
    return Promise.reject(err);
  }
);

export default request;
