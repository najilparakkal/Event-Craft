import mongoose, { Schema, model, Document } from "mongoose";
import { IVendors } from "../../../domain/entities/vendor/vendor";

const userSchema = new Schema<IVendors>({
  vendorName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    minlength: 6,
  },
  phoneNum: {
    type: String,
    default: "1234567890",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  is_blocked: {
    type: Boolean,
    default: false,
  },
  is_vendor: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
}); 

export const Vendors = model<IVendors>("Vendors", userSchema);
