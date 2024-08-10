import { Server, Socket } from "socket.io";
import Message from "../framworks/database/models/message";
import ChatModel from "../framworks/database/models/chatModal";
import mongoose from "mongoose";
import formidable from "formidable";
import { uploadBufferToS3, uploadImage } from "../config/awsConfig";
import { Vendors } from "../framworks/database/models/vendor";
import { fetchVendors } from "../domain/usecases/user/home/home";
import { listVendorsInUserChat } from "../domain/repositories/user/homeRepo";
import { fetchUsers } from "../domain/repositories/vendor/requestRepo";

const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join_home",async(idArray:string[])=>{
      
      for (const id of idArray) {
        
        socket.join(id)
      }
    })


    socket.on("join room", async (room: string) => {
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

    socket.on("read_message", async (chatId, senderId) => {
      try {
        await Message.updateMany(
          { chat: chatId, sender: { $ne: senderId }, read: false },
          { $set: { read: true } }
        );
        const message = await Message.find({ chat: chatId });
      } catch (error) {
        console.error("Error updating messages:", error);
      }
    });   

    socket.on("list_vendors", async (userId) => {
      try {
        const venders = await listVendorsInUserChat(userId);

        socket.emit("sorted_list", venders);
      } catch (error) {
        console.error("Error fetching vendors: ", error);
      }
    });
    socket.on("list_users", async (vendorId) => {
      try {
        const users = await fetchUsers(vendorId);
        socket.emit("sorted_user_list", users);
      } catch (error) {
        console.log(error);
      }
    });
  });
};

export default socketHandler;
