import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './input-name.module.scss';
import { setUserId, setUserName } from '../../storage/UserSlice';
import genId from '../../lib/genId';

const UserName = () => {
  const dispatch = useDispatch();
  const savedId = useSelector((state) => state.user.id);
  const savedName = useSelector((state) => state.user.name);

  let [name, setName] = React.useState(savedName);
  let [textErr, setTextErr] = React.useState('');

  function validateInputing(name) {
    let validName = name.replace(/[^0-9A-zА-яІіЇїҐґЄє]/g, '');
    setName(validName);
  }

  function validateName(name) {
    name = name.trim();

    if (name.length < 3) {
      return showError("Введіть ім'я більше 3 символів");
    }
    if (name.length > 10) {
      return showError("Введіть ім'я не більше 10 символів");
    }
    setTextErr('');
    dispatch(setUserName(name));

    if (!savedId) {
      const userId = 'user_' + genId();
      dispatch(setUserId(userId));
    }
  }

  function showError(err) {
    setTextErr(err);
  }

  return (
    <div className={styles.page}>
      <h1>Введіть своє ім'я</h1>
      <div className={styles.content}>
        <input
          type="text"
          placeholder="Мене звати..."
          value={name}
          onChange={(e) => validateInputing(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && validateName(name)}
        />
        {textErr && <span>{textErr}</span>}
        <button onClick={() => validateName(name)}>Підтвердити</button>
      </div>
    </div>
  );
};

export default UserName;
