import React from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
  let { id } = useParams();

  return (
    <div className="list-users">
      <div>roomPage</div>
      <div>id: {}</div>
    </div>
  );
};

export default Room;

// import socket from './socket'

// React.useEffect(() => {
// 	socket.emit('ROOM:JOIN', { userName: 'serg', roomId: 'room' })
// 	socket.on('ROOM:JOINED', (users) => {
// 		console.log('приєднався новий користувач', users);
// 	})
// }, [])
