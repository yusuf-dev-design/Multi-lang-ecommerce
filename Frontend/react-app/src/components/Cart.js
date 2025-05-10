import React from 'react';

const Cart = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      <ul className="space-y-2">
        <li className="flex justify-between border-b pb-2">
          <span>Product Name</span>
          <span>$99.99</span>
        </li>
      </ul>
      <div className="mt-4 text-right">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;