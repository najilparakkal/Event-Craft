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
const formidable_1 = require("../../domain/helpers/formidable");
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
    }),
    addCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { files, fields } = yield (0, formidable_1.multipartFormSubmission)(req);
            const name = (_a = fields === null || fields === void 0 ? void 0 : fields.category) === null || _a === void 0 ? void 0 : _a[0];
            const image = (_b = files === null || files === void 0 ? void 0 : files.image) === null || _b === void 0 ? void 0 : _b[0];
            const response = yield dashboard_1.default.addCategory({ name, image });
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json({
                    status: 200,
                    message: "category added successfully",
                    response,
                });
            }
            else {
                res.status(201).json({
                    status: 201,
                    message: "category already exists",
                    response: "",
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categories = yield dashboard_1.default.getCategory();
            res.status(200).json({ categories });
        }
        catch (error) {
            console.error("Error fetching categories:", error);
            res
                .status(500)
                .json({ success: false, message: "Failed to fetch categories" });
        }
    }),
    removeCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield dashboard_1.default.removeCategory(req.body.data);
            if (response.success) {
                res.status(200).json({ response });
            }
            else {
                res.status(404).json({ response });
            }
        }
        catch (error) {
            console.error("Error in dashboardController.removeCategory:", error);
            res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    }),
    listRequest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield dashboard_1.default.listRequest();
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    reject: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield dashboard_1.default.rejectVendor(req.body);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json(response);
            }
            else {
                res.status(400).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    accept: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield dashboard_1.default.acceptVendor(req.body.dataa);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json(response);
            }
            else {
                res.status(400).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    })
};
