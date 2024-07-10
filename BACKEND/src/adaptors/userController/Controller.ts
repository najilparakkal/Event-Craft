import { Request, Response } from "express";
import userIterator from "../../domain/usecases/user/home/home";

export default {
  listVendors: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.listVendors(req.body.data);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  listServices: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.listServices();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  getVendorProfile: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.getVendorProfile(req.params.vendorId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  addRequest: async (req: Request, res: Response) => {
    try {
      await userIterator.addRequest(req.body);
      res.status(200).json({ message: "Request sent successfully" });
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
  cancelRequest:async(req:Request, res:Response)=>{
    try {
      await userIterator.cancelRequest(req.body);
      res.status(200).json({ message: "Request cancelled successfully" });
    } catch (error) {
      console.log(error);
    }
  },
  fetchVendors:async(req:Request, res:Response) => {
    try {
      const response = await userIterator.fetchVendors(req.params.userId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      
    }
  },
  getChatId:async(req:Request,res:Response)=>{
    try {
      
      const response = await userIterator.getChatId(req.params);      
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      
    }
  }
};
