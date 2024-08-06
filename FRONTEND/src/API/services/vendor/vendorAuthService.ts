import { AxiosResponse } from "axios";
import { authAxiosInstance } from "./axios/AxiosInstance";
import { useDispatch } from "react-redux";
import { logout } from "./aurhSlice";
import Cookies from "js-cookie";

export const vendorRegister = async (
  endpoint: string,
  vendorData: vendorDetails
): Promise<authResponse> => {
  try {
    const response = await authAxiosInstance.post(endpoint, vendorData);
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 201) {
      throw new Error("vendor already exists");
    } else {
      throw new Error("An unexpected error occurred");
    }
  } catch (error: any) {
    console.error(
      "vendorRegister error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const verifyOtp = async (otp: string): Promise<boolean> => {
  const vendor: string | null = localStorage.getItem("vendorDetails");
  if (vendor !== null) {
    const vendorDetails = JSON.parse(vendor);

    if (!vendorDetails) {
      console.error("vendor email not found in localStorage");
      return false;
    }
    try {
      const response = await authAxiosInstance.post("/vendor/otp", {
        otp,
        vendorDetails,
      });

      return response.status === 200;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return false;
    }
  }
  return false;
};

export const resendOtp = async (vendorEmail: any) => {
  try {
    const email = vendorEmail;
    await authAxiosInstance.post("/vendor/resendOtp", { email });
  } catch (error) {
    console.error("Error resending OTP:", error);
    return false;
  }
};

export const login = async (
  endpoint: string,
  vendorDetails: vendorDetails
): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await authAxiosInstance.post(
      endpoint,
      vendorDetails
    );
    if (response.status === 200) {
      return response.data.response;
    } else if (response.status === 203) {
      throw new Error("You Are Blocked");
    } else if (response.status === 202) {
      throw new Error("Password is not correct");
    } else if (response.status === 201) {
      throw new Error(" vendor Not Found");
    } else {
      throw new Error("Vendor login failed");
    }
  } catch (error: any) {
    throw new Error(error.message || "vendor Not Found");
  }
};

export const validEmail = async (email: string) => {
  try {
    const response = await authAxiosInstance.put("/vendor/validEmail", {
      email,
    });
    console.log(response);

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

export const forgotVerifyOtp = async (
  otp: string,
  email: string
): Promise<boolean> => {
  try {
    const response = await authAxiosInstance.post("/vendor/verifyFotp", {
      otp,
      email,
    });
    return response.status === 200;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
};

export const changePassword = async (password: string, email: string) => {
  try {
    const response = await authAxiosInstance.put("/vendor/forgotPassword", {
      password,
      email,
    });
    return response.status === 200;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
};

export const vendorLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("vendorDetails");
    Cookies.remove("jwt");
    dispatch(logout());
  };
  return handleLogout;
};
