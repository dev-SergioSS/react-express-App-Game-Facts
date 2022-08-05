import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Home, Room, NotFound } from './pages';
import { UserName } from './components';

function App() {
  const savedName = useSelector((state) => state.user.name);

  return (
    <div className="App">
      {!savedName && <UserName />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
