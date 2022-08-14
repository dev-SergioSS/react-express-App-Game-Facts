import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';

import * as RoomController from './controllers/RoomController.js';
import RoomModel from './models/Room.js';

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

app.post('/create', RoomController.create);
app.get('/isExist/:roomId', RoomController.isExist);

io.on('connection', (socket) => {
  socket.on('JOINING', async (roomId, user) => {
    try {
      // Отримати список всіх юзерів в кімнаті
      let users = await RoomController.getUsers(roomId);
      let usersId = users.map((user) => user.id);

      //   Якщо юзер з id вже є в кімнаті, то оновити його соккет в БД
      if (usersId.includes(user.id)) {
        await RoomController.updateUserSocket(roomId, user.id, socket.id);
      } else {
        //   Якщо гра почалася новим користувачам не можна приєднатися
        const stage = await RoomController.getRoomStage(room);
        if (stage !== 'joining') {
          // ! написати логіку
          // return
        }

        // Якщо це новий юззер, то відключити від усіх інших кімнат
        socket.rooms.forEach(async (room) => {
          if (room !== socket.id) {
            socket.leave(room);
          }
        });
        // Підключення до нової кімнатив
        socket.join(roomId);

        user.socket = socket.id;

        const updatedUsers = await RoomController.addUser(roomId, user);
        io.to(roomId).emit('USER:LIST', updatedUsers);
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on('disconnecting', () => {
    //   В кожній підключеній кімнаті:
    socket.rooms.forEach(async (room) => {
      if (room !== socket.id) {
        const stage = await RoomController.getRoomStage(room);

        //   Якщо етап 'joining', то юзер видаляється повністю
        if (stage === 'joining') {
          const updatedUsers = await RoomController.removeUser(room, socket.id);
          io.to(room).emit('USER:LIST', updatedUsers);
          socket.leave(room);
          console.log('Видалено користувача з БД');
        }

        // Якщо інший етап то...
        else {
          console.log('КОРИСТУВАЧ ВІД`ЄДНАВСЯ ПІСЛЯ JOINING');
        }
      }
    });
  });
});

httpServer.listen(8888, (err) => {
  if (err) {
    throw Error(err);
    console.log(err);
  } else {
    console.log('server started');
  }
});
