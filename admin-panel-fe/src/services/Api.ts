import axios, { AxiosHeaders } from 'axios';
import { loadAuthToken } from '../util/Auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((request) => {
  const authToken = loadAuthToken();

  (request.headers as AxiosHeaders).set('Authorization', `Bearer ${authToken}`);

  return request;
});

export default api;
