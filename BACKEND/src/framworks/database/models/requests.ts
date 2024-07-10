
import mongoose, { Schema, model, Document } from "mongoose";

export interface IRequests extends Document {
  name: string;
  message: string;
  requested: Date;
  userId:string
  vendorId:string
}

const requestScheema = new Schema<IRequests>({
  name: {
    type: String,
  },
  message: {
    type: String,
  },
  userId:{
    type:String
  },
  vendorId:{
    type:String
  },
  requested: {
    type: Date,
    default: Date.now,
  },
});

export const Request = model<IRequests>("Request", requestScheema);
