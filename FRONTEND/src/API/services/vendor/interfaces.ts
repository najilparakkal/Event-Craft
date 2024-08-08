export interface IvendorDetails {
    _id?: string | null;
    name?: string | null;
    email?: string | null;
    phoneNum?: string | null;
    profilePicture?: string | null; 
  }


  export interface IvendorState {
    vendorDetails: IvendorDetails;
    jwt: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  }


  export interface IauthResponse {
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

  
export  interface IAuthResponse {
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