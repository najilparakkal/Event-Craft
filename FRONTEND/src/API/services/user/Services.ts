import { authAxiosInstance } from "./axios/AxiosInstance";
import { outerAxios } from "../outer/axios";
import { string } from "yup";

export const fetchVendors = async (data: string) => {
  try {
    const response = await authAxiosInstance.post("user/vendors", { data });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOuterServices = async () => {
  try {
    const response = await outerAxios.get("user/OterServices");
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

export const fetchVendorDetails = async (data: string, userId: string) => {
  try {
    const response = await authAxiosInstance.get(`user/vendorProfile/${data}`, {
      params: { userId },
    });
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
  amount: number,
  paymentDetails: { paymentId: string }
) => {
  try {
    const response = await authAxiosInstance.post("user/addBooking", {
      datas,
      userId,
      vendorId,
      amount,
      paymentDetails,
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

export const cancelBooking = async (bookingId: string) => {
  try {
    const response = await authAxiosInstance.post("user/cancelBooking", {
      bookingId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserDatas = async (userId: string) => {
  try {
    const response = await authAxiosInstance.get(`user/profile/${userId}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const udpdateUser = async (userId: string, datas: any) => {
  try {
    const response = await authAxiosInstance.put(
      `user/updateProfile/${userId}`,
      datas,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.status === 200 ? response.data : false;
  } catch (error) {
    console.log(error);
  }
};

export const vendorAbsend = async (vendorId: string) => {
  try {
    const response = await authAxiosInstance.get(
      `user/vendorDates/${vendorId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchPosts = async (userId: string) => {
  try {
    const response = await authAxiosInstance.get(`user/posts/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateLike = async (postId: string, userId: string) => {
  try {
    await authAxiosInstance.put(`user/updateLike/${userId}/${postId}`);
  } catch (error) {
    console.log(error);
  }
};
export const fetchComments = async (postId: string) => {
  try {
    const response = await authAxiosInstance.post("user/comments", { postId });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const postComment = async (
  postId: string,
  newComment: string,
  userId: string
) => {
  try {
    await authAxiosInstance.post(`user/newComment/${postId}/${userId}`, {
      newComment,
    });
  } catch (error) {
    console.log(error);
  }
};

export const replySubmit = async (commentId: string, reply: string) => {
  try {
    await authAxiosInstance.post(`user/commentReply/${commentId}`, { reply });
  } catch (error) {
    console.log(error);
  }
};
export const updateCommentLike = async (commentId: string, userId: string) => {
  try {
    await authAxiosInstance.put("user/commentLike", { commentId, userId });
  } catch (error) {
    console.log(error);
  }
};

export const updateReplyLike = async (commentId: string, userId: string) => {
  try {
    await authAxiosInstance.put("user/replyLike", { commentId, userId });
  } catch (error) {
    console.log(error);
  }
};
export const fetchRatingReview = async (vendorId: string) => {
  try {
    const response = await authAxiosInstance.get(
      `user/ratingreview/${vendorId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addRatingAndReview = async (
  userId: string,
  vendorId: string,
  star: number,
  review: string
) => {
  try {
    await authAxiosInstance.put(`user/addReview/${userId}/${vendorId}`, {
      star,
      review,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addVendorLike = async (userId: string, vendorId: string) => {
  try {
    await authAxiosInstance.put(`user/vendorLike/${userId}/${vendorId}`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchLikedPosts = async (userId: string) => {
  try {
    const response = await authAxiosInstance.get(`user/likedPosts/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLikedVendors = async (userId: string) => {
  try {
    const response = await authAxiosInstance.get(`user/likedVendors/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkUserBooked = async (userId: string) => {
  try {
    const response = await authAxiosInstance.get(`user/userBooked/${userId}`);
    console.log(response);
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};

export const checkRequest = async (userId: string, vendorId: string) => {
  try {
    const response = await authAxiosInstance.get(
      `user/requestcheck/${userId}/${vendorId}`
    );
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};

export const submitReport = async (
  boxReason: string,
  reason: string,
  userId: string,
  vendorId: string
) => {
  try {
    const response = await authAxiosInstance.post(
      `user/submitReport/${userId}/${vendorId}`,
      { boxReason, reason }
    );
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};

export const fetchVendorNotification = async (vendorId: string) => {
  try {
    const response = await authAxiosInstance.get(
      `user/notifications/${vendorId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserRoomIds = async (userId: string) => {
  try {
    const response = await authAxiosInstance.get(`user/roomIds/${userId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const userBills = async (userId: string) => {
  try {
    const resonse = await authAxiosInstance.get(`user/userBills/${userId}`);
    return resonse.data;
  } catch (error) {
    console.log(error);
  }
};
export const payingBill = async (billingId: string, amount: number) => {
  try {
    const response = await authAxiosInstance.post(`user/billPay/${billingId}`, {
      amount,
    });
    return response.status === 200;
  } catch (err) {
    console.log(err);
  }
};

export const paidBills = async (userId: string) => {
  try {
    const response = await authAxiosInstance.get(`user/paidBills/${userId}`);
    return response.status === 200 ? response.data : false;
  } catch (error) {
    console.log(error);
  }
};
