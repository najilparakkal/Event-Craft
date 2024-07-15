import axios, { AxiosInstance } from "axios";
export const outerAxios: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  