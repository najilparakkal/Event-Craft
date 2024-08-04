import { RequestHandler } from "express";
import Razorpay from "Razorpay";

const razorpay = new Razorpay({
  key_id: process.env.REZORPAY_KEYID || "",
  key_secret: process.env.REZORPAY_SECRET_KEY || "",
});

const refund: RequestHandler = async (req, res, next) => {
  const { paymentId } = req.body;
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    console.log("Payment details:", payment);

    if (payment.status !== "captured") {
      const captureResponse = await razorpay.payments.capture(
        paymentId,
        payment.amount,
        "INR"
      );
      console.log("Capture response:", captureResponse);
      const refundResponse = await razorpay.payments.refund(payment.id,{
        amount: payment.amount,
        speed:"normal"
      });
      console.log("Refund response:", refundResponse);
      next()
    } else {
      const refundResponse = await razorpay.payments.refund(paymentId,{
        amount: payment.amount,
        speed:"normal"
      });
      console.log("Refund response:", refundResponse);

      res.status(200).json(refundResponse);
    }
        
  } catch (error:any) {
    console.error("Refund failed:", error);
    res.status(500).json({ error: error.message });
  }
};

export default refund;