'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [orbitRotation, setOrbitRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Effet de glitch aléatoire
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    }, 8000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glitchInterval);
    };
  }, []);

  // Calculate opacity based on scroll position
  // Start fading when scrollY > 200, fully transparent at scrollY > 600
  const opacity = Math.max(1 - (scrollY - 200) / 400, 0);
  
  // Move the section up as user scrolls down
  const translateY = -scrollY * 0.5;

  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center py-16 px-4 relative data-noise"
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Scan line overlay */}
      <div className="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none z-0"></div>
      
      {/* Rotating orbital ring */}
      <div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] h-auto aspect-square"
      >
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path 
            fill="#fff" 
            d="M197.666 22.36c-37.354 0-67.637 30.284-67.637 67.64 0 11.57 2.908 22.46 8.03 31.982-41.127 38.07-75.686 84.545-97.312 134.717-55.608 129.01-4.667 233.597 113.78 233.597 118.446 0 259.545-104.586 315.154-233.598C525.29 127.686 474.352 23.1 355.904 23.1c-34.222 0-70.334 8.745-105.73 24.273-12.402-15.26-31.313-25.014-52.508-25.014zm-6.7 14.083l13.288 27.666 30.496-7.065-15.695 24.07C214.683 77.09 208.6 74.9 202.207 75.4c-12.196.954-21.35 11.656-20.398 23.852.167 2.03.958 3.905 1.618 5.732l-28.75 6.932 17.93-25.418-21.702-22.908 31.223 2.25 8.835-29.397zm129.49 16.44c2.93-.008 5.85.073 8.753.242 74.362 4.336 116.098 66.005 108.73 147.703-13.446 90.524-69.506 168.88-165.03 199.758 18.422 3.867 35.72 4.313 51.713 1.797-44.73 36.55-96.58 57.906-144.285 55.125-24.947-1.455-46.217-9.37-63.2-22.32 18.472 2.268 40.657-1.352 65.132-12.37C122.06 410.5 80 368.245 88.89 297.358c-7.795 11.485-13.765 22.637-18.103 33.308-.356-26.225 4.678-55.082 15.75-85.158 6.296-17.1 14.182-33.6 23.348-49.264 13.746-19.44 29.697-36.908 47.365-52.037 11.277 8.425 25.256 13.43 40.416 13.43 37.354 0 67.64-30.283 67.64-67.637 0-.786-.033-1.563-.06-2.342 32.21-8.183 66.18-10.1 100.418-4.625-16.914-15.152-34.966-24.902-53.45-29.894 2.756-.16 5.505-.25 8.24-.257z"
          />
        </svg>
      </div>
      
      <div className="relative z-10 text-center w-full max-w-5xl">
        <h1 
          className={`text-[10vw] md:text-[180px] font-marathon mb-2 leading-none text-green-fluo tracking-tight ${isGlitching ? 'flicker-effect' : 'glow-effect'}`}
        >
          PORTFOLIO
        </h1>
        
        <div className="flex justify-end w-full hacking-line">
          <h2 className="text-4xl md:text-6xl font-marathon text-white tracking-wide">
            PAUL MEHR
          </h2>
        </div>
        
        {/* Terminal-like scrolling indicator */}
        <div className="absolute bottom-[-180px] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <p className="text-green-fluo font-mono text-sm mb-2">// SCROLL DOWN</p>
          <div className="w-6 h-10 border border-green-fluo rounded-full flex justify-center">
            <div className="w-2 h-2 bg-green-fluo rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>
      
      {/* Glitch overlay effect */}
      {isGlitching && <div className="absolute inset-0 bg-glitch pointer-events-none z-20"></div>}
    </section>
  )
}
  