import  express  from "express";
const vendorRouter = express.Router()
import authController from "../../adaptors/vendorController/authController";
import Controller from "../../adaptors/vendorController/Controller";


vendorRouter.post("/api/vendor/signup",authController.signUp)
vendorRouter.post("/api/vendor/otp",authController.verifyOtp)
vendorRouter.post("/api/vendor/resendOtp",authController.resendOtp)
vendorRouter.post("/api/vendor/login",authController.login)
vendorRouter.put("/api/vendor/validEmail",authController.verifyEmail)
vendorRouter.post("/api/vendor/verifyFotp",authController.verifyFotp)
vendorRouter.put("/api/vendor/forgotPassword",authController.updatePassword)
vendorRouter.post("/api/vendor/googlesignup",authController.googleRegistration)
vendorRouter.post("/api/vendor/googleLogin",authController.googleLogin)
vendorRouter.put("/api/vendor/addRequest",Controller.request)
vendorRouter.get("/api/vendor/getCategories",Controller.getCategories)
vendorRouter.post("/api/vendor/uploadPost/:id",Controller.uploadPost)
vendorRouter.get("/api/vendor/requsts/:vendorId",Controller.listRequests)   
vendorRouter.post("/api/vendor/acceptRequest",Controller.acceptRequest)   
vendorRouter.delete("/api/vendor/removeRequest",Controller.rejectRequest)   
vendorRouter.get("/api/vendor/fetchUsers/:vendorId",Controller.fetchUsers)   
vendorRouter.get("/api/vendor/getMessages/:chatId",Controller.messages)   
vendorRouter.get("/api/vendor/chatId/:userId/:vendorId",Controller.chatId)   

export default vendorRouter