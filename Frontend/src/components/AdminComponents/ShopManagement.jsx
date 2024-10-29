import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import SearchBar from "./SearchBar";
const AdminShops = () => {
  const [isLocked, setIsLocked] = useState(false);
  return (
    <>
      <div className="right-content">
        <div className="members-content card shadow border-0 p-3 mt-4">
          <div className="member-content-header d-flex ">
            <h3 className="hd">Shop Management</h3>
            <SearchBar />
          </div>
          <div className="table-response">
            <table className="table table-sm  ">
              <thead>
                <tr>
                  <th>Shop ID</th>
                  <th>Shop Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Rating</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SHOP001</td>
                  <td>Pet Paradise</td>
                  <td>contact@petparadise.com</td>
                  <td>(123) 456-7890</td>
                  <td>4.5</td>
                  <td onClick={() => setIsLocked(!isLocked)}>
                    <div className="actions">
                      {isLocked === false ? (
                        <Button>
                          <div className="icon">
                            <FaLockOpen />
                          </div>
                        </Button>
                      ) : (
                        <Button>
                          <div className="icon">
                            <FaLock />
                          </div>
                        </Button>
                      )}
                    </div>
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
export default AdminShops;
