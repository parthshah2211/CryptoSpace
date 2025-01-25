import axios, { AxiosRequestConfig } from 'axios';

export const apiURL ="";

export const baseURL = "";

axios.defaults.baseURL = baseURL;

export const axiosGet = async (
  url: string,
  config?: AxiosRequestConfig<object>
) => axios.get(url, { ...config });

