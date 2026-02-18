
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

// 环状条带组件：更显眼的白色发光条带，紧贴圆柱表面
const SurfaceBand: React.FC<{ y: number; radius: number; isHidden?: boolean }> = ({ y, radius, isHidden }) => {
  const segmentCount = 12; 
  const angleStep = 360 / segmentCount;
  const segments = Array.from({ length: segmentCount });

  return (
    <div 
      className={`absolute pointer-events-none transition-opacity duration-700 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
      style={{
        transform: `translateY(${y}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {segments.map((_, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center overflow-hidden border-t border-b border-white/60 bg-white/20 backdrop-blur-md shadow-[0_0_25px_rgba(255,255,255,0.1)]"
          style={{
            width: `${(2 * Math.PI * radius) / segmentCount + 3}px`, 
            height: '32px',
            transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="whitespace-nowrap font-mono text-[8px] text-white/60 uppercase tracking-[0.4em] font-black animate-marquee">
            SYSTEM_INTEGRITY_CHECK // SECTOR_ACTIVE // DATA_FLOW_SYNC // ARCHIVE_STABILITY_MAX //&nbsp;
          </div>
        </div>
      ))}
    </div>
  );
};

const Work: React.FC = () => {
  const [rotations, setRotations] = useState({ x: -15, y: 0, z: 0 });
  const [zoomScale, setZoomScale] = useState(1.0);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [expandedTierIndex, setExpandedTierIndex] = useState<number | null>(null);
  const [isMouseInCenter, setIsMouseInCenter] = useState(true);
  
  const startMousePos = useRef({ x: 0, y: 0 });
  const currentRotationsRef = useRef({ x: -15, y: 0, z: 0 });

  const themeMetadata = [
    { en: 'Music Visualization', zh: '音乐可视化' },
    { en: 'Virtual Reality', zh: '虚拟现实' },
    { en: 'Motion Video', zh: '动态视频' },
    { en: 'Theme and Image Design', zh: '主题与形象设计' },
    { en: 'AIGC Design and Practice Project', zh: 'AIGC设计与实践项目' }
  ];

  const tieredProjects = useMemo(() => {
    return themeMetadata.map(meta => ({
      ...meta,
      projects: PROJECTS.filter(p => p.theme === meta.en)
    }));
  }, []);

  const radius = 480; 
  const cylinderHeight = 1800; // Increased to accommodate 5 tiers
  const tierCount = themeMetadata.length;
  const tierSpacing = cylinderHeight / (tierCount - 1); 

  const separatorPositions = useMemo(() => {
    return Array.from({ length: tierCount - 1 }).map((_, i) => 
      - (cylinderHeight / 2) + (tierSpacing * (i + 0.5))
    );
  }, [tierSpacing, tierCount, cylinderHeight]);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleMouseMove = (e: MouseEvent) => {
      const centerWidth = window.innerWidth * 0.6;
      const leftBound = (window.innerWidth - centerWidth) / 2;
      const rightBound = window.innerWidth - leftBound;
      setIsMouseInCenter(e.clientX >= leftBound && e.clientX <= rightBound);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const centerWidth = window.innerWidth * 0.6;
      const leftBound = (window.innerWidth - centerWidth) / 2;
      const rightBound = window.innerWidth - leftBound;
      const isInCenter = e.clientX >= leftBound && e.clientX <= rightBound;

      if (isInCenter) {
        setZoomScale(prev => {
          const delta = -e.deltaY * 0.001;
          const next = prev + delta;
          return Math.min(Math.max(next, 0.3), 2.5);
        });
      } else {
        setVerticalOffset(prev => prev - e.deltaY * 0.8);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startMousePos.current = { x: clientX, y: clientY };
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - startMousePos.current.x;
      const deltaY = clientY - startMousePos.current.y;
      
      const sensitivity = 0.4;
      currentRotationsRef.current = {
        x: currentRotationsRef.current.x - deltaY * sensitivity * 0.5,
        y: currentRotationsRef.current.y + deltaX * sensitivity,
        z: currentRotationsRef.current.z + (deltaX * 0.03)
      };

      setRotations({ ...currentRotationsRef.current });
      startMousePos.current = { x: clientX, y: clientY };
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleGlobalMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleGlobalMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleTierClick = (index: number) => {
    setExpandedTierIndex(expandedTierIndex === index ? null : index);
  };

  return (
    <div className="h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center relative">
      {/* 状态显示 */}
      <header className="absolute top-0 left-0 w-full px-10 md:px-20 z-[100] pt-16 md:pt-24 pointer-events-none">
        <div className="flex items-center gap-6 mb-8">
          <span className="w-12 h-[1px] bg-white/20"></span>
          <span className="font-mono text-xs uppercase text-white/40 tracking-[0.5em] font-bold">
            CYLINDER_VAULT_v11.0 // {isMouseInCenter ? 'ZOOM_MODE' : 'NAV_MODE'}
          </span>
        </div>
      </header>

      {/* 核心 3D 场景 */}
      <div 
        id="helical-scene"
        className={`relative w-full h-full cursor-grab active:cursor-grabbing perspective-[3000px] flex items-center justify-center select-none transition-all duration-300 ${isMouseInCenter ? '' : 'bg-white/[0.01]'}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotations.x}deg) rotateY(${rotations.y}deg) rotateZ(${rotations.z}deg) scale3d(${zoomScale}, ${zoomScale}, ${zoomScale})`
          }}
        >
          {/* 垂直位移包裹层 */}
          <div 
            className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `translateY(${verticalOffset}px)`
            }}
          >
            {/* 中心核心轴 */}
            <div 
              className="absolute w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"
              style={{ 
                height: `${cylinderHeight * 2.5}px`,
                boxShadow: '0 0 20px rgba(255,255,255,0.1)'
              }}
            ></div>

            {/* 环状发光条带 */}
            {separatorPositions.map((y, idx) => (
              <SurfaceBand 
                key={`band-${idx}`} 
                y={y} 
                radius={radius + 8} 
                isHidden={expandedTierIndex !== null}
              />
            ))}

            {/* 结构环 */}
            {separatorPositions.map((y, idx) => {
              const ringSize = radius * 2 + 180;
              return (
                <div 
                  key={`separator-${idx}`}
                  className={`absolute pointer-events-none flex items-center justify-center transition-opacity duration-700 ${expandedTierIndex !== null ? 'opacity-0' : 'opacity-100'}`}
                  style={{
                    width: `${ringSize}px`,
                    height: `${ringSize}px`,
                    transform: `translateY(${y}px) rotateX(90deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="absolute inset-0 border border-white/5 rounded-full"></div>
                  <div className="absolute inset-4 border border-dashed border-white/5 rounded-full animate-[spin_60s_linear_infinite_reverse]"></div>
                </div>
              );
            })}

            {/* 分层项目内容 */}
            {tieredProjects.map((group, tierIdx) => {
              const isExpanded = expandedTierIndex === tierIdx;
              const yPos = - (cylinderHeight / 2) + (tierIdx * tierSpacing);
              const projects = group.projects;
              const projectCount = projects.length;
              
              return (
                <React.Fragment key={`tier-${tierIdx}`}>
                  {/* 3D 主题标题节点 */}
                  <div 
                    className={`absolute z-[200] flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isExpanded ? 'cursor-pointer' : 'cursor-pointer pointer-events-auto'}`}
                    style={{
                      transform: isExpanded 
                        ? `rotateY(0deg) translateZ(${radius + 400}px) translateY(${yPos}px)`
                        : `rotateY(0deg) translateZ(${radius}px) translateY(${yPos}px)`,
                      backfaceVisibility: 'hidden',
                      transformStyle: 'preserve-3d',
                      opacity: expandedTierIndex !== null && !isExpanded ? 0.1 : 1,
                    }}
                    onClick={() => handleTierClick(tierIdx)}
                  >
                     <div className="flex flex-col items-center text-center group">
                        <div className={`w-1.5 h-1.5 mb-4 shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-500 ${isExpanded ? 'bg-white scale-[2]' : 'bg-white group-hover:scale-[2]'}`}></div>
                        <div className="font-mono text-[9px] text-white/30 tracking-[0.8em] uppercase mb-2">LAYER_0{tierIdx + 1}</div>
                        <h2 className={`text-2xl md:text-3xl font-black text-white uppercase tracking-tighter whitespace-nowrap mb-1 transition-all duration-500 ${isExpanded ? 'scale-110 tracking-widest' : 'group-hover:tracking-widest'}`}>
                          {group.en}
                        </h2>
                        <p className="font-sans text-[10px] text-zinc-600 font-bold tracking-[0.5em] uppercase">
                          {group.zh}
                        </p>
                        <div className={`mt-4 font-mono text-[8px] uppercase tracking-[0.4em] transition-all duration-500 ${isExpanded ? 'text-white' : 'text-white/0 group-hover:text-white/40'}`}>
                          {isExpanded ? '[ CLICK TO COLLAPSE ]' : '[ CLICK TO EXPAND ]'}
                        </div>
                     </div>
                  </div>

                  {/* 项目卡片 */}
                  {projects.map((project, i) => {
                    const angleStep = 360 / (projectCount + 1);
                    const angle = (i + 1) * angleStep;
                    const cardWidth = 380;
                    const spacing = 40;
                    const expandedX = (i - (projectCount - 1) / 2) * (cardWidth + spacing);
                    const cardTransform = isExpanded
                      ? `translateX(${expandedX}px) translateY(${yPos}px) translateZ(${radius + 150}px) rotateY(0deg)`
                      : `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yPos}px)`;

                    return (
                      <div 
                        key={`${project.id}-${i}`}
                        className={`absolute w-[280px] md:w-[380px] aspect-[16/10] group transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]`}
                        style={{
                          transform: cardTransform,
                          backfaceVisibility: 'hidden',
                          transformStyle: 'preserve-3d',
                          opacity: expandedTierIndex !== null && !isExpanded ? 0 : 1,
                          pointerEvents: expandedTierIndex !== null && !isExpanded ? 'none' : 'auto',
                        }}
                      >
                        <div className="relative w-full h-full overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,1)] transition-all duration-700 group-hover:scale-105 group-hover:z-50 border border-white/5">
                          <Link 
                            to={`/work/${project.id}`}
                            onMouseDown={(e) => startMousePos.current = { x: e.clientX, y: e.clientY }}
                            onClick={(e) => {
                                if (Math.abs(startMousePos.current.x - e.clientX) > 10) e.preventDefault();
                            }}
                            className="block w-full h-full relative"
                          >
                            <img 
                              src={project.thumbnail} 
                              alt={project.title} 
                              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                            <div className="absolute bottom-6 left-6 right-6 pointer-events-none translate-z-10">
                              <div className="flex items-center gap-2 mb-2 opacity-40 group-hover:opacity-100">
                                <span className="font-mono text-[7px] text-white uppercase tracking-[0.4em]">NODE_{i + 1}</span>
                                <div className="h-[1px] w-4 bg-white/20"></div>
                                <span className="font-mono text-[7px] text-white uppercase tracking-[0.4em] truncate">{project.type}</span>
                              </div>
                              <h3 className="text-white text-lg font-black uppercase tracking-tighter leading-tight mb-1 group-hover:translate-x-2 transition-transform">
                                {project.title}
                              </h3>
                              {project.chineseTitle && (
                                <p className="text-zinc-600 text-[8px] font-bold tracking-widest uppercase truncate">
                                  {project.chineseTitle}
                                </p>
                              )}
                            </div>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* 底部 HUD */}
      <div className="absolute bottom-12 left-10 z-[100] flex flex-col gap-6">
         <div className="flex gap-2">
            {['ARCHIVE', 'SYSTEM', 'SCROLL_CONTROL'].map(label => (
              <button 
                key={label}
                className={`bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 font-mono text-[9px] uppercase tracking-[0.3em] font-black transition-all hover:bg-white hover:text-black ${label === 'SCROLL_CONTROL' ? 'bg-white text-black' : 'text-zinc-800'}`}
              >
                {label}
              </button>
            ))}
         </div>
         <div className="font-mono text-[9px] text-white/20 tracking-[0.5em] uppercase">
            {isMouseInCenter ? 'WHEEL: ZOOM_LEVEL_SYNC' : 'WHEEL: Y_AXIS_POSITIONING'}
         </div>
      </div>

      <style>{`
        .perspective-3000 {
          perspective: 3000px;
        }
        .translate-z-10 {
            transform: translateZ(10px);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Work;
