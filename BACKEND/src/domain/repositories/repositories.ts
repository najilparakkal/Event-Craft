import { response } from "express";
import { Users } from "../../framworks/database/models/user";
import { IUser } from "../entities/user/user";
import { checkingUser } from "../helpers/checkingUser";
import { sendOTP } from "../helpers/nodmailer";
import { otpVeri } from "../entities/user/user";
import bcrypt from 'bcrypt';
import { CreateToken } from "../helpers/jwtGenarate";
export interface CreateUserResponse {
  success: boolean;
  message?: string;
}

export interface OtpResponse {
  success: boolean;
  message?: string;
}

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

      const userEmail = newUser.email;

      return { checkResponse, userEmail };
    }
  } catch (err) {
    console.error("An error occurred while creating the user:", err);
    return { success: false, message: "An error occurred" };
  }
};

export const validOtp = async (data: otpVeri): Promise<OtpResponse | any> => {
  try {
    const user = await Users.findOne({ email: data.userEmail });

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

export const updateOtp = async (
  email: string,
  otp: string
): Promise<boolean> => {
  try {
    const result = await Users.findOneAndUpdate(
      { email: email },
      {
        $set: {
          "otp.value": otp,
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
      console.log('User not found');
      return null; 
    }

    console.log(user, "user");

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      const token = await CreateToken({ id: user._id, email: user.email }, true)
      return token      
    } else {
      return false;
    }

  } catch (error) { 
    console.error('Error logging in user:', error);
    return null;
  }
};
