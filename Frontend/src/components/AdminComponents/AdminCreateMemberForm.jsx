import React, { useState } from "react";
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

const AdminCreateAccountDialog = (props) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const options = props.option;
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
      if (options === "SignUp") {
        await signUp(data); // Gọi API signUp với dữ liệu từ form
        // Đóng dialog nếu API thành công
      } else {
        await signUpVip(data); // Gọi API signUp với dữ liệu từ form
      }
      refreshMembers();
      handleClose();
    } catch (error) {
      console.error("Error in sign-up:", error); // Xử lý lỗi từ API nếu có
    }
  };

  return (
    <div>
      <Button
        className="buttonAdminCreate"
        variant="outlined"
        onClick={handleClickOpen}
      >
        <FaPlus />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Admin Account</DialogTitle>
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

export default AdminCreateAccountDialog;
