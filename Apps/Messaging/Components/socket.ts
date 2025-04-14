import { io, Socket } from 'socket.io-client';

let socket: Socket ;

export const initiateSocket = (): Socket => {
  if (!socket) {
    socket = io('ws://localhost:3000');
    if(socket){

      socket.on('connect', () => {
        console.log('Connected to server with ID:', socket.id);
        socket.emit('joinGroup', { groupName: 'messages' });
      });
      
    }
  }
  
  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    return initiateSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log('disconnecting socket');
    socket.disconnect();
  }
};