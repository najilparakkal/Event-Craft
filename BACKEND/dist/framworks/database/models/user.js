"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
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
        default: "1234567890"
    },
    verified: {
        type: Boolean,
        default: false,
    },
    otp: {
        value: {
            type: String,
        }
    },
});
exports.Users = (0, mongoose_1.model)("Users", userSchema);
