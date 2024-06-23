import { response } from "express";
import { Users } from "../../../framworks/database/models/user";
import {
  CreateUserResponse,
  IUser,
  OtpResponse,
  googleRegistration,
  userDatas,
} from "../../entities/user/user";
import { checkingUser } from "../../helpers/checkingUser";
import { sendOTP } from "../../helpers/nodmailer";
import { otpVeri } from "../../entities/user/user";
import bcrypt from "bcrypt";
import { CreateToken } from "../../helpers/jwtGenarate";

export const createUser = async (
  userData: IUser,
  hashedPassword: string
): Promise<CreateUserResponse | any> => {
  try {
    if (
      !userData.email ||
      !userData.name ||
      !userData.password ||
      !userData.phoneNum
    ) {
      throw new Error("Required fields are missing");
    }

    const checkResponse = await checkingUser(userData);

    if (checkResponse.success === false) {
      return checkResponse;
    } else if (checkResponse.success === true) {
      const otp: string = sendOTP(userData.email);

      const newUser = await Users.create({
        userName: userData.name,
        email: userData.email,
        password: hashedPassword,
        phoneNum: userData.phoneNum,
        otp: {
          value: otp,
        },
      });
      const token = await CreateToken(
        { id: newUser._id, email: newUser.email },
        true
      );

      const userDatas: userDatas = {
        id: newUser._id as string,
        email: newUser.email,
        phoneNum: newUser.phoneNum,
        name: newUser.userName,
      };

      return { checkResponse, userDatas, token };
    }
  } catch (err) {
    console.error("An error occurred while creating the user:", err);
    return { success: false, message: "An error occurred" };
  }
};

export const validOtp = async (data: otpVeri): Promise<OtpResponse | any> => {
  try {
    console.log(data);

    const user = await Users.findOne({ email: data.userDetails.email });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (user.otp?.value === data.otp) {
      return { success: true, message: "OTP verified successfully" };
    } else {
      return { success: false, message: "Invalid OTP" };
    }
  } catch (error) {
    console.error("An error occurred during OTP verification:", error);
    return { success: false, message: "An error occurred" };
  }
};

export const forgotValidOtp = async (
  data: otpVeri
): Promise<OtpResponse | any> => {
  try {
    const user = await Users.findOne({ email: data.email });
    
    if (!user) return { success: false, message: "User not found" };

    if (user.otp+"" === data.otp) {
      return { success: true, message: "OTP verified successfully" };
    } else {
      return { success: false, message: "Invalid OTP" };
    }
  } catch (error) {
    console.error("An error occurred during OTP verification:", error);
    return { success: false, message: "An error occurred" };
  }
};

export const updateOtp = async (
  email: string,
  otp: string
): Promise<boolean> => {
  try {
    const result = await Users.findOneAndUpdate(
      { email: email },
      {
        $set: {
          "otp": otp,
        },
      },
      { new: true }
    );

    if (result) {
      console.log("OTP updated successfully for email:", email);
      return true;
    } else {
      console.log("No user found with email:", email);
      return false;
    }
  } catch (error) {
    console.error("Error updating OTP:", error);
    return false;
  }
};

export const logingUser = async (email: string, password: string) => {
  try {
    const user = await Users.findOne({ email });

    if (!user) {
      console.log("User not found");
      return false;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const userDetails = {
        email: user.email,
        phoneNum: user.phoneNum,
        userName: user.userName,
        id: user._id,
      };

      const token = await CreateToken(
        { id: user._id, email: user.email },
        true
      );
      return { token, userDetails };
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    return null;
  }
};

export const varifyEmail = async (email: string) => {
  try {
    const user = await Users.findOne({ email: email });
    if (user) {
      const otpValue: string = sendOTP(user.email);
      await Users.findOneAndUpdate(
        { email: email },
        { $set: { otp: otpValue } },
        { new: true }
      );

      return { success: true, message: "User found" };
    } else {
      return { success: false, message: "User not found" };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error occurred during email verification",
    };
  }
};

export const validOtpF = async (data: otpVeri): Promise<OtpResponse | any> => {
  try {
    const user = await Users.findOne({ email: data.email });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (user.otp+"" === data.otp) {
      return { success: true, message: "OTP verified successfully" };
    } else {
      return { success: false, message: "Invalid OTP" };
    }
  } catch (error) {
    console.error("An error occurred during OTP verification:", error);
    return { success: false, message: "An error occurred" };
  }
};

export const updatePassword = async (
  userEmail: string,
  hashedPassword: string
): Promise<CreateUserResponse | any> => {
  try {
    const user = await Users.findOneAndUpdate(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );
    if (user) {
      return { success: true, message: "password updated" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const RegisterWithGoogle = async (
  userData: googleRegistration,
  hashedPassword: string
): Promise<CreateUserResponse | any> => {
  try {
    const alreadyRegistered = await Users.findOne({ email: userData.email });
    if (alreadyRegistered) {
      return { success: false, message: "User already registered" };
    } else {
      const newUser = await Users.create({
        userName: userData.name,
        email: userData.email,
        password: hashedPassword,
      });
      const userDatas: userDatas = {
        id: newUser._id + "",
        email: newUser.email,
        phoneNum: newUser.phoneNum,
        name: newUser.userName,
      };

      const token = await CreateToken(
        { id: newUser._id, email: newUser.email },
        true
      );
      return {
        success: true,
        message: "User registered successfully",
        token,
        userDatas,
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occurred during registration" };
  }
};

export { CreateUserResponse };
