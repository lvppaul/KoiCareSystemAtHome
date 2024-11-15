import React, { useEffect } from "react";

import { Button, Snackbar, Alert } from "@mui/material";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { useState } from "react";
import { getVips, lockUser, unLockUser } from "../../Config/UserApi";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import AdminCreateAccountDialog from "./AdminCreateMemberForm";
import AdminUpdateMemberDialog from "./AdminUpdateMember";
import { Table } from "antd";
const Vips = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const members = await getVips();
      setMembers(members);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const showSuccessMessage = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const columns = [
    {
      title: "User Name",
      render: (record) => (
        <div>{`${record.firstName || ""} ${record.lastName || ""}`}</div>
      ),
    },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phoneNumber" },
    {
      title: "Address",
      render: (record) => (
        <div>{`${record.street || ""} - ${record.district || ""} - ${
          record.city || ""
        } - ${record.country || ""}`}</div>
      ),
    },
    {
      title: "Email Confirm",
      render: (record) => (
        <div className="actions">
          {record.emailConfirmed ? <AiOutlineCheck /> : <AiOutlineClose />}
        </div>
      ),
    },
    {
      title: "Status",
      render: (record) => (
        <Button
          onClick={() => toggleUserLockStatus(record.id, record.lockoutEnabled)}
        >
          <div className="icon">
            {record.lockoutEnabled ? <FaLock /> : <FaLockOpen />}
          </div>
        </Button>
      ),
    },
    {
      title: "Update",
      render: (record) => (
        <AdminUpdateMemberDialog
          userId={record.id}
          refreshMembers={fetchMembers}
        />
      ),
    },
  ];

  const toggleUserLockStatus = async (userId, isCurrentlyLocked) => {
    try {
      if (isCurrentlyLocked) {
        await unLockUser(userId);
      } else {
        await lockUser(userId);
      }

      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === userId
            ? { ...member, lockoutEnabled: !isCurrentlyLocked }
            : member
        )
      );
    } catch (error) {
      console.error("Error toggling user lock status:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
      <div className="right-content">
        <div className="members-content shadow border-0 p-3 mt-4">
          <div className="member-content-header d-flex">
            <h3 className="hd">Vip Members Management</h3>
          </div>
          <AdminCreateAccountDialog
            option={"SignUpVip"}
            refreshMembers={fetchMembers}
            onSuccess={showSuccessMessage} // Truyền hàm thông báo
          />
          <div className="tableManagement">
            <Table
              loading={loading}
              columns={columns}
              dataSource={members}
            ></Table>
          </div>
        </div>
      </div>

      {/* Snackbar hiển thị thông báo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Đặt góc hiển thị thông báo
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Admin account created successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Vips;
