interface FormValues {
  name?: string;
  email?: string;
  password?: string;
  phoneNum?: string;
}

export const initialValue: FormValues = {
  email: "",
  phoneNum: "",
  name: "",
  password: ""
}


export interface vendor {
  email?: string;
  name?: string;
  password?: string;
  phoneNum?: string;
}

export interface LicenseFormValues {
  applicantName: string | null;
  businessName: string;
  certificateExpirationDate: string;
  emailAddress: string | null;
  phoneNumber: string | null;
  location: string;
  upiIdOrPhoneNumber: string;
  accountNumber: string;
  servicesYouChose: string;
  whatWillYouSell: string;
  licenseOrCertificates: any[];
  profileImage: any;
}

// export const licenseInitialValues: LicenseFormValues = {
//   applicantName: '',
//   businessName: '',
//   certificateExpirationDate: '',
//   emailAddress: '',
//   phoneNumber: '',
//   phoneNumber2: '',
//   upiIdOrPhoneNumber: '',
//   accountNumber: '',
//   servicesYouChose: services.join(', '),
//   whatWillYouSell: '',
//   licenseOrCertificates: [],
//   profileImage:""
// }

export const bookingInitialValue = {

  clientName: '',
  email: '',
  phoneNumber: '',
  eventDate: null as Date | null,
  arrivalTime: '',
  guests: '',
  location: '',
  pincode: '',
  endingTime: '',
  event:""
}