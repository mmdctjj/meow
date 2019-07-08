import axios from "axios";
import router from "../router";

const server = axios.create({
  baseURL: "/api",
  timeout: 5000
});
// 还有一种写法
server.defaults.baseURL = "/api-dev";
// 设置拦截器
// 请求拦截器
server.interceptors.request.use(
  config => {
    config.headers.token = localStorage.getItem("token");
    config.no_proxy = true;
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);
// 响应拦截器
server.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    switch (error.response.status) {
      case 500:
        router.push({
          path: "/404"
        });
        break;
      case 401:
        router.push({
          path: "/401"
        });
        break;
    }
  }
);

export default server;
