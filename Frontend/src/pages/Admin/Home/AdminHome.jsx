import { BrowserRouter, Outlet, Route, Router } from "react-router-dom";
import AdminHeader from "../../../components/AdminComponents/AdminHeader";
import AdminSideBar from "../../../components/AdminComponents/AdminSidebar";
import "./AdminHome.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminHome = () => {
  return (
    <>
      <AdminHeader />
      <div className="main d-flex">
        <div className="sidebarWrapper">
          <AdminSideBar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminHome;
