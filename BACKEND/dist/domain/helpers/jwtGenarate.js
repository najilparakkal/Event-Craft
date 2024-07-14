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
exports.VerifyRefreshToken = exports.VerifyToken = exports.CreateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = __importDefault(require("../../config/jwt"));
const CreateToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = jsonwebtoken_1.default.sign(payload, jwt_1.default.secret, { expiresIn: "1m" });
    const refreshTokenPayload = { id: payload.id };
    const refreshToken = jsonwebtoken_1.default.sign(refreshTokenPayload, jwt_1.default.refreshSecret, {
        expiresIn: "7d",
    });
    return { accessToken, refreshToken };
});
exports.CreateToken = CreateToken;
// console.log(CreateToken({email:"najil@gmail.com",id:"66823aad3181360801bb882f"}));
const VerifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, jwt_1.default.secret, (err, decoded) => {
            if (err) {
                const jwtPayload = jsonwebtoken_1.default.decode(token, { complete: true });
                return reject({ err, payload: jwtPayload === null || jwtPayload === void 0 ? void 0 : jwtPayload.payload });
            }
            resolve(decoded);
        });
    });
};
exports.VerifyToken = VerifyToken;
const VerifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, jwt_1.default.refreshSecret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};
exports.VerifyRefreshToken = VerifyRefreshToken;
