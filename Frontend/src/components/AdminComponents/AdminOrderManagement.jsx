import { useState, useEffect } from "react";
import {
  getListOrder,
  getListVipOrder,
  getListVipOrderByWeek,
  getListVipOrderByMonth,
  getListVipOrderByDays,
  getListOrderByDays,
} from "../../Config/OrderApi";
import Button from "@mui/material/Button";
import { getAccountByUserId } from "../../Config/UserApi";
import { getVipPackagesById } from "../../Config/VipPackageApi";
import AdminViewOrderDetailDialog from "./AdminViewOrderDetail";
import AdminDropMenuGetOrderByDays from "./AdminDropDownMenuFilterOrder";
import { Table } from "antd";

const AdminOrderManagement = () => {
  const [loading, setLoading] = useState(true);
  const [vipOrders, setVipOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dayCommission, setDayCommission] = useState(365);
  const [dayVip, setDayVip] = useState(365);
  const fetchOrders = async (day) => {
    setLoading(true);
    try {
      const res = await getListOrder();
      const orderByDate = await getListOrderByDays(day);
      console.log("res:", res);
      const data = await Promise.all(
        orderByDate.map((item) => {
          return {
            orderId: item.orderId,
            fullName: item.fullName,
            phone: item.phone,
            email: item.email,
            createDate: new Date(item.createDate).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
            totalPrice: item.totalPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }),
            orderStatus: item.orderStatus,
            orderDetail: item.orderDetails,
          };
        })
      );
      console.log("data", data);
      setOrders(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const columnOrder = [
    { title: "Order ID", dataIndex: "orderId" },
    { title: "User Name", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Create At", dataIndex: "createDate" },
    { title: "Total Price", dataIndex: "totalPrice" },
    { title: "Status", dataIndex: "orderStatus" },
    {
      title: "View",
      render: (record) => (
        <AdminViewOrderDetailDialog orderDetail={record.orderDetail} />
      ),
    },
  ];
  const handleDayCommissionOption = (day) => {
    setDayCommission(day);
  };
  const handleDayVipOption = (day) => {
    setDayVip(day);
  };
  const fetchVipOrders = async (day) => {
    setLoading(true);
    try {
      const order = await getListVipOrder();
      const orderByDays = await getListVipOrderByDays(day);
      const data = await Promise.all(
        orderByDays.map(async (item) => {
          const vipId = item.orderVipDetails[0]?.vipId;
          const vipPackage = await getVipPackagesById(vipId);

          return {
            orderId: item.orderId,
            vipName: vipPackage.name,
            fullName: item.fullName,
            phone: item.phone,
            email: item.email,
            createDate: new Date(item.createDate).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
            totalPrice: item.totalPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            }),
            orderStatus: item.orderStatus,
          };
        })
      );

      setVipOrders(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const columnVip = [
    { title: "Order ID", dataIndex: "orderId" },
    { title: "Vip Package Name", dataIndex: "vipName" },
    { title: "User Name", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Create At", dataIndex: "createDate" },
    { title: "Total Price", dataIndex: "totalPrice" },
    { title: "Status", dataIndex: "orderStatus" },
  ];
  useEffect(() => {
    fetchOrders(dayCommission);
  }, [dayCommission]);
  useEffect(() => {
    fetchVipOrders(dayVip);
  }, [dayVip]);

  console.log("order:", orders);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="right-content">
      <div className="members-content shadow border-0 p-3 mt-4">
        <div className="member-content-header d-flex ">
          <h3 className="hd">Commission Order</h3>
          <AdminDropMenuGetOrderByDays option={handleDayCommissionOption} />
        </div>

        <Table
          loading={loading}
          columns={columnOrder}
          dataSource={orders}
        ></Table>
      </div>
      <div className="members-content shadow border-0 p-3 mt-4">
        <div className="member-content-header d-flex ">
          <h3 className="hd">Vip Package</h3>
          <AdminDropMenuGetOrderByDays option={handleDayVipOption} />
        </div>
        <Table
          loading={loading}
          columns={columnVip}
          dataSource={vipOrders}
        ></Table>
      </div>
    </div>
  );
};
export default AdminOrderManagement;
