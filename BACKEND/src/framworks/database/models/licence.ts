import mongoose, { Schema, model, Document } from "mongoose";

export interface ILicence extends Document {
  applicantName: string;
  businessName: string;
  certificateExpirationDate: string;
  emailAddress: string;
  phoneNumber: string;
  secondPhoneNumber: string;
  upiIdOrPhoneNumber: string;
  accountNumber: string;
  servicesYouChose: string;
  whatWillYouSell: string;
  licence: [string];
  verified: boolean;
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

  secondPhoneNumber: {
    type: String
  },
  upiIdOrPhoneNumber: {
    type: String
  },
  servicesYouChose: {
    type: String
  },
  accountNumber: {
    type: String
  },
  whatWillYouSell: {
    type: String
  },
  certificateExpirationDate: {
    type: String
  },
  licence: {
    type: [String]
  },
  verified: {
    type: Boolean,
    default: false
  }
});

export const Licence = model<ILicence>("Licence", licenceSchema);
