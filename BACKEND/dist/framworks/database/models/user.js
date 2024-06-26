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
    otp: {
        type: String,
    },
    registered: {
        type: Date,
        default: Date.now,
    }
});
exports.Users = (0, mongoose_1.model)("Users", userSchema);
