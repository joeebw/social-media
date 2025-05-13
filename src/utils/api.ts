import axios from "axios";

const api = axios.create({
  baseURL: "TU_URL_BASE_DEL_BACKEND",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Error 401: Token expirado o inválido. Redirigiendo...");

      localStorage.removeItem("token");

      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default api;
