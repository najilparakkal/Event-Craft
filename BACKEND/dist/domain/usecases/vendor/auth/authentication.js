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
const nodmailer_1 = require("../../../helpers/nodmailer");
const passwordHashing_1 = require("../../../helpers/passwordHashing");
const authRepositories_1 = require("../../../repositories/vendor/authRepositories");
exports.default = {
    signup: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield passwordHashing_1.Encrypt.cryptPassword(data.password + "");
        const register = yield (0, authRepositories_1.RegisterVendor)(data, hashedPassword);
        return register;
    }),
    checkOtp: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, authRepositories_1.checkOtp)(data);
        return response;
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
            const response = yield (0, authRepositories_1.logingVendor)(email, password);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    checkEmail: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, authRepositories_1.checkingEmail)(data.email);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    checkFotp: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, authRepositories_1.checkingOtp)(data.email, data.otp);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    updatePassword: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hashedPassword = yield passwordHashing_1.Encrypt.cryptPassword(data.password);
            const update = yield (0, authRepositories_1.updatePassword)(hashedPassword, data.email);
            return update;
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
            const response = yield (0, authRepositories_1.logingVendor)(email, password);
            console.log(response);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
};
