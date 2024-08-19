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
const requestRepo_1 = __importDefault(require("../../../repositories/vendor/requestRepo"));
exports.default = {
    request: (datas, images) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.addRequest(datas, images);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    listRequests: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.listRequestsForVendor(id);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    acceptRequest: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.acceptRequest(data.userId, data.vendorId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    rejectRequest: (roomId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.rejectRequest(roomId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    fetchUsers: (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        // try {
        //   const response = await requestRepo.fetchUsers(vendorId);
        //   return response;
        // } catch (error) {
        //   console.log(error);
        // }
    }),
    fetchMessages: (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.fetchMessages(chatId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    storeMessage: (data) => __awaiter(void 0, void 0, void 0, function* () {
        // try {
        //   const { vendorId, userId, content } =data;
        //   const response = await requestRepo.storeMessage(vendorId, userId, content);
        // } catch (error) {
        //   console.log(error);
        // }
    }),
    fetchChatId: (vendorId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.fetchChatId(vendorId, userId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getBookings: (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.getBookings(vendorId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    cancelBooking: (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.cancelBooking(bookingId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    acceptBooking: (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.acceptBooking(bookingId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getProfile: (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield requestRepo_1.default.getProfile(vendorId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateProfile: (userId, obj, files) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const datas = {
                phoneNum: obj.phoneNum[0],
                name: obj.name[0],
                about: obj.about[0]
            };
            const response = yield requestRepo_1.default.updateVendor(userId, datas, files);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getDates: (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.getDates(vendorId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateDates: (vendorId, dates) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.updateDates(vendorId, dates);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateBooking: (bookingId, status) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.updateBooking(bookingId, status);
        }
        catch (error) {
            console.log(error);
        }
    }),
    billing: (datas, bookingId, totalAmount) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield requestRepo_1.default.billing(datas, bookingId, totalAmount);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    notification: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield requestRepo_1.default.notification(userId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    room: (venorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield requestRepo_1.default.room(venorId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    review: (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield requestRepo_1.default.review(vendorId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    wallet: (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield requestRepo_1.default.wallet(vendorId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    enquerys: (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield requestRepo_1.default.enquerys(vendorId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    readEnquery: (enqId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield requestRepo_1.default.readEnquery(enqId, vendorId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    counts: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield requestRepo_1.default.counts();
        }
        catch (error) {
            console.log(error);
        }
    }),
    postData: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield requestRepo_1.default.postData(postId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    deletePost: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield requestRepo_1.default.deletePost(postId);
        }
        catch (error) {
            console.log(error);
        }
    })
};
