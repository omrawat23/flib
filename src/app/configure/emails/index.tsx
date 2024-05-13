import * as React from 'react';
import { Product } from '@/app/types';


export interface FormData {
  swagBoxes: number;
  deliveryDate: string;
  customItems: string;
  lookingFor: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}


export interface EmailTemplateProps {
  firstName: string;
  
  
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,


}) => {
 

  return (
    <div>
      <h1>Welcome, {firstName}! </h1>
      
{/*     
      <p>CartItems: {JSON.stringify(cartItems)}</p> Display cartItems */}
      {/* <p>FormData: {JSON.stringify(formData)}</p> */}
    </div>
  );
};