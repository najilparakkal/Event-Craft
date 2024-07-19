import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      refPath: "senderModel", 
      required: true,
    },
    senderModel: {
      type: String,
      required: true,
      enum: ["User", "Vendor"],
    },
    content: { type: String, required: true },
    chat: { type: Schema.Types.ObjectId, ref: "ChatModel" },
    type: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
