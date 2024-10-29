import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { useState } from "react";
import SearchBar from "./SearchBar";
import api from "../../Config/AxiosConfig";
import { useEffect } from "react";

const Members = () => {
  const [isLocked, setIsLocked] = useState(false);
  return (
    <>
      <div className="right-content">
        <div className="members-content card shadow border-0 p-3 mt-4 ">
          <div className="member-content-header d-flex ">
            <h3 className="hd">Members Management</h3>
            <SearchBar />
          </div>

          <div className="table-response">
            <table className="table table-sm  ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Example Name</td>
                  <td>example@example.com</td>
                  <td>084123456</td>
                  <td>10 Ly Thuong Kiet, District 7, HCM city</td>
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
                <tr>
                  <td>Example Name</td>
                  <td>example@example.com</td>
                  <td>084123456</td>
                  <td>10 Ly Thuong Kiet, District 7, HCM city</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Example Name</td>
                  <td>example@example.com</td>
                  <td>084123456</td>
                  <td>10 Ly Thuong Kiet, District 7, HCM city</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Example Name</td>
                  <td>example@example.com</td>
                  <td>084123456</td>
                  <td>10 Ly Thuong Kiet, District 7, HCM city</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Example Name</td>
                  <td>example@example.com</td>
                  <td>084123456</td>
                  <td>10 Ly Thuong Kiet, District 7, HCM city</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Example Name</td>
                  <td>example@example.com</td>
                  <td>084123456</td>
                  <td>10 Ly Thuong Kiet, District 7, HCM city</td>
                  <td>Active</td>
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
