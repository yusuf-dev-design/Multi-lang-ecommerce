import React from 'react';
import axios from 'axios';

const Checkout = () => {
  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    const orderData = {
      userId: "user123",
      productId: "product123",
      quantity: 1
    };

    try {
      const res = await axios.post('http://localhost:8002/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Order placed!");
      console.log("Order response:", res.data);
    } catch (err) {
      alert("Failed to place order");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;