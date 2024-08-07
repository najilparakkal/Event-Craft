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
const nodmailer_1 = require("../../../helpers/nodmailer");
const dashRepositories_1 = __importDefault(require("../../../repositories/admin/dashRepositories"));
exports.default = {
    listUsers: (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(data);
        const response = yield dashRepositories_1.default.listUsers(data);
        return response;
    }),
    listVendors: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield dashRepositories_1.default.listVendors(data);
        return response;
    }),
    blockorUnblock: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const blockOrUnBlock = yield dashRepositories_1.default.updateBlock(data);
            return blockOrUnBlock;
        }
        catch (error) {
            console.log(error);
        }
    }),
    blockorUnblockUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const blockOrUnBlockUser = yield dashRepositories_1.default.updateUser(data);
            return blockOrUnBlockUser;
        }
        catch (error) {
            console.log(error);
        }
    }),
    addCategory: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = yield dashRepositories_1.default.categoryAdding(data);
            return category;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getCategory: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getCategory = yield dashRepositories_1.default.listCategory();
            return getCategory;
        }
        catch (error) {
            console.log(error);
        }
    }),
    removeCategory: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield dashRepositories_1.default.updateCategory(data._id);
            return response;
        }
        catch (error) {
            console.error("Error in dashboardService.removeCategory:", error);
            throw error;
        }
    }),
    listRequest: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield dashRepositories_1.default.listRequest();
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    rejectVendor: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield dashRepositories_1.default.rejectVendor(data.id);
            if (response === null || response === void 0 ? void 0 : response.success) {
                if (response === null || response === void 0 ? void 0 : response.email)
                    (0, nodmailer_1.vendorReject)(response.email, data.reason);
                return response;
            }
            else {
                return response;
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    acceptVendor: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield dashRepositories_1.default.acceptVendor(id);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getDashboard: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield dashRepositories_1.default.getDashboard();
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getBookings: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield dashRepositories_1.default.getBookings();
        }
        catch (error) {
            console.log(error);
        }
    }),
    refundBooking: (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield dashRepositories_1.default.refund(bookingId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    bills: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield dashRepositories_1.default.bills();
        }
        catch (error) {
            console.log(error);
        }
    }),
    report: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield dashRepositories_1.default.report();
        }
        catch (error) {
            console.log(error);
        }
    }),
    blockVendor: (reportId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield dashRepositories_1.default.blockVendor(reportId, vendorId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    readReport: (reportId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield dashRepositories_1.default.readReport(reportId);
        }
        catch (error) {
            console.log(error);
        }
    }),
    bookingCount: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield dashRepositories_1.default.bookingCount();
        }
        catch (error) {
            console.log(error);
        }
    }),
    readBill: (billId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield dashRepositories_1.default.readBill(billId);
        }
        catch (error) {
            console.log(error);
        }
    })
};
