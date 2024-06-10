import { createUser } from "../../repostitories/userRepo";
import { Request } from "express";
import { IUser } from "../../entities/user/user";
import { Encrypt } from "../../helpers/passwordHashing";
export default {
  registerUser: async (userData: IUser) => {
    try {
      if (!userData.password) {
        throw new Error("Password is required");
      }
      const hashedPassword = await Encrypt.cryptPassword(userData.password);
      const savedUser = await createUser(userData, hashedPassword);
      console.log("new user ✅", savedUser);
      return savedUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
