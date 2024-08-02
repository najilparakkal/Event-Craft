import { Request, Response } from "express";
import userIterator from "../../domain/usecases/user/home/home";
import { multipartFormSubmission } from "../../domain/helpers/formidable";

export default {
  listVendors: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.listVendors(req.body.data);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  listAll: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.listAll();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  listServices: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.listServices();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  getVendorProfile: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.getVendorProfile(
        req.params.vendorId,
        req.query.userId + ""
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  addRequest: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.addRequest(req.body);
      if (response?.success) {
        res.status(200).json({ message: "Request sent successfully" });
      } else {
        res.status(201).json({ message: "already connected" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  listRequest: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.listRequest(req.params.userId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  cancelRequest: async (req: Request, res: Response) => {
    try {
      await userIterator.cancelRequest(req.body);
      res.status(200).json({ message: "Request cancelled successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  fetchVendors: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.fetchVendors(req.params.userId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  getChatId: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.getChatId(req.params);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  addBooking: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.addBookind(req.body);
      if (response?.success) {
        res.status(200).json({ message: "Booking added successfully" });
      } else {
        res.status(400).json({
          response,
          message: "Somthing could not be added successfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getBooking: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.getBookings(req.params.userId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  cancelBooking: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await userIterator.cancelBooking(
        req.body.percentage,
        req.body.bookingId
      );
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },
  getProfile: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.getProfile(req.params.userId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  updateProfile: async (req: Request, res: Response) => {
    try {
      const { files, fields } = await multipartFormSubmission(req);
      const response = await userIterator.updateProfile(
        req.params.userId,
        fields,
        files
      );
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },
  getDates: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.getDates(req.params.vendorId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  getPosts: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.getPosts(req.params.userId);

      console.log(response);

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  updateLike: async (req: Request, res: Response) => {
    try {
      await userIterator.updteLike(req.params.userId, req.params.postId);
      res.status(200);
    } catch (error) {
      console.log(error);
    }
  },
  getComments: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.getComments(req.body.postId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  newComment: async (req: Request, res: Response) => {
    try {
      await userIterator.newComment(
        req.params.userId,
        req.params.postId,
        req.body.newComment
      );
      res.status(200).json({ message: "comment added successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  replyComment: async (req: Request, res: Response) => {
    try {
      await userIterator.newReply(req.params.commentId, req.body.reply);
      res.status(200).json({ message: "reply added successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  commentLike: async (req: Request, res: Response) => {
    try {
      await userIterator.commentLike(req.body.commentId, req.body.userId);
    } catch (error) {
      console.log(error);
    }
  },
  replyLike: async (req: Request, res: Response) => {
    try {
      await userIterator.replyLike(req.body.commentId, req.body.userId);
    } catch (error) {
      console.log(error);
    }
  },
  ratingReview: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.ratingReview(req.params.vendorId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  addReview: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.addReview(
        req.params.userId,
        req.params.vendorId,
        req.body.star,
        req.body.review
      );
      if (response?.success) {
        res.status(200).json({ message: "Review added successfully" });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
