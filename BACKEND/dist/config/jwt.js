"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = {
    exp: process.env.EXPIRY || "1d",
    remember: process.env.REMEMBER || "7d",
    secret: process.env.JWT_SECRET || "",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "your_refresh_secret",
    refreshExp: process.env.REMEMBER || "7d",
};
exports.default = JWT;
