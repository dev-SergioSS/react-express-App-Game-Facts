import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './home.module.scss';
import { Loading } from '../../components';
import { setRoomId } from '../../storage/RoomSlice';
import { setUserRole } from '../../storage/UserSlice';

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);
  let [loading, setLoading] = React.useState(false);
  const linkRoomPage = React.useRef();

  React.useEffect(() => {
    dispatch(setRoomId(null));
    dispatch(setUserRole(null));
  }, []);

  function genId() {
    const symbols = 'XSDRW123456789';
    let id = '';

    for (let i = 0; i < 6; i++) {
      let s = Math.floor(Math.random() * symbols.length);
      id += symbols[s];
    }
    return id;
  }

  function createGame() {
    setLoading((loading) => !loading);
    const roomId = genId();

    axios.post('/create', { userName, roomId }).then((res) => openRoom(res.data));
  }

  function joinRoom() {
    setLoading((loading) => !loading);
    const roomId = 'input';

    axios.get('/join', { userName, roomId }).then((res) => openRoom(res.data));
  }

  function openRoom(data) {
    const { roomId, userRole, error } = data;

    if (error) {
      return console.log(error);
    }

    dispatch(setRoomId(roomId));
    dispatch(setUserRole(userRole));
    setLoading((loading) => !loading);
    linkRoomPage.current.click();
  }

  return (
    <div className={styles.home}>
      {loading && <Loading />}

      <h1>Привіт, {userName}!</h1>
      <div className={styles.buttons}>
        <button onClick={createGame}>Створити гру</button>
        <button>Приднатися</button>
      </div>

      <Link to={`/room/${userName}`} ref={linkRoomPage}></Link>
    </div>
  );
};

export default Home;
