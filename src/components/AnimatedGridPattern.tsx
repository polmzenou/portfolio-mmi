'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedGridPatternProps {
  className?: string;
  size?: number;
  cellClassName?: string;
  lineClassName?: string;
  cellSize?: number;
  divideX?: number;
  divideY?: number;
  fill?: boolean;
  invertCell?: boolean;
  disableAnimations?: boolean;
}

export default function AnimatedGridPattern({
  className = '',
  size = 100, // 100%
  cellClassName = '',
  lineClassName = '',
  cellSize = 60,
  divideX = 5,
  divideY = 5,
  fill = false,
  invertCell = false,
  disableAnimations = false,
}: AnimatedGridPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [cells, setCells] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateContainerSize = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
      
      // Calculate cell positions
      const newCells = [];
      const cols = Math.floor(width / cellSize);
      const rows = Math.floor(height / cellSize);
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          newCells.push({ x, y });
        }
      }
      
      setCells(newCells);
    };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    // Initialize
    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateContainerSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cellSize]);

  // Calculate grid lines
  const verticalLines = Array.from({ length: divideX + 1 }, (_, i) => {
    const position = (containerSize.width / divideX) * i;
    return position;
  });

  const horizontalLines = Array.from({ length: divideY + 1 }, (_, i) => {
    const position = (containerSize.height / divideY) * i;
    return position;
  });

  // Style for container
  const containerStyle = {
    width: `${size}%`,
    height: `${size}%`,
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
    >
      {/* Vertical lines */}
      {verticalLines.map((position, i) => (
        <motion.div
          key={`v-${i}`}
          initial={{ opacity: 0, height: '0%' }}
          animate={{ 
            opacity: 1, 
            height: '100%',
            transition: { duration: 1, delay: i * 0.1 } 
          }}
          className={`absolute top-0 w-[1px] bg-green-fluo bg-opacity-20 ${lineClassName}`}
          style={{ left: `${position}px` }}
        />
      ))}

      {/* Horizontal lines */}
      {horizontalLines.map((position, i) => (
        <motion.div
          key={`h-${i}`}
          initial={{ opacity: 0, width: '0%' }}
          animate={{ 
            opacity: 1, 
            width: '100%',
            transition: { duration: 1, delay: i * 0.1 } 
          }}
          className={`absolute left-0 h-[1px] bg-green-fluo bg-opacity-20 ${lineClassName}`}
          style={{ top: `${position}px` }}
        />
      ))}

      {/* Cell Highlights */}
      {!disableAnimations && cells.map((cell, i) => {
        const cellX = cell.x * cellSize;
        const cellY = cell.y * cellSize;
        
        // Calculate distance from mouse
        const distX = mousePosition.x - (cellX + cellSize / 2);
        const distY = mousePosition.y - (cellY + cellSize / 2);
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // Cell is highlighted if mouse is close
        const isHighlighted = distance < cellSize * 3;
        const highlightIntensity = 1 - Math.min(distance / (cellSize * 3), 1);
        
        return fill && (
          <motion.div
            key={`cell-${i}`}
            className={`absolute ${cellClassName}`}
            style={{
              left: `${cellX}px`,
              top: `${cellY}px`,
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              opacity: isHighlighted ? highlightIntensity * 0.2 : 0,
              backgroundColor: invertCell ? '#000' : '#C0FE04',
            }}
            animate={{
              opacity: isHighlighted ? highlightIntensity * 0.2 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </div>
  );
} 