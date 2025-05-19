'use client';

import { useEffect, useState } from 'react';

// Skill categories and items
const skillCategories = [
  {
    name: "DEVELOPPEMENT FRONTEND",
    skills: ["HTML", "CSS", "JavaScript", "SASS", "React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Vue.js"],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6L7 3L11 6L15 3L19 6L23 3V18L19 21L15 18L11 21L7 18L3 21V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 18V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 6V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 18V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 6V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    name: "DEVELOPPEMENT BACKEND",
    skills: ["Node.js", "Symfony", "Laravel", "PostgreSQL", "Supabase"],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 11v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 20v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 11v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 20v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    name: "DESIGN & UI/UX",
    skills: ["Figma", "Photoshop", "Illustrator", "Blender", "After Effects", "Prototypage"],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 18V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 9L9 9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 15L15 15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 15L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    name: "OUTILS & METHODOLOGIE",
    skills: ["Git", "GitHub", "Agile/Scrum"],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10v4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 14c0 -2.5 1 -6 7 -6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

interface SkillsGridProps {
  hideHeader?: boolean;
}

export default function SkillsGrid({ hideHeader = false }: SkillsGridProps) {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<null | string>(null);
  const [glitchingSkill, setGlitchingSkill] = useState<null | string>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Random skill glitch effect
    const glitchInterval = setInterval(() => {
      const randomCategory = skillCategories[Math.floor(Math.random() * skillCategories.length)];
      const randomSkill = randomCategory.skills[Math.floor(Math.random() * randomCategory.skills.length)];
      setGlitchingSkill(randomSkill);
      
      setTimeout(() => setGlitchingSkill(null), 300);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glitchInterval);
    };
  }, []);

  // Start showing when scrollY > 700, fully visible at scrollY > 1000
  const opacity = Math.min(Math.max((scrollY - 700) / 300, 0), 1);
  
  // Parallax effect
  const translateY = Math.max(0, 200 - (scrollY - 500) / 3);

  return (
    <section 
      id="compétences"
      className="min-h-screen relative bg-black border-t border-white"
      style={{
        opacity: hideHeader ? 1 : opacity,
        transform: hideHeader ? 'none' : `translateY(${translateY}px)`,
      }}
    >
      {/* Terminal header bar */}
      {!hideHeader && (
        <div className="border-b border-white h-8 flex items-center px-4 bg-black">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="text-white text-xs ml-4 font-mono">// SYSTÈME: SKILLS_MATRIX.exe</p>
        </div>
      )}
      
      {/* Scan line overlay */}
      <div className="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none z-10"></div>
      
      <div className="container mx-auto px-4 py-16 max-w-full">
        <div className="text-center mb-16 relative">
          <div className="inline-block relative">
            <h2 className="text-6xl font-marathon text-white">COMPETENCES</h2>
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-green-fluo"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-green-fluo"></div>
          </div>
        </div>

        {/* Marathon-style grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="border border-white p-6 bg-black bg-opacity-70 backdrop-blur-sm relative"
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-green-fluo"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-green-fluo"></div>
              
              <div className="flex items-center mb-4">
                <div className="text-green-fluo mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-marathon text-white">{category.name}</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {category.skills.map((skill, i) => {
                  const isGlitching = skill === glitchingSkill;
                  const isHovered = skill === hoveredSkill;
                  
                  return (
                    <div 
                      key={i}
                      className={`py-2 px-3 font-mono text-sm border-l-2 transition-all duration-300 ${
                        isGlitching ? 'border-red-500 text-red-300' : 
                        isHovered ? 'border-green-fluo bg-green-fluo bg-opacity-10 text-white' : 
                        'border-white border-opacity-30 text-white text-opacity-80'
                      }`}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center">
                        <span className={`inline-block w-2 h-2 mr-2 ${isGlitching ? 'bg-red-500' : 'bg-green-fluo'}`}></span>
                        {isGlitching ? (
                          <span>{'#'.repeat(skill.length)}</span>
                        ) : (
                          <span>{skill}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
