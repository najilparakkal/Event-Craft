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
const home_1 = __importDefault(require("../../domain/usecases/user/home/home"));
const formidable_1 = require("../../domain/helpers/formidable");
exports.default = {
    listVendors: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.listVendors(req.body.data);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    listAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.listAll();
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    listServices: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.listServices();
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getVendorProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.getVendorProfile(req.params.vendorId, req.query.userId + "");
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    addRequest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.addRequest(req.body);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json({ message: "Request sent successfully" });
            }
            else {
                res.status(201).json({ message: "already connected" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    listRequest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.listRequest(req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    cancelRequest: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield home_1.default.cancelRequest(req.body);
            res.status(200).json({ message: "Request cancelled successfully" });
        }
        catch (error) {
            console.log(error);
        }
    }),
    // fetchVendors: async (req: Request, res: Response) => {
    //   try {
    //     const response = await userIterator.fetchVendors(req.params.userId);
    //     res.status(200).json(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    getChatId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.getChatId(req.params);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    addBooking: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.addBookind(req.body);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json({ message: "Booking added successfully" });
            }
            else {
                res.status(400).json({
                    response,
                    message: "Somthing could not be added successfully",
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getBooking: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.getBookings(req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    cancelBooking: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.cancelBooking(req.body.percentage, req.body.bookingId);
            res.status(200).send(response);
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }),
    getProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.getProfile(req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { files, fields } = yield (0, formidable_1.multipartFormSubmission)(req);
            const response = yield home_1.default.updateProfile(req.params.userId, fields, files);
            res.status(200).json(response);
        }
        catch (err) {
            console.log(err);
        }
    }),
    getDates: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.getDates(req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getPosts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.getPosts(req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateLike: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield home_1.default.updteLike(req.params.userId, req.params.postId);
            res.status(200);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getComments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.getComments(req.body.postId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    newComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield home_1.default.newComment(req.params.userId, req.params.postId, req.body.newComment);
            res.status(200).json({ message: "comment added successfully" });
        }
        catch (error) {
            console.log(error);
        }
    }),
    replyComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield home_1.default.newReply(req.params.commentId, req.body.reply);
            res.status(200).json({ message: "reply added successfully" });
        }
        catch (error) {
            console.log(error);
        }
    }),
    commentLike: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield home_1.default.commentLike(req.body.commentId, req.body.userId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    replyLike: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield home_1.default.replyLike(req.body.commentId, req.body.userId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    ratingReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.ratingReview(req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    addReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.addReview(req.params.userId, req.params.vendorId, req.body.star, req.body.review);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json({ message: "Review added successfully" });
            }
            else {
                res.status(400).json({ message: "Something went wrong" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    vendorLike: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield home_1.default.vendorLike(req.params.userId, req.params.vendorId);
            res.status(200).json({ message: "Vendor like added successfully" });
        }
        catch (error) {
            console.log(error);
        }
    }),
    likedPosts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.likedPosts(req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    likedVendors: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.likedVendors(req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    userBooked: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.userBooked(req.params.userId);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json({ message: "user booked" });
            }
            else {
                res.status(201).json({ message: "user not booked the vendor" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    requestcheck: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reponse = yield home_1.default.requestcheck(req.params.userId, req.params.vendorId);
            if (reponse === null || reponse === void 0 ? void 0 : reponse.success) {
                res.status(200).json({ message: "request accepted" });
            }
            else {
                res.status(201).json({ message: "request not accepted" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    submitReport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.submitReport(req.params.userId, req.params.vendorId, req.body.boxReason, req.body.reason);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json({ message: "report submitted successfully" });
            }
            else {
                res.status(201).json({ message: "report not submitted" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    notification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.notification(req.params.vendorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    roomIds: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.roomIds(req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    userBills: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.userBills(req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    billPay: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.billPay(req.params.billingId, req.body.amount);
            if (response === null || response === void 0 ? void 0 : response.success) {
                res.status(200).json({ message: "User Payed The Bill" });
            }
            else {
                res.status(400).json({ message: "User failed to pay the bill" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    paidBills: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield home_1.default.paidBills(req.params.userId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    })
};
