import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import SignUp from "./SignUp";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </div>
  );
}
