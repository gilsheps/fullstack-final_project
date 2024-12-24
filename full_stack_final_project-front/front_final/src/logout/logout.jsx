import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LogoutComp() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    return navigate("/login");
  }, []);

  return (
    <div>
      <h1>LogOut</h1>
    </div>
  );
}
