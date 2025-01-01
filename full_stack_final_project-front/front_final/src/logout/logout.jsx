import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { stopCountdown, clearSession } from '../redux/sessionSlice';


export default function LogoutComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.clear();
    dispatch(stopCountdown()); // Stop the countdown
    dispatch(clearSession()); // Clear session data
    // dispatch(logout()); // Logout user
    return navigate("/login");
  }, []);

  return (
    <div>
      <h1>LogOut</h1>
    </div>
  );
}
