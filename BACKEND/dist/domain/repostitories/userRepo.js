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
const createUser = (userData, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userData.email || !userData.name || !userData.password) {
            throw new Error("something went wrong");
        }
        const newUser = new user_1.Users({
            userName: userData.name,
            email: userData.email,
            password: hashedPassword,
            phone: userData.phone,
        });
        return yield newUser.save();
    }
    catch (err) {
        throw err;
    }
});
exports.createUser = createUser;
