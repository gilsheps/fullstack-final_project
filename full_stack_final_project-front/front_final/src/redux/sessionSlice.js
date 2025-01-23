import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  sessionTimeout: 0, // Timeout in minutes
  isCounting: false, // Whether the countdown is active
  loginTimestamp: 0,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionTimeout: (state, action) => {
      state.sessionTimeout = action.payload.sessionTimeout; // Set session timeout (in minutes)
      state.loginTimestamp = action.payload.loginTimestamp;
    },
    clearSession: (state) => {
      state.sessionTimeout = 0; // Clear session on logout
      state.isCounting = false;
    },
    isSessionExpired: (state, action) => {
      const currentTime = Date.now();
      const timeoutDuration = parseInt(state.sessionTimeout, 10) * 60 * 1000; // Convert minutes to ms
      return currentTime - parseInt(state.loginTimestamp, 10) > timeoutDuration;
    },
  },
});

export const {setSessionTimeout, clearSession, isSessionExpired} = sessionSlice.actions;
export default sessionSlice.reducer;
