import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import SearchBar from "./SearchBar";
const AdminShops = () => {
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SHOP001</td>
                  <td>Pet Paradise</td>
                  <td>contact@petparadise.com</td>
                  <td>(123) 456-7890</td>
                  <td>4.5</td>
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
                  <td>SHOP002</td>
                  <td>Koi World</td>
                  <td>info@koiworld.com</td>
                  <td>(987) 654-3210</td>
                  <td>4.8</td>
                  <td>Active</td>
                  <td>
                    {" "}
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
                  <td>SHOP003</td>
                  <td>Aquatic Haven</td>
                  <td>support@aquatichaven.com</td>
                  <td>(555) 123-4567</td>
                  <td>4.2</td>
                  <td>Inactive</td>
                  <td>
                    {" "}
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminShops;
