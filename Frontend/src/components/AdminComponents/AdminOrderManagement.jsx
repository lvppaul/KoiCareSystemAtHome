import { useState, useEffect } from "react";
import { getListOrder, getListVipOrder } from "../../Config/OrderApi";
import Button from "@mui/material/Button";
import { getAccountByUserId } from "../../Config/UserApi";
import { getVipPackagesById } from "../../Config/VipPackageApi";
import AdminViewOrderDetailDialog from "./AdminViewOrderDetail";
const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vipOrders, setVipOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const order = await getListOrder();
      setOrders(order);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchVipOrders = async () => {
    try {
      const order = await getListVipOrder();
      const data = await Promise.all(
        order.map(async (item) => {
          const vipId = item.orderVipDetails[0]?.vipId;
          const vipPackage = await getVipPackagesById(vipId);

          return {
            orderId: item.orderId,
            vipName: vipPackage.name,
            fullName: item.fullName,
            phone: item.phone,
            email: item.email,
            createDate: item.createDate,
            totalPrice: item.totalPrice,
            orderStatus: item.orderStatus,
          };
        })
      );
      console.log("data: " + data);
      setVipOrders(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log("vipOrder" + vipOrders);
  // const fetchVipOrders = async () => {
  //   try {
  //     const order = await getListVipOrder();

  //     const data = await Promise.all(
  //       order.map(async (item) => {
  //         const user = await getAccountByUserId(item.userId);
  //         return {
  //           orderId: item.orderId,
  //           fullName: user.fullName,
  //           email: user.email,
  //           phone: user.phoneNumber,
  //         };
  //       })
  //     );

  //     setVipOrders(data);
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchOrders();
    fetchVipOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="right-content">
      <div className="members-content shadow border-0 p-3 mt-4">
        <div className="member-content-header d-flex ">
          <h3 className="hd">Commission Order</h3>
        </div>
        <div className="table-response">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Create At</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.fullName}</td>
                  <td>{order.email}</td>
                  <td>{order.phone}</td>
                  <td>
                    {new Date(order.createDate).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td>
                    {" "}
                    {order.totalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>{order.orderStatus}</td>
                  <td>
                    <AdminViewOrderDetailDialog
                      orderDetail={order.orderDetails}
                      isVip={order.isVipUpgrade}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="members-content shadow border-0 p-3 mt-4">
        <div className="member-content-header d-flex ">
          <h3 className="hd">Vip Package</h3>
        </div>
        <div className="table-response">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Vip Package Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Create At</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vipOrders.map((vipOrder) => (
                <tr key={vipOrder.orderId}>
                  <td>{vipOrder.orderId}</td>
                  {/* <td>{vipOrder.fullName}</td> */}
                  <td>{vipOrder.vipName}</td>
                  <td>{vipOrder.fullName}</td>
                  <td>{vipOrder.phone}</td>
                  <td>{vipOrder.email}</td>
                  <td>
                    {new Date(vipOrder.createDate).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td>
                    {" "}
                    {vipOrder.totalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>{vipOrder.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminOrderManagement;
