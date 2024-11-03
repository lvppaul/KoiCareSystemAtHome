import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { getCategories, deleteCategories } from "../../Config/CategoryApi";
import AddCategories from "../AddCategories/AddCategories";
import DeleteCategories from "../DeleteCategories/DeleteCategories";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showModalAddCategory, setShowModalAddCategory] = useState(false);
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

  const handleAddCategory = () => {
    fetchCategories();
  };

 

  return (
    <>
      <div className="right-content">
        <div className="members-content shadow border-0 p-3 mt-4">
          <div className="member-content-header d-flex ">
            <h3 className="hd">Categories Management</h3>
            <SearchBar />
          </div>
          <div className="table-response">
          <AddCategories
              show={showModalAddCategory}
              setShow={setShowModalAddCategory}
              updateAddCategories={handleAddCategory}
            />
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
                        <DeleteCategories
                        category={category}
                        updateDeleteCategory={fetchCategories}
                        />
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
