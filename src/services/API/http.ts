import Axios from 'axios';

import {BASE_URL} from '../BaseURL';
import {store} from 'src/redux';
const {dispatch} = store;

const instance = Axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config: any) => {
    const token = '';

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    if (error?.response?.status === 401) {
      // dispatch(setIsLogin(false));
      throw error.response;
    }
    return Promise.reject(error);
  },
);

export const http = instance;
