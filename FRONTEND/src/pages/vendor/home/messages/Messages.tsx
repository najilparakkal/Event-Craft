import React, { useState, useEffect, FormEvent, useRef } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { acceptRequest, cancelRequest, fetchChatId } from '../../../../API/services/vendor/services';
import { useSocket } from '../../../../API/services/outer/SocketProvider';
import { FaMicrophone, FaPaperclip } from 'react-icons/fa';

interface User {
  _id: string;
  userName: string;
}

interface Message {
  _id: string;
  sender: string;
  content: Blob | string; // Blob for media content, string for text content
  type: 'text' | 'audio' | 'video' | 'document'; // Added type property
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
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [req, setReq] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  const { _id } = useAppSelector((state) => state.vendor.vendorDetails);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRejected, setIsRejected] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaRecorder | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTo({ top: divRef.current.scrollHeight });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedUser) {
      const fetchChatRoomId = async () => {
        const response = await fetchChatId(_id + "", selectedUser._id);
        setRoomId(response);
      };
      fetchChatRoomId();
    }
  }, [selectedUser]);

  useEffect(() => {
    document.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        isRecording ? sendAudio : handleSubmit()
      }
    })
  }, [])

  useEffect(() => {
    if (roomId) {
      socket.emit('join room', roomId);

      const receiveMessageHandler = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      socket.on('room messages', (fetchedMessages: any) => {
        setReq(fetchedMessages.chat);
        setMessages(fetchedMessages.messages);
      });

      socket.on('new message', receiveMessageHandler);

      return () => {
        socket.off('receive message', receiveMessageHandler);
        socket.off('room messages');
      };
    }
  }, [roomId, socket]);

  const sendAudio = async () => {
    if (stream) {
      stream?.getTracks().forEach(track => track.stop());
      const mergedBlob = new Blob(audioBlob, { type: 'audio/webm;codecs=opus' });
      const messageToSend = {
        senderId: _id,
        recipientId: selectedUser?._id,
        content: mergedBlob,
        chatId: roomId,
        type: 'audio', // Specify type
        senderModel: 'Vendor',
      };
      socket.emit('send_voice_message', messageToSend);
      setAudioBlob([]);
    }
  };

  const handleSubmit = async () => {
    if (isRecording) {
      await sendAudio();
      setIsRecording(false);
    } else {

      if (newMessage.trim() && selectedUser && roomId) {
        const messageToSend = {
          senderId: _id,
          recipientId: selectedUser._id,
          content: newMessage,
          chatId: roomId,
          type: 'text',
          senderModel: 'Vendor'
        };

        socket.emit('send message', messageToSend);
        setNewMessage('');
      }
    }
  };

  const acceptUser = async (id: string) => {
    try {
      const response = await acceptRequest(id, _id + "");
      if (response) {
        setReq(prevReq => prevReq ? { ...prevReq, is_accepted: true } : null);
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

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    navigator.mediaDevices.getUserMedia({ audio: true }).then(media => {
      const mediaRecorder = new MediaRecorder(media);
      mediaRecorder.start(1000);
      mediaRecorder.ondataavailable = (event) => {
        setAudioBlob(prevBlobs => [...prevBlobs, event.data]);
      };

      setStream(media);
      if (!isRecording) {
        setRecordingTime(0);
      }
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePause = () => {
    // Implement pause logic here
  };

  const VoiceRecorder: React.FC = () => (
    <div className="flex items-center">
      <div className="mr-2 p-2 bg-white text-black rounded-lg">{formatTime(recordingTime)}</div>
      <button type="button" onClick={handlePause} className="ml-2 p-2 bg-red-500 text-white rounded-lg">
        Pause
      </button>
    </div>
  );

  return (
    <div className={`flex flex-col ${sidebarOpen ? 'w-full' : 'w-full'} h-[550px] bg-blue-500 transition-all duration-300`}>
      <div className="flex items-center p-2 bg-[#edebeb] text-black border-white border-b-2 border-t-2">
        <h1 className="text-lg font-bold ml-2">
          {selectedUser ? selectedUser.userName : 'Select a user to start chatting'}
        </h1>
      </div>
      <div className="p-2 space-y-4 overflow-y-auto flex-1 bg-[#EFE8DE]" ref={divRef}>
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
          messages.map((message, index) => {
            const { sender, content, type } = message;

            return (
              <div
                key={index}
                className={`flex ${sender === _id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-2 rounded-lg ${sender === _id ? 'bg-[#E2FFC7] text-black ml-auto self-end' : 'bg-white'}`}
                  style={{ maxWidth: `${(message.content.length * 9) + 30}px` }}
                >
                  {type === 'text' && content.trim() && <p>{content}</p>}
                  {type === 'audio' && (
                    <audio controls>
                      <source src={message.content} type="audio/webm" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {type === 'video' && (
                    <video controls className="w-full max-w-sm">
                      <source src={message.content} type="video/mp4" />
                      Your browser does not support the video element.
                    </video>
                  )}
                  {type === 'document' && (
                    <a href={message.content} download className="block text-blue-500 hover:underline">
                      Download Document
                    </a>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
      {selectedUser && req?.is_accepted && (
        <form onSubmit={handleSubmit} className="p-2 bg-[#EFE8DE] flex">
          <button type="button" className="mr-2 p-2 bg-gray-800 text-white rounded-full">
            <FaPaperclip />
          </button>
          {isRecording ? (
            <VoiceRecorder />
          ) : (
            <button type="button" onClick={toggleRecording} className="mr-2 p-2 bg-gray-800 text-white rounded-full">
              <FaMicrophone />
            </button>
          )}
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
