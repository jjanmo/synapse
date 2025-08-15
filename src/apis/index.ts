import axios, { type AxiosRequestConfig } from 'axios';

const baseAxiosInstance = axios.create({
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosInstance = {
  get: <TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> =>
    baseAxiosInstance.get(url, config).then((res) => res.data),
  delete: <TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> =>
    baseAxiosInstance.delete(url, config).then((res) => res.data),
  post: <TResponse, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig<TData>
  ): Promise<TResponse> => baseAxiosInstance.post(url, data, config).then((res) => res.data),
  put: <TResponse, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig<TData>
  ): Promise<TResponse> => baseAxiosInstance.put(url, data, config).then((res) => res.data),
  patch: <TResponse, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig<TData>
  ): Promise<TResponse> => baseAxiosInstance.patch(url, data, config).then((res) => res.data),
};
