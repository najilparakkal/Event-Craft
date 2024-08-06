import express from "express";
import authController from "../../adaptors/userController/authController";
import Controller from "../../adaptors/userController/Controller";
import userAuth from "../middlewares/UserMiddleware";
const userRouter = express.Router();

userRouter.get("/api/user/OterServices",Controller.listAll) 
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
userRouter.post("/api/user/vendors",userAuth,Controller.listVendors) 
userRouter.get("/api/user/services",userAuth,Controller.listServices) 
userRouter.get("/api/user/vendorProfile/:vendorId",userAuth, Controller.getVendorProfile);
userRouter.post("/api/user/addRequest", userAuth,Controller.addRequest);
userRouter.get("/api/user/request/:userId", userAuth,Controller.listRequest);
userRouter.post("/api/user/cancelRequest",userAuth, Controller.cancelRequest);
userRouter.get("/api/user/fetchVendors/:userId",userAuth, Controller.fetchVendors);
userRouter.get("/api/user/chatId/:userId/:vendorId",userAuth,Controller.getChatId);
userRouter.post("/api/user/addBooking",userAuth, Controller.addBooking); 
userRouter.get("/api/user/bookings/:userId",userAuth, Controller.getBooking);
userRouter.post("/api/user/cancelBooking",userAuth,Controller.cancelBooking)
userRouter.get('/api/user/profile/:userId',userAuth,Controller.getProfile)
userRouter.put('/api/user/updateProfile/:userId',userAuth,Controller.updateProfile)
userRouter.get('/api/user/vendorDates/:vendorId',userAuth,Controller.getDates)
userRouter.get('/api/user/posts/:userId',userAuth,Controller.getPosts)
userRouter.put('/api/user/updateLike/:userId/:postId',userAuth,Controller.updateLike)
userRouter.post('/api/user/comments',userAuth,Controller.getComments)
userRouter.post('/api/user/newComment/:postId/:userId',userAuth,Controller.newComment)
userRouter.post('/api/user/commentReply/:commentId',userAuth,Controller.replyComment)
userRouter.put('/api/user/commentLike',userAuth,Controller.commentLike)
userRouter.put('/api/user/replyLike',userAuth,Controller.replyLike)
userRouter.get('/api/user/ratingreview/:vendorId',userAuth,Controller.ratingReview)
userRouter.put('/api/user/addReview/:userId/:vendorId',userAuth,Controller.addReview)
userRouter.put('/api/user/vendorLike/:userId/:vendorId',userAuth,Controller.vendorLike)
userRouter.get('/api/user/likedPosts/:userId',userAuth,Controller.likedPosts)
userRouter.get('/api/user/likedVendors/:userId',userAuth,Controller.likedVendors)
userRouter.get('/api/user/userBooked/:userId',userAuth,Controller.userBooked)
userRouter.get('/api/user/requestcheck/:userId/:vendorId',userAuth,Controller.requestcheck)
userRouter.post('/api/user/submitReport/:userId/:vendorId',userAuth,Controller.submitReport)
userRouter.get('/api/user/notifications/:vendorId',userAuth,Controller.notification)
userRouter.get("/api/user/roomIds/:userId",userAuth,Controller.roomIds)
export default userRouter                   