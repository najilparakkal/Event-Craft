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
    default: "not provided",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  vendor: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  registered: {
    type: Date,
    default: Date.now,
  }
}); 

export const Vendors = model<IVendors>("Vendors", userSchema);
