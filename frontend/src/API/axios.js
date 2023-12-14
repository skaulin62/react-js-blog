import axios from "axios";

const instance = axios.create({
  baseURL: "https://s6nder-react-blog.onrender.com",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
