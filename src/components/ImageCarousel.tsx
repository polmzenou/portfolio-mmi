'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Dupliquer les images pour créer un effet infini
  const duplicatedImages = [...images, ...images];

  // Effet de défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
        
        // Réinitialiser la position quand on atteint la fin des images dupliquées
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-black/50 border border-green-fluo/30 rounded-lg p-4">
      {/* Terminal-style header */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-green-fluo font-mono text-sm">{title}</span>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none z-10"></div>

      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {duplicatedImages.map((image, index) => (
          <motion.div
            key={index}
            className="flex-none w-[400px] h-[250px] mx-4 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="absolute inset-0 bg-green-fluo/10 border border-green-fluo/30 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={`Screenshot ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
            {/* Glitch effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-fluo/5 to-transparent animate-glitch"></div>
          </motion.div>
        ))}
      </div>

      {/* Terminal-style footer */}
      <div className="mt-4 flex justify-between items-center text-xs text-green-fluo font-mono">
        <span>IMAGES_LOADED: {images.length}</span>
        <span className="flex items-center">
          <span className="animate-pulse mr-2">●</span>
          CAROUSEL_ACTIVE
        </span>
      </div>
    </div>
  );
} 