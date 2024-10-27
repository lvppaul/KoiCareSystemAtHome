import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "../../assets/Fpt_TTKoi_logo.svg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdOutlineMenuOpen } from "react-icons/md";
const AdminHeader = () => {
  return (
    <div>
      <header className="d-flex align-items-center">
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
              <Button className="rounded-circle">
                <MdOutlineMenuOpen />
              </Button>
            </div>
            <div className="col-8 d-flex align-items-center justify-content-end part3 ">
              <div className="account d-flex align-items-center">
                <div className="account-img">
                  <span className="rounded-circle">
                    <img
                      src="https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/460321487_505751425410707_7289942400838563554_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=GKwKBiPXioUQ7kNvgF0i6DH&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=AwkhrViJzQeTTVhNDtdLOz4&oh=00_AYDZP4otGStW5612SBTxwj64iYr7-Szo1RgXI3z78BqNCA&oe=672423C1"
                      alt="chochohong"
                    />
                  </span>
                </div>
                <div className="accountInfo">
                  <h4>Admin</h4>
                  <p>admin@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
