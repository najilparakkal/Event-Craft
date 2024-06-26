import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  phoneNum: string;
  verified: boolean;
  otp: string;
  registered: Date; 
  blocked:boolean
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
  otp: {
    type:String,
  },
  registered: {
    type: Date,
    default: Date.now,
  }
});

export const Users = model<IUser>("Users", userSchema);
