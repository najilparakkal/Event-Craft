import mongoose, { Schema } from "mongoose";

export interface IChatModel extends Document {
  users: mongoose.Types.ObjectId[];
  latestMessage: mongoose.Types.ObjectId;
  createdAt: Date;  
  updatedAt: Date;
  _id?: mongoose.Types.ObjectId;
  is_blocked: boolean;
  is_accepted: boolean;
}
const ChatSchema: Schema = new Schema<IChatModel>(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
      {
        type: Schema.Types.ObjectId,
        ref: "Vendors",
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
     is_blocked: {
      type: Boolean,
      default: false, 
    },
    is_accepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model<IChatModel>("ChatModel", ChatSchema);

export default ChatModel;
