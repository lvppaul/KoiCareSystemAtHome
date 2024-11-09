import { useState, useEffect } from "react";
import { getProductById } from "../../Config/ProductApi";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { FaEye } from "react-icons/fa";

const AdminViewOrderDetailDialog = (props) => {
  const orderDetail = props.orderDetail;
  const isVip = props.isVip;
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [viewOrderDetails, setViewOrderDetails] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    dataOrderDetail();
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(orderDetail);

  const dataOrderDetail = async () => {
    try {
      const data = await Promise.all(
        orderDetail.map(async (item) => {
          const prod = await getProductById(item.productId);
          return {
            productId: item.productId,
            name: prod.name,
            description: prod.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          };
        })
      );
      setViewOrderDetails(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   dataOrderDetail();
  // }, []);

  // if (loading) return <div>Loading ...</div>;

  return (
    <div>
      <Button onClick={handleOpen}>
        <div className="icon">
          <FaEye />
        </div>
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Order Detail</DialogTitle>
        <DialogContent>
          <div className="table-response">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Product Description</th>
                  <th>Product Quantity</th>
                  <th>Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {viewOrderDetails.map((viewOrderDetail) => (
                  <tr key={`${viewOrderDetail.productId}`}>
                    <td>{viewOrderDetail.productId}</td>
                    <td>{viewOrderDetail.name}</td>
                    <td>{viewOrderDetail.description}</td>
                    <td>{viewOrderDetail.quantity}</td>
                    <td>
                      {viewOrderDetail.unitPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminViewOrderDetailDialog;
