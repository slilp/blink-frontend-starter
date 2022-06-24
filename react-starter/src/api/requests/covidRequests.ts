import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  Method,
  AxiosResponse,
} from "axios";

const httpClient: AxiosInstance = axios.create({
  baseURL: `https://covid19.ddc.moph.go.th/api`,
});

httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

const request = <TRequest = any, TResponse = any>(
  method: Method = "get",
  url: string,
  options: AxiosRequestConfig = {},
  data?: TRequest
) => {
  const config: AxiosRequestConfig = {
    url,
    method,
    data,
    ...options,
  };
  return httpClient.request<TResponse>(config);
};

const api = {
  get: <TResponse = any>(
    url: string,
    requestOptions?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> => {
    return request<any, TResponse>("get", url, requestOptions);
  },
  post: <TRequest = any, TResponse = any>(
    url: string,
    data?: TRequest,
    requestOptions?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> => {
    return request<TRequest, TResponse>("post", url, requestOptions, data);
  },
  put: <TRequest = any, TResponse = any>(
    url: string,
    data?: TRequest,
    requestOptions?: AxiosRequestConfig
  ): Promise<AxiosResponse<TResponse>> => {
    return request<TRequest, TResponse>("put", url, requestOptions, data);
  },
};

export default api;
