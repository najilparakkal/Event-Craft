import { Request, Response, NextFunction } from "express";
import userIterator from "../domain/usecases//auth/authentication";

export default {
  userRegistration: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userIterator.registerUser(req.body);

      if (user.success === false) {
        res
          .status(201)
          .json({ status: 201, message: "user is already registered", user });
      } else {
        if (user) {
          res.status(200).json({
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
      const checkOtp = await userIterator.otpVerification(req.body);

      if (checkOtp.success === true) {
        res.status(200).json({ status: 200, message: "user otp verified" });
      } else if (checkOtp.success === false) {
        res.status(201).json({ status: 201, message: "user  otp denied" });
      } else {
        res.status(400).json({ message: "otp verification failed" });
      }
    } catch (error) {}
  },

  forgototpVerification: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const checkOtp = await userIterator.forgotOtpVerification(req.body);

      if (checkOtp.success === true) {
        res.status(200).json({ status: 200, message: "user otp verified" });
      } else if (checkOtp.success === false) {
        res.status(201).json({ status: 201, message: "user  otp denied" });
      } else {
        res.status(400).json({ message: "otp verification failed" });
      }
    } catch (error) {}
  },

  resendOtp: async (req: Request, res: Response) => {
    try {
      const resendOtp = await userIterator.resend(req.body);

      if (resendOtp) {
        res.status(200).json({ status: 200, message: "otp resend" });
      }
    } catch (error) {}
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      const response = await userIterator.login(req.body);
      console.log(response);

      if (response.token && response.userDetails) {
        res
          .status(200)
          .json({ status: 200, message: "User is valid", response });
      } else {
        res.status(201).json({ status: 201, message: "User is not valid" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  },
  checkEmail: async (req: Request, res: Response) => {
    try {
      const response = await userIterator.checkEmail(req.body);

      if (response.success) {
        res.status(200).json({ status: 200, message: "User Founded" });
      } else {
        res.status(201).json({ status: 201, message: "User not Found" });
      }
    } catch (error) {
      console.log(error);
    }
  },


  change: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      
      const response = await userIterator.changePass(req.body);
      if (response) {
        res.status(200).json({ status: 200, message: "password updated" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
