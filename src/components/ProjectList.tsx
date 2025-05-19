'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Données de projets factices
const projects = [
  {
    id: 1,
    title: "Application de suivi energetique",
    description: "Application pour visualiser les données pour suivre la consommation énergétique de l'IUT de Haguenau développée avec Laravel.",
    tags: ["Laravel", "Chart.js", "MySQL", "TailwindCSS"],
    image: "../../images/conso.png",
    link: "https://sae501.mehr.soete.etu.mmi-unistra.fr/",
    year: "2025"
  },
  {
    id: 2,
    title: "Terracorsica",
    description: "Site web qui propose des parcours de randonnées du GR20 développée avec Symfony.",
    tags: ["Symfony", "MySQL", "Twig", "API Google Maps"],
    image: "/images/project-2.jpg",
    link: "https://terracorsica.akifi.etu.mmi-unistra.fr/",
    year: "2024"
  },
  {
    id: 3,
    title: "Application en AR à l'Eurométropole",
    description: "Application pour visualiser des projets d'aménagement en relation avec la direction géomatique.",
    tags: ["Unity", "C#", "AR", "ARKit"],
    image: "/images/project-3.jpg",
    link: "#",
    year: "2024"
  },
  {
    id: 4,
    title: "Application de gestion d'emprunt de l'IUT",
    description: "Application web de gestion d'emprunt de matériels développée avec Laravel.",
    tags: ["Laravel", "MySQL", "TailwindCSS"],
    image: "/images/project-4.jpg",
    link: "https://sae501.mehr.etu.mmi-unistra.fr/",
    year: "2024"
  },
  {
    id: 5,
    title: "OpenWeather API",
    description: "Site web météo qui exploite l'API OpenWeather en utilisant la technologie D3.js",
    tags: ["JavaScript", "D3.js", "API"],
    image: "/images/project-4.jpg",
    link: "https://d3-meteo.mehr.etu.mmi-unistra.fr/",
    year: "2025"
  },
  {
    id: 6,
    title: "Application de générateur de couleurs",
    description: "Application pour générer des couleurs aléatoires afin de s'inspirer pour différent projet.",
    tags: ["JavaScript", "HTML", "TailwindCSS"],
    image: "/images/project-4.jpg",
    link: "https://polmzenou.github.io/portfolio/main.html",
    year: "2025"
  },
  {
    id: 7,
    title: "Ancien portfolio",
    description: "Mon ancien portfolio, réalisé avec HTML, CSS et JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/images/project-4.jpg",
    link: "https://polmzenou.github.io/portfolio",
    year: "2022"
  }
];

interface ProjectListProps {
  hideHeader?: boolean;
}

export default function ProjectList({ hideHeader = false }: ProjectListProps) {
  const [scrollY, setScrollY] = useState(0);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Générer des lignes de "code" aléatoires
    const generated = Array(15)
      .fill(0)
      .map(() => `> ${Math.random().toString(36).substring(2, 15)} ${Math.random().toString(36).substring(2, 15)}`);
    setCodeLines(generated);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Start showing when scrollY > 1200, fully visible at scrollY > 1500
  const opacity = Math.min(Math.max((scrollY - 1200) / 300, 0), 1);
  
  // Parallax effect
  const translateY = Math.max(0, 200 - (scrollY - 1000) / 3);

  // Animations for project cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section 
      id="projets"
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
          <p className="text-white text-xs ml-4 font-mono">// SYSTÈME: PROJECTS_DATABASE.exe</p>
        </div>
      )}

      {/* Scan line overlay */}
      <div className="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none z-10"></div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 relative">
          <div className="inline-block relative">
            <h2 className="text-6xl font-marathon text-white">PROJETS</h2>
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-green-fluo"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-green-fluo"></div>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={opacity > 0.8 || hideHeader ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className={`border border-white bg-black bg-opacity-70 backdrop-blur-sm relative overflow-hidden group ${
                activeProject === project.id ? 'ring-2 ring-green-fluo' : ''
              }`}
              variants={projectVariants}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-green-fluo z-20"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-green-fluo z-20"></div>
              
              {/* Background image with overlay */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
                {/* Fallback image placeholder - replace with actual project images */}
                <div className="w-full h-full bg-gradient-to-r from-blue-900 to-black"></div>
              </div>
              
              {/* Random code snippets in background */}
              <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
                <pre className="text-green-fluo font-mono text-xs p-4">
                  {codeLines.map((line, i) => (
                    <div key={`${project.id}-${i}`}>{line}</div>
                  ))}
                </pre>
              </div>
              
              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-marathon text-white">{project.title}</h3>
                  <span className="text-xs text-green-fluo font-mono border border-green-fluo px-2 py-1">
                    {project.year}
                  </span>
                </div>
                
                <p className="text-white text-sm mb-6 min-h-[80px]">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-black bg-opacity-50 border border-white text-white px-2 py-1 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.link} 
                  className="inline-flex items-center text-green-fluo hover:text-white transition-colors duration-300 font-mono text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-2">VOIR LE PROJET</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              
              {/* Project ID label */}
              <div className="absolute top-2 right-2 font-mono text-xs text-green-fluo">
                ID: {String(project.id).padStart(3, '0')}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Terminal footer */}
        <div className="mt-12 border-t border-white border-opacity-30 pt-6 flex justify-between items-center text-xs text-white font-mono">
          <span>TOTAL_PROJECTS: {projects.length}</span>
          <span className="text-green-fluo flex items-center">
            <span className="animate-pulse mr-2">●</span>
            SYSTEM_READY
          </span>
        </div>
      </div>
    </section>
  );
}
