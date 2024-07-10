"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        refPath: 'senderModel', // Dynamically reference User or Vendor model
        required: true
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['User', 'Vendor']
    },
    content: { type: String, required: true },
    chat: { type: Schema.Types.ObjectId, ref: "ChatModel" },
}, { timestamps: true });
const Message = mongoose_1.default.model("Message", MessageSchema);
exports.default = Message;
