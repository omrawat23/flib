

"use server"

import { Resend } from 'resend';
import { EmailTemplate } from '@/app/configure/emails/index';
import { Product } from '@/app/types';
import { Rewind } from 'lucide-react';


const resend = new Resend(process.env.RESEND_API_KEY);



export async function POST(req: Request, res: Response) {
  try {
    const cartItems: Product[] = []; // Define or import cartItems
    const formData = await req.json();

    console.log(formData);
    

   
  
    const { data } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'omraw29@gmail.com',
      subject: 'Hello world',
      text: 'This is the text version of the email.', 
      react: EmailTemplate({ firstName: 'John', }), 
    });

    return Response.json(formData);
  } catch (error) {
    return Response.json({ error });
  }
}