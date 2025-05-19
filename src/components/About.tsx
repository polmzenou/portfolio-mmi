'use client';

import { useEffect, useState } from 'react';

interface AboutProps {
  hideHeader?: boolean;
}

export default function About({ hideHeader = false }: AboutProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [codeLines, setCodeLines] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Glitch effect timer
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    }, 5000);

    // Générer les lignes de "code" aléatoires une seule fois côté client
    const generated = Array(30)
      .fill(0)
      .map(() => `> ${Math.random().toString(36).substring(2, 15)} ${Math.random().toString(36).substring(2, 15)}`);
    setCodeLines(generated);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glitchInterval);
    };
  }, []);

  const opacity = Math.min(Math.max((scrollY - 200) / 300, 0), 1);
  const translateY = Math.max(0, 200 - scrollY / 3);

  const glitchClass = isGlitching
    ? 'relative before:content-[attr(data-text)] before:absolute before:left-[2px] before:text-white before:bg-red-500 before:bg-opacity-30 before:top-0 before:clip-path-glitch after:content-[attr(data-text)] after:absolute after:left-[-2px] after:text-white after:bg-blue-500 after:bg-opacity-30 after:top-0 after:clip-path-glitch2'
    : '';

  return (
    <section
      id="a-propos"
      className="min-h-screen relative bg-black border-t border-white"
      style={{
        opacity: hideHeader ? 1 : opacity,
        transform: hideHeader ? 'none' : `translateY(${translateY}px)`,
      }}
    >
      {!hideHeader && (
        <div className="border-b border-white h-8 flex items-center px-4 bg-black">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="text-white text-xs ml-4 font-mono">// SYSTÈME: A_PROPOS.exe</p>
        </div>
      )}

      <div className="absolute inset-0 bg-scan-lines opacity-10 pointer-events-none z-10"></div>

      <div className="flex flex-col md:flex-row h-screen relative">
        {/* Left Column */}
        <div className="md:w-1/2 border-r border-white px-6 md:px-10 py-16 flex flex-col justify-center relative">
          <div className="relative mb-10">
            <h2
              data-text="// A PROPOS"
              className={`text-4xl md:text-6xl font-marathon text-white ${glitchClass}`}
            >
              // A PROPOS
            </h2>
            <div className="absolute -top-2 -left-2 w-16 h-16 border-t border-l border-green-fluo"></div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b border-r border-green-fluo"></div>
          </div>

          <div className="space-y-8">
            <p className="text-white text-lg">
              <span className="bg-green-fluo bg-opacity-20 text-green-fluo font-bold px-1">
                DÉVELOPPEUR CRÉATIF
              </span>{' '}
              spécialisé dans la création d'expériences web immersives et interactives, je mêle design et code pour
              concevoir des interfaces innovantes.
            </p>

            <div className="mt-12 border-l-4 border-green-fluo pl-4 py-2">
              <p className="text-sm text-green-fluo font-mono">Actuellement en recherche d'alternance</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 p-6 md:p-10 flex items-center justify-center relative">
          <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
            <pre className="text-green-fluo font-mono text-xs">
              {codeLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </pre>
          </div>

          <div className="border border-white p-8 w-full max-w-md aspect-square flex flex-col justify-center backdrop-blur-sm bg-black bg-opacity-70 relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-green-fluo"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-green-fluo"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-green-fluo"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-green-fluo"></div>

            <h3 className="text-center text-white mb-6 font-marathon">IDENTITE NUMERIQUE</h3>

            <dl className="space-y-6">
              <div className="flex flex-col space-y-2">
                <dt className="text-green-fluo text-sm font-mono flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-fluo mr-2"></span>
                  FORMATION
                </dt>
                <dd className="text-white font-bold ml-4">BUT MMI - Mastère Expert Développement Full Stack</dd>
              </div>
              <div className="flex flex-col space-y-2">
                <dt className="text-green-fluo text-sm font-mono flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-fluo mr-2"></span>
                  SPÉCIALITÉ
                </dt>
                <dd className="text-white font-bold ml-4">Développement Full Stack, mobile, applications</dd>
              </div>
              <div className="flex flex-col space-y-2">
                <dt className="text-green-fluo text-sm font-mono flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-fluo mr-2"></span>
                  LOCALISATION
                </dt>
                <dd className="text-white font-bold ml-4">France</dd>
              </div>
              <div className="flex flex-col space-y-2">
                <dt className="text-green-fluo text-sm font-mono flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-fluo mr-2"></span>
                  DISPONIBILITÉ
                </dt>
                <dd className="text-white font-bold ml-4">Freelance / Alternance</dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-white border-opacity-30 pt-4">
              <p className="text-green-fluo font-mono text-xs flex items-center">
                <span className="text-white mr-2">&gt;</span>
                <span className="animate-pulse">_</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {isGlitching && <div className="absolute inset-0 bg-glitch pointer-events-none z-20"></div>}
    </section>
  );
}
