import { Admins } from "../../../framworks/database/models/admin";
import bcrypt from "bcrypt";




export const logingadmin = async (email: string, password: string) => {
  try {
    
    const admin = await Admins.findOne({ email });
    
    if (!admin) {
      console.log("admin not found");
      return false;
    }

    const isMatch = await bcrypt.compare(password, admin.password + "");
    
    if (isMatch) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error logging in admin:", error);
    return null;
  }
};
