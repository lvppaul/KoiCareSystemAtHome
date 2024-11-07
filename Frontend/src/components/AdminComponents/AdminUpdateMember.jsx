import { updateAccountAdmin } from "../../Config/UserApi";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

const AdminUpdateMemberDialog = (props) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const userId = props.userId;
  const refreshMembers = props.refreshMembers;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    console.log("Form data:", data); // Kiểm tra xem dữ liệu form có được gửi
    try {
      await updateAccountAdmin(userId, data);
      refreshMembers();
      handleClose();
    } catch (error) {
      console.error("Error in sign-up:", error); // Xử lý lỗi từ API nếu có
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <div className="icon">
          <FaPen />
        </div>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Account</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="dense"
              label="First Name"
              fullWidth
              {...register("firstName", { required: true })}
            />
            <TextField
              margin="dense"
              label="Last Name"
              fullWidth
              {...register("lastName", { required: true })}
            />

            <TextField
              margin="dense"
              label="Street"
              fullWidth
              {...register("street", { required: true })}
            />
            <TextField
              margin="dense"
              label="District"
              fullWidth
              {...register("district", { required: true })}
            />
            <TextField
              margin="dense"
              label="City"
              fullWidth
              {...register("city", { required: true })}
            />
            <TextField
              margin="dense"
              label="Country"
              fullWidth
              {...register("country", { required: true })}
            />
            <TextField
              margin="dense"
              label="PhoneNumber"
              fullWidth
              {...register("phoneNumber", { required: true })}
            />

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUpdateMemberDialog;
