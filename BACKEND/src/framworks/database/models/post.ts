import mongoose, { Schema, model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  images: string[];
  registered: Date;
  vendorId: string;
  is_blocked: boolean;
  category: string;
  desription: string;
}

const postShema = new Schema<IPost>({
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
  category: {
    type: String,
  },
  desription: {
    type: String,
  },
  registered: {
    type: Date,
    default: Date.now,
  },
});   

export const Posts = model<IPost>("Posts", postShema);
