export interface IUser {
  userId?: string;
  name?: string;
  email?: string;
  password?: string;
  phoneNum?: string;
}

export interface otpVeri {
  otp?: string;
  userEmail?: string;
}

export interface ResendData {
  email: string;
}
