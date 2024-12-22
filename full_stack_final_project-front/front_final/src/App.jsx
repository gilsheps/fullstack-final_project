import "./App.css";
import { Routes, Route } from "react-router";
import Login from "./login";
// import MainComp from "./mainComp";
// import NewEmployeeComp from "./system/employees/newEmployeeComp";
// import NewDepartmentComp from "./system/department/newDepartmentComp";
// import UsersComp from "./system/users/usersComp";
// import SignOutComp from "./system/signout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/main_page" element={<MainComp />} />
      <Route path="/employee" element={<NewEmployeeComp />} />
      <Route path="/department" element={<NewDepartmentComp />} />
      <Route path="/users" element={<UsersComp />} />
      <Route path="/signout" element={<SignOutComp />} /> */}
    </Routes>
  );
}

export default App;
