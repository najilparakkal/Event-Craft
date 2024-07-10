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
const post_1 = __importDefault(require("../../domain/usecases/vendor/post/post"));
const request_1 = __importDefault(require("../../domain/usecases/vendor/request/request"));
const formidable_1 = require("../../domain/helpers/formidable");
exports.default = {
    request: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { files, fields } = yield (0, formidable_1.multipartFormSubmission)(req);
            const response = yield request_1.default.request(fields, files);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json({
                    status: 200,
                    message: "Request submitted successfully",
                });
            }
            else {
                res.status(400).json({
                    status: 400,
                    message: "Invalid request",
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield post_1.default.categories();
            res.status(200).json({ status: 200, response });
        }
        catch (error) {
            console.log(error);
        }
    }),
    uploadPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { files, fields } = yield (0, formidable_1.multipartFormSubmission)(req);
            const postDetails = fields;
            yield post_1.default.uploadPost(postDetails, files);
            res.status(200).json({ status: 200 });
        }
        catch (error) {
            console.log(error);
        }
    }),
    listRequests: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.listRequests(req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    acceptRequest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.acceptRequest(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    rejectRequest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.rejectRequest(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    fetchUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.fetchUsers(req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    messages: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.fetchMessages(req.params.chatId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    storeMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.storeMessage(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    chatId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.fetchChatId(req.params.vendorId, req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    })
};
