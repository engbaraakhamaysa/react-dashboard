import { Link } from "react-router-dom";

export default function Header() {
  function habendLogOut() {
    window.localStorage.removeItem("email");
    window.location.pathname = "/";
  }
  return (
    <div className="container shadow">
      <nav className="d-flex padding-2">
        <div className="d-flex flex-1">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="d-flex">
          {!window.localStorage.getItem("email") ? (
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
            <div className="register-nav" onClick={habendLogOut}>
              LogOut
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
