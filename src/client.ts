import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `https://www.omdbapi.com`,
});

axiosInstance.interceptors.request.use((config) => {
  config.url = `${config.url}&apikey=${import.meta.env.VITE_API_KEY}`;
  return config;
});

export default axiosInstance;
