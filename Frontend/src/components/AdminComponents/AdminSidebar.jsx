import React from "react";
import Button from "@mui/material/Button";
import { MdSpaceDashboard } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
const AdminSideBar = () => {
  return (
    <div>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="#">
              <Button className="w-100">
                <span className="icon">
                  <MdSpaceDashboard />
                </span>
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link to="#">
              <Button className="w-100">
                <span className="icon">
                  <MdAccountCircle />
                </span>
                Member
              </Button>
            </Link>
          </li>
          <li>
            <Link to="#">
              <Button className="w-100">
                <span className="icon">
                  <FaShop />
                </span>
                Shop
              </Button>
            </Link>
          </li>
          <li>
            <Link to="#">
              <Button className="w-100">
                <span className="icon">
                  <MdCategory />
                </span>
                Category
              </Button>
            </Link>
          </li>
          <li>
            <Link to="#">
              <Button className="w-100">
                <span className="icon">
                  <FaMoneyBillTrendUp />
                </span>
                Revenue
              </Button>
            </Link>
          </li>
          <li>
            <Link to="#">
              <Button className="w-100">
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
