import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { getCategories } from "../../Config/CategoryApi";
const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const listCategories = await getCategories();
      setCategories(listCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="right-content">
        <div className="members-content card shadow border-0 p-3 mt-4">
          <div className="member-content-header d-flex ">
            <h3 className="hd">Categories Management</h3>
            <SearchBar />
          </div>
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
                {categories.map((category) => (
                  <tr key={category.categoryId}>
                    <td>{category.categoryId}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminCategories;
