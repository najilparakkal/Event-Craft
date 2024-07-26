"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendorRouter = express_1.default.Router();
const authController_1 = __importDefault(require("../../adaptors/vendorController/authController"));
const Controller_1 = __importDefault(require("../../adaptors/vendorController/Controller"));
const VendorMiddleware_1 = __importDefault(require("../middlewares/VendorMiddleware"));
vendorRouter.post("/api/vendor/signup", authController_1.default.signUp);
vendorRouter.post("/api/vendor/otp", authController_1.default.verifyOtp);
vendorRouter.post("/api/vendor/resendOtp", authController_1.default.resendOtp);
vendorRouter.post("/api/vendor/login", authController_1.default.login);
vendorRouter.put("/api/vendor/validEmail", authController_1.default.verifyEmail);
vendorRouter.post("/api/vendor/verifyFotp", authController_1.default.verifyFotp);
vendorRouter.put("/api/vendor/forgotPassword", authController_1.default.updatePassword);
vendorRouter.post("/api/vendor/googlesignup", authController_1.default.googleRegistration);
vendorRouter.post("/api/vendor/googleLogin", authController_1.default.googleLogin);
vendorRouter.put("/api/vendor/addRequest", Controller_1.default.request);
vendorRouter.get("/api/vendor/getCategories", Controller_1.default.getCategories);
vendorRouter.post("/api/vendor/uploadPost/:id", VendorMiddleware_1.default, Controller_1.default.uploadPost);
vendorRouter.get("/api/vendor/requsts/:vendorId", VendorMiddleware_1.default, Controller_1.default.listRequests);
vendorRouter.post("/api/vendor/acceptRequest", VendorMiddleware_1.default, Controller_1.default.acceptRequest);
vendorRouter.delete("/api/vendor/removeRequest/:roomId", VendorMiddleware_1.default, Controller_1.default.rejectRequest);
vendorRouter.get("/api/vendor/fetchUsers/:vendorId", VendorMiddleware_1.default, Controller_1.default.fetchUsers);
vendorRouter.get("/api/vendor/getMessages/:chatId", VendorMiddleware_1.default, Controller_1.default.messages);
vendorRouter.get("/api/vendor/chatId/:userId/:vendorId", VendorMiddleware_1.default, Controller_1.default.chatId);
vendorRouter.get("/api/vendor/bookings/:vendorId", VendorMiddleware_1.default, Controller_1.default.getBookings);
vendorRouter.delete("/api/vendor/cancelBooking/:bookingId", VendorMiddleware_1.default, Controller_1.default.cancelBooking);
vendorRouter.patch("/api/vendor/acceptBooking/:bookingId", VendorMiddleware_1.default, Controller_1.default.acceptBooking);
vendorRouter.get("/api/vendor/profile/:vendorId", VendorMiddleware_1.default, Controller_1.default.getProfile);
vendorRouter.put("/api/vendor/updateProfile/:vendorId", VendorMiddleware_1.default, Controller_1.default.updateProfile);
vendorRouter.get('/api/vendor/absentDates/:vendorId', VendorMiddleware_1.default, Controller_1.default.getDates);
vendorRouter.patch('/api/vendor/updateDates/:vendorId', VendorMiddleware_1.default, Controller_1.default.updateDates);
exports.default = vendorRouter;
