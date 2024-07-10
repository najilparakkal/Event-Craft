import mongoose, { Schema } from "mongoose";


export interface IChatModel extends Document {
  chatName: string;
  users: mongoose.Types.ObjectId[];
  latestMessage: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _id?: mongoose.Types.ObjectId;

}
const ChatSchema: Schema = new Schema<IChatModel>(
  {
    chatName: {
      type: String,
      trim: true,
    },
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
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model<IChatModel>('ChatModel', ChatSchema);

export default ChatModel;
