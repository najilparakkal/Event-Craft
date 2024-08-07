import { Request, Response } from "express";

import postIterator from "../../domain/usecases/vendor/post/post";
import requesIterator from "../../domain/usecases/vendor/request/request";
import { multipartFormSubmission } from "../../domain/helpers/formidable";
import {
  IPostDetails,
  IVendorRequestDetails,
} from "../../domain/entities/vendor/vendor";

export default {
  request: async (req: Request, res: Response) => {
    try {
      const { files, fields } = await multipartFormSubmission(req);
      const response = await requesIterator.request(
        fields as unknown as IVendorRequestDetails,
        files
      );
      if (response?.success) {
        res.status(200).json({
          status: 200,
          message: "Request submitted successfully",
        });
      } else {
        res.status(400).json({
          status: 400,
          message: "Invalid request",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  getCategories: async (req: Request, res: Response) => {
    try {
      const response = await postIterator.categories();

      res.status(200).json({ status: 200, response });
    } catch (error) {
      console.log(error);
    }
  },
  uploadPost: async (req: Request, res: Response) => {
    try {
      const { files, fields } = await multipartFormSubmission(req);
      const postDetails: IPostDetails = fields as unknown as IPostDetails;

      await postIterator.uploadPost(postDetails, files);
      res.status(200).json({ status: 200 });
    } catch (error) {
      console.log(error);
    }
  },
  listRequests: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.listRequests(req.params.vendorId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  acceptRequest: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.acceptRequest(req.body);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  rejectRequest: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.rejectRequest(req.params.roomId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  fetchUsers: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.fetchUsers(req.params.vendorId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  messages: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.fetchMessages(req.params.chatId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  storeMessage: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.storeMessage(req.body);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  chatId: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.fetchChatId(
        req.params.vendorId,
        req.params.userId
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  getBookings: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.getBookings(req.params.vendorId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  cancelBooking: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.cancelBooking(req.params.bookingId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  acceptBooking: async (req: Request, res: Response) => {
    try {
      const response = await requesIterator.acceptBooking(req.params.bookingId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  getProfile:async(req:Request, res:Response)=>{
    try {
      const response = await requesIterator.getProfile(req.params.vendorId)
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      
    }
  },
  updateProfile:async(req: Request, res: Response)=>{
    try {
      const { files, fields } = await multipartFormSubmission(req);
      
      const response = await requesIterator.updateProfile(req.params.vendorId,fields,files);
      res.status(200).json(response)
    } catch (error) {
      console.log(error);
      
    }
  },
  getDates:async(req:Request, res:Response)=>{
    try {
      const response = await requesIterator.getDates(req.params.vendorId)
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      
    }
  },
  updateDates:async(req: Request, res: Response)=>{
    try {
      const response = await requesIterator.updateDates(req.params.vendorId,req.body.dates);
      res.status(200).json(response)
    } catch (error) {
      console.log(error);
      
    }
  },
  updateBooking:async(req:Request, res:Response)=>{
    try {
       await requesIterator.updateBooking(req.params.bookingId,req.body.status)
      res.status(200)
    } catch (error) {
      console.log(error);
      
    } 
  },
  billing:async(req:Request, res:Response)=>{
    try {
      const {datas,bookingId,totalAmount} = req.body
        const response = await requesIterator.billing(datas,bookingId,totalAmount)      
        if(response?.success){
          res.status(201).json({status:200,message:"Billed successfully"})
        }else{
          res.status(203).json({staus:203,message:"Failed to process"})
        }
    } catch (error) {
      console.log(error);
       
    }
  },
  notification:async(req:Request,res:Response)=>{
    try {
      const response = await requesIterator.notification(req.params.userId)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
  room:async(req:Request,res:Response)=>{
    try {
      const response = await requesIterator.room(req.params.vendorId)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  },
  review:async(req:Request,res:Response)=>{
    try {
      const response = await requesIterator.review(req.params.vendorId)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }
};
