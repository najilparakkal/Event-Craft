import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000');

export const onReceiveMessage = (callback: (message: any) => void) => {
  socket.on('new message', callback);
};

export const onRoomMessages = (callback: (messages: any[]) => void) => {
  socket.on('room messages', callback);
};

export const sendMessage = (message: any) => {
  socket.emit('send message', message);
};

export const joinRoom = (room: string) => {
  socket.emit('join room', room);
};
  
export { socket };
