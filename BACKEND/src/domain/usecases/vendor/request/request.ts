import { IAcceptRequest, IVendorRequestDetails, reject } from "../../../entities/vendor/vendor";
import requestRepo from "../../../repositories/vendor/requestRepo";


export default{
    
  request: async (datas:IVendorRequestDetails, images:any) => {
    try {
      const response = await requestRepo.addRequest(datas, images);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  listRequests:async(id:string)=>{
    try {
      
      const response = await requestRepo.listRequestsForVendor(id);
      return response;
    } catch (error) {
      console.log(error);
      
    }
  },
  acceptRequest:async(data:IAcceptRequest)=>{
    try {
      const response = await requestRepo.acceptRequest(data.userId,data.vendorId);
      return response;
    } catch (error) {
      console.log(error);
      
    }
  },
  rejectRequest:async(roomId:string)=>{
    try {
      const response = await requestRepo.rejectRequest(roomId);
      return response;
    } catch (error) {
      console.log(error);
      
    }
  },
  fetchUsers:async(vendorId:string)=>{
    // try {
    //   const response = await requestRepo.fetchUsers(vendorId);
    //   return response;
    // } catch (error) {
    //   console.log(error);
      
    // }
  },
  fetchMessages:async(chatId:string)=>{
    try {
      const response = await requestRepo.fetchMessages(chatId)
      return response;
    } catch (error) {
      console.log(error);
      
    }
  },
  storeMessage:async(data:any)=>{
    // try {
    //   const { vendorId, userId, content } =data;
    //   const response = await requestRepo.storeMessage(vendorId, userId, content);
    // } catch (error) {
    //   console.log(error);
      
    // }
  },     
  fetchChatId:async(vendorId:string,userId:string)=>{
    try {
      const response = await requestRepo.fetchChatId(vendorId, userId);
      return response;
    } catch (error) {
      console.log(error);
      
    }
  },
  getBookings:async(vendorId:string)=>{
    try {
      const response = await requestRepo.getBookings(vendorId)
      return response
    } catch (error) {
      console.log(error);
      
    }
  },
  cancelBooking:async(bookingId:string)=>{
    try {
      const response = await requestRepo.cancelBooking(bookingId)
      return response
    } catch (error) {
      console.log(error);
      
    }
  },
  acceptBooking:async(bookingId:string) => {
    try {
      const response = await requestRepo.acceptBooking(bookingId)
      return response
    } catch (error) {
      console.log(error);
      
    }
  },
  getProfile:async(vendorId:string)=>{
    try {
      const response = await requestRepo.getProfile(vendorId)
      const datas = {
        vendorName: response?.vendorName,
        email: response?.email,
        phoneNum: response?.phoneNum,
        profilePicture: response?.profilePicture,
        coverPicture: response?.coverPicture,
        verified: response?.verified,
        blocked: response?.blocked,
        posts: response?.posts,
        licence: response?.licence,
        registered:response?.registered
      };      
      return datas
    } catch (error) {
      console.log(error);
      
    }
  },
  updateProfile: async(userId:string,obj:any ,files:any)=>{
    try {
      
      const datas = {
        phoneNum:obj.phoneNum[0],
        name:obj.name[0],
      }
      const response = await requestRepo.updateVendor(userId,datas,files)
      return response
    } catch (error) {
      console.log(error);
      
    }
  },
  getDates:async(vendorId:string)=>{
    try {
      const response = await requestRepo.getDates(vendorId)
      return response
    } catch (error) {
      console.log(error);
      
    }
  },
  updateDates:async(vendorId:string,dates:[])=>{
    try {
      const response = await requestRepo.updateDates(vendorId,dates)
      return response 
    } catch (error) {
      console.log(error);
      
    }
  }
}