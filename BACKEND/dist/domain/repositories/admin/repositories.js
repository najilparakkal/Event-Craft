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
exports.logingadmin = void 0;
const admin_1 = require("../../../framworks/database/models/admin");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtGenarate_1 = require("../../helpers/jwtGenarate");
const logingadmin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.Admins.findOne({ email });
        if (!admin) {
            console.log("admin not found");
            return { success: false };
        }
        const isMatch = yield bcrypt_1.default.compare(password, admin.password + "");
        if (isMatch) {
            const { accessToken } = yield (0, jwtGenarate_1.CreateToken)({
                id: admin._id + "",
                email: admin.email,
                isAdmin: true
            });
            return { success: true, accessToken };
        }
        else {
            return { success: false };
        }
    }
    catch (error) {
        console.error("Error logging in admin:", error);
        return null;
    }
});
exports.logingadmin = logingadmin;
