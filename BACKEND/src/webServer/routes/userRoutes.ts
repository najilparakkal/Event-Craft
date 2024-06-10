import express from "express";
import authController from "../../adaptors/authController";

const userRouter = express.Router();

userRouter.post("/api/user/signup",authController.userRegistration)

export default userRouter 