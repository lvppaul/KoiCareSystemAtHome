import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
const AdminCategories = () => {
  return (
    <>
      <div className="right-content">
        <div className="members-content card shadow border-0 p-3 mt-4">
          <h3 className="hd">Categories Management</h3>
          <div className="table-response">
            <table className="table table-sm  ">
              <thead>
                <tr>
                  <th>Category ID </th>
                  <th>Category Name</th>
                  <th>Descriptions</th>
                  <th>Products</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CAT001</td>
                  <td>Aquarium Supplies</td>
                  <td>Includes tanks, filters, and decorations</td>
                  <td>200</td>
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
                          <FaTrashAlt />
                        </div>
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>CAT001</td>
                  <td>Aquarium Supplies</td>
                  <td>Includes tanks, filters, and decorations</td>
                  <td>200</td>
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
                          <FaTrashAlt />
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
export default AdminCategories;
