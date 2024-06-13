import { Request, Response, NextFunction } from "express";
import userIterator from "../domain/usecases//auth/authentication";
import otpVerification from "../domain/usecases//auth/authentication";

export default {
  userRegistration: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userIterator.registerUser(req.body);

      if (user.success === false) {
        res
          .status(201)
          .json({ status: 201, message: "suer is already registered", user });
      } else {
        if (user) {
          res.status(200).json({
            status: 200,
            message: "User registered successfully",
            user,
          });
        } else {
          res.status(400).json({ message: "User registration failed" });
        }
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
      next(error);
    }
  },

  otpVerification: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkOtp = await userIterator.otpVerification(req.body);
      console.log(checkOtp);
      if(checkOtp.success===true){
        res.status(200)
        .json({status:200,message:"user otp verified"})
      }else if(checkOtp.success===false){
        res.status(201)
        .json({status:201,message:"user  otp denied"})
      }else{
        res.status(400).json({ message: "otp verification failed" });

      }
    } catch (error) {}
  },

  resendOtp:async(req:Request, res:Response)=>{
    try {
      const resendOtp = await userIterator.resend(req.body)

      if(resendOtp){
        res.status(200)
       .json({status:200,message:"otp resend"})
      }
    } catch (error) {
      
    }
  }
};
