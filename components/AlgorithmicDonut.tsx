
import React, { useEffect, useRef } from 'react';

const AlgorithmicDonut: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width: number, height: number;
    let particles: Particle[] = [];
    const PARTICLE_COUNT = 4500;
    const R = 180; // Torus major radius
    const r = 85;  // Torus minor radius
    const perspective = 650;

    class Particle {
      x: number; y: number; z: number; // Target pos
      cx: number; cy: number; cz: number; // Current pos
      vx: number; vy: number; vz: number; // Velocity
      phi: number; theta: number;
      size: number;

      constructor(phi: number, theta: number) {
        this.phi = phi;
        this.theta = theta;
        this.size = Math.random() * 1.5 + 0.5;
        
        this.x = (R + r * Math.cos(theta)) * Math.cos(phi);
        this.y = (R + r * Math.cos(theta)) * Math.sin(phi);
        this.z = r * Math.sin(theta);

        this.cx = this.x + (Math.random() - 0.5) * 800;
        this.cy = this.y + (Math.random() - 0.5) * 800;
        this.cz = this.z + (Math.random() - 0.5) * 800;

        this.vx = 0; this.vy = 0; this.vz = 0;
      }

      update(angleX: number, angleY: number) {
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);

        let tx = this.x * cosY - this.z * sinY;
        let tz = this.x * sinY + this.z * cosY;
        let ty = this.y * cosX - tz * sinX;
        tz = this.y * sinX + tz * cosX;

        const spring = 0.035;
        const friction = 0.89;
        
        this.vx += (tx - this.cx) * spring;
        this.vy += (ty - this.cy) * spring;
        this.vz += (tz - this.cz) * spring;

        const scale = perspective / (perspective + this.cz);
        const projX = this.cx * scale + width / 2;
        const projY = this.cy * scale + height / 2;

        const dx = mouseRef.current.x - projX;
        const dy = mouseRef.current.y - projY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (150 - dist) / 150;
          const push = 24 * force;
          this.vx -= (dx / dist) * push;
          this.vy -= (dy / dist) * push;
          this.vz -= push * 0.4;
        }

        this.vx *= friction;
        this.vy *= friction;
        this.vz *= friction;

        this.cx += this.vx;
        this.cy += this.vy;
        this.cz += this.vz;
      }

      draw(ctx: CanvasRenderingContext2D, opacity: number) {
        const scale = perspective / (perspective + this.cz);
        const x = this.cx * scale + width / 2;
        const y = this.cy * scale + height / 2;

        const alpha = Math.max(0, (scale * 0.85) * opacity);
        if (alpha < 0.05) return;

        // Pure white particles with varying opacity
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(x, y, this.size * scale, this.size * scale);
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI * 2;
        particles.push(new Particle(phi, theta));
      }
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    let angleX = 0;
    let angleY = 0;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      angleX += 0.002;
      angleY += 0.004;
      const opacity = Math.max(0, 1 - scrollRef.current / (height * 0.8));

      if (opacity > 0.01) {
        particles.sort((a, b) => b.cz - a.cz);
        particles.forEach(p => {
          p.update(angleX, angleY);
          p.draw(ctx, opacity);
        });
      }
      requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    const handleScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', handleScroll);

    const handlePointer = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      mouseRef.current = { x: clientX, y: clientY, active: true };
    };

    window.addEventListener('mousemove', handlePointer);
    window.addEventListener('touchstart', handlePointer, { passive: true });
    window.addEventListener('touchmove', handlePointer, { passive: true });

    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handlePointer);
      window.removeEventListener('touchstart', handlePointer);
      window.removeEventListener('touchmove', handlePointer);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default AlgorithmicDonut;
