import { IMessageRequest, cancelReq } from "../../../entities/user/user";
import { listServices, listVendors,getVendorProfile, addRequest, listRequest, cancelRequest, listVendorsInUserChat, chatId } from "../../../repositories/user/homeRepo";


export default{
    listVendors:async(data:string)=>{
        try {
          const response = await listVendors(data); 
          return response;
        } catch (error) {
          console.log(error);
        }
      },
      listServices:async()=>{
        try {
          const response = await listServices();
          return response;
        } catch (error) {
          console.log(error);
          
        }
      },
      getVendorProfile:async(data:string)=>{
        try {
            
            const response = await getVendorProfile(data);
            return response
        } catch (error) {
            console.log(error)
        }
      },
      addRequest:async(data:IMessageRequest)=>{
        try {
            const response = await addRequest(data.userId+"",data.message+"",data.vendorId+"");
            return response
        } catch (error) {
            console.log(error);
            
        }
      },
      listRequest:async(userId:string)=>{
        try {
            const response = await listRequest(userId);
            return response
        } catch (error) {
            console.log(error);
            
        }
      },
      cancelRequest:async(data:cancelReq)=>{
        try {
          const response  = await cancelRequest(data.chatId+"")
          return response
        } catch (error) {
          console.log(error);
          
        }
      },
      fetchVendors:async(data:string)=>{
        try {
            const response = await listVendorsInUserChat(data);
            return response;
        } catch (error) {
            console.log(error);
        }
      },
      getChatId:async(data:any)=>{
        try {
          const response = await chatId(data.userId,data.vendorId);
          return response
        } catch (error) {
          console.log(error);
          
        }
      }
} 