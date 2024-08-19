import axios, { AxiosInstance } from "axios";
export const outerAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  