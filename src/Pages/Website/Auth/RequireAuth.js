import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { User } from "./../Context/UserContext";

export default function RequiredAuth() {
  const user = useContext(User);
  const location = useLocation();
  console.log(user.auth.userDetails);
  return user.auth.userDetails ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
