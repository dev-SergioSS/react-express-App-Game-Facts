import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: localStorage.getItem('userName') || '',
  role: '',
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
      localStorage.setItem('userName', action.payload);
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUserName, setUserRole } = UserSlice.actions;

export default UserSlice.reducer;
