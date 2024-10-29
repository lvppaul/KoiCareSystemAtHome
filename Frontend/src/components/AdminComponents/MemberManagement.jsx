import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { getMembers } from "../../Config/UserApi";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
const Members = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const members = await getMembers();
      setMembers(members);
    } catch (error) {
      console.error("Error fetching members:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);
  console.log("member", members);
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
                  <th>Email Confirm</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td>{`${member.firstName || ""} ${
                      member.lastName || ""
                    }`}</td>
                    <td>{member.email}</td>
                    <td>{member.phoneNumber}</td>
                    <td>
                      {`${member.street || ""} - ${member.district || ""} - ${
                        member.city || ""
                      } - ${member.country || ""}`}
                    </td>
                    <td>
                      <div className="actions">
                        {member.emailConfirmed == true ? (
                          <AiOutlineCheck />
                        ) : (
                          <AiOutlineClose />
                        )}
                      </div>
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
export default Members;
