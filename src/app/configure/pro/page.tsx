
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { FiHome, FiSettings, FiUsers, FiPlus, FiX, FiCheck } from 'react-icons/fi'; // Import icons
import CheckoutPage from '@/components/CheckoutPage'; // Import CheckoutPage component
import { Product } from '@/app/types';
import { useStore } from '@/store/store';

interface Props {
  cartItemCount: number; // Define cartItemCount prop
}

const PageWithSidebar: React.FC<Props> = ({ cartItemCount }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null); // Define modalRef here
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useStore();
  const calculateTotalEstimate = (cartItems: Product[]) => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  useEffect(() => {
    // Fetch products and other initialization code...
    async function fetchProducts() {
      try {
        const res = await fetch('/api/fetchProducts');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="md:flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:block fixed left-0 top-37 md:top-500 h-full md:w-64 w-full md:max-w-xs bg-gray-200 p-4 overflow-y-auto z-10">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center py-2">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center">
              <FiHome className="mr-2" />
              <span>Link 1</span>
            </button>
          </li>
          <li className="flex items-center py-2">
            <button onClick={() => console.log('Link 2 clicked')} className="flex items-center">
              <FiSettings className="mr-2" />
              <span>Link 2</span>
            </button>
          </li>
          <li className="flex items-center py-2">
            <button onClick={() => console.log('Link 3 clicked')} className="flex items-center">
              <FiUsers className="mr-2" />
              <span>Link 3</span>
            </button>
          </li>
        </ul>
        <div className="border-t mt-4 pt-4">
          <p>Additional content here...</p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p>This is the main content of the page.</p>

        {/* All products section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-contain mb-4 rounded-md" />
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <span className="block text-lg font-semibold">{product.name}</span>
                  <span className="block text-gray-600">Price: ${product.price}</span>
                </div>
                <div className="flex items-center mt-4">
                  {cartItems.find(item => item.id === product.id) ? (
                    <FiCheck className="text-green-500 mr-2" />
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 transition-transform transform hover:scale-110"
                    >
                      <FiPlus />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      
        {isModalOpen && selectedProduct && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" ref={modalRef}>
    <div className="bg-white p-8 rounded-lg flex relative"> {/* Added relative positioning */}
      <button onClick={closeModal} className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 mt-2 mr-2 text-2xl">
        <FiX />
      </button>
      <div className="mr-8">
        <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-64 h-64 object-contain mb-4 rounded-md" />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
        <div className="flex-grow" />
        <span className="block text-gray-600 mb-4">{selectedProduct.descriptions}</span>
        <span className="block text-gray-600 mb-4">{selectedProduct.itemdetails}</span>
        <div>
          <button
            onClick={() => {
              addToCart(selectedProduct);
              closeModal();
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
)}



      </div>

      {/* Checkout sidebar */}
      <CheckoutPage cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} totalEstimate={calculateTotalEstimate(cartItems)} />
    </div>
  );
};

export default PageWithSidebar;
