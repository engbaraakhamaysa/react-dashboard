import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="d-flex ">
      <div className="d-flex flex-1">
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
      </div>
      <div className="d-flex">
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
      </div>
    </nav>
  );
}
