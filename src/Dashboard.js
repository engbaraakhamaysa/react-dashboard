import SideBar from "./Components/SideBar";
import TopBar from "./Components/TopBar";

export default function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="content-flex">
        <SideBar />
        <h1>test</h1>
      </div>
      <div>Dashboard</div>
    </div>
  );
}
