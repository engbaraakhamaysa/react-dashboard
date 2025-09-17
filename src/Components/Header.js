import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="d-flex">
      <div className="d-flex">
        <h6>Home</h6>
        <h6>About</h6>
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
