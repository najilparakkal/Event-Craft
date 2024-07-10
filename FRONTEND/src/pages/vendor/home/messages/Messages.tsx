import React, { useState, useEffect, FormEvent } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { onReceiveMessage, sendMessage, joinRoom, onRoomMessages, socket } from '../../../../socket/socket';
import { fetchChatId } from '../../../../API/services/vendor/services';

interface User {
  _id: string;
  userName: string;
}

interface Message {
  sender: string | null | undefined;
  _id: string;
  senderId: string;
  content: string;
}

interface MessagesProps {
  selectedUser: User | null;
  sidebarOpen: boolean;
  toggleSidebar?: () => void;
}

const Messages: React.FC<MessagesProps> = ({ selectedUser, sidebarOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const { _id } = useAppSelector((state) => state.vendor.vendorDetails);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedUser) {
      const fetchChatRoomId = async () => {
        const response = await fetchChatId(_id + "", selectedUser._id);
        setRoomId(response);
      };
      fetchChatRoomId();
    }
  }, [selectedUser, _id]);

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId);

      const receiveMessageHandler = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      onRoomMessages((fetchedMessages: Message[]) => {
        setMessages(fetchedMessages);
      });

      onReceiveMessage(receiveMessageHandler);

      return () => {
        socket.off('receive message', receiveMessageHandler);
        socket.off('room messages');
      };
    }
  }, [roomId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newMessage.trim() && selectedUser && roomId) {
      const messageToSend = {
        senderId: _id,
        recipientId: selectedUser._id,
        content: newMessage,
        chatId: roomId,
        senderModel: 'Vendor'
      };

      sendMessage(messageToSend);
      setNewMessage('');
    }
  };

  return (
    <div className={`flex border-black flex-col ${sidebarOpen ? 'w-full' : 'w-full'} h-[550px] bg-blue-500 transition-all duration-300`}>
      <div className="flex items-center p-2 bg-[#edebeb] text-black border-white border-b-2 border-t-2">
        <h1 className="text-lg font-bold ml-2">{selectedUser ? selectedUser.userName : 'Select a user to start chatting'}</h1>
      </div>
      <div className="p-2 space-y-4  scrollNoDiv  scrollbar-hidden overflow-y-auto flex-1 bg-[#EFE8DE]">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`p-2 rounded-lg ${message.sender === _id ? 'bg-[#E2FFC7] text-black ml-auto self-end' : 'bg-white'}`}
            style={{ maxWidth: `${(message.content.length * 9) + 30}px` }} 
          >
            {message.content}
          </div>
        ))}
      </div>
      {selectedUser && (
        <form onSubmit={handleSubmit} className="p-2 bg-[#EFE8DE] flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 rounded-lg outline-none"
            placeholder="Type your message..."
          />
          <button type="submit" className="ml-2 p-2 bg-green-500 text-white rounded-lg">
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default Messages;
