// Define the types/interfaces
interface UserDatas {
  id?: string;
  name?: string;
  email?: string;
  phoneNum?: string;
}

interface AuthResponse {
  isVendor: any;
  userDatas?: any;
  userDetails?: any;
  token?: string | null;
  response: any; 
  user: {
    userDatas: {
      profilePicture: string | null | undefined;
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

interface UserData {
  name?: string;
  email?: string;
  uid?: string;
}

// Redux slice state interfaces
interface UserDetails {
  _id?: string | null;
  name?: string | null;
  email?: string | null;
  phoneNum?: string | null;
  profilePicture?: string |null     ;
}   


interface BookingData {
  arrivalTime: string;
  email: string;
  endingTime: string;
  firstName: string;
  guests: number;
  location: string;
  phoneNumber: string;
  pincode: string;
  weddingDate: Date | null;
}
interface GoogleAuth {
  name?: string;
  email?: string;
  uid?: string;
}


interface UserState {
  userDetails: UserDetails;
  jwt: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface IRequest{
  _id:string,
  message:string
}

interface IUserProfile {
  name: string;
  phoneNum: string;
  profilePicture: File;
}
