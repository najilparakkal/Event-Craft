import express from "express";
import authController from "../../adaptors/userController/authController";
const   userRouter = express.Router();

userRouter.post("/api/user/signup",authController.userRegistration)
userRouter.post("/api/user/otp",authController.otpVerification) 
userRouter.post("/api/user/Fotp",authController.forgotOtpVerification) 
userRouter.post("/api/user/resendOtp",authController.resendOtp)
userRouter.post("/api/user/login",authController.login)
userRouter.post("/api/user/validEmail",authController.checkEmail)
userRouter.post("/api/user/Fotp",authController.checkEmail)
userRouter.post("/api/user/changePassword",authController.change)
userRouter.post("/api/user/googleUser",authController.googleRegistration)
userRouter.post("/api/user/googleLogin",authController.googleLogin)
userRouter.post("/api/user/vendors",authController.listVendors) // after review need to change this to another controller
userRouter.get("/api/user/services",authController.listServices) // after review need to change this to another controller




export default userRouter            