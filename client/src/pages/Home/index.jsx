import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './home.module.scss';
import genId from '../../lib/genId';
import { Loading } from '../../components';
import { setRoomId } from '../../storage/RoomSlice';
import { setUserRole } from '../../storage/UserSlice';

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);

  let [loading, setLoading] = React.useState(false);
  const linkRoomPage = React.useRef();
  const valueJoinRoom = React.useRef();

  React.useEffect(() => {
    dispatch(setRoomId(null));
    dispatch(setUserRole(null));
  }, []);

  function createRoom() {
    setLoading((loading) => !loading);
    const roomId = genId();

    axios.post('/create', { roomId }).then((res) => openRoom(res.data));
  }

  function isExistRoom() {
    setLoading((loading) => !loading);
    const roomId = valueJoinRoom.current.value.toUpperCase();
    axios
      .get(`/isExist/${roomId}`)
      .then((res) => openRoom(res.data))
      .catch((err) => {
        alert(err.message);
      });
  }

  function openRoom(data) {
    const { roomId, userRole, error } = data;
    setLoading((loading) => !loading);

    if (error) {
      return console.log(error);
      //  + Popup
    }

    dispatch(setRoomId(roomId));
    dispatch(setUserRole(userRole));

    linkRoomPage.current.click();
  }

  return (
    <div className={styles.home}>
      {loading && <Loading />}

      <h1>Привіт, {userName}!</h1>
      <div className={styles.buttons}>
        <button onClick={createRoom}>Створити гру</button>
        <div className={styles.toJoin}>
          <span>Або введіть номер гри:</span>
          <input type="text" placeholder="XXXXXX" maxLength={6} ref={valueJoinRoom} />
          <button onClick={isExistRoom}>Приднатися</button>
        </div>
      </div>

      <Link to={`/room/test`} ref={linkRoomPage}></Link>
    </div>
  );
};

export default Home;
