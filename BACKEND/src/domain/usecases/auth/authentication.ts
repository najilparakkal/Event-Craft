import { Request } from "express";
import { IUser } from "../../entities/user/user";
import { Encrypt } from "../../helpers/passwordHashing";
import { createUser, validOtp,updateOtp } from "../../repositories/repositories";
import { otpVeri } from "../../entities/user/user";
import { sendOTP } from "../../helpers/nodmailer";
import { ResendData } from "../../entities/user/user";



export default {
  registerUser: async (userData: IUser) => {
    try {
      if (!userData.password) {
        throw new Error("Password is required");
      }
      const hashedPassword = await Encrypt.cryptPassword(userData.password);
      console.log("hashedPassword");
      const savedUser = await createUser(userData, hashedPassword);
      console.log("new user ✅", savedUser);

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


  resend: async (data: ResendData) => {
    try {
      const email: string = data.email;
      const response:string = sendOTP(email);
      
    const update = await updateOtp(email, response); 
         return update
    } catch (error) {
      console.log(error);
    }
  }
};
