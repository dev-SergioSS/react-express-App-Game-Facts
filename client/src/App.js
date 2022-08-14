import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './scss/base.scss';
import { Home, Room, NotFound } from './pages';
import { UserName } from './components';

function App() {
  const savedName = useSelector((state) => state.user.name);

  return (
    <div className="App">
      <div className="container">
        {!savedName && <UserName />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <div className="msg-error"></div>
    </div>
  );
}

export default App;
