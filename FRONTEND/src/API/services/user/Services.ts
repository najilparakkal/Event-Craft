import { authAxiosInstance } from "./axios/AxiosInstance";

export const fetchVendors = async (data: string) => {
  try {
    const response = await authAxiosInstance.post("user/vendors", { data });
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchServices = async () => {
  try {
    const response = await authAxiosInstance.get("user/services");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchVendorDetails = async (data: string) => {
  try {
    const response = await authAxiosInstance.get(`user/vendorProfile/${data}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addRequest = async (
  message: string,
  userId: string,
  vendorId: string
) => {
  try {
    const data = {
      message,
      userId,
      vendorId,
    };
    const response = await authAxiosInstance.post("user/addRequest", data);
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRequest = async (userId: string) => {
  try {
    const response = await authAxiosInstance.get(`user/request/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelRequest = async (roomId: string) => {
  try {
    const response = await authAxiosInstance.post("user/cancelRequest", {
      roomId,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchVendorsInChat = async (userId: string) => {
  try {
    const response = await authAxiosInstance.get(`user/fetchVendors/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchChatId = async (userId: string, vendorId: string) => {
  try {
    const response = await authAxiosInstance.get(
      `user/chatId/${userId}/${vendorId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addBooking = async (
  datas: BookingData,
  userId: string,
  vendorId: string,
  amount: number
) => {
  try {
    const response = await authAxiosInstance.post("user/addBooking", {
      datas,
      userId,
      vendorId,
      amount,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const vendorBookings = async (userId: string) => {
  try {
    const response = await authAxiosInstance.get(`user/bookings/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelBooking = async (percentage: number, bookingId: string) => {
  try {
    const response = await authAxiosInstance.delete("user/cancelBooking", {
      params: {
        percentage,
        bookingId,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
