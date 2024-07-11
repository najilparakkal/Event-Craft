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
Object.defineProperty(exports, "__esModule", { value: true });
const homeRepo_1 = require("../../../repositories/user/homeRepo");
exports.default = {
    listVendors: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, homeRepo_1.listVendors)(data);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    listServices: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, homeRepo_1.listServices)();
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getVendorProfile: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, homeRepo_1.getVendorProfile)(data);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    addRequest: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, homeRepo_1.addRequest)(data.userId + "", data.message + "", data.vendorId + "");
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    listRequest: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, homeRepo_1.listRequest)(userId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    cancelRequest: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, homeRepo_1.cancelRequest)(data.chatId + "");
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    fetchVendors: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, homeRepo_1.listVendorsInUserChat)(data);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getChatId: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, homeRepo_1.chatId)(data.userId, data.vendorId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    })
};
