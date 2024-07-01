import axios, { AxiosInstance } from "axios";

export const authAxiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});



// authAxiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// authAxiosInstance.interceptors.response.use(
//   (response)=>{
//     return response;
//   },
//   (error) => {
//     if(error.response ){
//       localStorage.removeItem('token');
//       console.log("Un Authorization Error ❌❌");
      
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// )