import React, { useEffect } from "react";
import Button from "@mui/material/Button";

import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { useState } from "react";
import SearchBar from "./SearchBar";
import {
  getMembers,
  lockUser,
  unLockUser,
  updateAccount,
} from "../../Config/UserApi";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import AdminCreateAccountDialog from "./AdminCreateMemberForm";
const Members = () => {
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

  const toggleUserLockStatus = async (userId, isCurrentlyLocked) => {
    try {
      if (isCurrentlyLocked) {
        await unLockUser(userId);
      } else {
        await lockUser(userId);
      }

      // cập nhật lại trạng thái lockoutEnabled

      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === userId
            ? { ...member, lockoutEnabled: !isCurrentlyLocked }
            : member
        )
      );
    } catch (error) {
      console.error("Error at toggleUserLockStatus ");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [<AdminCreateAccountDialog option={"SignUp"} />]);
  console.log("member", members.lockoutEnabled);
  return (
    <>
      <div className="right-content">
        <div className="members-content shadow border-0 p-3 mt-4 ">
          <div className="member-content-header d-flex ">
            <h3 className="hd">Members Management</h3>
            <SearchBar />
          </div>
          <div>
            <AdminCreateAccountDialog option={"SignUp"} />
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
                    <td>
                      <Button
                        onClick={() =>
                          toggleUserLockStatus(member.id, member.lockoutEnabled)
                        }
                      >
                        <div className="icon">
                          {member.lockoutEnabled ? <FaLock /> : <FaLockOpen />}
                        </div>
                      </Button>
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
