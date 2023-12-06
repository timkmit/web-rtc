import { io } from 'socket.io-client';

const options = {
  forceNew: true,
  timeout: 5000,
  transports: ['websocket'],
};

const socket = io('http://localhost:3001', options);

socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

export default socket;
