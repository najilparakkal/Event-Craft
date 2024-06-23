import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  phoneNum: string;
  verified: boolean;
  otp: {
    value: string;
    generatedAt: Date;
  };
}

const userSchema = new Schema<IUser>({
  userName: {
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
  otp: {
    type: String,
  },
});

export const Users = model<IUser>("Users", userSchema);
