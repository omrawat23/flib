import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const LandingPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center mb-20">
        <FaCheckCircle className="text-green-500 text-5xl mb-4" />
        <h1 className="text-3xl font-bold text-green-500 mb-2 text-center">Order Successfully Placed!</h1>
        <p className="text-lg text-center">Thank you for placing your order. We will contact you shortly.</p>
      </div>
    </div>
  );
};

export default LandingPage;
