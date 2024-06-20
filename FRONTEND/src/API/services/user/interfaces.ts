// Define the types/interfaces
interface UserDatas {
    id?: string;
    name?: string;
    email?: string;
    phoneNum?: string;
  }
  
  interface AuthResponse {
    userDetails: any;
    success?: boolean;
    message?: string;
    token?: string;
    userDatas?: UserDatas;
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
  }
  
  interface UserState {
    userDetails: UserDetails;
    jwt: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  interface GoogleAuth {
    name?: string;
    email?: string;
    uid?: string;
  }
  

  
  