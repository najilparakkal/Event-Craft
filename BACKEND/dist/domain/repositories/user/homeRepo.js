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
exports.allVendors = exports.counts = exports.helpUser = exports.paidBill = exports.billPay = exports.userBills = exports.roomIds = exports.notification = exports.submitReport = exports.requestCheck = exports.userBooked = exports.likedVendors = exports.likedPosts = exports.vendorLike = exports.addReview = exports.ratingReview = exports.replyLike = exports.commentLike = exports.newReply = exports.getComments = exports.newComment = exports.updateLike = exports.getPosts = exports.getDatesOfVendor = exports.updateUser = exports.getProfile = exports.cancelBooking = exports.getBookings = exports.addBooking = exports.chatId = exports.listVendorsInUserChat = exports.cancelRequest = exports.listRequest = exports.addRequest = exports.getVendorProfile = exports.listServices = exports.listAll = exports.listVendors = void 0;
const awsConfig_1 = require("../../../config/awsConfig");
const booking_1 = require("../../../framworks/database/models/booking");
const cancelBooking_1 = require("../../../framworks/database/models/cancelBooking");
const chatModal_1 = __importDefault(require("../../../framworks/database/models/chatModal"));
const comment_1 = require("../../../framworks/database/models/comment");
const message_1 = __importDefault(require("../../../framworks/database/models/message"));
const post_1 = require("../../../framworks/database/models/post");
const requests_1 = require("../../../framworks/database/models/requests");
const services_1 = require("../../../framworks/database/models/services");
const user_1 = require("../../../framworks/database/models/user");
const vendor_1 = require("../../../framworks/database/models/vendor");
const date_fns_1 = require("date-fns");
const mongoose_1 = __importDefault(require("mongoose"));
const Reports_1 = require("../../../framworks/database/models/Reports");
const billing_1 = __importDefault(require("../../../framworks/database/models/billing"));
const helpUser_1 = require("../../../framworks/database/models/helpUser");
const listVendors = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield vendor_1.Vendors.find({ vendor: true, blocked: false })
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
        const vendors = yield vendor_1.Vendors.find({ blocked: false, vendor: true })
            .populate("posts")
            .populate("licence")
            .exec();
        const vendorData = vendors.map((vendor) => {
            return Object.assign(Object.assign({}, vendor._doc), { ratingAndReviewCount: vendor.ratingAndReview.length, likesCount: vendor.likes.length });
        });
        return { services, vendors: vendorData };
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
        const vendorData = vendors.map((vendor) => {
            return Object.assign(Object.assign({}, vendor._doc), { ratingAndReviewCount: vendor.ratingAndReview.length, likesCount: vendor.likes.length });
        });
        return { services, vendors: vendorData };
    }
    catch (error) {
        console.log(error);
    }
});
exports.listServices = listServices;
const getVendorProfile = (vendorId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const vendor = (yield vendor_1.Vendors.findById(vendorId)
            .populate("licence")
            .populate("posts")
            .exec());
        if (!vendor) {
            throw new Error("Vendor not found");
        }
        const { _id, vendorName, phoneNum, licence, coverPicture, posts, availableDate, ratingAndReview, likes, } = vendor;
        const profilePicture = vendor.profilePicture;
        const businessName = ((_a = licence[0]) === null || _a === void 0 ? void 0 : _a.businessName) || "";
        const location = ((_b = licence[0]) === null || _b === void 0 ? void 0 : _b.location) || "";
        const postsDetails = posts.map((post) => ({
            title: post.title,
            images: post.images,
            description: post.description,
            category: post.category,
        }));
        const chat = yield chatModal_1.default.findOne({
            users: {
                $all: [
                    new mongoose_1.default.Types.ObjectId(userId),
                    new mongoose_1.default.Types.ObjectId(vendorId),
                ],
            },
        });
        console.log(userId, vendorId);
        const servicesArray = licence.map((item) => item.services).flat();
        const services = servicesArray.flatMap((serviceList) => serviceList.split(",").map((service) => service.trim()));
        const allServices = yield services_1.Services.aggregate([
            {
                $match: {
                    name: { $in: services },
                },
            },
        ]);
        const bookings = yield booking_1.Bookings.find({ userId, vendorId });
        const reviewCount = ratingAndReview.length;
        const totalStars = ratingAndReview.reduce((acc, review) => acc + review.star, 0);
        const response = {
            _id,
            vendorName,
            phoneNum,
            profilePicture,
            businessName,
            location,
            coverPicture,
            posts: postsDetails,
            availableDate,
            reviewCount,
            totalStars,
            likes,
        };
        return {
            response,
            bookings,
            chat: chat ? true : false,
            services: allServices,
        };
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
            });
            yield chat.save();
            yield message_1.default.create({
                sender: userId,
                content: message,
                chat: chat._id,
                type: "text",
                senderModel: "User",
            });
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
        const vendorIds = chats
            .map((chat) => chat.users.find((user) => user.toString() !== userId))
            .filter(Boolean);
        const sortedVendorMessages = yield message_1.default.find({
            senderModel: "Vendor",
            sender: { $in: vendorIds },
        }).sort({ createdAt: -1 });
        const uniqueVendorIds = [
            ...new Set(sortedVendorMessages.map((message) => message.sender.toString())),
        ];
        const sortedVendors = yield vendor_1.Vendors.find({ _id: { $in: uniqueVendorIds } })
            .select("_id vendorName profilePicture")
            .then((vendors) => uniqueVendorIds.map((id) => vendors.find((vendor) => vendor._id.toString() === id)));
        return sortedVendors;
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
        const newBooking = yield booking_1.Bookings.create({
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
            paymentId: datas.paymentDetails.paymentId,
        });
        const value = (0, date_fns_1.parseISO)(datas.datas.eventDate);
        const date = (0, date_fns_1.format)(value, "yyyy-MM-dd");
        yield vendor_1.Vendors.findByIdAndUpdate(datas.vendorId, {
            $push: { availableDate: date },
        });
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
const cancelBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield booking_1.Bookings.findById(bookingId).exec();
        if (!booking) {
            throw new Error("Booking not found");
        }
        yield cancelBooking_1.CancelBookings.create({
            userId: booking.userId,
            vendorId: booking.vendorId,
            advance: booking.advance,
            bookingId,
            paymentId: booking.paymentId,
        });
        const bookings = yield booking_1.Bookings.findByIdAndUpdate(bookingId, {
            $set: { status: "requested to cancel" },
        });
        return {
            success: true,
            booking: bookings === null || bookings === void 0 ? void 0 : bookings.status,
        };
    }
    catch (error) {
        console.error("Error cancelling booking:", error);
    }
});
exports.cancelBooking = cancelBooking;
const getProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.Users.findById(userId);
        return user;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getProfile = getProfile;
const updateUser = (userId, datas, files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (files) {
            const image = yield (0, awsConfig_1.uploadImage)(files.profilePicture[0].filepath);
            const user = yield user_1.Users.findByIdAndUpdate(userId, {
                $set: {
                    userName: datas.name,
                    phoneNum: datas.phoneNum,
                    profilePicture: image,
                },
            });
            return { success: true, image };
        }
        else {
            return { success: true };
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUser = updateUser;
const getDatesOfVendor = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield vendor_1.Vendors.findById(vendorId);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getDatesOfVendor = getDatesOfVendor;
const getPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.Posts.aggregate([
            {
                $addFields: {
                    vendorId: { $toObjectId: "$vendorId" },
                },
            },
            {
                $lookup: {
                    from: "vendors",
                    localField: "vendorId",
                    foreignField: "_id",
                    as: "vendorInfo",
                },
            },
            {
                $unwind: "$vendorInfo",
            },
            {
                $project: {
                    title: 1,
                    images: 1,
                    vendorId: 1,
                    is_blocked: 1,
                    category: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    description: 1,
                    likes: 1,
                    "vendorInfo.vendorName": 1,
                    "vendorInfo.profilePicture": 1,
                    "vendorInfo._id": 1,
                },
            },
        ]);
        return posts;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPosts = getPosts;
const updateLike = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.Posts.findById(postId);
        if (!post) {
            throw new Error("Post not found");
        }
        const userIndex = post.likes.indexOf(userId);
        if (userIndex === -1) {
            post.likes.push(userId);
        }
        else {
            post.likes.splice(userIndex, 1);
        }
        yield post.save();
        console.log("Post updated successfully");
    }
    catch (err) {
        console.error("Error updating post:", err);
    }
});
exports.updateLike = updateLike;
const newComment = (userId, postId, newComment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newc = yield comment_1.Comment.create({
            userId,
            postId,
            comment: newComment,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.newComment = newComment;
const getComments = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield comment_1.Comment.find({ postId })
            .populate({
            path: "userId",
            select: "profilePicture userName",
        })
            .populate({ path: "replies", select: "comment likes" });
        return comments;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getComments = getComments;
const newReply = (commentId, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReply = yield comment_1.Reply.create({
            commentId,
            comment: reply,
        });
        const push = yield comment_1.Comment.findByIdAndUpdate(commentId, {
            $push: { replies: newReply._id },
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.newReply = newReply;
const commentLike = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield comment_1.Comment.findById(commentId);
        if (!comment) {
            return false;
        }
        const userIndex = comment.likes.indexOf(userId);
        if (userIndex === -1) {
            comment.likes.push(userId);
        }
        else {
            comment.likes.splice(userIndex, 1);
        }
        yield comment.save();
    }
    catch (error) {
        console.log(error);
    }
});
exports.commentLike = commentLike;
const replyLike = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield comment_1.Reply.findById(commentId);
        if (!comment) {
            return false;
        }
        const userIndex = comment.likes.indexOf(userId);
        if (userIndex === -1) {
            comment.likes.push(userId);
        }
        else {
            comment.likes.splice(userIndex, 1);
        }
        yield comment.save();
    }
    catch (error) {
        console.log(error);
    }
});
exports.replyLike = replyLike;
const ratingReview = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield vendor_1.Vendors.findById(vendorId).populate({
            path: "ratingAndReview.userId",
            select: "userName profilePicture",
        });
        if (vendor) {
            return vendor;
        }
        return { vendorName: "", about: "", ratingAndReview: "" };
    }
    catch (error) {
        console.log(error);
        return { vendorName: "", about: "", ratingAndReview: "" };
    }
});
exports.ratingReview = ratingReview;
const addReview = (userId, vendorId, star, review) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield vendor_1.Vendors.findById(vendorId);
        if (!vendor) {
            return { success: false, message: "Vendor not found" };
        }
        if (vendor.ratingAndReview) {
            vendor.ratingAndReview.push({ userId, star, review });
            yield vendor.save();
            return { success: true, message: "Review added successfully", vendor };
        }
    }
    catch (error) {
        console.error("Error adding review:", error);
        return { success: false, message: "Failed to add review" };
    }
});
exports.addReview = addReview;
const vendorLike = (userId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield vendor_1.Vendors.findById(vendorId);
        if (!vendor) {
            throw new Error("vendor not found");
        }
        const userIndex = vendor.likes.indexOf(userId);
        if (userIndex === -1) {
            vendor.likes.push(userId);
        }
        else {
            vendor.likes.splice(userIndex, 1);
        }
        yield vendor.save();
    }
    catch (error) {
        console.log(error);
    }
});
exports.vendorLike = vendorLike;
const likedPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likedPosts = yield post_1.Posts.aggregate([
            {
                $match: {
                    likes: userId,
                },
            },
            {
                $addFields: {
                    vendorId: { $toObjectId: "$vendorId" },
                },
            },
            {
                $lookup: {
                    from: "vendors",
                    localField: "vendorId",
                    foreignField: "_id",
                    as: "vendorInfo",
                },
            },
            {
                $unwind: "$vendorInfo",
            },
            {
                $project: {
                    title: 1,
                    images: 1,
                    vendorId: 1,
                    is_blocked: 1,
                    category: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    description: 1,
                    likes: 1,
                    "vendorInfo.vendorName": 1,
                    "vendorInfo.profilePicture": 1,
                },
            },
        ]);
        return likedPosts;
    }
    catch (error) {
        console.log(error);
    }
});
exports.likedPosts = likedPosts;
const likedVendors = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield vendor_1.Vendors.find({ likes: userId });
    }
    catch (error) {
        console.log(error);
    }
});
exports.likedVendors = likedVendors;
const userBooked = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookedOrNot = yield booking_1.Bookings.find({ userId });
        if (bookedOrNot.length > 0) {
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
exports.userBooked = userBooked;
const requestCheck = (userId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield chatModal_1.default.find({
            users: {
                $all: [
                    new mongoose_1.default.Types.ObjectId(userId),
                    new mongoose_1.default.Types.ObjectId(vendorId),
                ],
            },
        });
        if (request.is_accepted) {
            return { success: true };
        }
        else {
            return { success: false };
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.requestCheck = requestCheck;
const submitReport = (userId, vendorId, boxReason, reason) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield Reports_1.Report.create({
            userId,
            vendorId,
            reason: boxReason,
            reasonExplained: reason,
        });
        return { success: true };
    }
    catch (error) {
        console.log(error);
    }
});
exports.submitReport = submitReport;
const notification = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield vendor_1.Vendors.findById(vendorId);
        return {
            vendorName: data === null || data === void 0 ? void 0 : data.vendorName,
            profilePicture: data === null || data === void 0 ? void 0 : data.profilePicture,
        };
    }
    catch (error) {
        console.log(error);
    }
});
exports.notification = notification;
const roomIds = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield chatModal_1.default.find({ users: userId });
        const ids = data.map((item) => item._id + "");
        return ids;
    }
    catch (error) {
        console.log(error);
    }
});
exports.roomIds = roomIds;
const userBills = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bills = yield billing_1.default.find({ userId, paid: false });
        return bills;
    }
    catch (error) {
        console.log(error);
    }
});
exports.userBills = userBills;
const billPay = (billingId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = yield billing_1.default.findByIdAndUpdate(billingId, {
            $set: {
                paid: true,
            },
        });
        const updateVenodor = yield vendor_1.Vendors.findByIdAndUpdate(update === null || update === void 0 ? void 0 : update.vendorId, {
            $inc: {
                wallet: amount,
            },
        });
        if (update && updateVenodor) {
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
exports.billPay = billPay;
const paidBill = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bills = yield billing_1.default.find({ userId, paid: true }).populate({
            path: "bookingId",
            select: "advance createdAt eventDate",
        });
        const userData = yield user_1.Users.findById(userId).select("userName email phoneNum");
        const vendors = [];
        for (const bill of bills) {
            if (bill.vendorId) {
                const vendor = yield vendor_1.Vendors.findById(bill.vendorId).select("vendorName phoneNum email");
                if (vendor) {
                    vendors.push(vendor);
                }
            }
        }
        const response = {
            billingData: bills,
            userData,
            vendors,
        };
        return response;
    }
    catch (error) {
        console.log(error);
    }
});
exports.paidBill = paidBill;
const helpUser = (userId, reason, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.Users.findById(userId);
        if (!user) {
            return { success: false };
        }
        else {
            const newModal = yield helpUser_1.HelpUsers.create({
                userId,
                reason,
                phoneNumber,
            });
            if (newModal) {
                return { success: true };
            }
            else {
                return { success: false };
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.helpUser = helpUser;
const counts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.Users.find();
        const vendor = yield vendor_1.Vendors.find();
        const events = yield booking_1.Bookings.find({ status: "Completed" });
        return {
            userCount: user.length,
            vendorCount: vendor.length,
            eventsCount: events.length,
        };
    }
    catch (error) {
        console.log(error);
    }
});
exports.counts = counts;
const allVendors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield vendor_1.Vendors.find({ vendor: true, blocked: false })
            .populate("posts")
            .populate({
            path: "licence",
            select: "services",
        })
            .exec();
        console.log(vendors);
        return vendors;
    }
    catch (error) {
        console.log(error);
    }
});
exports.allVendors = allVendors;
