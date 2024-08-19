import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { logout } from "./authSlice";
import { authAxiosInstance } from "../vendor/axios/AxiosInstance";
import Cookies from "js-cookie";

interface userData {
  name?: string;
  email?: string;
  phoneNum?: string;
  password?: string;
  uid?: string;
}

interface authResponse {
  token: any;
  response: any;
  user: {
    userDatas: {
      [x: string]: any;
      id: string;
      email: string;
      name: string;
      phoneNum: string;
    };
    token: string;
  };
  message: string;
  status: number;
}

export const userRegister = async (
  endpoint: string,
  userData: userData
): Promise<authResponse> => {
  try {
    const response: AxiosResponse<authResponse> = await authAxiosInstance.post(
      endpoint,
      userData
    );

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 201) {
      throw new Error("User already exists");
    } else {
      throw new Error("An unexpected error occurred");
    }
  } catch (error: any) {
    console.error("userRegister error:", error.response?.data || error.message);
    throw error;
  }
};

export const verifyOtp = async (otp: string): Promise<boolean> => {
  const user: string | null = localStorage.getItem("userDetails");
  if (user !== null) {
    const userDetails = JSON.parse(user);

    if (!userDetails) {
      console.error("User email not found in localStorage");
      return false;
    }

    try {
      const response = await authAxiosInstance.post("/user/otp", {
        otp,
        userDetails,
      });
      return response.status === 200;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return false;
    }
  }
  return false;
};

export const resendOtp = async (userEmail: any) => {
  try {
    const email = userEmail;
    await authAxiosInstance.post("/user/resendOtp", { email });
  } catch (error) {
    console.error("Error resending OTP:", error);
    return false;
  }
};

export const login = async (
  endpoint: string,
  userData: userData
): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await authAxiosInstance.post(
      endpoint,
      userData
    );
    if (response.status === 200) {
      return response.data.response;
    } else if (response.status === 203) {
      throw new Error(" User Is Blocked");
    } else {
      throw new Error("User Not Found");
    }
  } catch (error) {
    throw new Error("User Not Found");
  }
};

export const validEmail = async (email: string) => {
  try {
    const response = await authAxiosInstance.post("/user/validEmail", {
      email,
    });
    if (response.status === 200) {
      localStorage.setItem("email", email);
      return true;
    } else if (response.status === 201) {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
export const forgotOtp = async (otp: string) => {
  const user = localStorage.getItem("email");
  const data = user !== null ? JSON.parse(user) : null;
  const userEmail = data.email;
  if (!userEmail) {
    console.error("User email not found in localStorage");
    return false;
  }
  try {
    const response = await authAxiosInstance.post("/user/verifyOtp", {
      otp,
      userEmail,
    });
    return response.status === 200;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
};

export const forgotVerifyOtp = async (otp: string): Promise<boolean> => {
  const email = localStorage.getItem("email");
  if (!email) {
    console.error("User email not found in localStorage");
    return false;
  }
  try {
    const response = await authAxiosInstance.post("/user/Fotp", {
      otp,
      email,
    });
    return response.status === 200;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
};

export const changePassword = async (password: string) => {
  const email = localStorage.getItem("email");
  try {
    const response = await authAxiosInstance.post("/user/changePassword", {
      password,
      email,
    });
    return response.status === 200;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
};

export const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    Cookies.remove("jwt");
    dispatch(logout());
  };

  return handleLogout;
};
