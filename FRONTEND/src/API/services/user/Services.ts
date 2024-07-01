import { authAxiosInstance } from "./axios/AxiosInstance";


export const fetchVendors = async(data:string)=>{
    try {
      const response = await authAxiosInstance.post("user/vendors",{data});
      console.log(response,"🍽️🍽️");
      
      return response.data;
    } catch (error) {
      console.log(error);
      
    }
  }

  export const fetchServices = async()=>{
    try {
      const response = await authAxiosInstance.get("user/services");
      
      return response.data;
    } catch (error) {
      console.log(error);
      
    }
  }