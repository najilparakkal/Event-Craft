import React, { useState, useEffect, FormEvent } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { onReceiveMessage, sendMessage, joinRoom, onRoomMessages, socket } from '../../../../socket/socket';
import { fetchChatId } from '../../../../API/services/user/Services';

interface Vendor {
  _id: string;
  vendorName: string;
}

interface Message {
  _id: string;
  sender: string;
  content: string;
}

interface MessagesProps {
  selectedVendor: Vendor | null;
  sidebarOpen: boolean;
  toggleSidebar?: () => void;
}

const Messages: React.FC<MessagesProps> = ({ selectedVendor, sidebarOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { _id } = useAppSelector((state) => state.user.userDetails);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedVendor) {
      const fetchChatRoomId = async () => {
        const data = await fetchChatId(_id + "", selectedVendor._id);
        setRoomId(data);
      };
      fetchChatRoomId();
    }
  }, [selectedVendor, _id]);

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
    if (newMessage.trim() && selectedVendor && roomId) {
      const messageToSend = {
        senderId: _id,
        recipientId: selectedVendor._id,
        content: newMessage,
        chatId: roomId,
        senderModel: 'User'
      };

      sendMessage(messageToSend);
      setNewMessage('');
    }
  };

  return (
    <div className={`flex flex-col ${sidebarOpen ? 'w-full' : 'w-full'}  h-full bg-white shadow-lg  rounded-md transition-all duration-300`}>
      <div className="flex items-center p-4 bg-black text-white rounded-t-md border-white border-b-2">
        <h1 className="text-lg font-bold">{selectedVendor ? selectedVendor.vendorName : 'Select a vendor to start chatting'}</h1>
      </div>
      <div className="p-4 space-y-4 scrollNoDiv overflow-y-auto scrollbar-hidden flex-1 bg-gray-100" style={{ backgroundImage: 'url(/user/85ecdf1c3611ecc9b7fa85282d9526e0.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

        {messages.map(message => (
          <div
            key={message._id}
            className={`p-2 rounded-lg justify-between flex shadow-sm w-3/4 ${
              message.sender === _id ? 'bg-[#E2FFC7] text-black ml-auto' : 'bg-white self-start'
            }`}
            style={{ maxWidth: `${(message.content.length * 10) + 40}px` }} 

          >
            {message.content}
            {/* <span className="block text-xs text-right mt-1 text-gray-600">11:23 PM</span> */}
          </div>
        ))}
      </div>
      {selectedVendor && (
        <form onSubmit={handleSubmit} className="p-2 bg-black flex rounded-b-md">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 rounded-l-md border-none outline-none"
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
