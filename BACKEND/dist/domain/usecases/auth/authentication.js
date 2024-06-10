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
const userRepo_1 = require("../../repostitories/userRepo");
const passwordHashing_1 = require("../../helpers/passwordHashing");
exports.default = {
    registerUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!userData.password) {
                throw new Error("Password is required");
            }
            const hashedPassword = yield passwordHashing_1.Encrypt.cryptPassword(userData.password);
            const savedUser = yield (0, userRepo_1.createUser)(userData, hashedPassword);
            console.log("new user ✅", savedUser);
            return savedUser;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }),
};
