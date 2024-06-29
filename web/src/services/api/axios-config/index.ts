import axios from 'axios';
import { responseInterceptor, errorInterceptor } from './interceptors';

const HOST =   '182.30.0.11:3001';
const PROTOCOL =   'http';

const api = axios.create({
  baseURL: `${PROTOCOL}://${HOST}`,
});

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { api };
