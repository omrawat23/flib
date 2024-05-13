"use client"


import React, { useState, useEffect } from 'react';
import { Product } from '@/app/types';
import CheckoutPage from '@/components/CheckoutPage';
import { useStore } from '@/store/store';
import Link from 'next/link';

export interface FormData {
  swagBoxes: number;
  deliveryDate: string;
  customItems: string;
  lookingFor: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

interface Props {
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const OrderForm: React.FC<Props> = ({ updateQuantity, removeFromCart }) => {
  const { cartItems } = useStore();

  const [formData, setFormData] = useState<FormData>({
    swagBoxes: 0,
    deliveryDate: '',
    customItems: '',
    lookingFor: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleFormDataChange = (key: keyof FormData, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const calculateTotalEstimate = (cartItems: Product[]) => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    const total = calculateTotalEstimate(cartItems);
  }, [cartItems]);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber: string): boolean => {
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
    return numericPhoneNumber.length === 10;
  };

  const isFormFilled = formData.swagBoxes > 0 && formData.deliveryDate.trim() !== '' &&
    formData.contactName.trim() !== '' && formData.contactEmail.trim() !== '' &&
    isValidEmail(formData.contactEmail) && formData.contactPhone.trim() !== '' &&
    isValidPhoneNumber(formData.contactPhone);

  const handleOrderRequest = async () => {
    const validationErrors: string[] = [];
    if (!formData.swagBoxes) {
      validationErrors.push('Please specify the number of Swag Boxes.');
    }
    if (!formData.deliveryDate) {
      validationErrors.push('Please specify the delivery date.');
    }
    if (!formData.contactName.trim()) {
      validationErrors.push('Please provide your name.');
    }
    if (!formData.contactEmail.trim()) {
      validationErrors.push('Please provide your email.');
    } else if (!isValidEmail(formData.contactEmail)) {
      validationErrors.push('Please provide a valid email address.');
    }
    if (!formData.contactPhone.trim()) {
      validationErrors.push('Please provide your phone number.');
    } else if (!isValidPhoneNumber(formData.contactPhone)) {
      validationErrors.push('Please provide a 10-digit phone number.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Order Request Form */}
      <div className="md:flex-1 md:flex justify-center items-center bg-gray-200 p-8">
        <div className="w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">Order Request Form</h2>
          <div className="space-y-4">
            <div>
              <label className="block">How many Swag Boxes do you want ?</label>
              <input type="number" value={formData.swagBoxes} onChange={(e) => handleFormDataChange('swagBoxes', parseInt(e.target.value))} className="w-full bg-white rounded border border-gray-300 px-3 py-2" />
            </div>
            <div>
              <label className="block">Do you need these by a certain date ?</label>
              <input type="date" value={formData.deliveryDate} onChange={(e) => handleFormDataChange('deliveryDate', e.target.value)} className="w-full bg-white rounded border border-gray-300 px-3 py-2" />
            </div>
            <div>
              <label className="block">Custom Items in your Box</label>
              <input type="text" value={formData.customItems} onChange={(e) => handleFormDataChange('customItems', e.target.value)} className="w-full bg-white rounded border border-gray-300 px-3 py-2" />
            </div>
            <div>
              <label className="block">Looking for Something Else ?</label>
              <input type="text" value={formData.lookingFor} onChange={(e) => handleFormDataChange('lookingFor', e.target.value)} className="w-full bg-white rounded border border-gray-300 px-3 py-2" />
            </div>
            <div>
              <label className="block">Contact Name</label>
              <input type="text" value={formData.contactName} onChange={(e) => handleFormDataChange('contactName', e.target.value)} className="w-full bg-white rounded border border-gray-300 px-3 py-2" />
            </div>
            <div>
              <label className="block">Contact Email</label>
              <input type="email" value={formData.contactEmail} onChange={(e) => handleFormDataChange('contactEmail', e.target.value)} className="w-full bg-white rounded border border-gray-300 px-3 py-2" />
            </div>
            <div>
              <label className="block">Contact Phone</label>
              <input type="tel" value={formData.contactPhone} onChange={(e) => handleFormDataChange('contactPhone', e.target.value)} className="w-full bg-white rounded border border-gray-300 px-3 py-2" />
            </div>
          </div>
          <Link href={isFormFilled ? "/configure/success" : "#"}>
            <button onClick={isFormFilled ? handleOrderRequest : undefined} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 md:mt-0">Submit Request</button>
          </Link>
        </div>
      </div>
      {/* CheckoutPage */}
      <div className="md:fixed md:right-0 md:top-12 md:h-full md:w-68 bg-gray-200 p-4 overflow-y-auto">
        <CheckoutPage
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          totalEstimate={calculateTotalEstimate(cartItems)}
        />
      </div>
    </div>
  );
};

export default OrderForm;
