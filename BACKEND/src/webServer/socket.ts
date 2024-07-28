import { Server, Socket } from "socket.io";
import Message from "../framworks/database/models/message";
import ChatModel from "../framworks/database/models/chatModal";
import mongoose from "mongoose";
import formidable from "formidable";
import { uploadBufferToS3, uploadImage } from "../config/awsConfig";

const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join room", async (room: string) => {
      console.log(`Socket ${socket.id} joined room: ${room}`);
      socket.join(room);

      if (!mongoose.Types.ObjectId.isValid(room)) {
        console.error(`Invalid chat ID: ${room}`);
        return;
      }

      try {
        const messages = await Message.find({ chat: room }).sort({
          createdAt: 1,
        });
        const chat = await ChatModel.findById({ _id: room });
        socket.emit("room messages", { messages, chat });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    });
    socket.on("send_voice_message", async (message) => {
      const { senderId, senderModel, content, chatId } = message;

      const upload = await uploadBufferToS3(content, "audio/webm;codecs=opus");
      const newMessage = new Message({
        sender: senderId,
        senderModel: senderModel,
        content: upload,
        chat: chatId,
        type: "audio",
      });
      await newMessage.save();
      io.to(chatId).emit("new message", newMessage);
    });

    socket.on("send_file", async (message) => {
      const { senderId, senderModel, content, chatId, type } = message;

      const newMessage = new Message({
        sender: senderId,
        senderModel: senderModel,
        content,
        chat: chatId,
        type: type,
      });
      await newMessage.save();
      io.to(chatId).emit("new message", newMessage);
    });

    socket.on("send message", async (message) => {
      console.log(`Message from ${socket.id}:`, message);
      const { senderId, senderModel, content, chatId } = message;

      if (!mongoose.Types.ObjectId.isValid(chatId)) {
        console.error(`Invalid chat ID: ${chatId}`);
        return;
      }

      try {
        const newMessage = new Message({
          sender: senderId,
          senderModel: senderModel,
          content: content,
          chat: chatId,
          type: "text",
        });

        await newMessage.save();
        await ChatModel.findByIdAndUpdate(chatId, {
          $push: { messages: newMessage._id },
        });

        io.to(chatId).emit("new message", newMessage);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("list_vendors", async () => {
      console.log("x🍽️🍽️🍽️🍽️🍽️");
      
      // if (!mongoose.Types.ObjectId.isValid(chatId)) {
      //   console.error(`Invalid chat ID: ${chatId}`);
      //   return;
      // }

      // try {
      //   const chat = await ChatModel.findById(chatId)
      //     .populate("vendors")
      //     .populate({
      //       path: "messages",
      //       options: { sort: { createdAt: -1 } },
      //     });

      //   if (!chat) {
      //     console.error(`Chat not found with ID: ${chatId}`);
      //     return;
      //   }

      //   const vendors = chat.vendors;
      //   const lastMessagedVendors = vendors.sort((a, b) => {
      //     const lastMessageA = chat.messages.find(
      //       (message) => message.sender.toString() === a._id.toString()
      //     );
      //     const lastMessageB = chat.messages.find(
      //       (message) => message.sender.toString() === b._id.toString()
      //     );

      //     if (lastMessageA && lastMessageB) {
      //       return (
      //         new Date(lastMessageB.createdAt).getTime() -
      //         new Date(lastMessageA.createdAt).getTime()
      //       );
      //     }
      //     return 0;
      //   });

        socket.emit("vendors_list", "🎶🎶🎶");
      // } catch (error) {
      //   console.error("Error listing vendors:", error);
      // }
    });
  });
};

export default socketHandler;
