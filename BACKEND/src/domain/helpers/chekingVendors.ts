import { Vendors } from "../../framworks/database/models/vendor";
import { IVendors } from "../entities/vendor/vendor";
import { CreateUserResponse } from "../repositories/user/repositories";



export const checkingVendor = async (data: IVendors): Promise<CreateUserResponse> => {
  try {
    const userWithEmail = await Vendors.findOne({ email: data.email });
    const userWithPhoneNum = await Vendors.findOne({ phoneNum: data.phoneNum });

    if (userWithEmail) {
      return { success: false, message: "Email already exists" };
    }

    if (userWithPhoneNum) {
      return { success: false, message: "Phone number already exists" };
    }

    return <CreateUserResponse>{ success: true };
  } catch (error) {
    console.error(error);
    return <CreateUserResponse>{ success: false, message: "An error occurred while checking user data" };
  }
};
