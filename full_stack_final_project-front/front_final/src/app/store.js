import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../redux/sessionSlice";
import authReducer from "../redux/authSlice";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    auth: authReducer,
  },
});

export default store;
