import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export const authAxiosInstance: AxiosInstance = axios.create({
  baseURL:import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer" + Cookies.get('adminToken')
  },
  withCredentials: true,
});


// authAxiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('adminToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


authAxiosInstance.interceptors.response.use(
  (response)=>{
    if(response.status === 204){
      Cookies.remove("adminToken");
      window.location.href = "/admin/login";

    }
    return response;
  },
  (error) => {
    if(error.response ){
      Cookies.remove('adminToken')
      console.log("Un Authorization Error ❌❌");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
)