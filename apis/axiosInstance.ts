import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || `http://localhost:3000/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("accessToken");

      // optional redirect logic
      router.replace("/login");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
