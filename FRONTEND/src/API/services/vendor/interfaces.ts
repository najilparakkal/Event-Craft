interface vendorDetails {
    _id?: string | null;
    name?: string | null;
    email?: string | null;
    phoneNum?: string | null;
    profilePicture?: string | null; 
  }


  interface vendorState {
    vendorDetails: vendorDetails;
    jwt: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }


  interface authResponse {
    token: any;
    response: any;
    vendor: {
      vendorDetails: {
        id: string;
        email: string;
        name: string;
        phoneNum: string;
      };
      token: string;
    };
    message: string;
    status: number;
  }

  
interface AuthResponse {
  vendorDetails?: any;
  token?: string | null;
  response: any; 
  vendor: {
    vendorDetails: {
      id: string;
      email: string;
      name: string;
      phoneNum: string;
    };
    token: string;
  };
  message: string;
  status: number;
}