import mongoose from "mongoose";



export interface IvendorDetails {
  id: string;
  email: string;
  phoneNum: string;
  name: string;
  profileImage?: string;
}

export interface IotpVeri {
  [x: string]: any;
  otp?: string;
  email?: string;
}

export interface IresendOtp {
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IvarifyEmail {
  email: string;
}
export interface IcheckFOtp {
  email: string;
  otp: string;
}

export interface IforgotPasswod {
  password: string;
  email: string;
}
export interface IgoogleRegistration {
  email?: string;
  uid?: string;
  name?: string;
}

export interface ICreateVendorResponse {
  success: boolean;
  message?: string;
}

export interface IVendorRequestDetails {
  applicantName: string[];
  businessName: string[];
  certificateExpirationDate: string[];
  emailAddress: string[];
  phoneNumber: string[];
  phoneNumber2: string[];
  upiIdOrPhoneNumber: string[];
  accountNumber: string[];
  servicesYouChose: string[];
  whatWillYouSell: string[];
  id: string[];
}

export interface IPostDetails {
  "postDetails[title]": string[];
  "postDetails[description]": string[];
  "postDetails[category]": string[];
  id: string[];
}

export interface IVendorDetails {
  email: string;
  phoneNum: string;
  vendorName: string;
  id: string;
  profilePicture?: string;
}

export interface ILoginResponse {
  success: boolean;
  token?: string;
  vendorDetails?: IVendorDetails;
  isVendor?: boolean;
  message?: string;
}

export interface Licence {
  profilePicture?: string;
  businessName?: string;
  location?: string;
}

export interface Vendor {
  vendorName: string;
  phoneNum: string;
  coverPicture: string; 

  licence: Licence[];
}

export interface VendorProfile {
  vendorName: string;
  phoneNum: string;
  profilePicture: string;
  businessName: string;
  location: string;
  coverPicture:string
}

export interface IAcceptRequest {
  vendorId: string;
  userId: string;
}

export interface IRequest {
  _id: string;
  userName: string;
  message: string;
  userId: string;
  vendorId: string;
  requested: Date;
  __v: number;
}

export interface IReqVendor {
  _id: string;
  vendorName: string;
  profilePicture: string;
}

export interface IReq {
  userId: string;
  vendorId: string;
  requested: string;
}

export interface IRequestWithUser {
  _id: string;
  name: string;
  message: string;
  vendorId: string;
  requested: Date;
  userName: string;
  userProfilePicture: string;
  userId: string;
  registeredDate: Date;
}

export interface IUserReq {
  _id: string;
  userName: string;
  profilePicture: string;
}

export interface reject {
  userId: string;
  vendroId: string;
}

export interface MessageData {
  vendorId: string;
  userId: string;
  content: string;
}
