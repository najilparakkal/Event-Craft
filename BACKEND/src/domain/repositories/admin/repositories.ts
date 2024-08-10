import { Admins } from "../../../framworks/database/models/admin";
import bcrypt from "bcrypt";
import { CreateToken } from "../../helpers/jwtGenarate";

export const logingadmin = async (email: string, password: string) => {
  try {
    const admin = await Admins.findOne({ email });

    if (!admin) {
      console.log("admin not found");
      return {success:false};
    }

    const isMatch = await bcrypt.compare(password, admin.password + "");

    if (isMatch) {
      const { accessToken } = await CreateToken({
        id: admin._id + "",
        email: admin.email,
        isAdmin:true
      });
      return { success: true, accessToken };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error logging in admin:", error);
    return null;
  }
};
