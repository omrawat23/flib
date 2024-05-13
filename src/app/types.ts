import { ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  descriptions: string;
  itemdetails: string;
  
}


export interface hoodyProducts {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  descriptions: string;
  itemdetails: string;
  
}

export interface sweatProducts {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  descriptions: string;
  itemdetails: string;
  
}

export interface CreateEmailOptions {
  from: string;
  to: string;
  subject: string;
  react: ReactNode;
  // Add any other properties you may need here
}


