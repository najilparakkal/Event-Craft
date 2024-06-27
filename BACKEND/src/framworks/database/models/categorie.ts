import mongoose, { Schema, model, Document } from "mongoose";

export interface ICatogorie extends Document {
  name: string;
  image: string;
  registered: Date;
}

const categoriSchema = new Schema<ICatogorie>({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  registered: {
    type: Date,
    default: Date.now,
  },
});

export const Categories = model<ICatogorie>("Categories", categoriSchema);
