import SideBar from "./Components/SideBar";
import TopBar from "./Components/TopBar";
import Users from "./Users";

export default function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="content-flex">
        <SideBar />
        <Users />
      </div>
    </div>
  );
}
