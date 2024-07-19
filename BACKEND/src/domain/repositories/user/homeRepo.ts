import { uploadImage } from "../../../config/awsConfig";
import { Bookings } from "../../../framworks/database/models/booking";
import ChatModel from "../../../framworks/database/models/chatModal";
import { ILicence } from "../../../framworks/database/models/licence";
import { Request } from "../../../framworks/database/models/requests";
import { Services } from "../../../framworks/database/models/services";
import { Users } from "../../../framworks/database/models/user";
import { Vendors } from "../../../framworks/database/models/vendor";
import { AddBookingParams, IAddBooking } from "../../entities/user/user";
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
      .populate("posts")
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
      profilePicture: vendor.profilePicture,
      posts: vendor.posts,
      coverPicture: vendor.coverPicture,
    }));
    return vendorsWithDetails;
  } catch (error) {
    console.error("Error listing vendors:", error);
    return [];
  }
};

export const listAll = async () => {
  try {
    const services = await Services.find();
    const vendors = await Vendors.find()
      .populate("posts")
      .populate("licence")
      .exec();
    return { services, vendors };
  } catch (error) {
    console.log(error);
  }
};
export const listServices = async () => {
  try {
    const services = await Services.find();
    const vendors = await Vendors.find()
      .populate("posts")
      .populate("licence")
      .exec();
    return { services, vendors };
  } catch (error) {
    console.log(error);
  }
};

export const getVendorProfile = async (vendorId: string, userId: string) => {
  try {
    const vendor = (await Vendors.findById(vendorId)
      .populate("licence")
      .populate("posts")
      .exec()) as (Vendor & Document) | any;

    if (!vendor) {
      throw new Error("Vendor not found");
    }

    const {
      vendorName,
      phoneNum,
      licence,
      coverPicture,
      posts,
      availableDate,
    } = vendor;

    const profilePicture = licence[0]?.profilePicture || "";
    const businessName = licence[0]?.businessName || "";
    const location = licence[0]?.location || "";
    const postsDetails = posts.map((post: any) => ({
      title: post.title,
      images: post.images,
      description: post.description,
      category: post.category,
    }));
    const chat = await ChatModel.findOne({
      users: { $in: [userId, vendorId] },
      is_accepted: true,
    });

    const bookings = await Bookings.find({ userId, vendorId });
    const response: VendorProfile = {
      vendorName,
      phoneNum,
      profilePicture,
      businessName,
      location,
      coverPicture,
      posts: postsDetails,
      availableDate,
    };
    return { response, bookings, chat: chat ? true : false };
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
    let chat = await ChatModel.findOne({
      users: { $all: [userId, vendorId] },
    });
    if (!chat) {
      chat = new ChatModel({
        users: [userId, vendorId],
        request: message,
      });
      await chat.save();
      return { success: true };
    } else {
      return { success: false };
    }
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

export const cancelRequest = async (_id: string) => {
  try {
    await ChatModel.findByIdAndDelete(_id);

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

export const chatId = async (userId: string, vendorId: string) => {
  try {
    const chat = await ChatModel.findOne({
      $and: [{ users: userId }, { users: vendorId }],
    });

    if (chat) {
      return chat._id.toString();
    } else {
      throw new Error("Chat not found");
    }
  } catch (error) {
    console.log(error);
  }
};

export const addBooking = async (datas: any) => {
  try {
    const newBooking = new Bookings({
      clientName: datas.datas.clientName,
      email: datas.datas.email,
      phoneNumber: datas.datas.phoneNumber,
      eventDate: datas.datas.eventDate,
      arrivalTime: datas.datas.arrivalTime,
      endingTime: datas.datas.endingTime,
      guests: datas.datas.guests,
      location: datas.datas.location,
      event: datas.datas.event,
      pincode: datas.datas.pincode,
      userId: datas.userId,
      vendorId: datas.vendorId,
      advance: datas.amount,
    });
    await newBooking.save();
    return { success: true };
  } catch (error) {
    console.error("Error adding booking:", error);
  }
};

export const getBookings = async (userId: string) => {
  try {
    const bookings = await Bookings.find({ userId }).lean();
    const bookingDatas = await Promise.all(
      bookings.map(async (booking) => {
        const vendor = await Vendors.findById(booking.vendorId).lean();
        if (vendor) {
          return { ...booking, vendorName: vendor.vendorName };
        }
        return booking;
      })
    );

    return bookingDatas;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const cancelBooking = async (percentage: number, bookingId: string) => {
  try {
    const booking = await Bookings.findById(bookingId).exec();
    if (!booking) {
      throw new Error("Booking not found");
    }

    const refund = (booking.advance * percentage) / 100;

    const updateUserWallet = await Users.findByIdAndUpdate(
      booking.userId,
      { $inc: { wallet: refund } },
      { new: true }
    ).exec();

    if (!updateUserWallet) {
      throw new Error("User not found");
    }

    await Bookings.deleteOne({ _id: bookingId }).exec();

    return {
      success: true,
      message: "bookings deleted successfully user Updated",
    };
  } catch (error) {
    console.error("Error cancelling booking:", error);
  }
};

export const getProfile = async (userId: string) => {
  try {
    const user = await Users.findById(userId);
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (userId: string, datas:any, files:any) => {
  try {
    if (files.profileImage) {
      const image = await uploadImage(files.profilePicture[0].filepath);
  
      const user = await Users.findByIdAndUpdate(userId, {
        $set: {
          userName: datas.name,
          phoneNum: datas.phoneNum,
          profilePicture: image,
        },
      });
      
      return { success: true, image };
    } else {
      return { success: true };
    }
  } catch (error) {
    console.log(error);
  }
};
