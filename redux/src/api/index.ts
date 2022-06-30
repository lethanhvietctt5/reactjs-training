import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json; charset=UTF-8" },
});

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response: AxiosResponse) {
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
export * from "./authApi";
export * from "./bookmarkApi";
export * from "./postApi";
export * from "./userApi";
