import React, { useEffect, useState } from 'react';
import {getVNPayResult} from '../../Config/VNPayApi';
import {Container, Spinner, Button} from 'react-bootstrap';
import background from '../../assets/images/updateaccountbackground.png';
import { BiXCircle, BiCheckCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
const PaymentResult = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentState, setPaymentState] = useState(false);
  const sendReturnUrl = async () => {
    const returnUrl = window.location.href;
    if (returnUrl) {
      // Call the backend API with the returnUrl
      const response = await getVNPayResult(returnUrl);
      if (response) {
        console.log('response:', response);
        response.status === 200 ? setPaymentState(true) : setPaymentState(false);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      setPaymentState(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    sendReturnUrl();
  }, []);

  return (
    <Container style={{
      background: `url(${background}) repeat center center fixed`,
      minWidth: '100vw', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
    }}>
    

    <div style={{
    backgroundSize: 'cover', backgroundColor: '#fff', background:'rgba(255, 255, 255, 0.8)',
    minHeight: '70vh', maxWidth: '90vw', height: '100%',
    padding: '100px', borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    }}>
      {loading ? 
        <Spinner /> :
        (
          <>
      <h1>Payment Result</h1>
      </>
      )}
      {paymentState ? (
        <>
        <BiCheckCircle size={500} color='green'/>
        <h2>Payment Successful</h2>
        </>
      ) : (
        <>
        <BiXCircle size={500} color='red'/>
        <h2>Payment Failed Please Try Again</h2>
        </>
      )}
      <Button onClick={() => navigate('/')}>back to home page</Button>
    </div>
    </Container>
  );
};

export default PaymentResult;