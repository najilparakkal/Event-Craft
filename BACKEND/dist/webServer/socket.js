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
const message_1 = __importDefault(require("../framworks/database/models/message"));
const chatModal_1 = __importDefault(require("../framworks/database/models/chatModal"));
const mongoose_1 = __importDefault(require("mongoose"));
const awsConfig_1 = require("../config/awsConfig");
const homeRepo_1 = require("../domain/repositories/user/homeRepo");
const requestRepo_1 = require("../domain/repositories/vendor/requestRepo");
const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        socket.on("join_home", (idArray) => __awaiter(void 0, void 0, void 0, function* () {
            for (const id of idArray) {
                socket.join(id);
            }
        }));
        socket.on("join room", (room) => __awaiter(void 0, void 0, void 0, function* () {
            socket.join(room);
            if (!mongoose_1.default.Types.ObjectId.isValid(room)) {
                console.error(`Invalid chat ID: ${room}`);
                return;
            }
            try {
                const messages = yield message_1.default.find({ chat: room }).sort({
                    createdAt: 1,
                });
                const chat = yield chatModal_1.default.findById({ _id: room });
                socket.emit("room messages", { messages, chat });
            }
            catch (error) {
                console.error("Error fetching messages:", error);
            }
        }));
        socket.on("send_voice_message", (message) => __awaiter(void 0, void 0, void 0, function* () {
            const { senderId, senderModel, content, chatId } = message;
            const upload = yield (0, awsConfig_1.uploadBufferToS3)(content, "audio/webm;codecs=opus");
            const newMessage = new message_1.default({
                sender: senderId,
                senderModel: senderModel,
                content: upload,
                chat: chatId,
                type: "audio",
            });
            yield newMessage.save();
            io.to(chatId).emit("new message", newMessage);
        }));
        socket.on("send_file", (message) => __awaiter(void 0, void 0, void 0, function* () {
            const { senderId, senderModel, content, chatId, type } = message;
            const newMessage = new message_1.default({
                sender: senderId,
                senderModel: senderModel,
                content,
                chat: chatId,
                type: type,
            });
            yield newMessage.save();
            io.to(chatId).emit("new message", newMessage);
        }));
        socket.on("send message", (message) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`Message from ${socket.id}:`, message);
            const { senderId, senderModel, content, chatId } = message;
            if (!mongoose_1.default.Types.ObjectId.isValid(chatId)) {
                console.error(`Invalid chat ID: ${chatId}`);
                return;
            }
            try {
                const newMessage = new message_1.default({
                    sender: senderId,
                    senderModel: senderModel,
                    content: content,
                    chat: chatId,
                    type: "text",
                });
                yield newMessage.save();
                yield chatModal_1.default.findByIdAndUpdate(chatId, {
                    $push: { messages: newMessage._id },
                });
                io.to(chatId).emit("new message", newMessage);
            }
            catch (error) {
                console.error("Error saving message:", error);
            }
        }));
        socket.on("read_message", (chatId, senderId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield message_1.default.updateMany({ chat: chatId, sender: { $ne: senderId }, read: false }, { $set: { read: true } });
                const message = yield message_1.default.find({ chat: chatId });
            }
            catch (error) {
                console.error("Error updating messages:", error);
            }
        }));
        socket.on("list_vendors", (userId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const venders = yield (0, homeRepo_1.listVendorsInUserChat)(userId);
                socket.emit("sorted_list", venders);
            }
            catch (error) {
                console.error("Error fetching vendors: ", error);
            }
        }));
        socket.on("list_users", (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield (0, requestRepo_1.fetchUsers)(vendorId);
                socket.emit("sorted_user_list", users);
            }
            catch (error) {
                console.log(error);
            }
        }));
    });
};
exports.default = socketHandler;
