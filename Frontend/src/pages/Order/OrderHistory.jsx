import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Tabs, Tab } from "react-bootstrap";
import { useAuth } from "../Login/AuthProvider";
import { getOrderByUserId, getOrderById } from "../../Config/OrderApi";
import { getProductNameById } from "../../Config/ProductApi";
import { getVipPackagesById } from "../../Config/VipPackageApi";
import { getVipOrderByUserId } from "../../Config/OrderApi";
import ProductNameComponent from "./ProductNameComponent";
import VipPackageName from "./VipPackageName";
import "bootstrap/dist/css/bootstrap.min.css";
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [vipOrders, setVipOrders] = useState([]);
  const [regularOrders, setRegularOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useAuth().user.userId;

  useEffect(() => {
    fetchOrderByUserId();
    fetchVipOrderByUserId();
  }, [userId]);

  const fetchOrderByUserId = async () => {
    try {
      const response = await getOrderByUserId(userId);
      if (response) {
        setRegularOrders(response);
      } else {
        setError("Error fetching orders");
      }
    } catch (error) {
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchVipOrderByUserId = async () => {
    try {
      const response = await getVipOrderByUserId(userId);
      if (response) {
        setVipOrders(response);
      } else {
        setError("Error fetching orders");
      }
    } catch (error) {
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vn-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getVipPackageName = async (vipId) => {
    const vipPackage = await getVipPackagesById(vipId);
    console.log("vipPackage:", vipPackage);
    return vipPackage.name;
  };

  const renderTable = (orders) => (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Order Detail</th>
          <th>Date</th>
          <th>Total</th>
          <th>Status</th>
          {/* Add more headers as needed */}
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.orderId}>
            <td>{order.orderId}</td>
            <td>
              {!order.orderVipDetails ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  {order.orderDetails.map((orderDetail, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>
                          {
                            <ProductNameComponent
                              productId={orderDetail.productId}
                            />
                          }
                        </td>
                        <td>{orderDetail.quantity}</td>
                        <td>{formatPrice(orderDetail.unitPrice)}</td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              ) : (
                <VipPackageName vipId={order.orderVipDetails[0].vipId} />
              )}
            </td>
            <td>{formatDate(order.createDate)}</td>
            <td>{formatPrice(order.totalPrice)}</td>
            <td>{order.orderStatus}</td>
            {/* Add more order details as needed */}
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div>
      <h1>Order History</h1>
      <Tabs defaultActiveKey="regular" id="order-history-tabs">
        <Tab eventKey="regular" title="Regular Orders">
          {console.log("regularOrders:", regularOrders)}
          {renderTable(regularOrders)}
        </Tab>
        <Tab eventKey="vip" title="VIP Upgrade Orders">
          {console.log("vipOrders:", vipOrders)}
          {renderTable(vipOrders)}
        </Tab>
      </Tabs>
    </div>
  );
};

export default OrderHistory;
