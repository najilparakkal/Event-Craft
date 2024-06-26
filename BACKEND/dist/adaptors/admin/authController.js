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
const authentication_1 = __importDefault(require("../../domain/usecases/adimin/auth/authentication"));
exports.default = {
    adminChecking: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield authentication_1.default.login(req.body);
            if (response) {
                res.status(200).json({ status: 200, message: "admin is valid", response });
            }
            else {
                res.status(201).json({ status: 201, message: "admin is not valid" });
            }
        }
        catch (error) {
            console.error("Login error:", error.message);
            res.status(500).json({ status: 500, message: "Internal server error" });
            next(error);
        }
    }),
};
