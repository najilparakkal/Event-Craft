"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const mongoose_1 = require("mongoose");
const categoriSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    registered: {
        type: Date,
        default: Date.now,
    },
});
exports.Services = (0, mongoose_1.model)("Services", categoriSchema);
