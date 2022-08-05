
import { configureStore } from "@reduxjs/toolkit";
import RoomSlice from "./RoomSlice";
import UserSlice from "./UserSlice";

export const store = configureStore({
	reducer: {
		user: UserSlice,
		room: RoomSlice,
	}
})