import React, { useState } from 'react';
import { sendPayment } from '../../Config/VNPayApi';

const Order = () => {
  const [orderId, setOrderId] = useState('');
  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      orderId: parseInt(orderId),
      fullName,
      description,
    };

    const response = await sendPayment(payload);
    if (response && response.url) {
      window.location.href = response.url;
    } else {
      console.error('Error: No URL returned from API');
    }
  };

  return (
    <div>
      <h1>Create Order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order ID:</label>
          <input
            type="number"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
};

export default Order;