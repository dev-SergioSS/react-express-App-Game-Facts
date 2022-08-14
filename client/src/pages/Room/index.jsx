import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import socket from '../../socket.js';
import styles from '../../scss/room.scss';
import { Loading, StageJoining, StageWriting } from '../../components';
import { setUsers } from '../../storage/RoomSlice';

const Room = () => {
  //   let { id } = useParams();
  const dispatch = useDispatch();

  let gameStage = useSelector((state) => state.room.gameStage);
  let roomId = useSelector((state) => state.room.id);
  let users = useSelector((state) => state.room.users);
  let user = useSelector((state) => state.user);

  let userRole = useSelector((state) => state.user.role);

  React.useEffect(() => {
    socket.emit('JOINING', roomId, user);
    socket.on('USER:LIST', (users) => {
      console.table(users);
      dispatch(setUsers(users));
    });
  }, []);

  //   React.useEffect(() => {
  //     // console.log(gameStage);
  //   }, [gameStage]);

  switch (gameStage) {
    case 'joining':
      return <StageJoining roomId={roomId} users={users} />;
    case 'writing':
      return <StageWriting />;

    // default:
    // 	break;
  }
};

export default Room;
