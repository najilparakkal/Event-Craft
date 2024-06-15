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
const authentication_1 = __importDefault(require("../domain/usecases//auth/authentication"));
exports.default = {
    userRegistration: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield authentication_1.default.registerUser(req.body);
            if (user.success === false) {
                res
                    .status(201)
                    .json({ status: 201, message: "user is already registered", user });
            }
            else {
                if (user) {
                    res.status(200).json({
                        status: 200,
                        message: "User registered successfully",
                        user,
                    });
                }
                else {
                    res.status(400).json({ message: "User registration failed" });
                }
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
            next(error);
        }
    }),
    otpVerification: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkOtp = yield authentication_1.default.otpVerification(req.body);
            if (checkOtp.success === true) {
                res.status(200).json({ status: 200, message: "user otp verified" });
            }
            else if (checkOtp.success === false) {
                res.status(201).json({ status: 201, message: "user  otp denied" });
            }
            else {
                res.status(400).json({ message: "otp verification failed" });
            }
        }
        catch (error) { }
    }),
    forgototpVerification: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkOtp = yield authentication_1.default.forgotOtpVerification(req.body);
            if (checkOtp.success === true) {
                res.status(200).json({ status: 200, message: "user otp verified" });
            }
            else if (checkOtp.success === false) {
                res.status(201).json({ status: 201, message: "user  otp denied" });
            }
            else {
                res.status(400).json({ message: "otp verification failed" });
            }
        }
        catch (error) { }
    }),
    resendOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const resendOtp = yield authentication_1.default.resend(req.body);
            if (resendOtp) {
                res.status(200).json({ status: 200, message: "otp resend" });
            }
        }
        catch (error) { }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            console.log(email, password);
            const response = yield authentication_1.default.login(req.body);
            console.log(response);
            if (response.token && response.userDetails) {
                res
                    .status(200)
                    .json({ status: 200, message: "User is valid", response });
            }
            else {
                res.status(201).json({ status: 201, message: "User is not valid" });
            }
        }
        catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ status: 500, message: "Internal server error" });
        }
    }),
    checkEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield authentication_1.default.checkEmail(req.body);
            if (response.success) {
                res.status(200).json({ status: 200, message: "User Founded" });
            }
            else {
                res.status(201).json({ status: 201, message: "User not Found" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    change: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const response = yield authentication_1.default.changePass(req.body);
            if (response) {
                res.status(200).json({ status: 200, message: "password updated" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
};
