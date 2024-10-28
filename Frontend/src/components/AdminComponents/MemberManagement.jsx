import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
const Members = () => {
  return (
    <>
      <div className="right-content">
        <div className="members-content card shadow border-0 p-3 mt-4">
          <h3 className="hd">Members Management</h3>
          <div className="table-response">
            <table className="table table-sm  ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Example Name</td>
                  <td>example@example.com</td>
                  <td>084123456</td>
                  <td>10 Ly Thuong Kiet, District 7, HCM city</td>
                  <td>Active</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button>
                        <div className="icon">
                          <FaPen />
                        </div>
                      </Button>
                      <Button>
                        <div className="icon">
                          <FaLock />
                        </div>
                      </Button>
                      <Button>
                        <div className="icon">
                          <FaLockOpen />
                        </div>
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Example Name</td>
                  <td>example@example.com</td>
                  <td>084123456</td>
                  <td>10 Ly Thuong Kiet, District 7, HCM city</td>
                  <td>Active</td>
                  <td>Action Buttons</td>
                </tr>
                <tr>
                  <td>Example Name</td>
                  <td>example@example.com</td>
                  <td>084123456</td>
                  <td>10 Ly Thuong Kiet, District 7, HCM city</td>
                  <td>Active</td>
                  <td>Action Buttons</td>
                </tr>
                <tr>
                  <td>Example Name</td>
                  <td>example@example.com</td>
                  <td>084123456</td>
                  <td>10 Ly Thuong Kiet, District 7, HCM city</td>
                  <td>Active</td>
                  <td>Action Buttons</td>
                </tr>
                <tr>
                  <td>Example Name</td>
                  <td>example@example.com</td>
                  <td>084123456</td>
                  <td>10 Ly Thuong Kiet, District 7, HCM city</td>
                  <td>Active</td>
                  <td>Action Buttons</td>
                </tr>
                <tr>
                  <td>Example Name</td>
                  <td>example@example.com</td>
                  <td>084123456</td>
                  <td>10 Ly Thuong Kiet, District 7, HCM city</td>
                  <td>Active</td>
                  <td>Action Buttons</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Members;
