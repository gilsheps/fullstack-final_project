import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useSessionTimer from "./app/useSessionTimer";
import { Login, MainComp, LogOutComp, RegisterComp } from "./index";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  // useSessionTimer();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? <MainComp /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
        <Route path="/register" element={<RegisterComp />} />
        <Route path="/main_page" element={<MainComp />} />
        <Route path="/signout" element={<LogOutComp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
