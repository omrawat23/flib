"use client"

// pages/CheckoutPage.tsx
import React from 'react';
import { FiMinus, FiPlus, FiTrash } from 'react-icons/fi';
import Link from 'next/link';
import { Product } from '@/app/types';

export interface Props {
  cartItems?: Product[]; // Make cartItems optional
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  totalEstimate: number;
}

const CheckoutPage: React.FC<Props> = ({ cartItems = [], updateQuantity, removeFromCart, totalEstimate }) => { // Default value for cartItems
  const hasItemsInCart = cartItems?.length > 0; // Use optional chaining

  return (
    <div className="fixed right-0 top-12 h-full w-68 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold">Checkout</h2>
      <ul className="mt-4 space-y-4">
        {cartItems.map(item => (
          <li key={item.id} className="flex items-center py-2 space-x-4">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <span className=" font-bold">{item.name}</span>
              <div>
              <span className="text-gray-600 font-bold">Price: ${item.price * item.quantity}</span>
              </div>
              <div className="flex items-center mt-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 transition-transform transform hover:scale-110">
                  <FiMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 transition-transform transform hover:scale-110">
                  <FiPlus />
                </button>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 transition-transform transform hover:scale-110">
                  <FiTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-4 border-t">
        <span className="block text-lg font-bold">Total Estimate: ${totalEstimate}</span>
      </div>
      {hasItemsInCart && (
        <Link href="/configure/order">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-2">Continue</button>
        </Link>
      )}
    </div>
  );
};

export default CheckoutPage;