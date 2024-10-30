import React, { useEffect, useState } from 'react';
import {getVNPayResult} from '../../Config/VNPayApi';

const PaymentResult = () => {
  const [message, setMessage] = useState('');

  const sendReturnUrl = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log('urlParams:', urlParams);
    if (urlParams) {
      // Call the backend API with the returnUrl
      const response = await getVNPayResult(urlParams);
      if (response.message) {
        console.log('response:', response);
        setMessage(response.message);
      } else {
        setMessage('Error processing payment result.');
      }
    } else {
      setMessage('No return URL found.');
    }
  };

  useEffect(() => {
    sendReturnUrl();
  }, []);

  return (
    <div>
      <h1>Payment Result</h1>
      <p>{message}</p>
    </div>
  );
};

export default PaymentResult;