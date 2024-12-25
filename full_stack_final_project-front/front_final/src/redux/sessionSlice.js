import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sessionTimeout: null, // Timeout in minutes
    isCounting: false, // Whether the countdown is active
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSessionTimeout: (state, action) => {
            state.sessionTimeout = action.payload; // Set session timeout (in minutes)
        },
        startCountdown: (state) => {
            state.isCounting = true; // Start the countdown
        },
        stopCountdown: (state) => {
            state.isCounting = false; // Stop the countdown
        },
        clearSession: (state) => {
            state.sessionTimeout = null; // Clear session on logout
            state.isCounting = false; 
        },
    },
});

export const { setSessionTimeout, startCountdown, stopCountdown, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
