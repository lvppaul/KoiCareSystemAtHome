import { updateAccount } from "../../Config/UserApi";
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
import { FaPlus } from "react-icons/fa";
import { signUp, signUpVip } from "../../Config/LogInApi";
import { useForm } from "react-hook-form";

const AdminUpdateMemberDialog = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

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
              label="Email"
              type="email"
              fullWidth
              {...register("email", { required: true })}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              {...register("password", { required: true })}
            />
            <TextField
              margin="dense"
              label="Confirm Password"
              type="password"
              fullWidth
              {...register("confirmPassword", { required: true })}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUpdateMemberDialog;
