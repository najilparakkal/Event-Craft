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
exports.logingUser = exports.updateOtp = exports.validOtp = exports.createUser = void 0;
const user_1 = require("../../framworks/database/models/user");
const checkingUser_1 = require("../helpers/checkingUser");
const nodmailer_1 = require("../helpers/nodmailer");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtGenarate_1 = require("../helpers/jwtGenarate");
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
                otp: {
                    value: otp,
                },
            });
            const userEmail = newUser.email;
            return { checkResponse, userEmail };
        }
    }
    catch (err) {
        console.error("An error occurred while creating the user:", err);
        return { success: false, message: "An error occurred" };
    }
});
exports.createUser = createUser;
const validOtp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_1.Users.findOne({ email: data.userEmail });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        if (((_a = user.otp) === null || _a === void 0 ? void 0 : _a.value) === data.otp) {
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
const updateOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.Users.findOneAndUpdate({ email: email }, {
            $set: {
                "otp.value": otp,
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
        const user = yield user_1.Users.findOne({ email });
        if (!user) {
            console.log('User not found');
            return null;
        }
        console.log(user, "user");
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (isMatch) {
            const token = yield (0, jwtGenarate_1.CreateToken)({ id: user._id, email: user.email }, true);
            return token;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error('Error logging in user:', error);
        return null;
    }
});
exports.logingUser = logingUser;
