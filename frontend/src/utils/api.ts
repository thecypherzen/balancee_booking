import axios from "axios";

const ENV = import.meta.env.ENV;

const api = axios.create({
  baseURL:
    ENV === "dev" ? "http://localhost:8082" : import.meta.env.VITE_API_BASE_URL,
});

export default api;
