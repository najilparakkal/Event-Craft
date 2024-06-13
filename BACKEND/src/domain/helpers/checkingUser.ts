import { Users } from "../../framworks/database/models/user";
import { IUser } from "../entities/user/user";
import { CreateUserResponse } from "../repositories/repositories";

interface UserData {
  email: string;
  name: string;
  password: string;
  phoneNum: string;
}

interface CheckingUserResponse {
  success: boolean;
  message?: string;
}

export const checkingUser = async (data: IUser): Promise<CreateUserResponse> => {
  try {
    const userWithEmail = await Users.findOne({ email: data.email });
    const userWithPhoneNum = await Users.findOne({ phoneNum: data.phoneNum });

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
