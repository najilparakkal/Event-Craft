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