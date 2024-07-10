"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const mongoose_1 = require("mongoose");
const requestScheema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    message: {
        type: String,
    },
    userId: {
        type: String
    },
    vendorId: {
        type: String
    },
    requested: {
        type: Date,
        default: Date.now,
    },
});
exports.Request = (0, mongoose_1.model)("Request", requestScheema);
