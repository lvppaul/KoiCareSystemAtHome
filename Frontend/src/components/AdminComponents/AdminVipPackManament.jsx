import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { getVips, lockUser, unLockUser } from "../../Config/UserApi";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
const AdminVipPackManagement = () => {

  return (
    <>
      <div className="right-content">
        <div className="members-content card shadow border-0 p-3 mt-4 ">
          <div className="member-content-header d-flex ">
            <h3 className="hd">Vip Packages Management</h3>
            <SearchBar />
          </div>

          <div className="table-response">
            <table className="table table-sm  ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    
                <td>
                      <Button
                        onClick={() => {alert("Edit")}}
                      >
                        <div className="icon">
                        </div>
                      </Button>
                    </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminVipPackManagement;
