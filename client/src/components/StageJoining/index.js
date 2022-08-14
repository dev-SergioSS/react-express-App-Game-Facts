import React from 'react';

const StageJoining = ({ roomId, users }) => {
  return (
    <div className="room">
      <h1>{roomId}</h1>
      <div className="users">
        <h2>Гравці</h2>
        <ul>
          {users.map((user) => {
            return <li key={user.name}>{user.name}</li>;
          })}
        </ul>
      </div>
      <button className="btn-start">Start</button>
    </div>
  );
};

export default StageJoining;
