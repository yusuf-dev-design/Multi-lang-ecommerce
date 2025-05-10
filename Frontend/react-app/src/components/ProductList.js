// src/components/ProductList.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  if (!products.length) return <p className="text-center text-gray-500">No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="mt-2 font-bold">${product.price}</p>
          <Link to={`/products/${product.id}`} className="text-blue-600 hover:underline mt-2 inline-block">
            View Details →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;