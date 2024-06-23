"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../adaptors/userController/authController"));
const userRouter = express_1.default.Router();
userRouter.post("/api/user/signup", authController_1.default.userRegistration);
userRouter.post("/api/user/otp", authController_1.default.otpVerification);
userRouter.post("/api/user/Fotp", authController_1.default.forgotOtpVerification);
userRouter.post("/api/user/resendOtp", authController_1.default.resendOtp);
userRouter.post("/api/user/login", authController_1.default.login);
userRouter.post("/api/user/validEmail", authController_1.default.checkEmail);
userRouter.post("/api/user/Fotp", authController_1.default.checkEmail);
userRouter.post("/api/user/changePassword", authController_1.default.change);
userRouter.post("/api/user/googleUser", authController_1.default.googleRegistration);
userRouter.post("/api/user/googleLogin", authController_1.default.googleLogin);
exports.default = userRouter;
