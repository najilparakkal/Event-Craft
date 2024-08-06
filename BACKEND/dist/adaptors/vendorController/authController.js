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
const authentication_1 = __importDefault(require("../../domain/usecases/vendor/auth/authentication"));
exports.default = {
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield authentication_1.default.signup(req.body);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res
                    .status(200)
                    .json({
                    status: 200,
                    message: "Vendor registered successfully",
                    response,
                });
            }
            else if ((response === null || response === void 0 ? void 0 : response.success) === false) {
                res
                    .status(201)
                    .json({
                    status: 201,
                    message: "Account already registered",
                    response,
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    verifyOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield authentication_1.default.checkOtp(req.body);
            if ((response === null || response === void 0 ? void 0 : response.success) === true) {
                res
                    .status(200)
                    .json({
                    status: 200,
                    message: "OTP verified successfully",
                    response,
                });
            }
            else if ((response === null || response === void 0 ? void 0 : response.success) === false) {
                res.status(201).json({ status: 201, message: "OTP failed", response });
            }
            else {
                res
                    .status(400)
                    .json({ status: 400, message: "OTP verification failed", response });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    resendOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const resendOtp = yield authentication_1.default.resend(req.body);
            if (resendOtp) {
                res.status(200).json({ status: 200, message: "OTP resent" });
            }
            else {
                res.status(400).json({ message: "Failed to resend OTP" });
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield authentication_1.default.login(req.body);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json({ status: 200, message: "vendor logged in successfully", response });
            }
            else if ((response === null || response === void 0 ? void 0 : response.success) === false && (response === null || response === void 0 ? void 0 : response.message) === "dose not exist") {
                res.status(201).json({ status: 201, message: response.message });
            }
            else if ((response === null || response === void 0 ? void 0 : response.success) === false && (response === null || response === void 0 ? void 0 : response.message) === "Vendor is blocked") {
                res.status(203).json({ status: 203, message: response.message });
            }
            else if ((response === null || response === void 0 ? void 0 : response.success) === false) {
                res.status(202).json({ status: 202, message: response.message });
            }
            else {
                res.status(400).json({ status: 400, message: "vendor login failed" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    verifyEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield authentication_1.default.checkEmail(req.body);
            if (response) {
                res.status(200).json({ status: 200, message: "email verified" });
            }
            else {
                res.status(201).json({ status: 201, message: "email not verified" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    verifyFotp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield authentication_1.default.checkFotp(req.body);
            if (response) {
                res.status(200).json({ status: 200, message: "otp verified" });
            }
            else {
                res.status(201).json({ status: 201, message: "otp not verified" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    updatePassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield authentication_1.default.updatePassword(req.body);
            if (response === null || response === void 0 ? void 0 : response.seccess) {
                res.status(200).json({ status: 200, message: "password updated" });
            }
            else {
                res.status(201).json({ status: 201, message: "password not updated" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    googleRegistration: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield authentication_1.default.googleRegistration(req.body);
            if (response.success) {
                res.status(200).json({ status: 200, message: "vendor registered successfully", response });
            }
            else {
                res.status(201).json({ status: 201, message: "vendor already Registered", response });
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }),
    googleLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield authentication_1.default.googleLogin(req.body);
            if (response && response.token && response.vendorDetails) {
                res.status(200).json({ status: 200, message: "vendor is valid", response });
            }
            else {
                res.status(201).json({ status: 201, message: "vendor is not valid" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
};
