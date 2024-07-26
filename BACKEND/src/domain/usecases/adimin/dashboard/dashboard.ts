import { uploadImage } from "../../../../config/awsConfig";
import {
  RemoveCategoryData,
  listUsers,
  listVendors,
  rejectingVendor,
  vendorBlock,
} from "../../../entities/admin/admin";
import { vendorReject } from "../../../helpers/nodmailer";
import dashRepositories from "../../../repositories/admin/dashRepositories";

export default {
  listUsers: async (data: listUsers) => {
    console.log(data);

    const response = await dashRepositories.listUsers(data);

    return response;
  },
  listVendors: async (data: listVendors) => {
    const response = await dashRepositories.listVendors(data);
    return response;
  },
  blockorUnblock: async (data: vendorBlock) => {
    try {
      const blockOrUnBlock = await dashRepositories.updateBlock(data);
      return blockOrUnBlock;
    } catch (error) {
      console.log(error);
    }
  },
  blockorUnblockUser: async (data: vendorBlock) => {
    try {
      const blockOrUnBlockUser = await dashRepositories.updateUser(data);
      return blockOrUnBlockUser;
    } catch (error) {
      console.log(error);
    }
  },
  addCategory: async (data: any) => {
    try {
      const category = await dashRepositories.categoryAdding(data);

      return category;
    } catch (error) {
      console.log(error);
    }
  },
  getCategory: async () => {
    try {
      const getCategory = await dashRepositories.listCategory();

      return getCategory;
    } catch (error) {
      console.log(error);
    }
  },
  removeCategory: async (data: RemoveCategoryData) => {
    try {
      const response = await dashRepositories.updateCategory(data._id);
      return response;
    } catch (error) {
      console.error("Error in dashboardService.removeCategory:", error);
      throw error;
    }
  },
  listRequest: async () => {
    try {
      const response = await dashRepositories.listRequest();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  rejectVendor: async (data: rejectingVendor) => {
    try {
      const response = await dashRepositories.rejectVendor(data.id);
      if (response?.success) {
        if (response?.email) vendorReject(response.email, data.reason);
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
  acceptVendor: async (id: string) => {
    try {
      const response = await dashRepositories.acceptVendor(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getDashboard: async () => {
    try {
      const response = await dashRepositories.getDashboard();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getBookings: async () => {
    try {
      return await dashRepositories.getBookings();
    } catch (error) {
      console.log(error);
    }
  },
  refundBooking:async(refund:number,bookingId:string)=>{
    try {
      return await dashRepositories.refund(refund,bookingId)
      
    } catch (error) {
      console.log(error);
      
    }
  }
};
