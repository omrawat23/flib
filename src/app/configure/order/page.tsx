"use client"
// orderForm.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '@/app/types';
import CheckoutPage from '@/components/CheckoutPage';
import { useStore } from '@/store/store';

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

  // Initialize formData with default values
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

  // Function to handle form data changes
  const handleFormDataChange = (key: keyof FormData, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  // Function to calculate total estimate
  const calculateTotalEstimate = (cartItems: Product[]) => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    // Calculate total estimate when cartItems change
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

  const handleOrderRequest = async () => {
    // Validation logic
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
  
    // If there are validation errors, display them and prevent submission
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      // Your order request logic here
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(formData);
  
      if (response.ok) {
        console.log('Email sent successfully');
        // Handle success, if needed
      } else {
        console.error('Error sending email');
        // Handle error, if needed
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle error, if needed
    }
  };
  

  return (
    <div className="flex">
      {/* Order Request Form */}
      <div className="flex-1 flex justify-center items-center bg-gray-200 p-8">
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
          <button onClick={handleOrderRequest} className="bg-green-500 text-white px-4 py-2 rounded-md">Submit Request</button>
        </div>
      </div>
      {/* CheckoutPage */}
      <div className="fixed right-0 top-12 h-full w-68 bg-gray-200 p-4 overflow-y-auto">
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
