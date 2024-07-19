import { uploadImage } from "../../../config/awsConfig";
import ChatModel from "../../../framworks/database/models/chatModal";
import { Licence } from "../../../framworks/database/models/licence";
import Message from "../../../framworks/database/models/message";
import { Request } from "../../../framworks/database/models/requests";
import { Users } from "../../../framworks/database/models/user";
import { Vendors } from "../../../framworks/database/models/vendor";
import { IUser } from "../../entities/user/user";
import io from "socket.io-client";

import {
  IAcceptRequest,
  IReq,
  IReqVendor,
  IRequestWithUser,
  IUserReq,
  MessageData,
} from "../../entities/vendor/vendor";
import { Bookings } from "../../../framworks/database/models/booking";

export default {
  addRequest: async (datas: any, images: any) => {
    try {
      const filePaths = images["values[licenseOrCertificates][0]"].map(
        (file: any) => uploadImage(file.filepath)
      );

      const uploadResults = await Promise.all(filePaths);
      const profilePicture = await uploadImage(
        images["values[profileImage]"][0].filepath
      );

      const createDb = await Licence.create({
        applicantName: datas["values[applicantName]"][0],
        businessName: datas["values[businessName]"][0],
        certificateExpirationDate:
          datas["values[certificateExpirationDate]"][0],
        emailAddress: datas["values[emailAddress]"][0],
        phoneNumber: datas["values[phoneNumber]"][0],
        location: datas["values[location]"][0],
        upiIdOrPhoneNumber: datas["values[upiIdOrPhoneNumber]"][0],
        accountNumber: datas["values[accountNumber]"][0],
        services: datas["values[servicesYouChose]"][0],
        description: datas["values[whatWillYouSell]"][0],
        licence: uploadResults,
        vendorId: datas.id[0],
        profilePicture: profilePicture,
      });
      if (createDb) {
        return { success: true, message: "Request created successfully" };
      } else {
        return { success: false, message: "something went wrong" };
      }
    } catch (error) {
      console.log(error);
    }
  },

  listRequestsForVendor: async (vendorId: string) => {
    try {
      const requests = await Request.find({ vendorId });

      const userIds: string[] = requests.map((request) =>
        request.userId.toString()
      );
      const users: IUserReq[] = await Users.find({
        _id: { $in: userIds },
      });

      const userMap: { [key: string]: IUser } = users.reduce(
        (acc: { [key: string]: IUser }, user) => {
          acc[user._id] = user;
          return acc;
        },
        {}
      );

      const combinedData = requests.map((request) => {
        const user = userMap[request.userId.toString()];
        return {
          userName: user.userName,
          userProfilePicture: user.profilePicture,
          userId: request.userId,
          requested: request.requested,
        };
      });

      return combinedData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  acceptRequest: async (userId: string, vendorId: string) => {
    try {
      let chat = await ChatModel.findOneAndUpdate(
        {
          users: { $all: [userId, vendorId] },
        },
        { $set: { is_accepted: true } }
      );

      return { success: true };
    } catch (error) {
      console.error(error);
    }
  },
  rejectRequest: async (_id: string) => {
    try {
      const data = await ChatModel.findByIdAndDelete(_id);
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  },

  fetchUsers: async (vendorId: string) => {
    try {
      const chats = await ChatModel.find({ users: vendorId });

      const userIds = chats.map((chat) =>
        chat.users.find((user) => user.toString() !== vendorId)
      );

      const users = await Users.find({ _id: { $in: userIds } });
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
  fetchMessages: async (chatId: string) => {
    try {
      const messages = await Message.find({ chat: chatId }).sort({
        createdAt: 1,
      });
      return messages;
    } catch (error) {
      console.log(error);
    }
  },
  storeMessage: async (data: MessageData): Promise<void> => {
    // const { vendorId, userId, content } = data;
    // try {
    //   let chat = await ChatModel.findOne({
    //     users: { $all: [vendorId, userId] },
    //   });
    //   if (!chat) {
    //     chat = new ChatModel({
    //       users: [vendorId, userId],
    //     });
    //     await chat.save();
    //   }
    //   const newMessage = new Message({
    //     sender: vendorId,
    //     senderModel: 'Vendor',
    //     content,
    //     chat: chat._id,
    //   });
    //   const savedMessage = await newMessage.save();
    //   chat.latestMessage = savedMessage._id;
    //   await chat.save();
    //   console.log(savedMessage, "Message stored successfully");
    //   io.to(`user:${userId}`).emit('receive message', { sender: 'Vendor', content });
    //   io.to(`vendor:${vendorId}`).emit('receive message', { sender: 'You', content });
    // } catch (error) {
    //   console.error('Error storing message:', error);
    //   throw new Error('Internal server error');
    // }
  },
  fetchChatId: async (vendorId: string, userId: string) => {
    try {
      const chat = await ChatModel.findOne({
        $and: [{ users: userId }, { users: vendorId }],
      });

      if (chat !== null) {
        return chat._id.toString();
      } else {
        throw new Error("Chat not found");
      }
    } catch (error) {
      console.log(error);
    }
  },
  getBookings: async (vendorId: string) => {
    try {
      const bookings = await Bookings.find({ vendorId }).lean();

      return bookings;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  cancelBooking: async (bookingId: string) => {
    try {
      const booking = await Bookings.findById(bookingId);

      if (!booking) {
        throw new Error("Booking not found");
      }

      const user = await Users.findByIdAndUpdate(
        booking.userId,
        { $inc: { wallet: booking.advance } },
        { new: true }
      );

      if (!user) {
        throw new Error("User not found");
      }

      await Bookings.findByIdAndDelete(bookingId);

      return { success: true };
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  },
  acceptBooking: async (bookingId: string) => {
    try {
      const updatedBooking = await Bookings.findByIdAndUpdate(
        bookingId,
        { $set: { accepted: true } },
        { new: true }
      );

      if (!updatedBooking) {
        throw new Error("Booking not found");
      }

      return updatedBooking;
    } catch (error) {
      console.error("Error accepting booking:", error);
      throw error;
    }
  },
  getProfile: async (vendorId: string) => {
    try {
      const vendor = await Vendors.findById(vendorId)
        .populate("posts")
        .populate("licence");

      return vendor;
    } catch (error) {
      console.log(error);
    }
  },
  updateVendor: async (vendorId: string, datas: any, files: any) => {
    try {
      let profile, cover;
  
      if (files.profilePicture) {
        profile = await uploadImage(files.profilePicture[0].filepath);
      }
  
      if (files.coverPicture) {
        cover = await uploadImage(files.coverPicture[0].filepath);
      }
  
      const updateData: any = {
        vendorName: datas.name,
        phoneNum: datas.phoneNum,
      };
  
      if (profile) {
        updateData.profilePicture = profile;
      }
  
      if (cover) {
        updateData.coverPicture = cover;
      }
  
      const vendor = await Vendors.findByIdAndUpdate(vendorId, {
        $set: updateData,
      });
  
      return { success: true, profile };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  },
};
