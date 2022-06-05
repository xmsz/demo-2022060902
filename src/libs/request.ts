import axios from 'axios';

const request = axios.create({
  baseURL: '',
});

request.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: config?.headers?.Authorization ?? `Bearer ${''}`,
  };
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 401) {
    }
    return Promise.reject(err);
  },
);

export default request;
