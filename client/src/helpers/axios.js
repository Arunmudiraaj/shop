import axios from "axios";
import { getToken, removeToken } from "../utils/auth";
import { revertAll } from "../store/authSlice";
import store from "../store/rootReducer";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = getToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response if the request was successful
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error globally
      console.error("Unauthorized! Redirecting to login...");
      store.dispatch(revertAll());
      removeToken();
      //   window.location.href = '/login'; // Redirect user to login page
    }
    return Promise.reject(error);
  }
);

export const buildUrl = (url, params = {}, query = {}) => {
  let fullUrl = import.meta.env.VITE_APP_API_URL + url;

  for (const [key, value] of Object.entries(params)) {
    fullUrl = fullUrl.replace(`:${key}`, value);
  }

  const queryParams = new URLSearchParams(query).toString();
  if (queryParams) {
    fullUrl += `?${queryParams}`;
  }

  return fullUrl;
};

export default axiosInstance;
