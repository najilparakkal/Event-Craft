export interface IUser {
  userId?: string;
  name?: string;
  email?: string;
  password?: string;
  phoneNum?: string;
}

export interface otpVeri {
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
}
