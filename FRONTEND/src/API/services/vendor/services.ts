import { LicenseFormValues } from "../../../utils/validations/initialValue";
import { authAxiosInstance } from "./axios/AxiosInstance";

export const uploadRequest = async (values: LicenseFormValues, id: string) => {
  try {
    const data = {
      values,
      id,
    };
    const response = await authAxiosInstance.put("vendor/addRequest", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const response = await authAxiosInstance.get("vendor/getCategories");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = async (postDetails: any, id: string) => {
  try {
    const datas = {
      postDetails,
      id,
    };
    const response = await authAxiosInstance.post(
      `vendor/uploadPost/:${id}`,
      datas,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};


