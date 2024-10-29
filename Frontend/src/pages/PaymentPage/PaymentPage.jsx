import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentPage = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle payment submission logic here
        console.log('Payment submitted', { cardNumber, expiryDate, cvv, cardHolderName });
    };

    return (
        <Container className="payment-page">
            <Row>
                <Col>
                    <h1>Payment Page</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="expiryDate">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="text"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="cvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="cardHolderName">
                            <Form.Label>Card Holder Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={cardHolderName}
                                onChange={(e) => setCardHolderName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit Payment
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentPage;