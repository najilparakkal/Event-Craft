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
exports.checkingUser = void 0;
const user_1 = require("../../framworks/database/models/user");
const checkingUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userWithEmail = yield user_1.Users.findOne({ email: data.email });
        const userWithPhoneNum = yield user_1.Users.findOne({ phoneNum: data.phoneNum });
        if (userWithEmail) {
            return { success: false, message: "Email already exists" };
        }
        if (userWithPhoneNum) {
            return { success: false, message: "Phone number already exists" };
        }
        return { success: true };
    }
    catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while checking user data" };
    }
});
exports.checkingUser = checkingUser;
