import { BrowserRouter, Outlet, Route, Router } from "react-router-dom";
import AdminHeader from "../../../components/AdminComponents/AdminHeader";
import AdminSideBar from "../../../components/AdminComponents/AdminSidebar";
import "./AdminHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useEffect, useState } from "react";
const adminHomeContext = createContext();
const AdminHome = () => {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const values = { isToggleSidebar, setIsToggleSidebar };

  return (
    <adminHomeContext.Provider value={values}>
      <>
        <AdminHeader />
        <div className="main d-flex">
          <div
            className={`sidebarWrapper ${
              isToggleSidebar === true ? "toggle" : ""
            }`}
          >
            <AdminSideBar />
          </div>
          <div
            className={` content ${isToggleSidebar === true ? "toggle" : ""}`}
          >
            <Outlet />
          </div>
        </div>
      </>
    </adminHomeContext.Provider>
  );
};

export default AdminHome;
export { adminHomeContext };
