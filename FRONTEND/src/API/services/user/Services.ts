import { authAxiosInstance } from "./axios/AxiosInstance";

export const fetchVendors = async (data: string) => {
  try {
    const response = await authAxiosInstance.post("user/vendors", { data });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchServices = async () => {
  try {
    const response = await authAxiosInstance.get("user/services");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchVendorDetails = async (data: string) => {
  try {
    const response = await authAxiosInstance.get(`user/vendorProfile/${data}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addRequest = async (message: string, userId: string,vendorId:string) => {
  try {
    
    const data = {
      message,
      userId,
      vendorId
    };

    await authAxiosInstance.post("user/addRequest", data);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRequest = async(userId:string)=>{
  try {    
    const response = await authAxiosInstance.get(`user/request/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const cancelRequest = async (vendorId:string,userId:string)=>{
  try {
  
    const response = await authAxiosInstance.post("user/cancelRequest",{vendorId,userId});
    return response
  } catch (error) {
    console.log(error);
    
  }
}

export const fetchVendorsInChat = async(userId:string)=>{
  try {
    const response = await authAxiosInstance.get(`user/fetchVendors/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
}

export const fetchChatId = async(userId:string,vendorId:string)=>{
  try {
    const response = await authAxiosInstance.get(`user/chatId/${userId}/${vendorId}`)
    
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
}