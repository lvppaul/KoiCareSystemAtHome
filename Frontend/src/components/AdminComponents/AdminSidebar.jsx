import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { MdSpaceDashboard } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import { adminHomeContext } from "../../pages/Admin/Home/AdminHome";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiVipLine } from "react-icons/ri";

import { useAuth } from "../../pages/Login/AuthProvider";

const AdminSideBar = () => {
  const context = useContext(adminHomeContext);
  const auth = useAuth();
  const { logout } = auth;
  const handleLogOut = () => {
    logout();
  };
  return (
    <div>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="dashboard">
              <Button className="w-100">
                <span className="icon">
                  <MdSpaceDashboard />
                </span>
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link to="members">
              <Button className="w-100">
                <span className="icon">
                  <MdAccountCircle />
                </span>
                Member
              </Button>
            </Link>
          </li>
          <li>
            <Link to="vips">
              <Button className="w-100">
                <span className="icon">
                  <RiVipLine />
                </span>
                Vip
              </Button>
            </Link>
          </li>
          <li>
            <Link to="shops">
              <Button className="w-100">
                <span className="icon">
                  <FaShop />
                </span>
                Shop
              </Button>
            </Link>
          </li>
          <li>
            <Link to="adminOrders">
              <Button className="w-100">
                <span className="icon">
                  <MdOutlineAttachMoney />
                </span>
                Order
              </Button>
            </Link>
          </li>
          {/* <li>
            <Link to="vippackages">
              <Button className="w-100">
                <span className="icon">
                  <MdCategory />
                </span>
                Vip Packages
              </Button>
            </Link>
          </li> */}
          {/* <li>
            <Link to="categories">
              <Button className="w-100">
                <span className="icon">
                  <MdCategory />
                </span>
                News
              </Button>
            </Link>
          </li> */}
          <li>
            <Link to="#">
              <Button className="w-100" onClick={handleLogOut}>
                <span className="icon">
                  <MdOutlineLogout />
                </span>
                Logout
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default AdminSideBar;
