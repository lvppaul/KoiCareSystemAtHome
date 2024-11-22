import React, { useState, useEffect } from "react";
import { sendPayment } from "../../Config/VNPayApi";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getOrderById } from "../../Config/OrderApi";
import { getProductById } from "../../Config/ProductApi";
import { getShopByShopId } from "../../Config/ShopApi";

const Order = () => {
  const orderId = useParams().orderId;
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState({});
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [shops, setShops] = useState({});

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchProductDetails = async (orderDetails) => {
    const productDetails = {};
    const shopDetails = {};
    for (const detail of orderDetails) {
      const product = await getProductById(detail.productId);
      productDetails[detail.productId] = product;
     
      if (!shopDetails[product.shopId]) {
        const shop = await getShopByShopId(product.shopId);
        shopDetails[product.shopId] = shop;
      }
    }
    setProducts(productDetails);
    setShops(shopDetails);
  };

  const fetchOrder = async () => {
    const response = await getOrderById(orderId);
    if (response) {
      setOrder(response);
      setFullName(response.fullName);
      await fetchProductDetails(response.orderDetails);
      console.log("Order found:", response);
    } else {
      console.error("Error: No order found");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      orderId: parseInt(orderId),
      fullName,
      description,
    };

    const response = await sendPayment(payload);
    if (response) {
   
      window.location.href = response;
    } else {
      console.error("Error: No URL returned from API");
    }
  };

  const formatPrice = (price) => {
    if (!price) return "";
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-md-center">
        <Col md="8">
          <h1 style={{ 
            color: '#2c3e50', 
            marginBottom: '30px',
            borderBottom: '3px solid #3498db',
            paddingBottom: '10px'
          }}>Order Details</h1>
          <div className="order-details mb-4" style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <table className="table">
              <tbody>
                <tr>
                  <td>Full Name:</td>
                  <td>{order.fullName}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{order.email}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>{order.phone}</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>{`${order.street}, ${order.district}, ${order.city}, ${order.country}`}</td>
                </tr>
                <tr>
                  <td>Order Date:</td>
                  <td>{new Date(order.createDate).toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Total Price:</td>
                  <td>{formatPrice(order.totalPrice)}</td>
                </tr>
              </tbody>
            </table>
            
            <h3 style={{
              color: '#2c3e50',
              marginTop: '30px',
              marginBottom: '20px',
              borderBottom: '2px solid #3498db',
              paddingBottom: '10px'
            }}>Order Items</h3>
            <table className="table table-hover">
              <thead style={{ backgroundColor: '#f8f9fa' }}>
                <tr>
                  <th style={{ padding: '15px' }}>Product Name</th>
                  <th style={{ padding: '15px' }}>Shop Name</th>
                  <th style={{ padding: '15px' }}>Quantity</th>
                  <th style={{ padding: '15px' }}>Unit Price</th>
                  <th style={{ padding: '15px' }}>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orderDetails?.map((item) => (
                  <tr key={item.productId}>
                    <td style={{ padding: '15px', verticalAlign: 'middle' }}>
                      {products[item.productId]?.name || `Loading...`}
                    </td>
                    <td style={{ padding: '15px', verticalAlign: 'middle' }}>
                      {shops[products[item.productId]?.shopId]?.shopName || 'Loading...'}
                    </td>
                    <td style={{ padding: '15px', verticalAlign: 'middle' }}>
                      {item.quantity}
                    </td>
                    <td style={{ 
                      padding: '15px', 
                      verticalAlign: 'middle',
                      color: '#e74c3c',
                      fontWeight: 'bold'
                    }}>
                      {formatPrice(item.unitPrice)}
                    </td>
                    <td style={{ 
                      padding: '15px', 
                      verticalAlign: 'middle',
                      color: '#e74c3c',
                      fontWeight: 'bold'
                    }}>
                      {formatPrice(item.quantity * item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{ 
            color: '#2c3e50',
            marginBottom: '20px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '10px'
          }}>Payment Information</h2>
          <Form onSubmit={handleSubmit} style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <Form.Group controlId="formOrderId" hidden>
              <Form.Label>Order ID:</Form.Label>
              <Form.Control type="number" value={orderId} disabled required />
            </Form.Group>
            <Form.Group controlId="formFullName" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Full Name:</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ced4da'
                }}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mb-4">
              <Form.Label style={{ fontWeight: 'bold' }}>Note for your order:</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ced4da'
                }}
              />
            </Form.Group>
            <div className="d-flex gap-3">
              <Button 
                variant="secondary" 
                onClick={() => navigate(-1)}
                style={{
                  border: 'none',
                  padding: '10px 30px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  width: '100%'
                }}
              >
                Go Back
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                style={{
                  backgroundColor: '#3498db',
                  border: 'none',
                  padding: '10px 30px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  width: '100%'
                }}
              >
                Proceed to Payment
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
