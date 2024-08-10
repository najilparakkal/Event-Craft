import mongoose, { Schema, model, Document } from "mongoose";

interface ICancelBooking {
  userId: string;
  vendorId: string;
  bookingId: string;
  advance:Number;
  paymentId:string
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
  advance:{
    type:Number
  },
  paymentId:{
    type:String
  },
},
  { timestamps: true }
);

export const CancelBookings = model<ICancelBooking>(
  "CancelBookings",
  cancelBookingSchema
);
