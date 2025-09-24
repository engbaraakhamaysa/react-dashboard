import { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../Pages/Website/Context/UserContext";
import Cookies from "universal-cookie";
import axios from "axios";

export default function Header() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  console.log(token);
  async function handleLogOut() {
    await axios.post("http://localhost:8000/api/auth/logout", null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    cookie.remove("Bearer");
    window.location.pathname = "/";
  }

  return (
    <div className="container shadow">
      <nav className="d-flex padding-2">
        <div className="d-flex flex-1">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
        </div>
        <div className="d-flex">
          {!token ? (
            <>
              <Link
                to="/register"
                className="register-nav"
                style={{ textAlign: "center" }}
              >
                Register
              </Link>
              <Link
                to="/login"
                className="register-nav"
                style={{ textAlign: "center" }}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="register-nav"
                style={{ textAlign: "center" }}
              >
                Dashboard
              </Link>

              <div className="register-nav" onClick={handleLogOut}>
                LogOut
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
