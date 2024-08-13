import mongoose, { Schema, Document } from "mongoose";

export interface IHelpUser {
  userId: string;
  phoneNumber: string;
  reason: string;
}

const HelpSchema: Schema<IHelpUser> = new Schema(
  {
    userId: { type: String, ref: "User" },
    phoneNumber: String,
    reason: String,
  },
  {
    timestamps: true,
  }
);

export const HelpUsers = mongoose.model<IHelpUser>("HelpUsers", HelpSchema);