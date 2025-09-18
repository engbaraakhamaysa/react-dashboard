import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import Dashboard from "./Dashboard";
import Users from "./Users";

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
        </Route>
      </Routes>
    </div>
  );
}
