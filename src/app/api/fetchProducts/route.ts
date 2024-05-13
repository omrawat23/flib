import prisma from "@/lib/db";

export async function  GET () {
  try {
    const products = await prisma.product.findMany();
    return Response.json(products);
    
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('An error occurred while fetching products');
    
  }


}