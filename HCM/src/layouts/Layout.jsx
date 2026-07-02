import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Layout.css"
function Layout() {
  return (
    <>
      <Sidebar />

      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;