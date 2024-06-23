"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendors = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    vendorName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        minlength: 6,
    },
    phoneNum: {
        type: String,
        default: "1234567890",
    },
    verified: {
        type: Boolean,
        default: false,
    },
    is_blocked: {
        type: Boolean,
        default: false,
    },
    is_vendor: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
});
exports.Vendors = (0, mongoose_1.model)("Vendors", userSchema);
