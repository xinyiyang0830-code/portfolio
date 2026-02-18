
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);
  const location = useLocation();
  
  // Navigation content divided into four parts
  const menuItems = [
    { name: 'Home', path: '/', id: '01' },
    { name: 'Work', path: '/work', id: '02' },
    { name: 'About', path: '/about', id: '03' },
    { name: 'Contact', path: '/contact', id: '04' }
  ];

  useEffect(() => {
    setIsOpen(false);
    setScrollRotation(0);
  }, [location]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isOpen) return;
      // Precision rotation logic for a tighter orbital feel
      setScrollRotation(prev => prev + e.deltaY * 0.15);
    };

    if (isOpen) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      document.body.style.overflow = 'hidden';
    } else {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-6 md:px-16 md:py-10 flex justify-between items-center z-[100] transition-all">
        <Link to="/" className="text-xl font-bold tracking-tighter uppercase text-white font-mono flex items-center gap-3 group">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse group-hover:scale-150 transition-transform"></span>
          Portfolio.os
        </Link>
        
        <div className="flex items-center gap-6">
          {!isOpen && (
            <div className="hidden md:flex flex-col items-end animate-fade-in-right">
              <span className="font-mono text-[8px] uppercase tracking-[0.6em] text-white/20 font-bold mb-1">RADIAL_CORE</span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 font-black">DIRECTORY_LINK</span>
                <span className="text-white/40 text-[10px] animate-[pulse_2s_infinite]">●</span>
              </div>
            </div>
          )}

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`group relative w-12 h-12 flex flex-col justify-center items-end gap-1.5 focus:outline-none glass p-3.5 rounded-sm transition-all duration-300 ${isOpen ? 'bg-white text-black border-transparent' : 'hover:border-white/60 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] shadow-xl'}`}
          >
            <span className={`h-0.5 transition-all duration-500 ${isOpen ? 'bg-black w-6 rotate-45 translate-y-1' : 'bg-white w-6 group-hover:w-4'}`}></span>
            <span className={`h-0.5 transition-all duration-500 ${isOpen ? 'opacity-0' : 'bg-white w-4 group-hover:w-6'}`}></span>
            <span className={`h-0.5 transition-all duration-500 ${isOpen ? 'bg-black w-6 -rotate-45 -translate-y-1' : 'bg-white w-2 group-hover:w-6'}`}></span>
            
            {!isOpen && (
              <span className="absolute inset-0 rounded-sm border border-white/20 animate-ping opacity-20 pointer-events-none scale-125"></span>
            )}
          </button>
        </div>
      </nav>

      {/* Full-screen Radial Navigation */}
      <div className={`fixed inset-0 bg-brand-dark/98 backdrop-blur-3xl z-[95] flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16, 1, 0.3, 1)] overflow-hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* Central Core Indicator (Single Center Point) */}
        <div className={`absolute w-32 h-32 border border-white/5 rounded-full flex items-center justify-center transition-all duration-1000 ${isOpen ? 'scale-100 opacity-20' : 'scale-0 opacity-0'}`}>
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="absolute inset-0 border border-white/10 rounded-full animate-[ping_4s_infinite]"></div>
          <div className="absolute -top-10 font-mono text-[8px] uppercase tracking-[0.5em] text-white/40">RADIAL_CENTER</div>
          <div className="absolute inset-[-30px] border border-white/5 rounded-full border-dashed animate-[spin_15s_linear_infinite]"></div>
        </div>

        {/* 3D Circular Container with Smaller Radius */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[2500px]">
          <div 
            className="relative w-full flex flex-col items-center justify-center transition-transform duration-700 ease-out"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `rotateX(${scrollRotation}deg)`
            }}
          >
            {menuItems.map((item, idx) => {
              const angleStep = 360 / menuItems.length;
              const angle = idx * angleStep;
              // Radius is reduced to create a tighter circle around the center point
              const radius = 240; 
              
              return (
                <div
                  key={`${item.name}-${idx}`}
                  className="absolute transition-all duration-700"
                  style={{
                    // Circular path with the new smaller radius
                    transform: `rotateX(${-angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <Link
                    to={item.path}
                    className="group flex flex-col items-center justify-center py-10"
                  >
                    <div className="flex flex-col items-center opacity-20 group-hover:opacity-100 transition-all duration-500 mb-4">
                      <span className="font-mono text-white text-[9px] font-bold uppercase tracking-[0.6em] leading-none mb-1">NODE</span>
                      <span className="font-mono text-white text-xl font-black leading-none">{item.id}</span>
                    </div>
                    
                    <span className="text-5xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-white/20 group-hover:text-white transition-all duration-700 group-hover:italic transform group-hover:scale-110">
                      {item.name}
                    </span>

                    <div className="w-16 h-[1px] bg-white/10 group-hover:bg-white/40 mt-8 transition-all duration-700 scale-x-0 group-hover:scale-x-100 origin-center"></div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Metadata Details */}
        <div className={`absolute inset-x-0 bottom-12 px-12 md:px-24 flex justify-between items-end pointer-events-none transition-all duration-1000 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col gap-3 font-mono text-[9px] text-zinc-800 uppercase tracking-[0.6em]">
            <span>RADIUS_COMPACT: 240px</span>
            <span>ROTATION_VAL: {(scrollRotation % 360).toFixed(2)}°</span>
          </div>
          
          <div className="flex flex-col items-center gap-4">
             <span className="font-mono text-[9px] uppercase tracking-[1em] text-white/20">Scroll_Orbit</span>
             <div className="w-[1px] h-10 bg-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-white/40 animate-[scrollLine_2s_infinite]"></div>
             </div>
          </div>

          <div className="flex flex-col items-end gap-3 font-mono text-[9px] text-zinc-800 uppercase tracking-[0.6em]">
            <span>STABILITY: SECURE</span>
            <span>LND_V.03</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;
