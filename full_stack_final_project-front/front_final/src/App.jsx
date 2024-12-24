import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./login/login";
import MainComp from "./mainPage/mainComponent";
import LogOutComp from "./logout/logout";
import RegisterComp from "./register/RegisterComp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterComp />} />
        <Route path="/main_page" element={<MainComp />} />
        <Route path="/signout" element={<LogOutComp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
