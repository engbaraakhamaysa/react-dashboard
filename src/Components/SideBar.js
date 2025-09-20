import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="side-bar">
      <Link to="/dashboard/users" className="item-link">
        Users
      </Link>
      <Link to="/dashboard/users/create" className="item-link">
        New User
      </Link>
    </div>
  );
}
