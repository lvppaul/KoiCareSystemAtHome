import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Tabs, Tab, Container, Button } from "react-bootstrap";
import { useAuth } from "../Login/AuthProvider";
import { getVipPackagesById } from "../../Config/VipPackageApi";
import { getVipOrderByUserId,getOrderHistoryByUserId } from "../../Config/OrderApi";
import ProductNameComponent from "./ProductNameComponent";
import VipPackageName from "./VipPackageName";
import "bootstrap/dist/css/bootstrap.min.css";
import { getPDF, sendPayment } from "../../Config/VNPayApi";
import ShopNameComponent from "./ShopNameComponent";

const OrderHistory = () => {
  const [vipOrders, setVipOrders] = useState([]);
  const [regularOrders, setRegularOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useAuth().user.userId;

  
  const fetchOrderByUserId = async () => {
    try {
      const response = await getOrderHistoryByUserId(userId);
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
  
  useEffect(() => {
    fetchOrderByUserId();
    fetchVipOrderByUserId();
  }, [userId]);
  
  if (loading) {
    return <Spinner animation="border" />;
  }
  
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vn-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleExportPDF = async (orderId) => {
    console.log('Exporting PDF');
    if (orderId) {
      try {
        const response = await getPDF(orderId);
        if (response) {
          const pdfData = await response.data;
          console.log('pdfData:', typeof pdfData);
          const blob = new Blob([pdfData], { type: 'application/pdf' });
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = `Invoice_${orderId}.pdf`;
          link.click();
          console.log('PDF exported successfully:');
        } else {
          console.error('No data in response:', response);
        }
      } catch (error) {
        console.error('Error exporting PDF:', error);
      }
    } else {
      console.error('Order ID not found in URL');
    }
  };


  const payment = async (order) => {
    console.log("Order found:", order);
    if(order.orderVipDetails) { 
      const data = {
        orderId: order.orderId,
        fullName: 'Vip Upgrade',
        description: 'Vip Upgrade'
      }
        const response = await sendPayment(data);
        if (response) {
          window.location.href = response;
        }
        else {
          console.error("Error: No URL returned from API");
        }
    }
      const data = {
      orderId: order.orderId,
      fullName: order.fullName,
      description: order.phone,
      }
    const response = await sendPayment(data);
    if (response) {
      window.location.href = response;
    } else {
      console.error("Error: No URL returned from API");
    }
  };

  const renderTable = (orders) => (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Shop Name</th>
          <th>Order Detail</th>
          <th>Date</th>
          <th>Total</th>
          <th>Status</th>
          <th>Actions</th>
          {/* Add more headers as needed */}
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.orderId}>
            <td>{order.orderId}</td>
            <td>{
            order.shopId ? 
            <ShopNameComponent
            shopId={order.shopId}/> 
            : null}</td>
            <td>
              {!order.orderVipDetails ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th style={{ width: "250px" }}>Product</th>
                      <th style={{ width: "150px" }}>Quantity</th>
                      <th style={{ width: "150px" }}>Price</th>
                      <th style={{ width: "150px" }}>Status</th>
                    </tr>
                  </thead>
                  {order.orderDetails.map((orderDetail, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{<ProductNameComponent productId={orderDetail.productId} />}</td>
                        <td>{orderDetail.quantity}</td>
                        <td>{formatPrice(orderDetail.unitPrice)}</td>
                        <td>{orderDetail.orderDetailStatus}</td>
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
            <td>
            {order.orderStatus === "Successful" || order.orderStatus ==="Out For Delivery" ? 
              (!order.orderVipDetails ?
              <Button onClick={() => handleExportPDF(order.orderId)}>Export PDF</Button>
                : null)
            :
              <Button style={{backgroundColor:'transparent', color:'black'}} 
              onClick={() => payment(order)}>Check out</Button>
            }
            </td>
            {/* Add more order details as needed */}
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Container>
      <h1
        className="m-5"
        style={{ textAlign: "center", fontSize: "50px", fontWeight: "600" }}
      >
        Order History
      </h1>
      <Container>
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
      </Container>
    </Container>
  );
};

export default OrderHistory;
