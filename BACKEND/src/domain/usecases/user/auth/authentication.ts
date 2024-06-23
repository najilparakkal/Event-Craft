import { Request } from "express";
import { IUser, Login, googleRegistration } from "../../../entities/user/user";
import { Encrypt } from "../../../helpers/passwordHashing";
import {
  createUser,
  validOtp,
  updateOtp,
  logingUser,
  varifyEmail,
  forgotValidOtp,
  updatePassword,
  RegisterWithGoogle
} from "../../../repositories/user/repositories";
import { otpVeri } from "../../../entities/user/user";
import { sendOTP } from "../../../helpers/nodmailer";
import { ResendData } from "../../../entities/user/user";

export default {
  registerUser: async (userData: IUser) => {
    try {
      if (!userData.password) {
        throw new Error("Password is required");
      }
      const hashedPassword = await Encrypt.cryptPassword(userData.password);
      console.log("hashedPassword");
      const savedUser = await createUser(userData, hashedPassword);
      
      return savedUser;
    } catch (error) {
      console.log(error);
      throw error;     
    }       
  },        

  otpVerification: async (data: otpVeri) => {
    try {

      const response = await validOtp(data);

      return response;
    } catch (error) {
      console.log(error);
    }
  },
  forgotOtpVerification: async (data: otpVeri) => {
    try {

      const response = await forgotValidOtp(data);
      console.log(response);
      
      return response;  
    } catch (error) {
      console.log(error);
    }
  },

  resend: async (data: ResendData) => {
    try {
      const email: string = data.email;
      const response: string = sendOTP(email);
      
      const update = await updateOtp(email, response);
      return update;
    } catch (error) {
      console.log(error);
    }
  },

  login: async (data: Login) => {
    try {
      const email = data.email;
      const password = data.password;
      const response = await logingUser(email, password);
      return response;
    } catch (error) {
      console.log(error);
    }
  },


  checkEmail:async (data: ResendData)=>{
    try {
      const email :string = data.email
      const response = await varifyEmail(email)
      return response
    } catch (error) {
      console.log(error);
      
    }
  },
  changePass:async (data:any)=>{
    try {
      const hashedPassword = await Encrypt.cryptPassword(data.password);
      console.log(data);  
      
      const response = await updatePassword(data.email, hashedPassword);
      return response
    } catch (error) {
      console.log(error);
      
    }
  },
  googleRegistration:async(data: any)=>{
    try {
      const hashedPassword = await Encrypt.cryptPassword(data.uid);
      const response = await RegisterWithGoogle(data,hashedPassword)
      return response
    } catch (error) {
      console.log(error);
      
    }
  },
  googleLogin:async(data:any)=>{
    try {
      const email = data.email;
      const password = data.uid;
      const response = await logingUser(email, password);
       return response
    } catch (error) {
      console.log(error);
      
    }
  }
};
