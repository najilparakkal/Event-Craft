import {
  IVendors,
  ILogin,
  IcheckFOtp,
  IforgotPasswod,
  IotpVeri,
  IresendOtp,
  IvarifyEmail,
} from "../../../entities/vendor/vendor";
import { checkingVendor } from "../../../helpers/chekingVendors";
import { sendOTP } from "../../../helpers/nodmailer";
import { Encrypt } from "../../../helpers/passwordHashing";
import {
  RegisterVendor,
  checkOtp,
  updateOtp,
  logingVendor,
  checkingEmail,
  checkingOtp,
  updatePassword,
  RegisterWithGoogle,
} from "../../../repositories/vendor/authRepositories";

export default {
  signup: async (data: IVendors) => {
    const hashedPassword: string = await Encrypt.cryptPassword(
      data.password + ""
    );
    const register = await RegisterVendor(data, hashedPassword);
    return register;
  },
  checkOtp: async (data: IotpVeri) => {
    const response = await checkOtp(data);

    return response;
  },

  resend: async (data: IresendOtp) => {
    try {
      const email: string = data.email;
      const response: string = sendOTP(email);

      const update = await updateOtp(email, response);
      return update;
    } catch (error) {
      console.log(error);
    }
  },
  login: async (data: ILogin) => {
    try {
      const email = data.email;
      const password = data.password;
      const response = await logingVendor(email, password);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  checkEmail: async (data: IvarifyEmail) => {
    try {
      const response = await checkingEmail(data.email);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  checkFotp: async (data: IcheckFOtp) => {
    try {
      const response = await checkingOtp(data.email, data.otp);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  updatePassword: async (data: IforgotPasswod) => {
    try {
      const hashedPassword: string = await Encrypt.cryptPassword(data.password);
      const update = await updatePassword(hashedPassword, data.email);
      return update;
    } catch (error) {
      console.log(error);
    }
  },
  googleRegistration: async (data: any) => {
    try {
      const hashedPassword = await Encrypt.cryptPassword(data.uid);
      const response = await RegisterWithGoogle(data, hashedPassword);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  googleLogin: async (data: any) => {
    try {
      const email = data.email;
      const password = data.uid;

      const response = await logingVendor(email, password);
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
