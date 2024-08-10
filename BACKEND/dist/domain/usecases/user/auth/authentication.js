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
Object.defineProperty(exports, "__esModule", { value: true });
const passwordHashing_1 = require("../../../helpers/passwordHashing");
const authRepositories_1 = require("../../../repositories/user/authRepositories");
const nodmailer_1 = require("../../../helpers/nodmailer");
exports.default = {
    registerUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!userData.password) {
                throw new Error("Password is required");
            }
            const hashedPassword = yield passwordHashing_1.Encrypt.cryptPassword(userData.password);
            console.log("Password hashed");
            const savedUser = yield (0, authRepositories_1.createUser)(userData, hashedPassword);
            return savedUser;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }),
    otpVerification: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = data.userDetails.email ? data.userDetails.email : data.email;
            const response = yield (0, authRepositories_1.validOtp)(data, email);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    forgotOtpVerification: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, authRepositories_1.forgotValidOtp)(data);
            console.log(response);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    resend: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = data.email;
            const response = (0, nodmailer_1.sendOTP)(email);
            const update = yield (0, authRepositories_1.updateOtp)(email, response);
            return update;
        }
        catch (error) {
            console.log(error);
        }
    }),
    login: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = data.email;
            const password = data.password;
            const response = yield (0, authRepositories_1.logingUser)(email, password);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    checkEmail: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = data.email;
            const response = yield (0, authRepositories_1.varifyEmail)(email);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    changePass: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashedPassword = yield passwordHashing_1.Encrypt.cryptPassword(data.password);
            console.log(data);
            const response = yield (0, authRepositories_1.updatePassword)(data.email, hashedPassword);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    googleRegistration: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashedPassword = yield passwordHashing_1.Encrypt.cryptPassword(data.uid);
            const response = yield (0, authRepositories_1.RegisterWithGoogle)(data, hashedPassword);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    googleLogin: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = data.email;
            const password = data.uid;
            const response = yield (0, authRepositories_1.logingUser)(email, password);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
};
