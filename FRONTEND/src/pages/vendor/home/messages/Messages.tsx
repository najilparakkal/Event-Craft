import React, { useState, useEffect, FormEvent } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { onReceiveMessage, sendMessage, joinRoom, onRoomMessages, socket } from '../../../../socket/socket';
import { acceptRequest, cancelRequest, fetchChatId } from '../../../../API/services/vendor/services';

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

interface Chat {
  _id: string;
  users: string[];
  request: string;
  is_blocked: boolean;
  is_accepted: boolean;
}

interface MessagesProps {
  selectedUser: User | null;
  sidebarOpen: boolean;
  toggleSidebar?: () => void;
}

const Messages: React.FC<MessagesProps> = ({ selectedUser, sidebarOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [req, setReq] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  const { _id } = useAppSelector((state) => state.vendor.vendorDetails);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRejected, setIsRejected] = useState<boolean>(false);

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

  const acceptUser = async (id: string) => {
    try {
      const response = await acceptRequest(id, _id + "");
      if (response) {
        setReq((prevReq) => prevReq ? { ...prevReq, is_accepted: true } : null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectUser = async (id: string) => {
    try {
      const response = await cancelRequest(roomId + "");
      if (response) {
        setIsRejected(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`flex flex-col ${sidebarOpen ? 'w-full' : 'w-full'} h-[550px] bg-blue-500 transition-all duration-300`}>
      <div className="flex items-center p-2 bg-[#edebeb] text-black border-white border-b-2 border-t-2">
        <h1 className="text-lg font-bold ml-2">
          {selectedUser ? selectedUser.userName : 'Select a user to start chatting'}
        </h1>
      </div>
      <div className="p-2 space-y-4 scrollNoDiv scrollbar-hidden overflow-y-auto flex-1 bg-[#EFE8DE]">
        {messages.length === 0 && req?.is_accepted === false ? (
          <div className="flex justify-center items-center h-full">
            <div id="alert-additional-content-1" className="p-4 mb-4 border rounded-lg bg-transparent dark:text-blue-400 w-1/2" role="alert">
              <div className="flex items-center">
                <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <h3 className={`text-lg font-medium ${isRejected ? 'text-red-500' : 'text-blue-800'}`}>
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
                      onClick={() => selectedUser && acceptUser(selectedUser._id)}
                      className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => selectedUser && rejectUser(selectedUser._id)}
                      className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"
                      data-dismiss-target="#alert-additional-content-1"
                      aria-label="Close"
                    >
                      Reject
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
              className={`p-2 rounded-lg ${message.sender === _id ? 'bg-[#E2FFC7] text-black ml-auto self-end' : 'bg-white'}`}
              style={{ maxWidth: `${(message.content.length * 9) + 30}px` }}
            >
              {message.content}
            </div>
          ))
        )}
      </div>
      {selectedUser && req?.is_accepted && (
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
