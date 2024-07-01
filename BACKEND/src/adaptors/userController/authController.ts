import { Request, Response, NextFunction } from "express";
import userIterator from "../../domain/usecases/user/auth/authentication";

export default {
  userRegistration: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userIterator.registerUser(req.body);

      if (user.success === false) {
        res
          .status(201)
          .json({ status: 201, message: "User is already registered", user });
      } else {
        if (user) {
          res
            .status(200)
            .json({
              status: 200,
              message: "User registered successfully",
              user,
            });
        } else {
          res.status(400).json({ message: "User registration failed" });
        }
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
      next(error);
    }
  },

  otpVerification: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);

      const checkOtp = await userIterator.otpVerification(req.body);

      if (checkOtp.success === true) {
        res.status(200).json({ status: 200, message: "User OTP verified" });
      } else if (checkOtp.success === false) {
        res.status(201).json({ status: 201, message: "User OTP denied" });
      } else {
        res.status(400).json({ message: "OTP verification failed" });
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
      next(error);
    }
  },

  forgotOtpVerification: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const checkOtp = await userIterator.forgotOtpVerification(req.body);

      if (checkOtp.success === true) {
        res.status(200).json({ status: 200, message: "User OTP verified" });
      } else if (checkOtp.success === false) {
        res.status(201).json({ status: 201, message: "User OTP denied" });
      } else {
        res.status(400).json({ message: "OTP verification failed" });
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
      next(error);
    }
  },

  resendOtp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resendOtp = await userIterator.resend(req.body);

      if (resendOtp) {
        res.status(200).json({ status: 200, message: "OTP resent" });
      } else {
        res.status(400).json({ message: "Failed to resend OTP" });
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      const response = await userIterator.login(req.body);

      if (response && response.token && response.userDetails) {
        res
          .status(200)
          .json({ status: 200, message: "User is valid", response });
      } else {
        res.status(201).json({ status: 201, message: "User is not valid" });
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      res.status(500).json({ status: 500, message: "Internal server error" });
      next(error);
    }
  },

  checkEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await userIterator.checkEmail(req.body);

      if (response?.success) {
        res.status(200).json({ status: 200, message: "User Found" });
      } else {
        res.status(201).json({ status: 201, message: "User not Found" });
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
      next(error);
    }
  },

  change: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);

      const response = await userIterator.changePass(req.body);
      if (response) {
        res.status(200).json({ status: 200, message: "Password updated" });
      } else {
        res.status(400).json({ message: "Password update failed" });
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
      next(error);
    }
  },

  googleRegistration: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await userIterator.googleRegistration(req.body);

      if (response.success) {
        res
          .status(200)
          .json({
            status: 200,
            message: "User registered successfully",
            response,
          });
      } else {
        res
          .status(201)
          .json({ status: 201, message: "User already Registered", response });
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
      next(error);
    }
  },
  googleLogin: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.googleLogin(req.body);
      if (response && response.token && response.userDetails) {
        res
          .status(200)
          .json({ status: 200, message: "User is valid", response });
      } else {
        res.status(201).json({ status: 201, message: "User is not valid" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  listVendors: async (req: Request, res: Response) => {
    try {
      
      const response = await userIterator.listVendors(req.body.data);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  listServices:async(req:Request, res: Response) => {
    try {
      const response = await userIterator.listServices();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      
    }
  }
};
