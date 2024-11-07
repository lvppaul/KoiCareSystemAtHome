import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/Fpt_TTKoi_logo.svg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdOutlineMenu } from "react-icons/md";
import { adminHomeContext } from "../../pages/Admin/Home/AdminHome";
import { MdMenuOpen } from "react-icons/md";
const AdminHeader = () => {
  const context = useContext(adminHomeContext);
  return (
    <div>
      <header className="d-flex align-items-center admin-header">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center">
            {/* Logo */}
            <div className="col-2 part1">
              <Link to={"#"} className="d-flex align-items-center header-link">
                <img src={logo} alt="Logo" className="logo" />
                <span className="logo-text">FPT TT Koi</span>
              </Link>
            </div>
            <div className="col-2 d-flex align-items-center part2 ">
              <Button
                className="rounded-circle"
                onClick={() =>
                  context.setIsToggleSidebar(!context.isToggleSidebar)
                }
              >
                {context.isToggleSidebar === false ? (
                  <MdMenuOpen />
                ) : (
                  <MdOutlineMenu />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
