import { listUsers, listVendors, vendorBlock } from "../../../entities/admin/admin";
import dashRepositories from "../../../repositories/admin/dashRepositories";


export default{
      listUsers :async(data:listUsers)=>{
        console.log(data);
        
       const response = await dashRepositories.listUsers(data)
       
       return response
      } ,
      listVendors:async(data:listVendors)=>{
        const response = await dashRepositories.listVendors(data)
        return response
      },
      blockorUnblock:async(data:vendorBlock)=>{
        try {
            const blockOrUnBlock  = await dashRepositories.updateBlock(data)
            return blockOrUnBlock
        } catch (error) {
            console.log(error);
            
        }
      },
      blockorUnblockUser:async(data:vendorBlock)=>{
        try {
            const blockOrUnBlockUser = await dashRepositories.updateUser(data)
                return blockOrUnBlockUser
            
        } catch (error) {
            console.log(error);
            
        }
      }
}   