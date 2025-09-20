import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Website/Auth/SignUp";
import Login from "./Pages/Website/Auth/Login";
import Home from "./Pages/Website/Home";
import About from "./Pages/Website/About";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/Users";
import UpdateUser from "./Pages/Users/UpdateUser";
import CreatUser from "./Pages/Users/CreateUser";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UpdateUser />} />
          <Route path="user/create" element={<CreatUser />} />
        </Route>
      </Routes>
    </div>
  );
}
