import React, { useEffect, useState } from 'react';
import {getVNPayResult} from '../../Config/VNPayApi';
import {Container, Spinner} from 'react-bootstrap';
import background from '../../assets/images/updateaccountbackground.png';
import { BiXCircle } from 'react-icons/bi';
const PaymentResult = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const sendReturnUrl = async () => {
    const returnUrl = window.location.href;
    if (returnUrl) {
      // Call the backend API with the returnUrl
      const response = await getVNPayResult(returnUrl);
      if (response) {
        console.log('response:', response.data);
        setLoading(false);
        // setMessage(response);
      } else {
        //setMessage(response)
        setLoading(false);
      }
    } else {
      //setMessage('No return URL found.');
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
      <p>result</p>
      </>
      )}
    </div>
    </Container>
  );
};

export default PaymentResult;