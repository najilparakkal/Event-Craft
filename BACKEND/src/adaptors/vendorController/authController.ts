import { Request, Response } from "express";
import vendorIterator from "../../domain/usecases/vendor/auth/authentication";

export default {
  signUp: async (req: Request, res: Response) => {
    try {
      const response = await vendorIterator.signup(req.body);

      if (response?.success) {
        res
          .status(200)
          .json({
            status: 200,
            message: "Vendor registered successfully",
            response,
          });
      } else if (response?.success === false) {
        res
          .status(201)
          .json({
            status: 201,
            message: "Account already registered",
            response,
          });
      }
    } catch (error) {
      console.log(error);
    }
  },
  verifyOtp: async (req: Request, res: Response) => {
    try {

      const response = await vendorIterator.checkOtp(req.body);
      if (response?.success === true) {
        res
          .status(200)
          .json({
            status: 200,
            message: "OTP verified successfully",
            response,
          });
      } else if (response?.success === false) {
        res.status(201).json({ status: 201, message: "OTP failed", response });
      } else {
        res
          .status(400)
          .json({ status: 400, message: "OTP verification failed", response });
      }
    } catch (error) {
      console.log(error);
    }
  },

  resendOtp: async (req: Request, res: Response) => {
    try {
      const resendOtp = await vendorIterator.resend(req.body);

      if (resendOtp) {
        res.status(200).json({ status: 200, message: "OTP resent" });
      } else {
        res.status(400).json({ message: "Failed to resend OTP" });
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
    }
  },

  login:async(req:Request, res:Response)=>{
    try {
      
      const response = await vendorIterator.login(req.body);
      if(response?.success){
        res.status(200).json({status:200,message:"vendor logged in successfully",response})
      }else if(response?.success === false &&  response?.message=== "dose not exist"){
        res.status(201).json({status:201,message:response.message})
      }else if(response?.success===false){
        res.status(202).json({status:202,message:response.message})
      }else {
        res.status(400).json({status:400,message:"vendor login failed"})
      }
    } catch (error) {
      console.log(error);
      
    }
  },
  verifyEmail:async(req:Request, res:Response)=>{
    try {
      const response = await vendorIterator.checkEmail(req.body)
      if(response){
        res.status(200).json({status:200,message:"email verified"})
      }else{
        res.status(201).json({status:201,message:"email not verified"})
      }
    } catch (error) {
      
      console.log(error);
      
    }
  },
  verifyFotp:async(req:Request, res:Response)=>{
    try {
      const response = await vendorIterator.checkFotp(req.body)
      if(response){
        res.status(200).json({status:200,message:"otp verified"})
      }else{
        res.status(201).json({status:201,message:"otp not verified"})
      }
    } catch (error) {
      console.log(error);
      
    }
  },
  updatePassword:async(req:Request,res:Response)=>{
    try {
      const response = await vendorIterator.updatePassword(req.body)
      if(response?.seccess){
        res.status(200).json({status:200,message:"password updated"})
      }else{
        res.status(201).json({status:201,message:"password not updated"})
      }
    } catch (error) {
      console.log(error);
      
    }
  },
  googleRegistration: async (req: Request, res: Response) => {
    try {
      const response = await vendorIterator.googleRegistration(req.body);
      
      if (response.success) {
        res.status(200).json({ status: 200, message: "vendor registered successfully", response });
      } else {
        res.status(201).json({ status: 201, message: "vendor already Registered", response });
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
    }
  },
  googleLogin:async(req: Request, res: Response) => {
    try {
      const response = await vendorIterator.googleLogin(req.body);
      
      if (response && response.token && response.vendorDetails) {
        res.status(200).json({ status: 200, message: "vendor is valid", response });
      } else {
        res.status(201).json({ status: 201, message: "vendor is not valid" });
      }
    } catch (error) {
      console.log(error);
      
    }
  }
};
