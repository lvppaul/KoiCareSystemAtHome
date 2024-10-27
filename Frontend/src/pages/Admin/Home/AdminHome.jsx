import SideBar from "../../../components/Sidebar/SideBar";
import AdminSidebar from "../../../components/AdminComponents/AdminSidebar";
import TableUser from "../../../components/TableUser/TableUser";
import { Row, Col, Container } from "react-bootstrap";
import AdminNav from "../../../components/AdminNav/AdminNav";
import { BrowserRouter, Outlet, Route, Router } from "react-router-dom";
import AdminHeader from "../../../components/AdminComponents/AdminHeader";
import AdminSideBar from "../../../components/AdminComponents/AdminSidebar";
import AdminDashboard from "../../../components/AdminComponents/AdminDashboard";

const AdminHome = () => {
  return (
    <div>
      <AdminHeader />
      <AdminSideBar />
      <Outlet />
    </div>
  );
};

export default AdminHome;
