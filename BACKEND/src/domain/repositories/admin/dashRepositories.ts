import { uploadImage } from "../../../config/awsConfig";
import { Services } from "../../../framworks/database/models/services";
import { Licence } from "../../../framworks/database/models/licence";
import { Users } from "../../../framworks/database/models/user";
import { Vendors } from "../../../framworks/database/models/vendor";
import {
  IStatusCount,
  listUsers,
  listVendors,
  vendorBlock,
} from "../../entities/admin/admin";
import { Bookings } from "../../../framworks/database/models/booking";
import { CancelBookings } from "../../../framworks/database/models/cancelBooking";
import BillModel, {
  IBilling,
} from "../../../framworks/database/models/billing";
import { Report } from "../../../framworks/database/models/Reports";
import { refund } from "../../../webServer/middlewares/AdminMiddleware";
export default {
  listUsers: async (data: listUsers) => {
    try {
      let users;
      switch (data.list) {
        case "ascending":
          users = await Users.find().sort({ userName: 1 });
          break;
        case "descending":
          users = await Users.find().sort({ userName: -1 });
          break;
        case "notVerified":
          users = await Users.find({ blocked: false });
          break;
        case "verified":
          users = await Users.find({ blocked: true });
          break;
        case "date":
          users = await Users.find().sort({ registered: 1 });
          break;
        default:
          users = await Users.find();
          break;
      }
      return users;
    } catch (error) {
      console.log(error);
    }
  },

  listVendors: async (data: listVendors) => {
    try {
      let vendors;
      switch (data.list) {
        case "ascending":
          vendors = await Vendors.find().sort({ vendorName: 1 });
          break;
        case "descending":
          vendors = await Vendors.find().sort({ vendorName: -1 });
          break;
        case "notVerified":
          vendors = await Vendors.find({ blocked: false });
          break;
        case "verified":
          vendors = await Vendors.find({ blocked: true });
          break;
        case "date":
          vendors = await Vendors.find().sort({ registered: 1 });
          break;
        default:
          vendors = await Vendors.find();
          break;
      }
      return vendors;
    } catch (error) {
      console.log(error);
    }
  },
  updateBlock: async (data: vendorBlock) => {
    try {
      const vendor = await Vendors.findById(data.id);
      if (vendor) {
        return await Vendors.findByIdAndUpdate(
          data.id,
          { $set: { blocked: !vendor.blocked } },
          { new: true }
        );
      } else {
        console.log("Vendor not found");
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (data: vendorBlock) => {
    try {
      const user = await Users.findById(data.id);
      if (user) {
        return await Users.findByIdAndUpdate(
          data.id,
          { $set: { blocked: !user.blocked } },
          { new: true }
        );
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.log(error);
    }
  },

  categoryAdding: async (data: any) => {
    try {
      const checkCategory = await Services.findOne({ name: data.name });
      if (checkCategory) {
        return { success: false, message: "Category not found" };
      } else {
        const url = await uploadImage(data.image.filepath);
        const newCategory = await Services.create({
          name: data.name,
          image: url,
        });
        return {
          success: false,
          message: "Category Created successfully",
          newCategory,
        };
      }
    } catch (error) {
      console.log(error);
    }
  },
  listCategory: async () => {
    try {
      const categories = await Services.find();

      return { success: true, data: categories };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { success: false, message: "Failed to fetch categories", error };
    }
  },
  updateCategory: async (_id: string) => {
    try {
      const update = await Services.findByIdAndDelete(_id);
      if (update) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error in dashRepositories.updateCategory:", error);
      throw error;
    }
  },

  listRequest: async () => {
    try {
      const getAll = await Licence.find({ verified: false });
      return getAll;
    } catch (error) {
      console.log(error);
    }
  },
  rejectVendor: async (_id: string) => {
    try {
      const deleteRequest = await Licence.findByIdAndDelete({ _id });

      if (deleteRequest) {
        return { success: true, email: deleteRequest.emailAddress };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log(error);
    }
  },
  acceptVendor: async (_id: string) => {
    try {
      const acceptRequest = await Licence.findByIdAndUpdate(
        { _id },
        { $set: { verified: true } },
        { new: true }
      );
      if (!acceptRequest) {
        return {
          success: false,
          error: "Licence document not found or update failed",
        };
      }
      const updatedVendor = await Vendors.findByIdAndUpdate(
        { _id: acceptRequest.vendorId },
        {
          $set: { vendor: true },
          $push: { licence: acceptRequest._id },
        },
        { new: true, upsert: true }
      );
      if (!updatedVendor) {
        return {
          success: false,
          error: "Failed to update vendor with licence information",
        };
      }

      return { success: true };
    } catch (error) {
      console.error(
        "An error occurred while accepting the vendor request:",
        error
      );
      return {
        success: false,
        error: "An error occurred while accepting the vendor request",
      };
    }
  },
  getDashboard: async () => {
    try {
      const usersCount = await Users.countDocuments({ verified: true });
      const bookingsCount = await Bookings.countDocuments();
      const vendorsCount = await Vendors.countDocuments({ vendor: true });
      const users = await Users.find();
      const vendors = await Vendors.find();
      const vendorsDates = vendors.map((item) => {
        return item.registered;
      });

      const totalRevenue = vendors.reduce((total, vendor) => {
        return total + (vendor.wallet ?? 0);
      }, 0);
      const bills = await BillModel.find();
      const revenue = bills.map((item: IBilling) => {
        return { totalAmount: item.totalAmount, createdAt: item.createdAt };
      });

      const usersDates = users.map((item) => {
        return item.registered;
      });
      const latestUsers = await Users.find(
        {},
        { profilePicture: 1, registered: 1, verified: 1, userName: 1 }
      )
        .sort({ registered: -1 })
        .limit(3);
      const latestVendors = await Vendors.find(
        {},
        { profilePicture: 1, registered: 1, verified: 1, vendorName: 1 }
      )
        .sort({ registered: -1 })
        .limit(3);
      return {
        usersCount,
        bookingsCount,
        vendorsCount,
        usersDates,
        vendorsDates,
        latestUsers,
        latestVendors,
        revenue,
        totalRevenue,
      };
    } catch (error) {
      console.log(error);
    }
  },
  getBookings: async () => {
    try {
      const bookings = await CancelBookings.find();

      return bookings;
    } catch (error) {
      console.log(error);
    }
  },
  refund: async (bookingId: string) => {
    try {
      const booking = await Bookings.findById(bookingId);
      if (!booking) {
        throw new Error("Booking not found");
      }
      await refund(booking.paymentId)
      booking.status = "cancelled";
      await booking.save();
      await CancelBookings.deleteOne({ bookingId });
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  },
  bills: async () => {
    try {
      return await BillModel.find({ adminRead: false });
    } catch (error) {
      console.log(error);
    }
  },
  report: async () => {
    try {
      return await Report.find({ isReaded: false })
        .populate({ path: "userId", select: "userName profilePicture" })
        .populate({ path: "vendorId", select: "vendorName profilePicture" });
    } catch (error) {
      console.log(error);
    }
  },
  blockVendor: async (reportId: string, vendorId: string) => {
    try {
      const updateVendor = await Vendors.findByIdAndUpdate(vendorId, {
        $set: {
          blocked: true,
        },
      });
      const updateReport = await Report.findByIdAndUpdate(reportId, {
        $set: {
          isReaded: true,
        },
      });
      if (updateReport && updateVendor) {
        return { success: true };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      console.log(error);
    }
  },
  readReport: async (reportId: string) => {
    try {
      await Report.findByIdAndUpdate(reportId, {
        $set: {
          isReaded: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  bookingCount: async () => {
    try {
      const statusCounts: IStatusCount[] = await Bookings.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            createdAt: { $push: "$createdAt" },
          },
        },
      ]);
  
      const counts: Record<string, number[]> = {
        pending: Array(12).fill(0),
        completed: Array(12).fill(0),
        cancelled: Array(12).fill(0),
      };
  
      const getMonthIndex = (date: Date): number => {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
          console.error("Invalid date:", date);
          return -1;
        }
        return date.getMonth();
      };
  
      statusCounts.forEach((statusCount) => {
        const status = statusCount._id.toLowerCase();
        if (!counts[status]) {
          console.warn("Unknown status:", status);
          return;
        }
  
        statusCount.createdAt.forEach((date) => {
          const monthIndex = getMonthIndex(new Date(date));
          if (monthIndex >= 0 && monthIndex < 12) {
            counts[status][monthIndex] += 1;
          } else {
            console.error("Invalid month index:", monthIndex);
          }
        });
      });
  
      return counts;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch booking counts");
    }
  },
  readBill: async (billId: string) => {
    try {
      const data =  await BillModel.findByIdAndUpdate(billId, {
        $set: {
          adminRead: true,
        },
      });
      
      console.log(data,"🍽️🍽️🍽️")
      return data
    } catch (error) {
      console.log(error);
    }
  },
};
