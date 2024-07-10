import express from "express";
import authController from "../../adaptors/userController/authController";
import Controller from "../../adaptors/userController/Controller";
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
userRouter.post("/api/user/vendors",Controller.listVendors) 
userRouter.get("/api/user/services",Controller.listServices) 
userRouter.get("/api/user/vendorProfile/:vendorId", Controller.getVendorProfile);
userRouter.post("/api/user/addRequest", Controller.addRequest);
userRouter.get("/api/user/request/:userId", Controller.listRequest);
userRouter.post("/api/user/cancelRequest", Controller.cancelRequest);
userRouter.get("/api/user/fetchVendors/:userId", Controller.fetchVendors);
userRouter.get("/api/user/chatId/:userId/:vendorId",Controller.getChatId);


export default userRouter            