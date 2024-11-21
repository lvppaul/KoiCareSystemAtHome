import { useState, useEffect } from "react";
import {
  getListOrder,
  getListVipOrder,
  getListVipOrderByWeek,
  getListVipOrderByMonth,
  getListVipOrderByDays,
  getListOrderByDays,
  getListOrderAtMonth,
  getLisCustomerOrderByDays,
  getListVipOrderAtMonth,
  getListFailOrder,
  getListSuccessOrder,
  getAllAdminOrder,
  getListPendingOrder,
} from "../../Config/OrderApi";
import Button from "@mui/material/Button";
import { getAccountByUserId } from "../../Config/UserApi";
import { getVipPackagesById } from "../../Config/VipPackageApi";
import AdminViewOrderDetailDialog from "./AdminViewOrderDetail";
import AdminDropMenuGetOrderByDays from "./AdminDropDownMenuFilterOrder";
import { Table } from "antd";
import AdminDropMenuGetOrderAtMonth from "./AdminDropMenuMonth";
import ButtonGroup from "@mui/material/ButtonGroup";
import AdminDropMenuGetOrderStatus from "./AdminDropMenuStatusOrder";

const AdminOrderManagement = () => {
  const [loading, setLoading] = useState(true);
  const [vipOrders, setVipOrders] = useState([]);
  const [orders, setOrders] = useState([]);

  const [dayCommission, setDayCommission] = useState(0);
  const [monthCommission, setMonthCommission] = useState(0);
  const [statusCommission, setStatusCommission] = useState("Choose Status");

  const [dayVip, setDayVip] = useState(0);
  const [monthVip, setMonthVip] = useState(0);
  const [statusVip, setStatusVip] = useState("Choose Status");

  const [selectedLabel, setSelectedLabel] = useState("Choose Days");
  const [selectedMonth, setSelectedMonth] = useState("Choose Month");

  const [selectedLabelVip, setSelectedLabelVip] = useState("Choose Days");
  const [selectedMonthVip, setSelectedMonthVip] = useState("Choose Month");

  const fetchOrders = async (day, month) => {
    setLoading(true);
    try {
      const res = await getAllAdminOrder(); // Lấy tất cả đơn hàng
      const orderByDate = day !== 0 ? await getLisCustomerOrderByDays(day) : [];
      const orderAtMonth = month !== 0 ? await getListOrderAtMonth(month) : [];
      const successOrder =
        statusCommission === "Success" ? await getListSuccessOrder() : [];
      const failOrder =
        statusCommission === "Fail" ? await getListFailOrder() : [];
      const pendingOrder =
        statusCommission === "Pending" ? await getListPendingOrder() : [];
      // Chọn danh sách phù hợp dựa vào dayCommission hoặc monthCommission
      let list;
      if (day !== 0) {
        list = orderByDate;
      } else if (month !== 0) {
        list = orderAtMonth;
      } else if (statusCommission === "Success") {
        list = successOrder;
      } else if (statusCommission === "Fail") {
        list = failOrder;
      } else if (statusCommission === "Pending") {
        list = pendingOrder;
      } else {
        list = res;
      }

      const data = await Promise.all(
        list.map((item) => {
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
  const handleDayCommissionOptionDay = (day, contentDay) => {
    setDayCommission(day);
    setSelectedLabel(contentDay);

    setMonthCommission(0);
    setSelectedMonth("Choose Month");

    setStatusCommission("Choose Status");
  };

  const handleDayCommissionOptionMonth = (month, contentMonth) => {
    setMonthCommission(month);
    setSelectedMonth(contentMonth);

    setDayCommission(0);
    setSelectedLabel("Choose Days");
    setStatusCommission("Choose Status");
  };

  const handleStatusCommissionOrder = (status) => {
    setStatusCommission(status);
    setDayCommission(0);
    setSelectedLabel("Choose Days");
    setMonthCommission(0);
    setSelectedMonth("Choose Month");
  };

  const handleAll = () => {
    setDayCommission(0);
    setSelectedLabel("Choose Days");
    setMonthCommission(0);
    setSelectedMonth("Choose Month");
    setStatusCommission("Choose Status");
  };

  const handleDayVipOption = (day, contentDay) => {
    setDayVip(day);
    setSelectedLabelVip(contentDay);
    setMonthVip(0);
    setSelectedMonthVip("Choose Month");
  };

  const handleMonthVipOption = (month, contentMonth) => {
    setMonthVip(month);
    setSelectedMonthVip(contentMonth);
    setDayVip(0);
    setSelectedLabelVip("Choose Day");
  };

  const handleAllVip = () => {
    setDayVip(0);
    setSelectedLabelVip("Choose Day");
    setMonthVip(0);
    setSelectedMonthVip("Choose Month");
  };
  const fetchVipOrders = async (day, month) => {
    setLoading(true);
    try {
      const order = await getListVipOrder();
      const orderByDays = day !== 0 ? await getListVipOrderByDays(day) : [];
      const orderAtMonth =
        month !== 0 ? await getListVipOrderAtMonth(month) : [];

      let list;
      if (day !== 0) {
        list = orderByDays;
      } else if (month !== 0) {
        list = orderAtMonth;
      } else {
        list = order;
      }

      const data = await Promise.all(
        list.map(async (item) => {
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
    fetchOrders(dayCommission, monthCommission);
  }, [dayCommission, monthCommission, statusCommission]);

  useEffect(() => {
    fetchVipOrders(dayVip, monthVip);
  }, [dayVip, monthVip]);

  console.log("order:", orders);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="right-content">
      <div className="members-content shadow border-0 p-3 mt-4">
        <div className="member-content-header d-flex ">
          <h3 className="hd">Commission Order</h3>

          <ButtonGroup aria-label="Basic button group">
            <AdminDropMenuGetOrderByDays
              option={handleDayCommissionOptionDay}
              contextOption={selectedLabel}
            />
            <AdminDropMenuGetOrderAtMonth
              option={handleDayCommissionOptionMonth}
              contextOption={selectedMonth}
            />
            <AdminDropMenuGetOrderStatus
              option={handleStatusCommissionOrder}
              contextOption={statusCommission}
            />
          </ButtonGroup>
          <Button
            size="small"
            variant="outlined"
            color="#ccc"
            onClick={handleAll}
          >
            View All
          </Button>
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
          <ButtonGroup aria-label="Basic button group">
            <AdminDropMenuGetOrderByDays
              option={handleDayVipOption}
              contextOption={selectedLabelVip}
            />
            <AdminDropMenuGetOrderAtMonth
              option={handleMonthVipOption}
              contextOption={selectedMonthVip}
            />
          </ButtonGroup>
          <Button
            size="small"
            variant="outlined"
            color="#ccc"
            onClick={handleAllVip}
          >
            View All
          </Button>
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
