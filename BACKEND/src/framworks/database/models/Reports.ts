import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

interface IReport extends Document{
    userId: string;
    vendorId: string;
    reason: string;
    reasonExplained: string;
    isReaded:boolean;
}


const ReportSchema:Schema<IReport> = new Schema(
  {
    userId: {
      type: String,
      ref: "Users",
      required: true,
    },
    vendorId: {
      type: String,
      ref: "Vendors",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    reasonExplained: {
      type: String,
      required: true,
    },
    isReaded:{
        type: Boolean,
        default: false, 
    }
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model<IReport>("Report", ReportSchema);
