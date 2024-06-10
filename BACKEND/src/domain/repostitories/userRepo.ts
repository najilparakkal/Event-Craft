import { Users } from "../../framworks/database/models/user";
import { IUser } from "../entities/user/user";

export const createUser = async (userData: IUser, hashedPassword: string) => {
  try {
    if (!userData.email || !userData.name || !userData.password) {
      throw new Error("something went wrong");
    }
    const newUser = new Users({
      userName: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
    });
    return await newUser.save();
  } catch (err) {
    throw err;
  }
}; 

