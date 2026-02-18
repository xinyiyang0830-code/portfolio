
import React, { useEffect, useRef, useState } from 'react';
import PhysicsLetters from '../components/PhysicsLetters';

const CategoryBlock: React.FC<{ id: string; title: string; lines: string[] }> = ({ id, title, lines }) => (
  <div className="reveal flex flex-col items-start gap-4">
    <div className="flex items-center gap-3 w-full">
      <span className="font-mono text-[10px] text-white/40 font-bold">{id}</span>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] font-black text-white whitespace-nowrap">{title}</h3>
      <div className="h-[1px] flex-1 bg-white/5 ml-2"></div>
    </div>
    <div className="pl-8 space-y-2">
      {lines.map((line, i) => (
        <p key={i} className="font-mono text-[10px] text-zinc-500 uppercase leading-relaxed tracking-wider font-medium hover:text-white transition-colors cursor-default">
          {line}
        </p>
      ))}
    </div>
  </div>
);

const Home: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observerRef.current?.observe(el));
    
    const handleMouseMove = (e: MouseEvent) => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate dynamic glow based on mouse proximity
  const glowX = mousePos.x * 0.05;
  const glowY = mousePos.y * 0.05;
  const glowIntensity = Math.max(10, 40 - Math.sqrt(mousePos.x**2 + mousePos.y**2) * 0.02);

  return (
    <div className="relative min-h-screen bg-brand-dark flex flex-col">
      {/* Background Physics Simulation: The falling metallic letters #PORTFOLIO. */}
      <PhysicsLetters />

      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col flex-1 pointer-events-none">
        
        {/* Top Centered Header - Large bold title with dynamic glow */}
        <header className="pt-24 pb-12 flex flex-col items-center">
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-black uppercase tracking-tight text-white mb-2 reveal flex items-baseline transition-shadow duration-300 ease-out animate-title-pulse"
            style={{
              textShadow: `${glowX}px ${glowY}px ${glowIntensity}px rgba(255, 255, 255, 0.4), 
                           ${-glowX}px ${-glowY}px ${glowIntensity * 0.5}px rgba(255, 255, 255, 0.2)`
            }}
          >
            DESIGN PORTFOLIO
            <span 
              className="text-white text-9xl md:text-[11rem] leading-none ml-2 select-none transform translate-y-2 animate-period-pulse"
              style={{
                textShadow: `${glowX * 1.5}px ${glowY * 1.5}px ${glowIntensity * 1.5}px rgba(255, 255, 255, 0.6)`
              }}
            >.</span>
          </h1>
          
          {/* Sub-Header Categories (01-04) */}
          <div className="w-full max-w-[1440px] px-12 mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pointer-events-auto">
            <CategoryBlock 
              id="01" 
              title="Music Visualization" 
              lines={[
                "Promotion and Application of Suzhou Code in Theme Design of Subway Stations",
                "Visual representation of Xiashi lantern combined with sound",
                "Building immersive scenes with music"
              ]} 
            />
            <CategoryBlock 
              id="02" 
              title="Motion Video" 
              lines={[
                "24 Solar Terms : Major Heat Dynamic Poster",
                "Hidden Eyes : Cartoon style Animation",
                "Double-sided Suzhou : combining virtual and real effects"
              ]} 
            />
            <CategoryBlock 
              id="03" 
              title="Theme and Image Design" 
              lines={[
                "The main visual design of the National Art Fund project",
                "Book layout design",
                "Banpo Culture IP Image Design"
              ]} 
            />
            <CategoryBlock 
              id="04" 
              title="Virtual Reality" 
              lines={[
                "Dream Comes True: VR virtual space with the theme of the Taihu Lake Stone",
                "Delicate Fragrance: Naked eye 3D"
              ]} 
            />
          </div>
        </header>

        {/* Left Sidebar (Vertical) */}
        <aside className="fixed left-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center">
          <div className="rotate-[-90deg] origin-center whitespace-nowrap">
            <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-white/30 font-bold">
              DESIGN BY YANG XINYI · 2025 · DESIGN PORTFOLIO
            </span>
          </div>
        </aside>

        {/* Scroll Indicator */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-auto cursor-pointer group" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-white/20 group-hover:text-white transition-colors">Scroll_Directory</span>
          <div className="w-[1px] h-12 bg-white/10 group-hover:bg-white transition-all overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-white translate-y-[-100%] animate-[scrollLine_2s_infinite]"></div>
          </div>
        </div>

        {/* Bottom Technical Labels */}
        <div className="h-screen flex items-end">
          <div className="p-12 flex justify-between items-end w-full">
            <div className="font-mono text-[9px] text-zinc-800 tracking-[0.5em] uppercase font-bold">
                LATENCY_SECURE // V.2025_CORE
            </div>
            <div className="font-mono text-[9px] text-zinc-800 tracking-[0.5em] uppercase font-bold">
                SIGNAL_0.02ms // LOC_SZ
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes title-pulse {
          0% { filter: drop-shadow(0 0 10px rgba(255,255,255,0.1)); }
          100% { filter: drop-shadow(0 0 20px rgba(255,255,255,0.3)); }
        }
        @keyframes period-pulse {
          0% { transform: translateY(8px) scale(1); opacity: 0.8; }
          100% { transform: translateY(8px) scale(1.05); opacity: 1; }
        }
        .animate-title-pulse {
          animation: title-pulse 3s infinite alternate ease-in-out;
        }
        .animate-period-pulse {
          animation: period-pulse 2s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
