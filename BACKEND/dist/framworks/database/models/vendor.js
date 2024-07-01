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
        default: "not provided",
    },
    verified: {
        type: Boolean,
        default: false,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    vendor: {
        type: Boolean,
        default: false,
    },
    services: {
        type: String
    },
    otp: {
        type: String,
    },
    profilePicture: {
        type: String,
        default: "not provided"
    },
    registered: {
        type: Date,
        default: Date.now,
    }
});
exports.Vendors = (0, mongoose_1.model)("Vendors", userSchema);
