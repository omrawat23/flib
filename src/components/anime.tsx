// pages/index.tsx
"use client"
// pages/index.tsx

// pages/index.tsx

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const YO: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  let animation: number | null = null;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.error('Container ref not found');
      return;
    }

    const images = container.querySelectorAll('.image');

    const cloneImages = () => {
      images.forEach((image) => {
        const clone = image.cloneNode(true) as HTMLImageElement;
        container.appendChild(clone);
      });
    };

    cloneImages();

    const scroll = () => {
      container.scrollLeft += 1; // Increment the scroll position
      if (container.scrollLeft % 100 === 0) {
        cloneImages(); // Add clones periodically
      }
      animation = requestAnimationFrame(scroll);
    };

    scroll(); // Start the scrolling animation

    return () => {
      if (animation) cancelAnimationFrame(animation); // Cancel animation on component unmount
    };
  }, []);

  return (
    <div ref={containerRef} className="flex overflow-hidden bg-F0F4F8 p-4">
      <motion.img
        src="https://d8x2313t22dpf.cloudfront.net/landing/zen/v3.10.145.529/static/d87452c1f79087d96f9e80bb68bf030f/ad814/logo_default.png"
        alt="Company 1"
        className="image"
        style={{ width: '150px', height: '80px', marginRight: '100px', pointerEvents: 'none' }}
        animate={{ x: [-500, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
      />
      <motion.img
        src="https://assets-global.website-files.com/64eb79e19f92b72fe47f81e8/65b2d6800671808b6977d33e_ramp%201.svg" // Replace with your image URL
        alt="Company 2"
        className="image"
        style={{ width: '100px', height: '80px', marginRight: '100px', pointerEvents: 'none' }}
        animate={{ x: [-500, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear', delay: 1 }}
      />
      <motion.img
        src="https://assets-global.website-files.com/64eb79e19f92b72fe47f81e8/65b2d680a97b84e5e442a9c7_walmart%201.svg" // Replace with your image URL
        alt="Company 3"
        className="image"
        style={{ width: '100px', height: '80px', marginRight: '100px', pointerEvents: 'none' }}
        animate={{ x: [-500, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear', delay: 2 }}
      />
      <motion.img
        src="https://assets-global.website-files.com/64eb79e19f92b72fe47f81e8/65b2d680336bd1e21c2ec681_notion%201.svg"
        alt="Company 4"
        className="image"
        style={{ width: '100px', height: '80px', marginRight: '100px', pointerEvents: 'none' }}
        animate={{ x: [-500, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
      />
      
    </div>
  );
};

export default YO;
