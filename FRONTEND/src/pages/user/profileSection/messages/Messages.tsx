import React, { useState, useEffect, FormEvent, useRef } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { fetchChatId, cancelRequest } from '../../../../API/services/user/Services';
import { useSocket } from '../../../../API/services/outer/SocketProvider';
import { FaMicrophone, FaPaperclip } from 'react-icons/fa';

interface Vendor {
  _id: string;
  vendorName: string;
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
  selectedVendor: Vendor | null;
  sidebarOpen: boolean;
  toggleSidebar?: () => void;
}

const Messages = ({ selectedVendor, sidebarOpen }: MessagesProps) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { _id } = useAppSelector((state) => state.user.userDetails);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [req, setReq] = useState<Chat | null>(null);
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
    if (selectedVendor) {
      const fetchChatRoomId = async () => {
        const data = await fetchChatId(_id + "", selectedVendor._id);
        setRoomId(data);
      };
      fetchChatRoomId();
    }
  }, [selectedVendor, _id]);


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
        socket.off('new message', receiveMessageHandler);
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
        recipientId: selectedVendor._id,
        content: mergedBlob,
        chatId: roomId,
        type: 'audio', // Specify type
        senderModel: 'User',
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
      if (newMessage.trim() && selectedVendor && roomId) {
        const messageToSend = {
          senderId: _id,
          recipientId: selectedVendor._id,
          content: newMessage,
          chatId: roomId,
          type: 'text',
          senderModel: 'User',
        };
        socket.emit('send message', messageToSend);
        setNewMessage('');
      }
    }
  };

  const handleCancelRequest = async () => {
    try {
      const response = await cancelRequest(roomId + "");
      if (response) {
        setIsRejected(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    navigator.mediaDevices.getUserMedia({ audio: true }).then(media => {
      const mediaRecorder = new MediaRecorder(media);
      mediaRecorder.start(1000);
      mediaRecorder.ondataavailable = (event) => {
        setAudioBlob((prevBlobs) => [...prevBlobs, event.data]);
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
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handlePause = () => {
    // Implement pause logic here
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
    <div className={`flex flex-col ${sidebarOpen ? 'w-full' : 'w-full'} h-full bg-white shadow-lg rounded-md transition-all duration-300`}>
      <div className="flex items-center p-4 bg-black text-white rounded-t-md border-white border-b-2">
        <h1 className="text-lg font-bold">{selectedVendor ? selectedVendor.vendorName : 'Select a vendor to start chatting'}</h1>
      </div>
      <div
        className="p-4 space-y-4 scrollNoDiv overflow-y-auto scrollbar-hidden flex-1 bg-gray-100"
        style={{ backgroundImage: 'url(/user/85ecdf1c3611ecc9b7fa85282d9526e0.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        ref={divRef}
      >
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
                    Hi {selectedVendor?.vendorName}, I'd like to connect with you.
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={handleCancelRequest}
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center mr-2"
                    >
                      Cancel
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
                  className={`p-2 rounded-lg ${sender === _id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                >
                  {type === 'text' && content.trim() && <p>{content}</p>}
                </div>
                <div
                  className={`p-2 rounded-lg ${sender === _id ? 'bg-transparent text-white' : 'bg-gray-300 text-black'}`}
                >
                  {type === 'audio' && (
                    <audio controls>
                      <source src={message.content} type="audio/webm" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
                <div
                  className={`p-2 rounded-lg ${sender === _id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                >
                  {type === 'video' && (
                    <video controls className="w-full max-w-sm">
                      <source src={URL.createObjectURL(content)} type="video/mp4" />
                      Your browser does not support the video element.
                    </video>
                  )}
                </div>
                <div
                  className={`p-2 rounded-lg ${sender === _id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                >
                  {type === 'document' && (
                    <a href={URL.createObjectURL(content)} download className="block text-blue-500 hover:underline">
                      Download Document
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedVendor && req?.is_accepted && (
        <div className="p-2 bg-black flex items-center rounded-b-md">
          <button type="button" className="mr-2 p-2 bg-gray-800 text-white rounded-full">
            <FaPaperclip />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 mr-2 p-2 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isRecording ? (
            <VoiceRecorder />
          ) : (
            <button type="button" onClick={toggleRecording} className="mr-2 p-2 bg-gray-800 text-white rounded-full">
              <FaMicrophone />
            </button>
          )}

          <button
            onClick={() => handleSubmit()}
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          > Send </button>

        </div>
      )}
    </div>
  );
};

export default Messages;
