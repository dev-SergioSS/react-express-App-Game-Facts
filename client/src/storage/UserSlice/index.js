import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: localStorage.getItem('userId') || '',
  name: localStorage.getItem('userName') || '',
  role: '',
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem('userId', action.payload);
    },
    setUserName: (state, action) => {
      state.name = action.payload;
      localStorage.setItem('userName', action.payload);
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUserId, setUserName, setUserRole } = UserSlice.actions;

export default UserSlice.reducer;
