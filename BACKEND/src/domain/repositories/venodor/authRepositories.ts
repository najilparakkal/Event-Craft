import { Categories } from "../../../framworks/database/models/categorie";
import { Licence } from "../../../framworks/database/models/licence";
import { Vendors } from "../../../framworks/database/models/vendor";
import {
  ICreateVendorResponse,
  IVendors,
  ILogin,
  IgoogleRegistration,
  IotpVeri,
  IvendorDetails,
} from "../../entities/vendor/vendor";
import { checkingVendor } from "../../helpers/chekingVendors";
import { CreateToken } from "../../helpers/jwtGenarate";
import { sendOTP } from "../../helpers/nodmailer";
import bcrypt from "bcrypt";
export const RegisterVendor = async (
  data: IVendors,
  hashedPassword: string
) => {
  try {
    const checkVendor = await checkingVendor(data);
    if (checkVendor.success) {
      const otp: string = sendOTP(data.email + "");
      const newVendor = await Vendors.create({
        vendorName: data.name,
        email: data.email,
        password: hashedPassword,
        phoneNum: data.phoneNum,
        otp: otp,
      });
      const token = await CreateToken(
        { id: newVendor._id, email: newVendor.email },
        true
      );
      const vendorDetails: IvendorDetails = {
        id: newVendor._id + "",
        name: newVendor.vendorName + "",
        email: newVendor.email + "",
        phoneNum: newVendor.phoneNum + "",
      };
      return {
        success: true,
        token: token,
        vendorDetails,
        isVendor: newVendor.vendor,
      };
    } else {
      return { success: false, message: checkVendor.message };
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkOtp = async (data: IotpVeri) => {
  try {
    const findVendor = await Vendors.findOneAndUpdate(
      {
        email: data.vendorDetails.email,
      },
      { $set: { verified: true } }
    );

    if (findVendor?.otp === data.otp) {
      return { success: true, message: "vendor Found" };
    } else {
      return { success: false, message: "Vendor not found" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateOtp = async (
  email: string,
  otp: string
): Promise<boolean> => {
  try {
    const result = await Vendors.findOneAndUpdate(
      { email: email },
      {
        $set: {
          otp: otp,
        },
      },
      { new: true }
    );

    if (result) {
      console.log("OTP updated successfully for email:", email);
      return true;
    } else {
      console.log("No Vendor found with email:", email);
      return false;
    }
  } catch (error) {
    console.error("Error updating OTP:", error);
    return false;
  }
};

export const logingVendor = async (email: string, password: string) => {
  try {
    const vendor = await Vendors.findOne({ email: email, verified: true });

    if (!vendor) {
      console.log("vendor not found");
      return { success: false, message: "vendor not found" };
    }
    if (!password) {
      console.log("No password provided");
      return { success: false, message: "No password provided" };
    }

    if (!vendor.password) {
      console.log("Vendor has no password set");
      return { success: false, message: "Vendor has no password set" };
    }

    const isMatch = await bcrypt.compare(password, vendor.password);

    if (isMatch) {
      const vendorDetails = {
        email: vendor.email,
        phoneNum: vendor.phoneNum,
        vendorName: vendor.vendorName,
        id: vendor._id,
        profilePicture: vendor.profilePicture,
      };
      const token = await CreateToken(
        { id: vendor._id, email: vendor.email },
        true
      );
      return { success: true, token, vendorDetails, isVendor: vendor.vendor };
    } else {
      return { success: false, message: "password not match" };
    }
  } catch (error) {
    console.error("Error logging in vendor:", error);
    return { success: false, message: "An error occurred during login" };
  }
};

export const checkingEmail = async (email: string) => {
  try {
    const findVendor = await Vendors.findOne({ email: email });
    if (findVendor) {
      const otp: string = sendOTP(email);
      await Vendors.findOneAndUpdate({ email: email }, { $set: { otp: otp } });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkingOtp = async (email: string, otp: string) => {
  try {
    console.log(email, otp);

    const findVendor = await Vendors.findOne({ email: email, otp: otp });
    if (findVendor) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (password: string, email: string) => {
  try {
    const update = await Vendors.findOneAndUpdate(
      { email: email },
      { $set: { password: password } }
    );

    if (update) {
      return { seccess: true, message: " password updated successfully" };
    } else {
      return { seccess: false, message: "somthing failed to update" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const RegisterWithGoogle = async (
  data: IgoogleRegistration,
  hashedPassword: string
): Promise<ICreateVendorResponse | any> => {
  try {
    const alreadyRegistered = await Vendors.findOne({ email: data.email });
    if (alreadyRegistered) {
      return { success: false, message: "vendor already registered" };
    } else {
      const newvendor = await Vendors.create({
        vendorName: data.name,
        email: data.email,
        password: hashedPassword,
        verified: true,
      });
      const vendorDetails: IvendorDetails = {
        id: newvendor._id + "",
        email: newvendor.email + "",
        phoneNum: newvendor.phoneNum + "",
        name: newvendor.vendorName + "",
      };

      const token = await CreateToken(
        { id: newvendor._id, email: newvendor.email },
        true
      );
      return {
        success: true,
        message: "vendor registered successfully",
        token,
        vendorDetails,
        isVendor: newvendor.vendor,
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occurred during registration" };
  }
};
