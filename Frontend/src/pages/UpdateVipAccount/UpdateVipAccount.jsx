import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import backgroundImage from '../../assets/images/updateaccountbackground.png'
import yearly from '../../assets/images/12month.png'

const UpdateVipAccount = () => {
  const [selectedPlan, setSelectedPlan] = useState('12-month');

  const plans = [
    { id: '1-month', duration: '1', price: 99000, discount: 0 },
    { id: '12-month', duration: '12', price: 69000, discount: 32 }
  ];

  const handlePlanSelect = (id) => setSelectedPlan(id);

  const selectedPlanDetails = plans.find(plan => plan.id === selectedPlan);

  return (
    <div style={{
      background: `url(${backgroundImage}) repeat center center`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      margin: 0
    }}>
    <Container
      className="vip-purchase-page"
      style={{ display:'flex', flexDirection:'column',
        minWidth: '80vw', minHeight: '80vh',
        height: '100%', width: '100%',
        padding: '20px', background: '#201023', opacity: '0.8',
        borderRadius: '10px' }}
    >
      <h1 className="text-center" style={{color:'white', fontWeight:'bold', fontSize:'72px'}}>VIP Membership</h1>
      <Row className="mt-4" style={{ flex: 1 }} >
        {plans.map(plan => (
          <Col key={plan.id} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card
              className={`membership-card ${plan.id === selectedPlan ? 'selected' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
              style={{
                background: `rgba(255, 255, 255, 0.5) url(${yearly}) no-repeat center center`, 
                backgroundSize: 'cover', borderRadius: '20px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}
              >
              <Card.Body className="text-center" 
              style={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center',}}>
                <Card.Title>{plan.duration} month</Card.Title>
                <h2>đ {plan.price.toLocaleString()}/month</h2>
                <p>{plan.discount > 0 && `${plan.discount}% off`}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4" style={{ flex: 1 }}>
        <Col md={6} style={{ display: 'flex', flexDirection: 'column', 
          backgroundColor:'#fff', borderRadius: '20px', alignItems: 'center'}}>
          <h3>Select a Payment Method</h3>
          <Form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
          >
            <div className="mb-3">
              <Form.Check
                type="radio"
                label="VNPay"
                name="paymentMethod"
                defaultChecked
                disabled
              />
            </div>
          </Form>
        </Col>
          <Col md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',  
            backgroundColor:'#fff', borderRadius: '20px', flexShrink: 1  }}>
                <label>Selected Plan Details</label>
                <p>Duration: {selectedPlanDetails.duration}</p>
                <p>Price: đ {(selectedPlanDetails.price * selectedPlanDetails.duration).toLocaleString()}</p>
                {selectedPlanDetails.discount > 0 && (
                  <p>Discount: {selectedPlanDetails.discount}% off</p>
                )}
          </Col>
        </Row>
    </Container>
    </div>
  );
};

export default UpdateVipAccount;
