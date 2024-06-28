import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Request } from "express";
import { generateOTP } from "../../utils/otp";

dotenv.config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
  },
});

const sendOTPByEmail = (email: string, otp: string) => {
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.EMAIL_USER as string,
    to: email,   
    subject: "Your OTP for verification",
    text: `Your OTP is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

};

export const sendOTP = (email: string) => {
  const otp = generateOTP();
  sendOTPByEmail(email, otp);
  console.log("OTP SENT", otp, email);
  return otp;
};



export const vendorReject = (email: string , text:string) => {

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.EMAIL_USER as string,
    to: email,   
    subject: "Vendor Request verification",
    text: ` Reason for Rejecting : ${text}`,
  };
console.log(mailOptions,"💕");

  transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
