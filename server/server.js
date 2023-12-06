import path from 'path';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ACTIONS from '../src/socket/actions';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3088;

function getClientRooms() {
  const {rooms} = io.sockets.adapter;

  return Array.from(rooms.keys())
}

function shareRoomsInfo() {
  io.emit(ACTIONS.SHARE_ROOMS, {
    rooms: getClientRooms()
  })
}

io.on('connection', (socket) => {
  console.log('Socket connected');

  socket.on(ACTIONS.JOIN, config => {
    const {room: roomID} = config;
    const {rooms: joinedRooms} = socket;

    if(Array.from(joinedRooms).includes(roomID)){
      return console.warn(`You are already at ${roomID} room`)
    }

    const client = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

    clients.forEach(clientID => {
      io.to(clientID).emit(ACTIONS.ADD_PEER, {
        peerID : socket.id,
        createOffer: false
      }) //принимающая сторона добавляет офферы к пирам

      socket.emit(ACTIONS.ADD_PEER, {
        peerID: clientID,
        createOffer: true
      }) //будет создавать оффер сторона, которая подключается
    })

    socket.join(roomID);
    shareRoomsInfo();
  })

  function leaveRoom() {
    const {rooms} = socket;
    Array.from(rooms)
      .forEach(roomID => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

        clients.forEach( clientID => {
          io.to(clientID).emit(ACTIONS, {
            peerID: socket.id,
          }) //при выходе отправаляем айдишник остальным участникам

          socket.emit(ACTIONS.REMOVE_PEER, {
            peerID: clientID,
          }) //себе при отключении отправляем айдишник клиента для отключения
        })

        socket.leave(roomID);
      })

      shareRoomsInfo();
  }

  socket.on(ACTIONS.LEAVE, leaveRoom);
  socket.on('disconnecting', leaveRoom);

});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
