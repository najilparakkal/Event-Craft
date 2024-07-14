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

export const fetchRequest = async (vendorId: string) => {
  try {
    const response = await authAxiosInstance.get(`vendor/requsts/${vendorId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const cancelRequest = async (roomId: string) => {
  try {
    const response = await authAxiosInstance.delete(`vendor/removeRequest/${roomId}`);
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};

export const acceptRequest = async (userId: string, vendorId: string) => {
  try {
    const response = await authAxiosInstance.post("vendor/acceptRequest", {
      userId,
      vendorId,
    });
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = async (vendorId: string) => {
  try {
    const response = await authAxiosInstance.get(
      `vendor/fetchUsers/${vendorId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMessages = async (chatId: string) => {
  try {
    const response = await authAxiosInstance.get(
      `/vendor/getMessages/${chatId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const storeMessages = async (
  vendorId: string,
  userId: string,
  content: string
) => {
  try {
    const response = await authAxiosInstance.post("/vendor/chats", {
      vendorId,
      userId,
      content, // Include content in the request
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchChatId = async (userId: string, vendorId: string) => {
  try {
    const response = await authAxiosInstance.get(
      `vendor/chatId/${userId}/${vendorId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const userBookings = async (vendorId: string) => {
  try {
    const response = await authAxiosInstance.get(`vendor/bookings/${vendorId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelBooking = async (bookingId: string) => {
  try {
    const response = await authAxiosInstance.delete(
      `vendor/cancelBooking/${bookingId}`
    );
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};

export const acceptBooking = async (bookingId: string) => {
  try {
    const resoponse = await authAxiosInstance.patch(
      `vendor/acceptBooking/${bookingId}`
    );
    
    return resoponse.data;
  } catch (error) {
    console.log(error);
  }
};
