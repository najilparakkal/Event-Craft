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
      const response = await userIterator.getVendorProfile(req.params.vendorId,req.query.userId+"");
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
      const { percentage, bookingId } = req.query;

      const response = await userIterator.cancelBooking(percentage, bookingId);
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
