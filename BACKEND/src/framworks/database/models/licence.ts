import mongoose, { Schema, model, Document } from "mongoose";

export interface ILicence extends Document {
  applicantName: string;
  businessName: string;
  certificateExpirationDate: string;
  emailAddress: string;
  phoneNumber: string;
  location: string;
  upiIdOrPhoneNumber: string;
  accountNumber: string;
  services: string;
  description: string;
  licence: [string];
  verified: boolean;
  profilePicture: string;
  requestedDate:Date
  vendorId: string;
}

const licenceSchema = new Schema<ILicence>({
  applicantName: {
    type: String
  },
  businessName: {
    type: String
  },
  emailAddress: {
    type: String
  },
  phoneNumber: {
    type: String
  },

  location: {
    type: String
  },
  upiIdOrPhoneNumber: {
    type: String
  },
  services: {
    type: String
  },
  accountNumber: {
    type: String
  },
  description: {
    type: String
  },
  certificateExpirationDate: {
    type: String
  },
  profilePicture:{
    type: String
  },
  licence: {
    type: [String]
  },
  verified: {
    type: Boolean,
    default: false
  },
  vendorId: {
    type: String
  },
  requestedDate:{
    type: Date,
    default: Date.now()
  }
});

export const Licence = model<ILicence>("Licence", licenceSchema);
