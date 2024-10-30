import React, { useEffect, useState } from 'react';
import {getVNPayResult} from '../../Config/VNPayApi';
import {Container, Spinner} from 'react-bootstrap';
import background from '../../assets/images/updateaccountbackground.png';
import { BiXCircle } from 'react-icons/bi';
const PaymentResult = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const sendReturnUrl = async () => {
    const returnUrl = window.location.href;
    if (returnUrl) {
      // Call the backend API with the returnUrl
      const response = await getVNPayResult(returnUrl);
      if (response) {
        console.log('response:', response.data);
        setLoading(false);
        setMessage(response);
      } else {
        setMessage(
          <>
            {response}
            <BiXCircle size={20} color="red" />
          </>
        );
        setLoading(false);
      }
    } else {
      setMessage('No return URL found.');
    }
  };

  useEffect(() => {
    sendReturnUrl();
  }, []);

  return (
    <Container style={{
      background: `url(${background}) repeat center center fixed`,
      borderRadius: '15px',
      display: 'flex',
      flex: 1,
      minWidth: '100vw',
      minHeight: '100vh',
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '0', // Remove margin to avoid extra white space
      padding: '0', // Reset padding if needed
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    }}>
    

    <div style={{
    backgroundSize: 'cover',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backgroundPosition: 'center',
    minHeight: '60vh',
    minWidth: '60vw',
    height: '100%',
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
      <p>{message}</p>
      </>
      )}
    </div>
    </Container>
  );
};

export default PaymentResult;