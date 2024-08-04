"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelBookings = void 0;
const mongoose_1 = require("mongoose");
const cancelBookingSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    vendorId: {
        type: String,
        required: true,
    },
    bookingId: {
        type: String,
        required: true,
    },
    percentage: {
        type: Number,
    },
    advance: {
        type: Number
    },
    paymentId: {
        type: String
    },
}, { timestamps: true });
exports.CancelBookings = (0, mongoose_1.model)("CancelBookings", cancelBookingSchema);
