interface FormValues {
    name?: string;
    email?: string;
    password?: string;
    phoneNum?: string;
  }

export const initialValue:FormValues = {
    email:"",
    phoneNum:"",
    name:"",
    password:""
}


export interface vendor {
  email?: string;
  name?: string;
  password?: string;
  phoneNum?: string;
}

export interface LicenseFormValues {
  applicantName: string;
  businessName: string;
  certificateExpirationDate: string;
  emailAddress: string;
  phoneNumber: string;
  phoneNumber2?: string;
  upiIdOrPhoneNumber: string;
  accountNumber: string;
  servicesYouChose: string;
  whatWillYouSell: string;
  licenseOrCertificates: any[];
  profileImage:any
}

export const licenseInitialValues: LicenseFormValues = {
  applicantName: '',
  businessName: '',
  certificateExpirationDate: '',
  emailAddress: '',
  phoneNumber: '',
  phoneNumber2: '',
  upiIdOrPhoneNumber: '',
  accountNumber: '',
  servicesYouChose: '',
  whatWillYouSell: '',
  licenseOrCertificates: [],
  profileImage:""
}