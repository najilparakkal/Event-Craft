import mongoose, { ObjectId, Schema, Types, model } from "mongoose";


export interface Friends {
    vendroId: string;
    friends: Types.Array<string>;
    save: () => Promise<void>;
  }


const chatSchema = new Schema({
    vendroId:{
        type:mongoose.Types.ObjectId,
        ref:"Vendors"
    },
    friends:[{
        type:mongoose.Types.ObjectId,
        ref:"Users"
    }]
})


export const VendorChat = model('VendorChat',chatSchema)