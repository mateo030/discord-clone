import axios, { AxiosError } from "axios";

export const publicApi = axios.create({
  withCredentials: false,
  baseURL: "/api", // TODO: Switch with actual API domain
});

export const privateApi = axios.create({
  withCredentials: true,
  baseURL: "/api",
});

/**
 * Custom error handler
 *
 * @param {AxiosError} error
 */
const errorHandler = (error: AxiosError) => {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

publicApi.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

privateApi.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
