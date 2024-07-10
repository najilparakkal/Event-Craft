import ChatModel from "../../../framworks/database/models/chatModal";
import { ILicence } from "../../../framworks/database/models/licence";
import { Request } from "../../../framworks/database/models/requests";
import { Services } from "../../../framworks/database/models/services";
import { Users } from "../../../framworks/database/models/user";
import { Vendors } from "../../../framworks/database/models/vendor";
import {
  IReqVendor,
  IRequest,
  Vendor,
  VendorProfile,
} from "../../entities/vendor/vendor";

export const listVendors = async (data: string) => {
  try {
    const vendors = await Vendors.find({ vendor: true })
      .populate<{
        licence: ILicence[];
      }>("licence")
      .exec();

    const filteredVendors = vendors.filter((vendor) =>
      vendor.licence.some((licence) => {
        const services = licence.services
          .split(",")
          .map((service) => service.trim().toLowerCase());
        return services.includes(data.toLowerCase());
      })
    );

    const vendorsWithDetails = filteredVendors.map((vendor) => ({
      _id: vendor._id,
      vendorName: vendor.vendorName,
      email: vendor.email,
      phoneNum: vendor.phoneNum,
      profilePicture: vendor.licence[0]?.profilePicture,
    }));
    return vendorsWithDetails;
  } catch (error) {
    console.error("Error listing vendors:", error);
    return [];
  }
};

export const listServices = async () => {
  try {
    const services = await Services.find();
    return services;
  } catch (error) {
    console.log(error);
  }
};

export const getVendorProfile = async (
  vendorId: string
): Promise<VendorProfile | undefined> => {
  try {
    const vendor = (await Vendors.findById(vendorId)
      .populate("licence")
      .exec()) as (Vendor & Document) | null;

    if (!vendor) {
      throw new Error("Vendor not found");
    }
    
    const { vendorName, phoneNum, licence,coverPicture } = vendor;
    const profilePicture = licence[0]?.profilePicture || "";
    const businessName = licence[0]?.businessName || "";
    const location = licence[0]?.location || "";
    const response: VendorProfile = {
      vendorName,
      phoneNum,
      profilePicture,
      businessName,
      location,
      coverPicture
    };
    return response;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const addRequest = async (
  userId: string,
  message: string,
  vendorId: string
) => {
  try {
    const getUser = await Users.findById(userId);
    console.log(userId,vendorId,"iuffhiuw");
    
    const addRequest = await Request.create({
      name: getUser?.userName,
      message: message,
      userId: getUser?._id,
      vendorId: vendorId,
    });
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const listRequest = async (
  userId: string
): Promise<
  (IRequest & { vendorName: string; vendorProfilePicture: string })[]
> => {
  try {
    const requests: IRequest[] = await Request.find({ userId });
    const vendorIds: string[] = requests.map((request) => request.vendorId);
    const vendors: IReqVendor[] = await Vendors.find({
      _id: { $in: vendorIds },
    });
    const vendorMap: { [key: string]: IReqVendor } = vendors.reduce(
      (acc: { [key: string]: IReqVendor }, vendor) => {
        acc[vendor._id] = vendor;
        return acc;
      },
      {}
    );
    const combinedData: (IRequest & {
      vendorName: string;
      vendorProfilePicture: string;
    })[] = requests.map((request) => {
      const vendor = vendorMap[request.vendorId];
      return {
        ...request,
        vendorName: vendor.vendorName,
        vendorProfilePicture: vendor.profilePicture,
        vendorId: request.vendorId,
        requested: request.requested,
      };
    });

    return combinedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const cancelRequest = async (userId: string, vendorId: string) => {
  try {
    const request = await Request.findOneAndDelete({ userId, vendorId });
    if (!request) {
      throw new Error("Request not found");
    }
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};
export const listVendorsInUserChat = async (userId: string) => {
  try {
    const chats = await ChatModel.find({ users: userId });
    const vendorIds = chats.map((chat) =>
      chat.users.find((user) => user.toString() !== userId)
    );

    const vendors = await Vendors.find({ _id: { $in: vendorIds } });
    return vendors;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    throw error;
  }
};

export const chatId = async(userId:string,vendorId:string) => {
  try {
    const chat = await ChatModel.findOne({
      $and: [  
        { users: userId },
        { users: vendorId }
      ]
    }); 

    if (chat) {
      return chat._id.toString();
    } else {
      throw new Error("Chat not found");
    }
  } catch (error) {
    console.log(error);
  }
}
