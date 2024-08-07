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
const awsConfig_1 = require("../../../config/awsConfig");
const services_1 = require("../../../framworks/database/models/services");
const licence_1 = require("../../../framworks/database/models/licence");
const user_1 = require("../../../framworks/database/models/user");
const vendor_1 = require("../../../framworks/database/models/vendor");
const booking_1 = require("../../../framworks/database/models/booking");
const cancelBooking_1 = require("../../../framworks/database/models/cancelBooking");
const billing_1 = __importDefault(require("../../../framworks/database/models/billing"));
const Reports_1 = require("../../../framworks/database/models/Reports");
exports.default = {
    listUsers: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let users;
            switch (data.list) {
                case "ascending":
                    users = yield user_1.Users.find().sort({ userName: 1 });
                    break;
                case "descending":
                    users = yield user_1.Users.find().sort({ userName: -1 });
                    break;
                case "notVerified":
                    users = yield user_1.Users.find({ blocked: false });
                    break;
                case "verified":
                    users = yield user_1.Users.find({ blocked: true });
                    break;
                case "date":
                    users = yield user_1.Users.find().sort({ registered: 1 });
                    break;
                default:
                    users = yield user_1.Users.find();
                    break;
            }
            return users;
        }
        catch (error) {
            console.log(error);
        }
    }),
    listVendors: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let vendors;
            switch (data.list) {
                case "ascending":
                    vendors = yield vendor_1.Vendors.find().sort({ vendorName: 1 });
                    break;
                case "descending":
                    vendors = yield vendor_1.Vendors.find().sort({ vendorName: -1 });
                    break;
                case "notVerified":
                    vendors = yield vendor_1.Vendors.find({ blocked: false });
                    break;
                case "verified":
                    vendors = yield vendor_1.Vendors.find({ blocked: true });
                    break;
                case "date":
                    vendors = yield vendor_1.Vendors.find().sort({ registered: 1 });
                    break;
                default:
                    vendors = yield vendor_1.Vendors.find();
                    break;
            }
            return vendors;
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateBlock: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vendor = yield vendor_1.Vendors.findById(data.id);
            if (vendor) {
                return yield vendor_1.Vendors.findByIdAndUpdate(data.id, { $set: { blocked: !vendor.blocked } }, { new: true });
            }
            else {
                console.log("Vendor not found");
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.Users.findById(data.id);
            if (user) {
                return yield user_1.Users.findByIdAndUpdate(data.id, { $set: { blocked: !user.blocked } }, { new: true });
            }
            else {
                console.log("User not found");
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    categoryAdding: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkCategory = yield services_1.Services.findOne({ name: data.name });
            if (checkCategory) {
                return { success: false, message: "Category not found" };
            }
            else {
                const url = yield (0, awsConfig_1.uploadImage)(data.image.filepath);
                const newCategory = yield services_1.Services.create({
                    name: data.name,
                    image: url,
                });
                return {
                    success: false,
                    message: "Category Created successfully",
                    newCategory,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    listCategory: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categories = yield services_1.Services.find();
            return { success: true, data: categories };
        }
        catch (error) {
            console.error("Error fetching categories:", error);
            return { success: false, message: "Failed to fetch categories", error };
        }
    }),
    updateCategory: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const update = yield services_1.Services.findByIdAndDelete(_id);
            if (update) {
                return { success: true };
            }
            else {
                return { success: false };
            }
        }
        catch (error) {
            console.error("Error in dashRepositories.updateCategory:", error);
            throw error;
        }
    }),
    listRequest: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getAll = yield licence_1.Licence.find({ verified: false });
            return getAll;
        }
        catch (error) {
            console.log(error);
        }
    }),
    rejectVendor: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteRequest = yield licence_1.Licence.findByIdAndDelete({ _id });
            if (deleteRequest) {
                return { success: true, email: deleteRequest.emailAddress };
            }
            else {
                return { success: false };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    acceptVendor: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const acceptRequest = yield licence_1.Licence.findByIdAndUpdate({ _id }, { $set: { verified: true } }, { new: true });
            if (!acceptRequest) {
                return {
                    success: false,
                    error: "Licence document not found or update failed",
                };
            }
            const updatedVendor = yield vendor_1.Vendors.findByIdAndUpdate({ _id: acceptRequest.vendorId }, {
                $set: { vendor: true },
                $push: { licence: acceptRequest._id },
            }, { new: true, upsert: true });
            if (!updatedVendor) {
                return {
                    success: false,
                    error: "Failed to update vendor with licence information",
                };
            }
            return { success: true };
        }
        catch (error) {
            console.error("An error occurred while accepting the vendor request:", error);
            return {
                success: false,
                error: "An error occurred while accepting the vendor request",
            };
        }
    }),
    getDashboard: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usersCount = yield user_1.Users.countDocuments({ verified: true });
            const bookingsCount = yield booking_1.Bookings.countDocuments();
            const vendorsCount = yield vendor_1.Vendors.countDocuments({ vendor: true });
            const users = yield user_1.Users.find();
            const vendors = yield vendor_1.Vendors.find();
            const vendorsDates = vendors.map((item) => {
                return item.registered;
            });
            const totalRevenue = vendors.reduce((total, vendor) => {
                return total + (vendor === null || vendor === void 0 ? void 0 : vendor.wallet);
            }, 0);
            const bills = yield billing_1.default.find();
            const revenue = bills.map((item) => {
                return { totalAmount: item.totalAmount, createdAt: item.createdAt };
            });
            const usersDates = users.map((item) => {
                return item.registered;
            });
            const latestUsers = yield user_1.Users.find({}, { profilePicture: 1, registered: 1, verified: 1, userName: 1 })
                .sort({ registered: -1 })
                .limit(3);
            const latestVendors = yield vendor_1.Vendors.find({}, { profilePicture: 1, registered: 1, verified: 1, vendorName: 1 })
                .sort({ registered: -1 })
                .limit(3);
            return {
                usersCount,
                bookingsCount,
                vendorsCount,
                usersDates,
                vendorsDates,
                latestUsers,
                latestVendors,
                revenue,
                totalRevenue,
            };
        }
        catch (error) {
            console.log(error);
        }
    }),
    getBookings: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookings = yield cancelBooking_1.CancelBookings.find();
            return bookings;
        }
        catch (error) {
            console.log(error);
        }
    }),
    refund: (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const booking = yield booking_1.Bookings.findById(bookingId);
            if (!booking) {
                throw new Error("Booking not found");
            }
            booking.status = "cancelled";
            yield booking.save();
            yield cancelBooking_1.CancelBookings.deleteOne({ bookingId });
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }),
    bills: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield billing_1.default.find({ adminRead: false });
        }
        catch (error) {
            console.log(error);
        }
    }),
    report: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield Reports_1.Report.find({ isReaded: false })
                .populate({ path: "userId", select: "userName profilePicture" })
                .populate({ path: "vendorId", select: "vendorName profilePicture" });
        }
        catch (error) {
            console.log(error);
        }
    }),
    blockVendor: (reportId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateVendor = yield vendor_1.Vendors.findByIdAndUpdate(vendorId, {
                $set: {
                    blocked: true,
                },
            });
            const updateReport = yield Reports_1.Report.findByIdAndUpdate(reportId, {
                $set: {
                    isReaded: true,
                },
            });
            if (updateReport && updateVendor) {
                return { success: true };
            }
            else {
                return {
                    success: false,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    readReport: (reportId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Reports_1.Report.findByIdAndUpdate(reportId, {
                $set: {
                    isReaded: true,
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    bookingCount: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const statusCounts = yield booking_1.Bookings.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 },
                        createdAt: { $push: "$createdAt" },
                    },
                },
            ]);
            const counts = {
                pending: Array(12).fill(0),
                completed: Array(12).fill(0),
                cancelled: Array(12).fill(0),
            };
            const getMonthIndex = (date) => {
                return new Date(date).getMonth();
            };
            statusCounts.forEach((statusCount) => {
                const status = statusCount._id;
                statusCount.createdAt.forEach((date) => {
                    const monthIndex = getMonthIndex(date);
                    counts[status][monthIndex] += 1;
                });
            });
            return counts;
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed to fetch booking counts");
        }
    }),
    readBill: (billId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("🍽️🍽️🍽️;ldmc");
            const data = yield billing_1.default.findByIdAndUpdate(billId, {
                $set: {
                    adminRead: true,
                },
            });
            console.log(data, "🍽️🍽️🍽️");
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }),
};
