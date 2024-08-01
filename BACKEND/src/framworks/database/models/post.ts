import mongoose, { Schema, model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  images: string[];
  registered: Date;
  vendorId: string;
  is_blocked: boolean;
  category: string;
  likes:string[]
  description: string;
}
const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
    },
    images: {
      type: [String],
    },
    vendorId: {
      type: String,
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Posts = model<IPost>("Posts", postSchema);