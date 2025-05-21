'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import About from './About';
import SkillsGrid from './SkillsGrid';
import ProjectList from './ProjectList';
import ContactTerminal from './ContactTerminal';
import AnimatedGridPattern from './AnimatedGridPattern';

type WindowType = 'about' | 'skills' | 'projects' | 'contact';

interface WindowState {
  id: WindowType;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

const DesktopMode = () => {
  const [highestZIndex, setHighestZIndex] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // État des fenêtres
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'about', isOpen: false, zIndex: 10, position: { x: 50, y: 50 } },
    { id: 'skills', isOpen: false, zIndex: 11, position: { x: 100, y: 100 } },
    { id: 'projects', isOpen: false, zIndex: 12, position: { x: 150, y: 150 } },
    { id: 'contact', isOpen: false, zIndex: 13, position: { x: 200, y: 200 } }
  ]);

  // Automatically open the About window when component mounts
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     openWindow('about');
  //   }, 500);
    
  //   return () => clearTimeout(timer);
  // }, []);

  // Calculer la taille du conteneur
  useEffect(() => {
    if (containerRef.current) {
      const updateSize = () => {
        if (containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect();
          setContainerSize({ width, height });
        }
      };
      
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  // Fonction pour ouvrir une fenêtre
  const openWindow = (windowId: WindowType) => {
    setWindows(prev => 
      prev.map(win => 
        win.id === windowId 
          ? { ...win, isOpen: true, zIndex: highestZIndex + 1 } 
          : win
      )
    );
    setHighestZIndex(prev => prev + 1);
  };

  // Fonction pour fermer une fenêtre
  const closeWindow = (windowId: WindowType) => {
    setWindows(prev => 
      prev.map(win => 
        win.id === windowId 
          ? { ...win, isOpen: false } 
          : win
      )
    );
  };

  // Fonction pour mettre une fenêtre au premier plan
  const bringToFront = (windowId: WindowType) => {
    setWindows(prev => 
      prev.map(win => 
        win.id === windowId 
          ? { ...win, zIndex: highestZIndex + 1 } 
          : win
      )
    );
    setHighestZIndex(prev => prev + 1);
  };

  // Fonction pour mettre à jour la position d'une fenêtre
  const updatePosition = (windowId: WindowType, position: { x: number; y: number }) => {
    setWindows(prev => 
      prev.map(win => 
        win.id === windowId 
          ? { ...win, position } 
          : win
      )
    );
  };

  // Rendu des icônes du bureau
  const renderDesktopIcons = () => {
    const icons = [
      {
        id: 'about' as WindowType,
        name: 'A PROPOS',
        icon: (
          <svg className="w-12 h-12 text-green-fluo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        id: 'skills' as WindowType,
        name: 'COMPETENCES',
        icon: (
          <svg className="w-12 h-12 text-green-fluo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6L7 3L11 6L15 3L19 6L23 3V18L19 21L15 18L11 21L7 18L3 21V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 18V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 6V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 18V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 6V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        id: 'projects' as WindowType,
        name: 'PROJETS',
        icon: (
          <svg className="w-12 h-12 text-green-fluo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        id: 'contact' as WindowType,
        name: 'CONTACT',
        icon: (
          <svg className="w-12 h-12 text-green-fluo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      }
    ];

    return (
      <div className="grid grid-cols-4 gap-8 place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {icons.map(icon => (
          <button
            key={icon.id}
            onClick={() => openWindow(icon.id)}
            className="flex flex-col items-center space-y-2 p-4 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-300"
          >
            <div className="p-3 border border-green-fluo rounded-lg bg-black bg-opacity-50 transform hover:scale-110 transition-transform">
              {icon.icon}
            </div>
            <span className="text-green-fluo font-marathon text-xs">{icon.name}</span>
          </button>
        ))}
      </div>
    );
  };

  // Rendu des fenêtres
  const renderWindow = (windowState: WindowState) => {
    const { id, isOpen, zIndex, position } = windowState;
    
    if (!isOpen) return null;

    const titleMap = {
      'about': 'À PROPOS',
      'skills': 'COMPÉTENCES',
      'projects': 'PROJETS',
      'contact': 'CONTACT'
    };

    // Calculer la taille des fenêtres
    const windowWidth = Math.min(containerSize.width * 0.8, 1000);
    const windowHeight = Math.min(containerSize.height * 0.8, 700);

    return (
      <motion.div
        key={id}
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={containerRef}
        initial={{ x: position.x, y: position.y, opacity: 0, scale: 0.9 }}
        animate={{ x: position.x, y: position.y, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onDragEnd={(_, info) => {
          updatePosition(id, { 
            x: position.x + info.offset.x, 
            y: position.y + info.offset.y 
          });
        }}
        onMouseDown={() => bringToFront(id)}
        style={{ 
          zIndex,
          width: windowWidth,
          height: windowHeight,
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
        className="bg-black border border-white rounded-lg overflow-hidden shadow-2xl"
      >
        {/* Barre de titre de la fenêtre */}
        <div className="h-8 bg-black border-b border-white flex items-center justify-between px-2 cursor-move">
          <div className="flex space-x-2">
            <button 
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-700 transition-colors"
              onClick={() => closeWindow(id)}
            />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-white text-xs font-mono">// {titleMap[id]}.exe</div>
          <div className="w-6"></div> {/* Spacer pour centrer le titre */}
        </div>

        {/* Contenu de la fenêtre */}
        <div className="overflow-auto" style={{ height: windowHeight - 32 }}>
          {id === 'about' && <About hideHeader />}
          {id === 'skills' && <SkillsGrid hideHeader />}
          {id === 'projects' && <ProjectList hideHeader />}
          {id === 'contact' && (
            <div className="bg-black text-green-fluo">
              <ContactTerminal hideHeader closeWindow={() => closeWindow('contact')} />
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-black border-t border-white"
    >
      {/* Animated Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedGridPattern 
          size={110} 
          divideX={8} 
          divideY={8} 
          cellSize={80}
          fill
        />
      </div>

      {/* Scan line overlay */}
      <div className="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none z-0"></div>
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-5 pointer-events-none z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`col-${i}`} className="border-r border-green-fluo h-full" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`row-${i}`} className="border-b border-green-fluo w-full" />
        ))}
      </div>

      {/* Icônes du bureau */}
      {renderDesktopIcons()}

      {/* Fenêtres */}
      {windows.map(window => renderWindow(window))}

      {/* Instructions overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-green-fluo font-mono text-xs p-2 border border-green-fluo rounded-md bg-black bg-opacity-70">
        <p className="text-center">// CLIQUEZ SUR LES ICÔNES POUR OUVRIR LES FENÊTRES</p>
        <p className="text-center">// GLISSEZ LES FENÊTRES POUR LES DÉPLACER</p>
      </div>
    </div>
  );
};

export default DesktopMode; 