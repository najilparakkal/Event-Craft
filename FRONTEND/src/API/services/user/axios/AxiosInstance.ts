import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export const authAxiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + Cookies.get('jwt')
  },
  withCredentials: true,
});

authAxiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


authAxiosInstance.interceptors.response.use(
  (response)=>{
    if(response.status === 204){
      Cookies.set("jwt", response.data.accessToken);
    }
    return response;
  },
  (error) => {
    if(error.response ){
      // Cookies.remove('jwt')
      console.log("Un Authorization Error ❌❌");
      // window.location.href = "/";
    }
    return Promise.reject(error);
  }
)