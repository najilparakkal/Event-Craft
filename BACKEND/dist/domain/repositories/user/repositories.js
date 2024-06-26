"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterWithGoogle = exports.updatePassword = exports.validOtpF = exports.varifyEmail = exports.logingUser = exports.updateOtp = exports.forgotValidOtp = exports.validOtp = exports.createUser = void 0;
const user_1 = require("../../../framworks/database/models/user");
const checkingUser_1 = require("../../helpers/checkingUser");
const nodmailer_1 = require("../../helpers/nodmailer");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtGenarate_1 = require("../../helpers/jwtGenarate");
const createUser = (userData, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userData.email ||
            !userData.name ||
            !userData.password ||
            !userData.phoneNum) {
            throw new Error("Required fields are missing");
        }
        const checkResponse = yield (0, checkingUser_1.checkingUser)(userData);
        if (checkResponse.success === false) {
            return checkResponse;
        }
        else if (checkResponse.success === true) {
            const otp = (0, nodmailer_1.sendOTP)(userData.email);
            const newUser = yield user_1.Users.create({
                userName: userData.name,
                email: userData.email,
                password: hashedPassword,
                phoneNum: userData.phoneNum,
                otp: otp,
            });
            const token = yield (0, jwtGenarate_1.CreateToken)({ id: newUser._id, email: newUser.email }, true);
            const userDatas = {
                id: newUser._id,
                email: newUser.email,
                phoneNum: newUser.phoneNum,
                name: newUser.userName,
            };
            return { checkResponse, userDatas, token };
        }
    }
    catch (err) {
        console.error("An error occurred while creating the user:", err);
        return { success: false, message: "An error occurred" };
    }
});
exports.createUser = createUser;
const validOtp = (data, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.Users.findOneAndUpdate({ email: email }, { $set: { verified: true } });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        if (user.otp + "" === data.otp) {
            return { success: true, message: "OTP verified successfully" };
        }
        else {
            return { success: false, message: "Invalid OTP" };
        }
    }
    catch (error) {
        console.error("An error occurred during OTP verification:", error);
        return { success: false, message: "An error occurred" };
    }
});
exports.validOtp = validOtp;
const forgotValidOtp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.Users.findOne({ email: data.email });
        if (!user)
            return { success: false, message: "User not found" };
        if (user.otp + "" === data.otp) {
            return { success: true, message: "OTP verified successfully" };
        }
        else {
            return { success: false, message: "Invalid OTP" };
        }
    }
    catch (error) {
        console.error("An error occurred during OTP verification:", error);
        return { success: false, message: "An error occurred" };
    }
});
exports.forgotValidOtp = forgotValidOtp;
const updateOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.Users.findOneAndUpdate({ email: email }, {
            $set: {
                "otp": otp,
            },
        }, { new: true });
        if (result) {
            console.log("OTP updated successfully for email:", email);
            return true;
        }
        else {
            console.log("No user found with email:", email);
            return false;
        }
    }
    catch (error) {
        console.error("Error updating OTP:", error);
        return false;
    }
});
exports.updateOtp = updateOtp;
const logingUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.Users.findOne({ email: email, verified: true });
        if (!user) {
            console.log("User not found");
            return false;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (isMatch) {
            const userDetails = {
                email: user.email,
                phoneNum: user.phoneNum,
                userName: user.userName,
                id: user._id,
            };
            const token = yield (0, jwtGenarate_1.CreateToken)({ id: user._id, email: user.email }, true);
            return { token, userDetails };
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error("Error logging in user:", error);
        return null;
    }
});
exports.logingUser = logingUser;
const varifyEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.Users.findOne({ email: email });
        if (user) {
            const otpValue = (0, nodmailer_1.sendOTP)(user.email);
            yield user_1.Users.findOneAndUpdate({ email: email }, { $set: { otp: otpValue } }, { new: true });
            return { success: true, message: "User found" };
        }
        else {
            return { success: false, message: "User not found" };
        }
    }
    catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Error occurred during email verification",
        };
    }
});
exports.varifyEmail = varifyEmail;
const validOtpF = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.Users.findOne({ email: data.email });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        if (user.otp + "" === data.otp) {
            return { success: true, message: "OTP verified successfully" };
        }
        else {
            return { success: false, message: "Invalid OTP" };
        }
    }
    catch (error) {
        console.error("An error occurred during OTP verification:", error);
        return { success: false, message: "An error occurred" };
    }
});
exports.validOtpF = validOtpF;
const updatePassword = (userEmail, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.Users.findOneAndUpdate({ email: userEmail }, { $set: { password: hashedPassword } });
        if (user) {
            return { success: true, message: "password updated" };
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatePassword = updatePassword;
const RegisterWithGoogle = (userData, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alreadyRegistered = yield user_1.Users.findOne({ email: userData.email });
        if (alreadyRegistered) {
            return { success: false, message: "User already registered" };
        }
        else {
            const newUser = yield user_1.Users.create({
                userName: userData.name,
                email: userData.email,
                password: hashedPassword,
            });
            const userDatas = {
                id: newUser._id + "",
                email: newUser.email,
                phoneNum: newUser.phoneNum,
                name: newUser.userName,
            };
            const token = yield (0, jwtGenarate_1.CreateToken)({ id: newUser._id, email: newUser.email }, true);
            return {
                success: true,
                message: "User registered successfully",
                token,
                userDatas,
            };
        }
    }
    catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred during registration" };
    }
});
exports.RegisterWithGoogle = RegisterWithGoogle;
