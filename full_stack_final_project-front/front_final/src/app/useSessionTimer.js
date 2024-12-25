import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stopCountdown, clearSession } from '../redux/sessionSlice';
import { logout } from '../redux/authSlice';

const useSessionTimer = () => {
    const dispatch = useDispatch();
    const { sessionTimeout, isCounting } = useSelector((state) => state.session);

    useEffect(() => {
        console.log("useSessionTimer.js: useSessionTimer() useEffect() isCounting: ", isCounting);
        if (isCounting && sessionTimeout > 0) {
            const interval = setInterval(() => {
                dispatch(setSessionTimeout(sessionTimeout - 1)); // Decrement timeout by 1 minute
            }, 60000); // 1 minute interval

            return () => clearInterval(interval); // Cleanup interval
        }

        if (sessionTimeout <= 0) {
            dispatch(clearSession()); // Clear session if time is up
            dispatch(logout()); // Logout user
        }
    }, [isCounting, sessionTimeout, dispatch]);
};

export default useSessionTimer;
