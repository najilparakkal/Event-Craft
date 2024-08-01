"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    images: {
        type: [String],
    },
    vendorId: {
        type: String,
    },
    is_blocked: {
        type: Boolean,
        default: false,
    },
    likes: {
        type: [String],
        default: [],
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.Posts = (0, mongoose_1.model)("Posts", postSchema);
