export interface IUser {
  _id?: any;
  profilePicture?: any;
  userName?: any;
  userId?: string;
  name?: string;
  email?: string;
  password?: string;
  phoneNum?: string;
}

export interface otpVeri {
  [x: string]: any;
  otp?: string;
  email?: string;
}

export interface ResendData {
  email: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface userDatas {
  id: string;
  email: string;
  phoneNum: string;
  name: string;
  profilePicture?: string;
}


export interface googleRegistration{
  email?: string;
  uid?:string;
  name?:string;
}


export interface loginService{
  token?:string;
  userDetails?:{
    id?:string;
    email?:string;
    phoneNum?:string;
    name?:string;
  }
}

export interface CreateUserResponse {
  success: boolean;
  message?: string;
}

export interface OtpResponse {
  success: boolean;
  message?: string;
}
export interface IMessageRequest {
  userId?:string;
  message?:string;
  vendorId?:string;
}
export interface cancelReq{
  userId?:string;
  vendorId?:string;
}
