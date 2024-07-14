import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
const getToken = () => Cookies.get('jwt');

export const authAxiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getToken()

  },
  withCredentials: true,
});

authAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


authAxiosInstance.interceptors.response.use(
  (response)=>{
    return response;
  },
  (error) => {
    if(error.response ){
      Cookies.remove('jwt')
      console.log("Un Authorization Error ❌❌");
      
      window.location.href = "/vendor/login";
    }
    return Promise.reject(error);
  }
)