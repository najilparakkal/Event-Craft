import axios, { AxiosInstance, AxiosResponse } from "axios";

import { CONFIG_KEY } from "../../../config";

interface userData {
  name: string;
  email: string;
  phoneNum: string;
  password: string;
}

interface authResponse {
  status: number;
  massage: string;
}
const authAxiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


export const userRegister = async (endpoint: string, userData: userData) => {
  console.log(userData, endpoint);

  const response = await authAxiosInstance.post(`${endpoint}`, userData);

  if (response.data.status === 200) {
    const userEmail = response.data.user.userEmail;
    localStorage.setItem("email", userEmail);
  } else {
    console.error("User registration failed:", response.data.message);
  }
  return response.data;
};

export const verifyOtp = async (otp: string): Promise<boolean> => {
  const userEmail = localStorage.getItem("email");
  if (!userEmail) {
    console.error("User email not found in localStorage");
    return false;
  }

  try {
    const response = await authAxiosInstance.post("/user/otp", { otp, userEmail });
    return response.status === 200;  
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
};

export const resendOtp = async (email: string): Promise<boolean> => {
  try {
    const response = await authAxiosInstance.post("/user/resendOtp", { email });
    console.log("OTP resent response:", response);
    return response.status === 200;
  } catch (error) {
    console.error("Error resending OTP:", error);
    return false;
  }
}