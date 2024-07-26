  import mongoose, { Schema, model, Document } from "mongoose";

export interface IBooking extends Document {
  clientName: string;
  email: string;
  phoneNumber: string;
  eventDate: Date | null;
  arrivalTime: string;
  endingTime: string;
  guests: number;
  location: string;
  pincode: string;
  vendorId:string;
  userId:string;
  advance:number;
  event:string;
  accepted:boolean;
  status:string;
}

const bookingSchema = new Schema<IBooking>({
  clientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  event:{
    type:String
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  endingTime: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  advance:{
    type:Number
  },
  pincode: {
    type: String,
    required: true,
  },
  accepted:{
    type:Boolean,
    default:false
  },
  userId:{
    type:String
  },
  vendorId:{
    type:String
  },
  status:{
    type:String,
    default:"pending"
  }

});

export const Bookings = model<IBooking>("Bookings", bookingSchema);
