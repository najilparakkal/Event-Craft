export interface IVendors extends Document {
    vendorName?: string;
    email?: string;
    password?: string;
    name?: string;
    phoneNum?: string;
    verified?: boolean;
    blocked?: boolean;
    vendor?: boolean;
    otp?: string;
    registered: Date; 

  }


  export interface vendorDetails {
    id: string;
    email: string;
    phoneNum: string;
    name: string;
  }

  export interface otpVeri {
    [x: string]: any;
    otp?: string;
    email?: string;
  }

  export interface resendOtp {
    email: string;
  }

  export interface Login {
    email: string;
    password: string;
  }

  export interface varifyEmail{
    email:string;
  }
  export interface checkFOtp{
    email:string;
    otp:string
  }

  export interface forgotPasswod{
    password:string;
    email:string;
  }
  export interface googleRegistration{
    email?: string;
    uid?:string;
    name?:string;
  }

  export interface CreateVendorResponse {
    success: boolean;
    message?: string;
  }