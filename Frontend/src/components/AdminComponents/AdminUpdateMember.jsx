import { updateAccountAdmin, getAccountByUserId } from "../../Config/UserApi";
import React, { useEffect, useState } from "react";
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
  const { register, handleSubmit, reset, setValue } = useForm();
  const [account, setAccount] = useState(null);
  const userId = props.userId;
  const refreshMembers = props.refreshMembers;

  const fetchAccount = async () => {
    try {
      const acc = await getAccountByUserId(userId);
      setAccount(acc);

      setValue("firstName", acc.firstName);
      setValue("lastName", acc.lastName);
      setValue("street", acc.street);
      setValue("district", acc.district);
      setValue("city", acc.city);
      setValue("country", acc.country);
      setValue("phoneNumber", acc.phoneNumber);
    } catch (error) {
      console.error("Error in fetch account:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    fetchAccount();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    console.log("Form data:", data);
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
              fullWidth
              {...register("firstName", { required: true })}
            />
            <TextField
              margin="dense"
              fullWidth
              {...register("lastName", { required: true })}
            />

            <TextField
              margin="dense"
              fullWidth
              {...register("street", { required: true })}
            />
            <TextField
              margin="dense"
              fullWidth
              {...register("district", { required: true })}
            />
            <TextField
              margin="dense"
              fullWidth
              {...register("city", { required: true })}
            />
            <TextField
              margin="dense"
              fullWidth
              {...register("country", { required: true })}
            />
            <TextField
              margin="dense"
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
