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
const dashboard_1 = __importDefault(require("../../domain/usecases/adimin/dashboard/dashboard"));
exports.default = {
    usersListing: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield dashboard_1.default.listUsers(req.body);
        res.status(200).json(response);
    }),
    vendorsListing: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield dashboard_1.default.listVendors(req.body);
        res.status(200).json(response);
    }),
    blockorUnblock: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield dashboard_1.default.blockorUnblock(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    blockorUnblockUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield dashboard_1.default.blockorUnblockUser(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    })
};
