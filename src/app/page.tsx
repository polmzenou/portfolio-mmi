// src/app/page.tsx

'use client';

import { useLayoutMode } from "../lib/context/LayoutModeContext";
import Header from "../components/Header"
import Hero from "../components/Hero"
import About from "../components/About"
import SkillsGrid from "../components/SkillsGrid"
import ProjectList from "../components/ProjectList"
import AnimatedGridPattern from "../components/AnimatedGridPattern"
import DesktopMode from "../components/DesktopMode"
import ContactTerminal from "../components/ContactTerminal"


export default function Home() {
  const { layoutMode } = useLayoutMode();

  return (
    <main className="bg-black min-h-screen w-full overflow-x-hidden">
      <Header />

      {/* Always show hero section */}
      <Hero />

      {layoutMode === 'standard' ? (
        // Standard one-page layout
        <div className="relative w-full">
          <div className="fixed inset-0 z-0 pointer-events-none">
            <AnimatedGridPattern
              size={110}
              divideX={8}
              divideY={8}
              cellSize={80}
              fill
            />
          </div>
          <About />

          <SkillsGrid />
          <ProjectList />
          <div id="me-contacter" className="pb-20">
            <ContactTerminal />
          </div>

        </div>
      ) : (
        // Desktop mode
        <DesktopMode />
      )}

    </main>
  )
}
