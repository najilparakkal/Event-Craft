import { RequestHandler } from "express";
import Razorpay from "razorpay";
import { VerifyToken } from "../../domain/helpers/jwtGenarate";

const razorpay = new Razorpay({
  key_id: process.env.REZORPAY_KEYID || "",
  key_secret: process.env.REZORPAY_SECRET_KEY || "",
});

export const refund = async (paymentId:string) => {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
      const captureResponse = await razorpay.payments.capture(
        paymentId,
        payment.amount,
        "INR"
      );
      console.log("Capture response:", captureResponse);
      const refundResponse = await razorpay.payments.refund(payment.id, {
        amount: payment.amount,
        speed: "normal",
      });
    if(captureResponse)  return true;
    
  } catch (error: any) {
    console.error("Refund failed:", error);
  }
};

export const adminAuth: RequestHandler = async (req, res, next) => {
  try {

    console.log(req.cookies,req.headers)
    const token = req.headers.authorization?.split(" ")[1] as string;
    VerifyToken(token)
      .then((data) => {
        const currentTime = Math.floor(Date.now() / 1000);
        if (data.exp && data.exp < currentTime)
          return res.status(204).json({ message: "Token has expired." });

        if (!data.isAdmin)
          return res.status(403).json({ message: "Admin access required." });

        next();
      })
      .catch((err) => {
        console.log(err);
        return res.status(204).json({ message: "Token has expired." });
      });
  } catch (error) {
    console.log(error);
  }
};
