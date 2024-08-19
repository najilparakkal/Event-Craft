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
            const response = yield request_1.default.rejectRequest(req.params.roomId);
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
    }),
    getBookings: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.getBookings(req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    cancelBooking: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.cancelBooking(req.params.bookingId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    acceptBooking: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.acceptBooking(req.params.bookingId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.getProfile(req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { files, fields } = yield (0, formidable_1.multipartFormSubmission)(req);
            const response = yield request_1.default.updateProfile(req.params.vendorId, fields, files);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getDates: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.getDates(req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateDates: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.updateDates(req.params.vendorId, req.body.dates);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateBooking: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield request_1.default.updateBooking(req.params.bookingId, req.body.status);
            res.status(200);
        }
        catch (error) {
            console.log(error);
        }
    }),
    billing: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { datas, bookingId, totalAmount } = req.body;
            const response = yield request_1.default.billing(datas, bookingId, totalAmount);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(201).json({ status: 200, message: "Billed successfully" });
            }
            else {
                res.status(203).json({ staus: 203, message: "Failed to process" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    notification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.notification(req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    room: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.room(req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    review: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.review(req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    wallet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.wallet(req.params.vendorId);
            res.status(200).json(response === null || response === void 0 ? void 0 : response.wallet);
        }
        catch (error) {
            console.log(error);
        }
    }),
    enquerys: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.enquerys(req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    readEnquery: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.readEnquery(req.params.enqueryId, req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    count: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.counts();
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    postData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.postData(req.params.postId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    deletePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request_1.default.deletePost(req.params.postId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    })
};
