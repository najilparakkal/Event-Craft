import { uploadImage } from "../../../config/awsConfig";
import { Bookings } from "../../../framworks/database/models/booking";
import { CancelBookings } from "../../../framworks/database/models/cancelBooking";
import ChatModel from "../../../framworks/database/models/chatModal";
import { Comment, Reply } from "../../../framworks/database/models/comment";
import { ILicence } from "../../../framworks/database/models/licence";
import Message from "../../../framworks/database/models/message";
import { Posts } from "../../../framworks/database/models/post";
import { Request } from "../../../framworks/database/models/requests";
import { Services } from "../../../framworks/database/models/services";
import { Users } from "../../../framworks/database/models/user";
import { Vendors } from "../../../framworks/database/models/vendor";
import { AddBookingParams, IAddBooking } from "../../entities/user/user";
import { format, parseISO } from "date-fns";

import {
  IReqVendor,
  IRequest,
  Vendor,
  VendorProfile,
} from "../../entities/vendor/vendor";
import { Socket } from "socket.io-client";
import mongoose from "mongoose";
import { Report } from "../../../framworks/database/models/Reports";
import BillModel from "../../../framworks/database/models/billing";

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
      _id,
      vendorName,
      phoneNum,
      licence,
      coverPicture,
      posts,
      availableDate,
      ratingAndReview,
      likes,
    } = vendor;
    const profilePicture = vendor.profilePicture;
    const businessName = licence[0]?.businessName || "";
    const location = licence[0]?.location || "";
    const postsDetails = posts.map((post: any) => ({
      title: post.title,
      images: post.images,
      description: post.description,
      category: post.category,
    }));
    const chat = await ChatModel.findOne({
      users: {
        $all: [
          new mongoose.Types.ObjectId(userId),
          new mongoose.Types.ObjectId(vendorId),
        ],
      },
    });
    console.log(userId, vendorId);
    const servicesArray = licence.map((item: any) => item.services).flat();
    const services = servicesArray.flatMap((serviceList: any) =>
      serviceList.split(",").map((service: any) => service.trim())
    );

    const allServices = await Services.aggregate([
      {
        $match: {
          name: { $in: services },
        },
      },
    ]);

    const bookings = await Bookings.find({ userId, vendorId });

    const reviewCount = ratingAndReview.length;
    const totalStars = ratingAndReview.reduce(
      (acc: number, review: any) => acc + review.star,
      0
    );

    const response: VendorProfile = {
      _id,
      vendorName,
      phoneNum,
      profilePicture,
      businessName,
      location,
      coverPicture,
      posts: postsDetails,
      availableDate,
      reviewCount,
      totalStars,
      likes,
    };

    return {
      response,
      bookings,
      chat: chat ? true : false,
      services: allServices,
    };
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
      });
      await chat.save();
      await Message.create({
        sender: userId,
        content: message,
        chat: chat._id,
        type: "text",
        senderModel: "User",
      });

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
    const vendorIds = chats
      .map((chat) => chat.users.find((user) => user.toString() !== userId))
      .filter(Boolean);
    const sortedVendorMessages = await Message.find({
      senderModel: "Vendor",
      sender: { $in: vendorIds },
    }).sort({ createdAt: -1 });

    const uniqueVendorIds = [
      ...new Set(
        sortedVendorMessages.map((message) => message.sender.toString())
      ),
    ];
    const sortedVendors = await Vendors.find({ _id: { $in: uniqueVendorIds } })
      .select("_id vendorName profilePicture")
      .then((vendors) =>
        uniqueVendorIds.map((id) =>
          vendors.find((vendor: any) => vendor._id.toString() === id)
        )
      );
    return sortedVendors;
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
    const newBooking = await Bookings.create({
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
      paymentId: datas.paymentDetails.paymentId,
    });
    const value = parseISO(datas.datas.eventDate);
    const date = format(value, "yyyy-MM-dd");
    await Vendors.findByIdAndUpdate(datas.vendorId, {
      $push: { availableDate: date },
    });
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
export const cancelBooking = async (bookingId: string) => {
  try {
    const booking = await Bookings.findById(bookingId).exec();
    if (!booking) {
      throw new Error("Booking not found");
    }

    await CancelBookings.create({
      userId: booking.userId,
      vendorId: booking.vendorId,
      advance: booking.advance,
      bookingId,
      paymentId: booking.paymentId,
    });
    const bookings = await Bookings.findByIdAndUpdate(bookingId, {
      $set: { status: "requested to cancel" },
    });

    return {
      success: true,
      booking: bookings?.status,
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

export const updateUser = async (userId: string, datas: any, files: any) => {
  try {
    if (files) {
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

export const getDatesOfVendor = async (vendorId: string) => {
  try {
    return await Vendors.findById(vendorId);
  } catch (error) {
    console.log(error);
  }
};
export const getPosts = async (userId: string) => {
  try {
    const posts = await Posts.aggregate([
      {
        $addFields: {
          vendorId: { $toObjectId: "$vendorId" },
        },
      },
      {
        $lookup: {
          from: "vendors",
          localField: "vendorId",
          foreignField: "_id",
          as: "vendorInfo",
        },
      },
      {
        $unwind: "$vendorInfo",
      },
      {
        $project: {
          title: 1,
          images: 1,
          vendorId: 1,
          is_blocked: 1,
          category: 1,
          createdAt: 1,
          updatedAt: 1,
          description: 1,
          likes: 1,
          "vendorInfo.vendorName": 1,
          "vendorInfo.profilePicture": 1,
        },
      },
    ]);

    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const updateLike = async (userId: string, postId: string) => {
  try {
    const post = await Posts.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    const userIndex = post.likes.indexOf(userId);
    if (userIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(userIndex, 1);
    }
    await post.save();
    console.log("Post updated successfully");
  } catch (err) {
    console.error("Error updating post:", err);
  }
};

export const newComment = async (
  userId: string,
  postId: string,
  newComment: string
) => {
  try {
    const newc = await Comment.create({
      userId,
      postId,
      comment: newComment,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getComments = async (postId: string) => {
  try {
    const comments = await Comment.find({ postId })
      .populate({
        path: "userId",
        select: "profilePicture userName",
      })
      .populate({ path: "replies", select: "comment likes" });
    return comments;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const newReply = async (commentId: string, reply: string) => {
  try {
    const newReply = await Reply.create({
      commentId,
      comment: reply,
    });
    const push = await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: newReply._id },
    });
  } catch (error) {
    console.log(error);
  }
};

export const commentLike = async (commentId: string, userId: string) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return false;
    }
    const userIndex = comment.likes.indexOf(userId);
    if (userIndex === -1) {
      comment.likes.push(userId);
    } else {
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
  } catch (error) {
    console.log(error);
  }
};

export const replyLike = async (commentId: string, userId: string) => {
  try {
    const comment = await Reply.findById(commentId);
    if (!comment) {
      return false;
    }
    const userIndex = comment.likes.indexOf(userId);
    if (userIndex === -1) {
      comment.likes.push(userId);
    } else {
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
  } catch (error) {
    console.log(error);
  }
};

export const ratingReview = async (vendorId: string) => {
  try {
    const vendor = await Vendors.findById(vendorId).populate({
      path: "ratingAndReview.userId",
      select: "userName profilePicture",
    });
    if (vendor) {
      return vendor;
    }
    return { vendorName: "", about: "", ratingAndReview: "" };
  } catch (error) {
    console.log(error);
    return { vendorName: "", about: "", ratingAndReview: "" };
  }
};

export const addReview = async (
  userId: string,
  vendorId: string,
  star: number,
  review: string
) => {
  try {
    const vendor = await Vendors.findById(vendorId);
    if (!vendor) {
      return { success: false, message: "Vendor not found" };
    }
    if (vendor.ratingAndReview) {
      vendor.ratingAndReview.push({ userId, star, review });
      await vendor.save();
      return { success: true, message: "Review added successfully", vendor };
    }
  } catch (error) {
    console.error("Error adding review:", error);
    return { success: false, message: "Failed to add review" };
  }
};

export const vendorLike = async (userId: string, vendorId: string) => {
  try {
    const vendor = await Vendors.findById(vendorId);
    if (!vendor) {
      throw new Error("vendor not found");
    }
    const userIndex = vendor.likes.indexOf(userId);
    if (userIndex === -1) {
      vendor.likes.push(userId);
    } else {
      vendor.likes.splice(userIndex, 1);
    }
    await vendor.save();
  } catch (error) {
    console.log(error);
  }
};

export const likedPosts = async (userId: string) => {
  try {
    const likedPosts = await Posts.aggregate([
      {
        $match: {
          likes: userId,
        },
      },
      {
        $addFields: {
          vendorId: { $toObjectId: "$vendorId" },
        },
      },
      {
        $lookup: {
          from: "vendors",
          localField: "vendorId",
          foreignField: "_id",
          as: "vendorInfo",
        },
      },
      {
        $unwind: "$vendorInfo",
      },
      {
        $project: {
          title: 1,
          images: 1,
          vendorId: 1,
          is_blocked: 1,
          category: 1,
          createdAt: 1,
          updatedAt: 1,
          description: 1,
          likes: 1,
          "vendorInfo.vendorName": 1,
          "vendorInfo.profilePicture": 1,
        },
      },
    ]);

    return likedPosts;
  } catch (error) {
    console.log(error);
  }
};

export const likedVendors = async (userId: string) => {
  try {
    return await Vendors.find({ likes: userId });
  } catch (error) {
    console.log(error);
  }
};

export const userBooked = async (userId: string) => {
  try {
    const bookedOrNot = await Bookings.find({ userId });
    if (bookedOrNot.length > 0) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log(error);
  }
};

export const requestCheck = async (userId: string, vendorId: string) => {
  try {
    const request: any = await ChatModel.find({
      users: {
        $all: [
          new mongoose.Types.ObjectId(userId),
          new mongoose.Types.ObjectId(vendorId),
        ],
      },
    });
    if (request.is_accepted) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const submitReport = async (
  userId: string,
  vendorId: string,
  boxReason: string,
  reason: string
) => {
  try {
    const value = await Report.create({
      userId,
      vendorId,
      reason: boxReason,
      reasonExplained: reason,
    });
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const notification = async (vendorId: string) => {
  try {
    const data = await Vendors.findById(vendorId);
    return {
      vendorName: data?.vendorName,
      profilePicture: data?.profilePicture,
    };
  } catch (error) {
    console.log(error);
  }
};

export const roomIds = async (userId: string) => {
  try {
    const data = await ChatModel.find({ users: userId });
    const ids = data.map((item) => item._id + "");
    return ids;
  } catch (error) {
    console.log(error);
  }
};

export const userBills = async (userId: string) => {
  try {
    const bills = await BillModel.find({ userId, paid: false });
    return bills;
  } catch (error) {
    console.log(error);
  }
};

export const billPay = async (billingId: string, amount: number) => {
  try {
    const update = await BillModel.findByIdAndUpdate(billingId, {
      $set: {
        paid: true,
      },
    });
    const updateVenodor = await Vendors.findByIdAndUpdate(update?.vendorId, {
      $inc: {
        wallet: amount,
      },
    });
    if (update && updateVenodor) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log(error);
  }
};

export const paidBill = async (userId: string) => {
  try {
    const bills = await BillModel.find({ userId, paid: true }).populate({
      path: "bookingId",
      select: "advance createdAt eventDate",
    });
    const userData = await Users.findById(userId).select(
      "userName email phoneNum"
    );
    const vendors = [];
    for (const bill of bills) {
      if (bill.vendorId) {
        const vendor = await Vendors.findById(bill.vendorId).select(
          "vendorName phoneNum email"
        );
        if (vendor) {
          vendors.push(vendor);
        }
      }
    }
    const response = {
      billingData: bills,
      userData,
      vendors,
    };
    return response;
  } catch (error) {
    console.log(error);
  }
};
