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
    profilePicture:string
    services:string
  }


  export interface IvendorDetails {
    id: string;
    email: string;
    phoneNum: string;
    name: string;
    profileImage?:string
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

  export interface IvarifyEmail{
    email:string;
  }
  export interface IcheckFOtp{
    email:string;
    otp:string
  }

  export interface IforgotPasswod{
    password:string;
    email:string;
  }
  export interface IgoogleRegistration{
    email?: string;
    uid?:string;
    name?:string;
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
    'postDetails[title]': string[];
    'postDetails[description]': string[];
    'postDetails[category]': string[];
    id: string[];
}

