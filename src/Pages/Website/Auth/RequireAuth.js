import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { User } from "./../Context/UserContext";

export default function RequiredAuth() {
  const user = useContext(User);
  console.log(user.userDetails);
  // return user.auth.userDetails ? <Outlet /> : <Navigate to="/login" />;
  return user.auth.userDetails ? <Navigate to="/login" /> : <Outlet />;
}
