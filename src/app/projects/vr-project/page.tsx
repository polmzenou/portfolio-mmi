'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ImageCarousel from '@/components/ImageCarousel';

export default function VRProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [codeLines, setCodeLines] = useState<string[]>([]);

  useEffect(() => {
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Générer des lignes de "code" aléatoires
    const generated = Array(20)
      .fill(0)
      .map(() => `> ${Math.random().toString(36).substring(2, 15)} ${Math.random().toString(36).substring(2, 15)}`);
    setCodeLines(generated);

    return () => clearTimeout(timer);
  }, []);

  // Images du carrousel
  const projectImages = [
    '/images/MiniatureVR.png',
    '/images/vr-screenshot-1.png',
    '/images/vr-screenshot-2.png',
    '/images/vr-screenshot-3.png',
    '/images/vr-screenshot-4.png',
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-fluo font-marathon text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background code effect */}
      <div className="fixed inset-0 overflow-hidden opacity-5 pointer-events-none">
        <pre className="text-green-fluo font-mono text-xs p-4">
          {codeLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </pre>
      </div>

      {/* Scan line overlay */}
      <div className="fixed inset-0 bg-scan-lines opacity-10 pointer-events-none z-10"></div>

      {/* Header avec effet de glitch */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative pt-20 pb-10"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-marathon text-green-fluo mb-4 glitch-text">
              Projet VR
            </h1>
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-green-fluo"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-green-fluo"></div>
          </div>
          <p className="text-lg text-white/70">
            Une expérience immersive en réalité virtuelle
          </p>
        </div>
      </motion.div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          {/* Section Description */}
          <section className="bg-black/50 p-6 rounded-lg border border-green-fluo/30">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <h2 className="text-2xl font-marathon text-green-fluo">Description</h2>
            </div>
            <p className="text-white/90 leading-relaxed">
              Afin de trouver une alternative à l'usage d'imprimante 3D pour visualiser des aménagements urbains, nous avons décidé de réaliser un projet VR. Je me suis donc occupé de la partie Unity et de la partie Oculus SDK. Mon rôle était de fournir une application Unity en Réalité Augmentée pour visualiser les aménagements urbains.
            </p>
          </section>

          {/* Section Galerie - Pleine largeur */}
          <div className="relative -mx-4 md:-mx-8 lg:-mx-16">
            <ImageCarousel images={projectImages} title="VR_PROJECT_GALLERY" />
          </div>

          {/* Section Technologies */}
          <section className="bg-black/50 p-6 rounded-lg border border-green-fluo/30">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <h2 className="text-2xl font-marathon text-green-fluo">Technologies Utilisées</h2>
            </div>
            <ul className="list-disc list-inside text-white/90 space-y-2">
              <li>Unity</li>
              <li>Oculus SDK</li>
              <li>C#</li>
            </ul>
          </section>

          {/* Section Fonctionnalités */}
          <section className="bg-black/50 p-6 rounded-lg border border-green-fluo/30">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <h2 className="text-2xl font-marathon text-green-fluo">Fonctionnalités Principales</h2>
            </div>
            <ul className="list-disc list-inside text-white/90 space-y-2">
              <li>Interaction immersive</li>
              <li>Environnements 3D détaillés</li>
              <li>Système de contrôle intuitif</li>
              <li>Menu de fonctionnalités intéractif</li>
              <li>Objets 3D maniable dans l'espace</li>
              <li>Visualisation d'aménagements du territoire de l'Espalanade</li>
            </ul>
          </section>

          {/* Section Défis */}
          <section className="bg-black/50 p-6 rounded-lg border border-green-fluo/30">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <h2 className="text-2xl font-marathon text-green-fluo">Défis et Solutions</h2>
            </div>
            <p className="text-white/90 leading-relaxed">
              Au dela du soucis matériels, c'est surtout le manque de connaissances sur le SDK Oculus qui a été un défi. J'ai passé du temps à m'auto-former sur le sujet et à lire la documentation, afin de pouvoir réaliser une application Unity en Réalité Augmentée.
            </p>
          </section>
        </motion.div>

        {/* Bouton Retour */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-green-fluo/20 text-green-fluo rounded-lg hover:bg-green-fluo/30 transition-colors duration-300 relative group"
          >
            <span className="relative z-10">Retour au Portfolio</span>
            <div className="absolute inset-0 bg-green-fluo/10 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </motion.div>
      </div>
    </div>
  );
} 