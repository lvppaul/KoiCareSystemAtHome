import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { getVips } from "../../Config/UserApi";

const Vips = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const members = await getVips();
      setMembers(members);
    } catch (error) {
      console.error("Error fetching vips:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
      <div className="right-content">
        <div className="members-content card shadow border-0 p-3 mt-4 ">
          <div className="member-content-header d-flex ">
            <h3 className="hd">Vips Management</h3>
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
                {members.map((member, index) => (
                  <tr key={index}>
                    <td>{member.firstName + " " + member.lastName}</td>
                    <td>{member.email}</td>
                    <td>{member.phoneNumber}</td>
                    <td>
                      {member.street +
                        " " +
                        member.district +
                        " " +
                        member.city +
                        " " +
                        member.country}
                    </td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Vips;
