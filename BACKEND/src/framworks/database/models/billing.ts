import mongoose, { Schema, Document } from "mongoose";

export interface IBilling extends Document {
  bookingId: string;
  items: { item: string; amount: number }[];
  userId: string;
  vendorId: string;
  totalAmount: number;
}

const BillSchema: Schema<IBilling> = new Schema(
  {
    bookingId: {
      type: String,
      required: true,
    },
    items: [
      {
        item: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    userId: {
      type: String,
      required: true,
    },
    vendorId: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BillModel = mongoose.model<IBilling>("Bill", BillSchema);

export default BillModel;
