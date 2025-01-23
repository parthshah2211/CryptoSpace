// import { dispatchClearUser } from '@mtc/redux/dispatch/user.dispatch';
// import { store } from '@mtc/redux/store';
import axios, { AxiosRequestConfig } from 'axios';

export const apiURL ="";

export const baseURL = "";

axios.defaults.baseURL = baseURL;

export const axiosGet = async (
  url: string,
  config?: AxiosRequestConfig<object>
) => axios.get(url, { ...config });

export const axiosPost = async (
  url: string,
  { data, ...config }: { data?: object } & AxiosRequestConfig<object>
) => axios.post(url, data, config);

export const axiosPatch = async (
  url: string,
  { data, ...config }: { data?: object } & AxiosRequestConfig<object>
) => axios.patch(url, data, config);

export const axiosPut = async (
  url: string,
  { data, ...config }: { data?: object } & AxiosRequestConfig<object>
) => axios.put(url, data, config);

export const axiosDelete = async (
  url: string,
  config?: AxiosRequestConfig<object>
) => axios.delete(url, config);

axios.interceptors.request.use((request) => {
  request.headers.Accept = 'application/json';
  request.headers['Content-Type'] = 'application/json';
  request.headers['ngrok-skip-browser-warning'] = 'true';
  return request;
});


axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {

      window.location.href = '/login';
      return;
    }
    return Promise.reject(error);
  }
);