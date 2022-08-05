import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
};

const Room = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setRoomId } = Room.actions;

export default Room.reducer;
