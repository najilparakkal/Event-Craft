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
const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        socket.on("join room", (room) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`Socket ${socket.id} joined room: ${room}`);
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
        socket.on("list_vendors", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("x🍽️🍽️🍽️🍽️🍽️");
            // if (!mongoose.Types.ObjectId.isValid(chatId)) {
            //   console.error(`Invalid chat ID: ${chatId}`);
            //   return;
            // }
            // try {
            //   const chat = await ChatModel.findById(chatId)
            //     .populate("vendors")
            //     .populate({
            //       path: "messages",
            //       options: { sort: { createdAt: -1 } },
            //     });
            //   if (!chat) {
            //     console.error(`Chat not found with ID: ${chatId}`);
            //     return;
            //   }
            //   const vendors = chat.vendors;
            //   const lastMessagedVendors = vendors.sort((a, b) => {
            //     const lastMessageA = chat.messages.find(
            //       (message) => message.sender.toString() === a._id.toString()
            //     );
            //     const lastMessageB = chat.messages.find(
            //       (message) => message.sender.toString() === b._id.toString()
            //     );
            //     if (lastMessageA && lastMessageB) {
            //       return (
            //         new Date(lastMessageB.createdAt).getTime() -
            //         new Date(lastMessageA.createdAt).getTime()
            //       );
            //     }
            //     return 0;
            //   });
            socket.emit("vendors_list", "🎶🎶🎶");
            // } catch (error) {
            //   console.error("Error listing vendors:", error);
            // }
        }));
    });
};
exports.default = socketHandler;
