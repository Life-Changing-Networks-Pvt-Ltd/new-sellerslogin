import axios from "axios";

const configuredUrl = process.env.NEXT_PUBLIC_BLOG_API_URL || "http://localhost:8081/api";
const baseURL = configuredUrl.replace(/\/blogs\/?$/, "");
const api = axios.create({ baseURL });
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("blog_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
