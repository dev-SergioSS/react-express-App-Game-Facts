import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { roomNew, roomJoin, wsRoomJoin } from './controllers/RoomController.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    'mongodb+srv://lonelySS:shess12love@maincluster.fdzej.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

app.post('/new', roomNew);
app.get('/join', roomJoin);
app.patch('/join', wsRoomJoin);

io.on('connection', (socket) => {
  // console.log('user connected', socket.id);
  socket.on('ROOM:JOIN', ({ userName, roomId }) => {
    socket.join(roomId);
    // добавити нового юзера в кімнату в базі даних
    const users = ''; // отримати всіх юзерів
    console.log(userName, 'conected');
    io.to(roomId).emit('ROOM:JOINED', userName);
  });

  // socket.on('disconnected', (socket) => {
  // 	// remove
  // })
});

httpServer.listen(8888, (err) => {
  if (err) {
    throw Error(err);
    console.log(err);
  } else {
    console.log('server started');
  }
});
