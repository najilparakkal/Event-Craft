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
exports.adminAuth = exports.refund = void 0;
const Razorpay_1 = __importDefault(require("Razorpay"));
const jwtGenarate_1 = require("../../domain/helpers/jwtGenarate");
const razorpay = new Razorpay_1.default({
    key_id: process.env.REZORPAY_KEYID || "",
    key_secret: process.env.REZORPAY_SECRET_KEY || "",
});
const refund = (paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payment = yield razorpay.payments.fetch(paymentId);
        console.log("Payment details:", payment);
        const captureResponse = yield razorpay.payments.capture(paymentId, payment.amount, "INR");
        console.log("Capture response:", captureResponse);
        const refundResponse = yield razorpay.payments.refund(payment.id, {
            amount: payment.amount,
            speed: "normal",
        });
        if (captureResponse)
            return true;
    }
    catch (error) {
        console.error("Refund failed:", error);
    }
});
exports.refund = refund;
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.adminToken;
        (0, jwtGenarate_1.VerifyToken)(token)
            .then((data) => {
            const currentTime = Math.floor(Date.now() / 1000);
            if (data.exp && data.exp < currentTime)
                return res.status(204).json({ message: "Token has expired." });
            if (!data.isAdmin)
                return res.status(403).json({ message: "Admin access required." });
            next();
        })
            .catch((err) => {
            console.log(err);
            return res.status(204).json({ message: "Token has expired." });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.adminAuth = adminAuth;
