import mongoose, { Schema, model, Document } from "mongoose";
import { IAdmin } from "../../../domain/entities/admin/admin";



const userSchema = new Schema<IAdmin>({

  email: {
    type: String,
  },
  password: {
    type: String,
    minlength: 6,
  }
});

export const Admins = model<IAdmin>("Admins", userSchema);
