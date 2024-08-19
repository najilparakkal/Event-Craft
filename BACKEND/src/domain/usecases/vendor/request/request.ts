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
      return await requestRepo.getProfile(vendorId)
    
    } catch (error) {
      console.log(error);
      
    }
  },
  updateProfile: async(userId:string,obj:any ,files:any)=>{
    try {
      
      const datas = {
        phoneNum:obj.phoneNum[0],
        name:obj.name[0],
        about:obj.about[0]
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
  },
  updateBooking:async(bookingId:string,status:string)=>{
    try {
      const response = await requestRepo.updateBooking(bookingId,status)
    } catch (error) {
      console.log(error);
      
    }
  },
  billing:async(datas: { item: string; amount: string }[], bookingId: string, totalAmount: number)=>{
    try {
      const response = await requestRepo.billing(datas,bookingId,totalAmount);
      return response
    } catch (error) {
      console.log(error);
      
    }
  },
  notification:async(userId:string)=>{
    try {
      return await requestRepo.notification(userId)
    } catch (error) {
      console.log(error)
    }
  },
  room:async(venorId:string)=>{
    try {
      return await requestRepo.room(venorId)
    } catch (error) {
      console.log(error)
    }
  },
  review:async(vendorId:string)=>{
    try {
      return await requestRepo.review(vendorId)
    } catch (error) {
      console.log(error)
    }
  },
  wallet:async(vendorId:string)=>{
    try {
      return await requestRepo.wallet(vendorId)
    } catch (error) {
      console.log(error)
    }
  },
  enquerys:async(vendorId:string)=>{
    try {
      return await requestRepo.enquerys(vendorId)
    } catch (error) {
      console.log(error)
    }
  },
  readEnquery:async(enqId:string,vendorId:string)=>{
    try {
      return await requestRepo.readEnquery(enqId,vendorId)
    } catch (error) {
      console.log(error)
    }
  },
  counts:async()=>{
    try {
      return await requestRepo.counts()
    } catch (error) {
      console.log(error)
    }
  },
  postData:async(postId:string)=>{
    try {
      return await requestRepo.postData(postId)
    } catch (error) {
      console.log(error)
    }
  },
  deletePost:async(postId:string)=>{
    try {
      return await requestRepo.deletePost(postId)
    } catch (error) {
      console.log(error)
    }
  }
}