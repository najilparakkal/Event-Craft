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
const authentication_1 = __importDefault(require("../domain/usecases//auth/authentication"));
exports.default = {
    userRegistration: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { name, email, password } = req.body;
            console.log(name, email, password, "😂😂😂😂😂");
            const user = yield authentication_1.default.registerUser(req.body);
            if (user) {
                res
                    .status(200)
                    .json({ message: "User registered successfully", user });
            }
            else {
                res.status(400).json({ message: "User registration failed" });
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(400).json({ error: error.message });
            next(error);
        }
    })
};
