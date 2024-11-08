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
  const [viewOrderDetails, setViewOrderDetails] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dataOrderDetail = async () => {
    try {
      const orderId = orderDetail.orderId;
      const productId = orderDetail.productId;
      const prod = await getProductById(productId);

      console.log("data:" + productId);
      const proName = prod.name;
      const proDes = prod.description;
      const quantity = orderDetail.quantity;
      const unitPrice = orderDetail.unitPrice;

      // Tạo đối tượng chi tiết đơn hàng
      const data = {
        orderId,
        productId,
        name: proName,
        description: proDes,
        quantity,
        unitPrice,
      };
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

  if (loading) return <div>Loading ...</div>;

  return (
    <div>
      <Button onClick={handleOpen}>
        <div className="icon">
          <FaEye />
        </div>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Detail</DialogTitle>
        <DialogContent>
          <div className="table-response">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product Name</th>
                  <th>Product Description</th>
                  <th>Product Quantity</th>
                  <th>Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {/* {viewOrderDetails.map((viewOrderDetail) => (
                  <tr
                    key={`${viewOrderDetail.orderId}-${viewOrderDetail.productId}`}
                  >
                    <td>{viewOrderDetail.orderId}</td>
                    <td>{viewOrderDetail.name}</td>
                    <td>{viewOrderDetail.description}</td>
                    <td>{viewOrderDetail.quantity}</td>
                    <td>{viewOrderDetail.unitPrice}</td>
                  </tr>
                ))}*/}
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
