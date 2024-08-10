import {
  AddBookingParams,
  IMessageRequest,
  cancelReq,
} from "../../../entities/user/user";
import { IRatingReviewResponse } from "../../../entities/vendor/vendor";
import {
  listServices,
  listVendors,
  getVendorProfile,
  addRequest,
  listRequest,
  cancelRequest,
  listVendorsInUserChat,
  chatId,
  addBooking,
  getBookings,
  cancelBooking,
  listAll,
  getProfile,
  updateUser,
  getDatesOfVendor,
  getPosts,
  updateLike,
  newComment,
  getComments,
  newReply,
  commentLike,
  replyLike,
  ratingReview,
  addReview,
  vendorLike,
  likedPosts,
  likedVendors,
  userBooked,
  requestCheck,
  submitReport,
  notification,
  roomIds,
  userBills,
  billPay,
  paidBill,
} from "../../../repositories/user/homeRepo";

export default {
  listVendors: async (data: string) => {
    try {
      const response = await listVendors(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  listAll: async () => {
    try {
      const response = await listAll();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  listServices: async () => {
    try {
      const response = await listServices();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getVendorProfile: async (data: string, userId: string) => {
    try {
      const response = await getVendorProfile(data, userId);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  addRequest: async (data: IMessageRequest) => {
    try {
      const response = await addRequest(
        data.userId + "",
        data.message + "",
        data.vendorId + ""
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  listRequest: async (userId: string) => {
    try {
      const response = await listRequest(userId);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  cancelRequest: async (data: cancelReq) => {
    try {
      const response = await cancelRequest(data.chatId + "");
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getChatId: async (data: any) => {
    try {
      const response = await chatId(data.userId, data.vendorId);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  addBookind: async (data: AddBookingParams) => {
    try {
      const response = await addBooking(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getBookings: async (id: string) => {
    try {
      const response = await getBookings(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  cancelBooking: async ( bookingId: any) => {
    try {

      const response = await cancelBooking( bookingId);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getProfile: async (userId: string) => {
    try {
      const response = await getProfile(userId);
      const datas = {
        userName: response?.userName,
        phoneNum: response?.phoneNum,
        email: response?.email,
        registered: response?.registered,
        profilePicture: response?.profilePicture,
        wallet: "",
      };
      return datas;
    } catch (err) {
      console.log(err);
    }
  },
  updateProfile: async (userId: string, obj: any, files: any) => {
    try {
      const datas = {
        phoneNum: obj.phoneNum[0],
        name: obj.name[0],
      };
      const response = await updateUser(userId, datas, files);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getDates: async (vendorId: string) => {
    try {
      const response = await getDatesOfVendor(vendorId);
      const dates = response?.availableDate;
      return dates;
    } catch (error) {
      console.log(error);
    }
  },
  getPosts: async (userId: string) => {
    try {
      const response = await getPosts(userId);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  updteLike: async (userId: string, postId: string) => {
    try {
      await updateLike(userId, postId);
    } catch (err) {
      console.log(err);
    }
  },
  newComment: async (userId: string, postId: string, comment: string) => {
    try {
      return await newComment(userId, postId, comment);
    } catch (error) {
      console.log(error);
    }
  },
  getComments: async (postId: string) => {
    try {
      const response = await getComments(postId);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  newReply: async (commentId: string, reply: string) => {
    try {
      return await newReply(commentId, reply);
    } catch (error) {
      console.log(error);
    }
  },
  commentLike: async (commentId: string, userId: string) => {
    try {
      return await commentLike(commentId, userId);
    } catch (error) {
      console.log(error);
    }
  },
  replyLike: async (commentId: string, userId: string) => {
    try {
      return await replyLike(commentId, userId);
    } catch (error) {
      console.log(error);               
    } 
  },    
    ratingReview: async (
    vendorId: string
  ): Promise<IRatingReviewResponse | null> => {
    try {
      const { vendorName, about, ratingAndReview } = await ratingReview(vendorId) as unknown as IRatingReviewResponse
      return { vendorName, about, ratingAndReview };
    } catch (error) {
      console.log(error);
      return null
    }
  },
  addReview:async(userId:string,vendorId:string,star:number,review:string)=>{
    try {
      return await addReview(userId,vendorId,star,review)
    } catch (error) {
      console.log(error)
    }
  },
  vendorLike:async(userId:string,vendorId:string)=>{
    try {
      return await vendorLike(userId,vendorId)
    } catch (error) {   
      console.log(error)
    }
  },
  likedPosts:async(userId:string)=>{
    try{
     return await likedPosts(userId)
    }catch(err){
      console.log(err)
    }
  },
  likedVendors:async(userId:string)=>{
    try {
      return await likedVendors(userId)
    } catch (error) {
      console.log(error)
    }
  },
  userBooked:async(userId:string)=>{
    try {
      return await userBooked(userId)
    } catch (error) {
      console.log(error)
    }
  },
  requestcheck:async(userId:string,vendorId:string)=>{
    try {
      return await requestCheck(userId,vendorId)
    } catch (error) {
      console.log(error)
    }
  },
  submitReport:async(userId:string,vendorId:string,boxReason:string,reason:string)=>{
    try {
      return await submitReport(userId,vendorId,boxReason,reason)
    
    } catch (error) {
      console.log(error)
    }
  },
  notification:async(vendorId:string)=>{
    try {
      return await notification(vendorId)
    } catch (error) {
      console.log(error)
    }
  },
  roomIds:async(userId:string)=>{
    try {
      return await roomIds(userId)
    } catch (error) {
      console.log(error)
    }
  },
  userBills:async(userId:string)=>{
    try {
      return await userBills(userId)
    } catch (error) {
      console.log(error)
    }
  },
  billPay:async(billId:string,amount:number)=>{
    try {
     return  await billPay(billId,amount)
    } catch (error) {
      console.log(error)
    }
  },
  paidBills:async(userId:string)=>{
    try {
      return await paidBill(userId)
           } catch (error) {
      console.log(error)
    }
  }
};

export const fetchVendors = async (data: string) => {
  try {
    const response = await listVendorsInUserChat(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
