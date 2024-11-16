import { useState, useEffect, useCallback } from "react";
import { getListShopOrderByDays, setOrderSuccess } from "../../Config/OrderApi";
import AdminViewOrderDetailDialog from "../../components/AdminComponents/AdminViewOrderDetail";
import AdminDropMenuGetOrderByDays from "../../components/AdminComponents/AdminDropDownMenuFilterOrder";
import { Table } from "antd";
import { getShopByUserId } from "../../Config/ShopApi";
import { useAuth } from "../Login/AuthProvider";
import { Container, Nav } from "react-bootstrap";

const ShopOrder = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [dayCommission, setDayCommission] = useState(365);

  const { user } = useAuth();
  const userId = user?.userId;

  const fetchOrders = async (day) => {
    setLoading(true);
    try {
      const shop = await getShopByUserId(userId);
      const orderByDate = await getListShopOrderByDays(shop.shopId, day);
      console.log("order:", orderByDate);
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

  const handleSetSuccess = async (orderId) => {
    try {
      await setOrderSuccess(orderId);
      fetchOrders(dayCommission);
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
    }
  ];

  const handleDayCommissionOption = (day) => {
    setDayCommission(day);
  };

  useEffect(() => {
    fetchOrders(dayCommission);
  }, [dayCommission]);

  if (loading) return <div>Loading...</div>;

  return (
    <Container className="p-3">
      <Nav className="nav-tabs-login" variant="tabs" defaultActiveKey="/shopOrder">
        <Nav.Item>
          <Nav.Link eventKey="manageShop" href="/manageShop">
            Manage Shop
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/shopOrder">Orders</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="shopRevenue" href="/shopRevenue">
            Revenue
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Container style={{borderTop: "1px solid gray"}}>
        <div className="right-content">
          <div className="members-content shadow border-0 p-3 mt-0">
            <div className="member-content-header d-flex ">
              <h3 className="hd">Shop Orders</h3>
              <AdminDropMenuGetOrderByDays option={handleDayCommissionOption} />
            </div>
            <Table loading={loading} columns={columnOrder} dataSource={orders}></Table>
          </div>
        </div>
      </Container>
    </Container>
  );
};
export default ShopOrder;
