export interface IAdmin extends Document {
    email: string;
    password: string;
  
  }

  export interface Login {
    email: string;
    password: string;
  }

  export interface listUsers {
    list:string
  }
  export interface listVendors {
    list:string
  }

  export interface vendorBlock{
    id:string;
  }
   export interface RemoveCategoryData {
    _id: string;
}
export interface rejectingVendor{
  id:string;
  reason:string;
}

export interface IAdminBooking {
  _id: string;
  clientName: string;
  email: string;
  phoneNumber: string;
  eventDate: Date;
  event: string;
  arrivalTime: string;
  endingTime: string;
  guests: number;
  location: string;
  advance: number;
  pincode: string;
  accepted: boolean;
  userId: string;
  vendorId: string;
  status: string;
  paymentId: string;
}
