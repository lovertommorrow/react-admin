import axios from "axios";

// 设置默认请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';


const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  /* 
  * 设置请求超时时间
  */
  timeout: 10 * 1000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
