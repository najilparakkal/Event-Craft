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
  rejectRequest:async(data:reject)=>{
    try {
      const response = await requestRepo.rejectRequest(data.userId,data.vendroId);
      return response;
    } catch (error) {
      console.log(error);
      
    }
  },
  fetchUsers:async(vendorId:string)=>{
    try {
      const response = await requestRepo.fetchUsers(vendorId);
      return response;
    } catch (error) {
      console.log(error);
      
    }
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
  }
}