"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookings = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    clientName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    event: {},
    arrivalTime: {
        type: String,
        required: true,
    },
    endingTime: {
        type: String,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    advance: {
        type: Number
    },
    pincode: {
        type: String,
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String
    },
    vendorId: {
        type: String
    }
});
exports.Bookings = (0, mongoose_1.model)("Bookings", bookingSchema);
