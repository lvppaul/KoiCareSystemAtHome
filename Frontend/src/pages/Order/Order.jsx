import React, { useState } from "react";
import { sendPayment } from "../../Config/VNPayApi";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getOrderById } from "../../Config/OrderApi";

const Order = () => {
  const orderId = useParams().orderId;
  const [order, setOrder] = useState({});
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");

  const fetchOrder = async () => {
    const response = await getOrderById(orderId);
    if (response) {
      setOrder(response);
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
      //console.log('Redirecting to:', response);
      window.location.href = response;
    } else {
      console.error("Error: No URL returned from API");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Confirm your order</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formOrderId" hidden>
              <Form.Label>Order ID:</Form.Label>
              <Form.Control type="number" value={orderId} disabled required />
            </Form.Group>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
