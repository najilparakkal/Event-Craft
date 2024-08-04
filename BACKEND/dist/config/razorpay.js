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
const Razorpay_1 = __importDefault(require("Razorpay"));
const razorpay = new Razorpay_1.default({
    key_id: process.env.REZORPAY_KEYID || "",
    key_secret: process.env.REZORPAY_SECRET_KEY || "",
});
const refund = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId, amount } = req.body;
    try {
        const payment = yield razorpay.payments.fetch(paymentId);
        console.log("Payment details:", payment);
        if (payment.status !== "captured") {
            const captureResponse = yield razorpay.payments.capture(paymentId, payment.amount, "INR");
            console.log("Capture response:", captureResponse);
            const refundResponse = yield razorpay.payments.refund(payment.id, {
                amount: payment.amount,
                speed: "normal"
            });
            console.log("Refund response:", refundResponse);
            next();
        }
        else {
            const refundResponse = yield razorpay.payments.refund(paymentId, {
                amount: payment.amount,
                speed: "normal"
            });
            console.log("Refund response:", refundResponse);
            res.status(200).json(refundResponse);
        }
    }
    catch (error) {
        console.error("Refund failed:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.default = refund;
