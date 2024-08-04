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

export interface googleRegistration {
  email?: string;
  uid?: string;
  name?: string;
}

export interface loginService {
  token?: string;
  userDetails?: {
    id?: string;
    email?: string;
    phoneNum?: string;
    name?: string;
  };
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
  userId?: string;
  message?: string;
  vendorId?: string;
}
export interface cancelReq {
  chatId?: string;
}

export interface BookingData {
  firstName: string;
  email: string;
  phoneNumber: string;
  eventDate: string;
  arrivalTime: string;
  guests: number;
  location: string;
  pincode: string;
  endingTime: string;
}

export interface AddBookingParams {
  datas?: BookingData;
  userId?: string;
  vendorId?: string;
  amount?: number;
  paymentDetails:{paymentId:string}
}

export interface IAddBooking {
  datas: {
    clientName: string;
    email: string;
    phoneNumber: string;
    eventDate: Date;
    arrivalTime: string;
    guests: number;
    location: string;
    pincode: string;
    endingTime: string;
    event:string;
  };

  vendorId: string;
  userId: string;
  amount: number;
}
