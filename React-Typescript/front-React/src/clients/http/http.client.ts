
import axios, {
 AxiosInstance, AxiosRequestConfig, AxiosResponse,
} from 'axios';

export const buildClient = (config: AxiosRequestConfig) => {
  const client = axios.create(config);
  return client;
};

const defaultClient: AxiosInstance = buildClient({
 timeout: 12000,
});

export const get = async <Data>({
  client = defaultClient,
  options = {

},
  params = {

},
  path,
  url,
}: {
  client?: AxiosInstance;
  options?: AxiosRequestConfig;
  params?: any,
  path: string;
  url: string;
}): Promise<AxiosResponse<Data>> => {
  const response = await client.get(`${url}/${path}`, {
    ...options,
    params,
  });
  return response;
};

export const post = async <Data>({
  client = defaultClient,
  options = {

},
  params = {

},
  path,
  url,
}: {
  client?: AxiosInstance;
  options?: AxiosRequestConfig;
  params?: any,
  path: string;
  url: string;
}): Promise<AxiosResponse<Data>> => {
  const response = await client.post(`${url}/${path}`, params, options);
  return response;
};

export const put = async <Data>({
  client = defaultClient,
  options = {

},
  params = {

},
  path,
  url,
}: {
  client?: AxiosInstance;
  options?: AxiosRequestConfig;
  params?: any,
  path: string;
  url: string;
}): Promise<AxiosResponse<Data>> => {
  const response = await axios.put(`${url}/${path}`, params, options);
  return response;
};

export const patch = async <Data>({
  client = defaultClient,
  options = {

},
  params = {

},
  path,
  url,
}: {
  client?: AxiosInstance;
  options?: AxiosRequestConfig;
  params?: any,
  path: string;
  url: string;
}): Promise<AxiosResponse<Data>> => {
  const response = await axios.patch(`${url}/${path}`, params, options);
  return response;
};

export const del = async <Data>({
  client = defaultClient,
  options = {

},
  params = {

},
  path,
  url,
}: {
  client?: AxiosInstance;
  options?: AxiosRequestConfig;
  params?: any,
  path: string;
  url: string;
}): Promise<AxiosResponse<Data>> => {
  const response = await axios.delete(`${url}/${path}`, {
    params,
    ...options,
  });
  return response;
};
