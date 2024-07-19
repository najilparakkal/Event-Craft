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
        try {
            const response = yield requestRepo_1.default.fetchUsers(vendorId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
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
            const response = yield requestRepo_1.default.getProfile(vendorId);
            const datas = {
                vendorName: response === null || response === void 0 ? void 0 : response.vendorName,
                email: response === null || response === void 0 ? void 0 : response.email,
                phoneNum: response === null || response === void 0 ? void 0 : response.phoneNum,
                profilePicture: response === null || response === void 0 ? void 0 : response.profilePicture,
                coverPicture: response === null || response === void 0 ? void 0 : response.coverPicture,
                verified: response === null || response === void 0 ? void 0 : response.verified,
                blocked: response === null || response === void 0 ? void 0 : response.blocked,
                posts: response === null || response === void 0 ? void 0 : response.posts,
                licence: response === null || response === void 0 ? void 0 : response.licence,
                registered: response === null || response === void 0 ? void 0 : response.registered
            };
            return datas;
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateProfile: (userId_1, _a, files_1) => __awaiter(void 0, [userId_1, _a, files_1], void 0, function* (userId, { phoneNum, name }, files) {
        try {
            const datas = {
                phoneNum: phoneNum[0],
                name: name[0],
            };
            const response = yield requestRepo_1.default.updateVendor(userId, datas, files);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    })
};
