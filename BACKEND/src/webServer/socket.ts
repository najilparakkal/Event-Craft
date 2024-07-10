import { Server, Socket } from 'socket.io';
import Message from '../framworks/database/models/message';
import ChatModel from '../framworks/database/models/chatModal';
import mongoose from 'mongoose';

const socketHandler = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('join room', async (room: string) => {
      console.log(`Socket ${socket.id} joined room: ${room}`);
      socket.join(room);

      if (!mongoose.Types.ObjectId.isValid(room)) {
        console.error(`Invalid chat ID: ${room}`);
        return;
      }

      try {
        const messages = await Message.find({ chat: room }).sort({ createdAt: 1 });
        socket.emit('room messages', messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    });

    socket.on('send message', async (message) => {
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
        });

        await newMessage.save();
        await ChatModel.findByIdAndUpdate(chatId, { $push: { messages: newMessage._id } });

        io.to(chatId).emit('new message', newMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });
  });
};

export default socketHandler;
