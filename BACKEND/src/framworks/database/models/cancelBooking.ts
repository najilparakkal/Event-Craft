import mongoose, { Schema, model, Document } from "mongoose";

interface ICancelBooking {
  userId: string;
  vendorId: string;
  bookingId: string;
  percentage: Number;
  advance:Number;

}

const cancelBookingSchema = new Schema<ICancelBooking>({
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
  advance:{
    type:Number
  },
},
  { timestamps: true }
);

export const CancelBookings = model<ICancelBooking>(
  "CancelBookings",
  cancelBookingSchema
);
