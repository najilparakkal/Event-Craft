import express from "express";
import authController from "../../adaptors/authController";
const userRouter = express.Router();

userRouter.post("/api/user/signup",authController.userRegistration)
userRouter.post("/api/user/otp",authController.otpVerification)
userRouter.post("/api/user/resendOtp",authController.resendOtp)




export default userRouter 