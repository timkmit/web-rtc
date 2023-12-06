import { io } from 'socket.io-client';

const options = {
  forceNew: true,
  timeout: 5000,
  transports: ['websocket'],
};

const socket = io('http://localhost:3088', options);

socket.on('connect', () => {
  console.log('Socket connected to the server');
});

socket.on('disconnect', () => {
  console.log('Socket disconnected from the server');
});

export default socket;
