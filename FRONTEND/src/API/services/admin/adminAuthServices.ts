import { authAxiosInstance } from "./axios/AxiosInstance";
import Cookies from "js-cookie";

export const adminLogin = async (values: any): Promise<boolean> => {
  try {
    const response = await authAxiosInstance.post("admin/login", values);
    if (response.status === 200) {
      Cookies.set("adminToken", response.data.response.accessToken);
      authAxiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization =
          "Bearer " + response.data.response.accessToken;
        return config;
      });

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
