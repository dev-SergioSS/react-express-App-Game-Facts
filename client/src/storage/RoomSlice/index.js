import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameStage: 'joining',
  id: null,
  users: [],
};

const Room = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.id = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setRoomId, setUsers } = Room.actions;

export default Room.reducer;
