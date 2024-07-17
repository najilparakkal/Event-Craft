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
exports.cancelBooking = exports.getBookings = exports.addBooking = exports.chatId = exports.listVendorsInUserChat = exports.cancelRequest = exports.listRequest = exports.addRequest = exports.getVendorProfile = exports.listServices = exports.listAll = exports.listVendors = void 0;
const booking_1 = require("../../../framworks/database/models/booking");
const chatModal_1 = __importDefault(require("../../../framworks/database/models/chatModal"));
const requests_1 = require("../../../framworks/database/models/requests");
const services_1 = require("../../../framworks/database/models/services");
const user_1 = require("../../../framworks/database/models/user");
const vendor_1 = require("../../../framworks/database/models/vendor");
const listVendors = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield vendor_1.Vendors.find({ vendor: true })
            .populate("licence")
            .populate("posts")
            .exec();
        const filteredVendors = vendors.filter((vendor) => vendor.licence.some((licence) => {
            const services = licence.services
                .split(",")
                .map((service) => service.trim().toLowerCase());
            return services.includes(data.toLowerCase());
        }));
        const vendorsWithDetails = filteredVendors.map((vendor) => ({
            _id: vendor._id,
            vendorName: vendor.vendorName,
            email: vendor.email,
            phoneNum: vendor.phoneNum,
            profilePicture: vendor.profilePicture,
            posts: vendor.posts,
            coverPicture: vendor.coverPicture,
        }));
        return vendorsWithDetails;
    }
    catch (error) {
        console.error("Error listing vendors:", error);
        return [];
    }
});
exports.listVendors = listVendors;
const listAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield services_1.Services.find();
        const vendors = yield vendor_1.Vendors.find()
            .populate("posts")
            .populate("licence")
            .exec();
        return { services, vendors };
    }
    catch (error) {
        console.log(error);
    }
});
exports.listAll = listAll;
const listServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield services_1.Services.find();
        const vendors = yield vendor_1.Vendors.find()
            .populate("posts")
            .populate("licence")
            .exec();
        return { services, vendors };
    }
    catch (error) {
        console.log(error);
    }
});
exports.listServices = listServices;
const getVendorProfile = (vendorId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const vendor = (yield vendor_1.Vendors.findById(vendorId)
            .populate("licence")
            .populate("posts")
            .exec());
        if (!vendor) {
            throw new Error("Vendor not found");
        }
        const { vendorName, phoneNum, licence, coverPicture, posts, availableDate, } = vendor;
        const profilePicture = ((_a = licence[0]) === null || _a === void 0 ? void 0 : _a.profilePicture) || "";
        const businessName = ((_b = licence[0]) === null || _b === void 0 ? void 0 : _b.businessName) || "";
        const location = ((_c = licence[0]) === null || _c === void 0 ? void 0 : _c.location) || "";
        const postsDetails = posts.map((post) => ({
            title: post.title,
            images: post.images,
            description: post.description,
            category: post.category,
        }));
        const chat = yield chatModal_1.default.findOne({
            users: { $in: [userId, vendorId] },
            is_accepted: true,
        });
        const bookings = yield booking_1.Bookings.find({ userId, vendorId });
        const response = {
            vendorName,
            phoneNum,
            profilePicture,
            businessName,
            location,
            coverPicture,
            posts: postsDetails,
            availableDate,
        };
        return { response, bookings, chat: chat ? true : false };
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
});
exports.getVendorProfile = getVendorProfile;
const addRequest = (userId, message, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let chat = yield chatModal_1.default.findOne({
            users: { $all: [userId, vendorId] },
        });
        if (!chat) {
            chat = new chatModal_1.default({
                users: [userId, vendorId],
                request: message,
            });
            yield chat.save();
            return { success: true };
        }
        else {
            return { success: false };
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.addRequest = addRequest;
const listRequest = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield requests_1.Request.find({ userId });
        const vendorIds = requests.map((request) => request.vendorId);
        const vendors = yield vendor_1.Vendors.find({
            _id: { $in: vendorIds },
        });
        const vendorMap = vendors.reduce((acc, vendor) => {
            acc[vendor._id] = vendor;
            return acc;
        }, {});
        const combinedData = requests.map((request) => {
            const vendor = vendorMap[request.vendorId];
            return Object.assign(Object.assign({}, request), { vendorName: vendor.vendorName, vendorProfilePicture: vendor.profilePicture, vendorId: request.vendorId, requested: request.requested });
        });
        return combinedData;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.listRequest = listRequest;
const cancelRequest = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield chatModal_1.default.findByIdAndDelete(_id);
        return { success: true };
    }
    catch (error) {
        console.log(error);
    }
});
exports.cancelRequest = cancelRequest;
const listVendorsInUserChat = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield chatModal_1.default.find({ users: userId });
        const vendorIds = chats.map((chat) => chat.users.find((user) => user.toString() !== userId));
        const vendors = yield vendor_1.Vendors.find({ _id: { $in: vendorIds } });
        return vendors;
    }
    catch (error) {
        console.error("Error fetching vendors:", error);
        throw error;
    }
});
exports.listVendorsInUserChat = listVendorsInUserChat;
const chatId = (userId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield chatModal_1.default.findOne({
            $and: [{ users: userId }, { users: vendorId }],
        });
        if (chat) {
            return chat._id.toString();
        }
        else {
            throw new Error("Chat not found");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.chatId = chatId;
const addBooking = (datas) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBooking = new booking_1.Bookings({
            clientName: datas.datas.clientName,
            email: datas.datas.email,
            phoneNumber: datas.datas.phoneNumber,
            eventDate: datas.datas.eventDate,
            arrivalTime: datas.datas.arrivalTime,
            endingTime: datas.datas.endingTime,
            guests: datas.datas.guests,
            location: datas.datas.location,
            event: datas.datas.event,
            pincode: datas.datas.pincode,
            userId: datas.userId,
            vendorId: datas.vendorId,
            advance: datas.amount,
        });
        yield newBooking.save();
        return { success: true };
    }
    catch (error) {
        console.error("Error adding booking:", error);
    }
});
exports.addBooking = addBooking;
const getBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_1.Bookings.find({ userId }).lean();
        const bookingDatas = yield Promise.all(bookings.map((booking) => __awaiter(void 0, void 0, void 0, function* () {
            const vendor = yield vendor_1.Vendors.findById(booking.vendorId).lean();
            if (vendor) {
                return Object.assign(Object.assign({}, booking), { vendorName: vendor.vendorName });
            }
            return booking;
        })));
        return bookingDatas;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getBookings = getBookings;
const cancelBooking = (percentage, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield booking_1.Bookings.findById(bookingId).exec();
        if (!booking) {
            throw new Error("Booking not found");
        }
        const refund = (booking.advance * percentage) / 100;
        const updateUserWallet = yield user_1.Users.findByIdAndUpdate(booking.userId, { $inc: { wallet: refund } }, { new: true }).exec();
        if (!updateUserWallet) {
            throw new Error("User not found");
        }
        console.log("🎶🎶🎶");
        const deletee = yield booking_1.Bookings.deleteOne({ _id: bookingId }).exec();
        console.log(deletee, "🍽️🍽️🍽️");
        return {
            success: true,
            message: "bookings deleted successfully user Updated",
        };
    }
    catch (error) {
        console.error("Error cancelling booking:", error);
    }
});
exports.cancelBooking = cancelBooking;
