"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const mongoose_1 = require("mongoose");
const postShema = new mongoose_1.Schema({
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
    category: {
        type: String,
    },
    desription: {
        type: String,
    },
    registered: {
        type: Date,
        default: Date.now,
    },
});
exports.Posts = (0, mongoose_1.model)("Posts", postShema);
