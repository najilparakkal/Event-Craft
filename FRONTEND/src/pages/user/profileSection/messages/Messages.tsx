import React, { useState, useEffect, FormEvent } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { onReceiveMessage, sendMessage, joinRoom, onRoomMessages, socket } from '../../../../socket/socket';
import { fetchChatId, cancelRequest } from '../../../../API/services/user/Services';

interface Vendor {
  _id: string;
  vendorName: string;
}

interface Message {
  _id: string;
  sender: string;
  content: string;
}

interface Chat {
  _id: string;
  users: string[];
  request: string;
  is_blocked: boolean;
  is_accepted: boolean;
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
  const [req, setReq] = useState<Chat | null>(null);
  const [isRejected, setIsRejected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedVendor) {
      const fetchChatRoomId = async () => {
        const data = await fetchChatId(_id+"", selectedVendor._id);
        setRoomId(data);
      };
      fetchChatRoomId();
    }
  }, [selectedVendor]);

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId);

      const receiveMessageHandler = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      onRoomMessages((fetchedMessages: any) => {
        setReq(fetchedMessages.chat);
        setMessages(fetchedMessages.messages);
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

  const handleCancelRequest = async () => {
    try {
      const response = await cancelRequest(roomId+"");
      if (response) {
        setIsRejected(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`flex flex-col ${sidebarOpen ? 'w-full' : 'w-full'} h-full bg-white shadow-lg rounded-md transition-all duration-300`}>
      <div className="flex items-center p-4 bg-black text-white rounded-t-md border-white border-b-2">
        <h1 className="text-lg font-bold">{selectedVendor ? selectedVendor.vendorName : 'Select a vendor to start chatting'}</h1>
      </div>
      <div className="p-4 space-y-4 scrollNoDiv overflow-y-auto scrollbar-hidden flex-1 bg-gray-100" style={{ backgroundImage: 'url(/user/85ecdf1c3611ecc9b7fa85282d9526e0.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {messages.length === 0 && req?.is_accepted === false ? (
          <div className="flex justify-center items-center h-full">
            <div id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border rounded-lg bg-transparent dark:text-blue-400 w-1/2" role="alert">
              <div className="flex items-center">
                <svg className="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <h3 className={`text-lg font-medium ${isRejected ? 'text-red-800' : 'text-blue-800'}`}>
                  {isRejected ? 'Request Rejected' : 'Connection Request'}
                </h3>
              </div>
              {!isRejected && (
                <>
                  <div className="mt-2 mb-4 text-sm">
                    {req?.request}
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={handleCancelRequest}
                      className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-400 dark:hover:text-white dark:focus:ring-red-800"
                      data-dismiss-target="#alert-additional-content-1"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`p-2 rounded-lg justify-between flex shadow-sm w-3/4 ${
                message.sender === _id ? 'bg-[#E2FFC7] text-black ml-auto' : 'bg-white self-start'
              }`}
              style={{ maxWidth: `${(message.content.length * 10) + 40}px` }}
            >
              {message.content}
            </div>
          ))
        )}
      </div>
      {selectedVendor && req?.is_accepted && (
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