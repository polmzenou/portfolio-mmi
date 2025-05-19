'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type LayoutMode = 'standard' | 'desktop';

interface LayoutModeContextType {
  layoutMode: LayoutMode;
  toggleLayoutMode: () => void;
}

const LayoutModeContext = createContext<LayoutModeContextType | undefined>(undefined);

export function LayoutModeProvider({ children }: { children: ReactNode }) {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('standard');

  // Load preference from localStorage on initial mount
  useEffect(() => {
    const savedMode = localStorage.getItem('layoutMode');
    if (savedMode === 'desktop' || savedMode === 'standard') {
      setLayoutMode(savedMode);
    }
  }, []);

  // Save preference when it changes
  useEffect(() => {
    localStorage.setItem('layoutMode', layoutMode);
  }, [layoutMode]);

  const toggleLayoutMode = () => {
    setLayoutMode(prev => prev === 'standard' ? 'desktop' : 'standard');
  };

  return (
    <LayoutModeContext.Provider value={{ layoutMode, toggleLayoutMode }}>
      {children}
    </LayoutModeContext.Provider>
  );
}

export function useLayoutMode() {
  const context = useContext(LayoutModeContext);
  if (context === undefined) {
    throw new Error('useLayoutMode must be used within a LayoutModeProvider');
  }
  return context;
} 