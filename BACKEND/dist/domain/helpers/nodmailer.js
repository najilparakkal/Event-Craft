"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const otp_1 = require("../../utils/otp");
dotenv_1.default.config();
// Nodemailer transporter setup
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendOTPByEmail = (email, otp, req) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP for verification",
        text: `Your OTP is ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        }
        else {
            console.log("Email sent:", info.response);
        }
    });
};
const sendOTP = (email) => {
    const otp = (0, otp_1.generateOTP)();
    sendOTPByEmail(email, otp);
    console.log("OTP SENT", otp, email);
    return otp;
};
exports.sendOTP = sendOTP;
