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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_1 = require("../../framworks/database/models/user");
const checkingUser_1 = require("../helpers/checkingUser");
const nodmailer_1 = require("../helpers/nodmailer");
const createUser = (userData, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userData.email ||
            !userData.name ||
            !userData.password ||
            !userData.phoneNum) {
            throw new Error("Required fields are missing");
        }
        const checkResponse = yield (0, checkingUser_1.checkingUser)(userData);
        if (checkResponse.success === false) {
            return checkResponse;
        }
        else if (checkResponse.success === true) {
            const otp = (0, nodmailer_1.sendOTP)(userData.email);
            const newUser = yield user_1.Users.insertMany([
                {
                    userName: userData.name,
                    email: userData.email,
                    password: hashedPassword,
                    phoneNum: userData.phoneNum,
                    otp: otp
                },
            ]);
            return checkResponse;
        }
    }
    catch (err) {
        console.error("An error occurred while creating the user:", err);
        return { success: false, message: "An error occurred" };
    }
});
exports.createUser = createUser;
