import { IVendorRequestDetails } from "../../../entities/vendor/vendor";
import requestRepo from "../../../repositories/vendor/requestRepo";


export default{
    
  request: async (datas:IVendorRequestDetails, images:any) => {
    try {
      const response = await requestRepo.addRequest(datas, images);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}