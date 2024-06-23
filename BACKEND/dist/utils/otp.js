"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const util_functions_nodejs_1 = require("util-functions-nodejs");
const generateOTP = () => (0, util_functions_nodejs_1.generateOtp)(4).toString();
exports.generateOTP = generateOTP;
