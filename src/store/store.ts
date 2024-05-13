import create from 'zustand';
import { Product } from '@/app/types';
import { persist } from 'zustand/middleware';
import product from '@/app/configure/pro/page'


export interface CartStore {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;

}

export const useStore = create<CartStore>(
  persist(
    (set, get: () => CartStore) => ({
      cartItems: [],
      addToCart: (product: Product) => {
        const existingItem = get().cartItems.find(item => item.name === product.name);
        if (existingItem) {
          // If the product with the same name already exists in the cart, update its quantity
          set((state: CartStore) => ({
            cartItems: state.cartItems.map(item =>
              item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          }));
        } else {
          // If the product with the same name doesn't exist in the cart, add it with quantity 50
          set((state: CartStore) => ({ cartItems: [...state.cartItems, { ...product, quantity: 50 }] }));
        }
      },
      removeFromCart: (productId: number) =>
        set((state: CartStore) => ({ cartItems: state.cartItems.filter(item => item.id !== productId) })),
      updateQuantity: (productId: number, newQuantity: number) => {
        // Ensure the new quantity is not less than 50
        const validatedQuantity = Math.max(newQuantity, 50);
        set((state: CartStore) => ({
          cartItems: state.cartItems.map(item =>
            item.id === productId ? { ...item, quantity: validatedQuantity } : item
          )
        }));
      },
      // totalEstimate: () => {
      //   return set((state: CartStore) =>
      //     state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      //   );
      // }
    }),
    {
      name: 'cart-store', // Storage key
      getStorage: () => localStorage // Use localStorage
    }
  ) as any
);
