import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { stopCountdown, clearSession } from '../redux/sessionSlice';


export default function LogoutComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.clear();
    dispatch(stopCountdown());
    dispatch(clearSession());
    return navigate("/login");
  }, []);

  return (
    <div>
      <h1>LogOut</h1>
    </div>
  );
}
