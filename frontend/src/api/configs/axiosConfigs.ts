import axios, { AxiosError } from "axios";

export const api = axios.create({
  withCredentials: false,
  baseURL: "http://localhost:3000/", // TODO: Switch with actual API domain
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

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
