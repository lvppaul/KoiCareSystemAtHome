import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { signUp, signUpVip } from "../../Config/LogInApi";
import { useForm } from "react-hook-form";

const AdminCreateAccountDialog = ({ option, refreshMembers, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
      reset();
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (option === "SignUp") {
        await signUp(data);
      } else {
        await signUpVip(data);
      }
      await refreshMembers();
      onSuccess("Admin account created successfully!"); // Gọi callback để thông báo
      handleClose();
    } catch (error) {
      console.error("Error in sign-up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        className="buttonAdminCreate"
        variant="outlined"
        onClick={handleClickOpen}
      >
        <div className="icon">
          <FaPlus />
        </div>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Admin Account</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: loading ? "150px" : "auto",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="dense"
                label="First Name"
                fullWidth
                disabled={loading}
                {...register("firstName", { required: true })}
              />
              <TextField
                margin="dense"
                label="Last Name"
                fullWidth
                disabled={loading}
                {...register("lastName", { required: true })}
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                disabled={loading}
                {...register("email", { required: true })}
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                disabled={loading}
                {...register("password", { required: true })}
              />
              <TextField
                margin="dense"
                label="Confirm Password"
                type="password"
                fullWidth
                disabled={loading}
                {...register("confirmPassword", { required: true })}
              />
              <DialogActions>
                <Button onClick={handleClose} disabled={loading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  Create
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCreateAccountDialog;
