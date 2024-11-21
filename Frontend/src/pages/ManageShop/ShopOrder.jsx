import { useState, useEffect } from "react";
import {
  getListOrderAtMonth,
  getListShopOrderByDays,
  getListFailOrder,
  getListSuccessOrder,
  getOrderByShopId,
} from "../../Config/OrderApi";
import { getShopByUserId } from "../../Config/ShopApi";
import Button from "@mui/material/Button";
import AdminViewOrderDetailDialog from "../../components/AdminComponents/AdminViewOrderDetail";
import AdminDropMenuGetOrderByDays from "../../components/AdminComponents/AdminDropDownMenuFilterOrder";
import AdminDropMenuGetOrderAtMonth from "../../components/AdminComponents/AdminDropMenuMonth";
import AdminDropMenuGetOrderStatus from "../../components/AdminComponents/AdminDropMenuStatusOrder";
import { setOrderSuccess } from "../../Config/OrderApi";
import { Table } from "antd";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useAuth } from "../../pages/Login/AuthProvider";

const ShopOrder = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const [dayCommission, setDayCommission] = useState(0);
  const [monthCommission, setMonthCommission] = useState(0);
  const [statusCommission, setStatusCommission] = useState("Choose Status");

  const [selectedLabel, setSelectedLabel] = useState("Choose Days");
  const [selectedMonth, setSelectedMonth] = useState("Choose Month");

  const { user } = useAuth();
  const userId = user?.userId;

  const fetchOrders = async (day, month) => {
    setLoading(true);
    try {
      const shop = await getShopByUserId(userId);
      const res = await getOrderByShopId(shop.shopId); // Lấy tất cả đơn hàng
      const orderByDate = day !== 0 ? await getListShopOrderByDays(day) : [];
      const orderAtMonth = month !== 0 ? await getListOrderAtMonth(month) : [];
      const successOrder = statusCommission === "Success" ? await getListSuccessOrder() : [];
      const failOrder = statusCommission === "Fail" ? await getListFailOrder() : [];
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
      } else {
        list = res;
      }
      console.log("check here", orderAtMonth);
      console.log("res:", res);
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
      console.log("data", data);
      setOrders(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetSuccess = async (orderId) => {
    try {
      await setOrderSuccess(orderId);
      fetchOrders(dayCommission, monthCommission);
    } catch (error) {
      console.log(error.message);
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
      render: (record) => <AdminViewOrderDetailDialog orderDetail={record.orderDetail} />,
    },
    {
      title: "Set Success",
      render: (record) => (
        <button
          className="btn btn-success btn-sm"
          onClick={() => handleSetSuccess(record.orderId)}
          disabled={record.orderStatus === "Successful"}
        >
          Set Success
        </button>
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

  useEffect(() => {
    fetchOrders(dayCommission, monthCommission);
  }, [dayCommission, monthCommission, statusCommission]);

  console.log("order:", orders);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="right-content">
      <div className="members-content shadow border-0 p-3 mt-4">
        <div className="member-content-header d-flex ">
          <h3 className="hd">Commission Order</h3>

          <ButtonGroup aria-label="Basic button group">
            <AdminDropMenuGetOrderByDays option={handleDayCommissionOptionDay} contextOption={selectedLabel} />
            <AdminDropMenuGetOrderAtMonth option={handleDayCommissionOptionMonth} contextOption={selectedMonth} />
            <AdminDropMenuGetOrderStatus option={handleStatusCommissionOrder} contextOption={statusCommission} />
          </ButtonGroup>
          <Button size="small" variant="outlined" color="#ccc" onClick={handleAll}>
            View All
          </Button>
        </div>

        <Table loading={loading} columns={columnOrder} dataSource={orders}></Table>
      </div>
    </div>
  );
};
export default ShopOrder;
