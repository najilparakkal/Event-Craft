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
const chatModal_1 = __importDefault(require("../../../framworks/database/models/chatModal"));
const licence_1 = require("../../../framworks/database/models/licence");
const message_1 = __importDefault(require("../../../framworks/database/models/message"));
const requests_1 = require("../../../framworks/database/models/requests");
const user_1 = require("../../../framworks/database/models/user");
exports.default = {
    addRequest: (datas, images) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const filePaths = images["values[licenseOrCertificates][0]"].map((file) => (0, awsConfig_1.uploadImage)(file.filepath));
            const uploadResults = yield Promise.all(filePaths);
            const profilePicture = yield (0, awsConfig_1.uploadImage)(images["values[profileImage]"][0].filepath);
            const createDb = yield licence_1.Licence.create({
                applicantName: datas["values[applicantName]"][0],
                businessName: datas["values[businessName]"][0],
                certificateExpirationDate: datas["values[certificateExpirationDate]"][0],
                emailAddress: datas["values[emailAddress]"][0],
                phoneNumber: datas["values[phoneNumber]"][0],
                location: datas["values[location]"][0],
                upiIdOrPhoneNumber: datas["values[upiIdOrPhoneNumber]"][0],
                accountNumber: datas["values[accountNumber]"][0],
                services: datas["values[servicesYouChose]"][0],
                description: datas["values[whatWillYouSell]"][0],
                licence: uploadResults,
                vendorId: datas.id[0],
                profilePicture: profilePicture,
            });
            if (createDb) {
                return { success: true, message: "Request created successfully" };
            }
            else {
                return { success: false, message: "something went wrong" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    listRequestsForVendor: (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const requests = yield requests_1.Request.find({ vendorId });
            const userIds = requests.map((request) => request.userId.toString());
            const users = yield user_1.Users.find({
                _id: { $in: userIds },
            });
            const userMap = users.reduce((acc, user) => {
                acc[user._id] = user;
                return acc;
            }, {});
            const combinedData = requests.map((request) => {
                const user = userMap[request.userId.toString()];
                return {
                    userName: user.userName,
                    userProfilePicture: user.profilePicture,
                    userId: request.userId,
                    requested: request.requested,
                };
            });
            return combinedData;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }),
    acceptRequest: (userId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let chat = yield chatModal_1.default.findOneAndUpdate({
                users: { $all: [userId, vendorId] },
            }, { $set: { is_accepted: true } });
            return { success: true };
        }
        catch (error) {
            console.error(error);
        }
    }),
    rejectRequest: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield chatModal_1.default.findByIdAndDelete(_id);
            return { success: true };
        }
        catch (error) {
            console.log(error);
        }
    }),
    fetchUsers: (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chats = yield chatModal_1.default.find({ users: vendorId });
            const userIds = chats.map((chat) => chat.users.find((user) => user.toString() !== vendorId));
            const users = yield user_1.Users.find({ _id: { $in: userIds } });
            return users;
        }
        catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }),
    fetchMessages: (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const messages = yield message_1.default.find({ chat: chatId }).sort({ createdAt: 1 });
            return messages;
        }
        catch (error) {
            console.log(error);
        }
    }),
    storeMessage: (data) => __awaiter(void 0, void 0, void 0, function* () {
        // const { vendorId, userId, content } = data;
        // try {
        //   let chat = await ChatModel.findOne({
        //     users: { $all: [vendorId, userId] },
        //   });
        //   if (!chat) {
        //     chat = new ChatModel({
        //       users: [vendorId, userId],
        //     });
        //     await chat.save();
        //   }
        //   const newMessage = new Message({
        //     sender: vendorId,
        //     senderModel: 'Vendor',
        //     content,
        //     chat: chat._id,
        //   });
        //   const savedMessage = await newMessage.save();
        //   chat.latestMessage = savedMessage._id;
        //   await chat.save();
        //   console.log(savedMessage, "Message stored successfully");
        //   io.to(`user:${userId}`).emit('receive message', { sender: 'Vendor', content });
        //   io.to(`vendor:${vendorId}`).emit('receive message', { sender: 'You', content });
        // } catch (error) {
        //   console.error('Error storing message:', error);
        //   throw new Error('Internal server error');
        // }
    }),
    fetchChatId: (vendorId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chat = yield chatModal_1.default.findOne({
                $and: [
                    { users: userId },
                    { users: vendorId }
                ]
            });
            if (chat !== null) {
                return chat._id.toString();
            }
            else {
                throw new Error('Chat not found');
            }
        }
        catch (error) {
            console.log(error);
        }
    })
};
