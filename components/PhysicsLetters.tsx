
import React, { useEffect, useRef } from 'react';

const PhysicsLetters: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    const letters: Letter[] = [];
    const text = "#PORTFOLIO.";
    
    // Physics constants for slow, graceful movement
    const gravity = 0.12; // Reduced from 0.5 for much slower descent
    const friction = 0.98; // Increased friction (air resistance)
    const bounce = 0.12; 
    const subSteps = 10; // Higher precision for slow motion

    class Letter {
      char: string;
      x: number; y: number;
      vx: number; vy: number;
      angle: number; va: number;
      isSettled: boolean = false;
      fontSize: number = 240; // Slightly adjusted for better fit
      radius: number = 95;   // Collision radius

      constructor(char: string, index: number) {
        this.char = char;
        const spacing = 160;
        const startX = (window.innerWidth / 2 - (text.length * spacing / 2)) + index * spacing;
        this.x = startX + (Math.random() - 0.5) * 60;
        // Start higher up so they drift in slowly
        this.y = -500 - (index * 350); 
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = 0;
        this.angle = (Math.random() - 0.5) * 0.8;
        this.va = (Math.random() - 0.5) * 0.04;
      }

      update(others: Letter[], dt: number) {
        if (this.isSettled) return;

        // Apply forces with time scaling
        this.vy += gravity * dt;
        
        // Air resistance
        this.vx *= Math.pow(friction, dt);
        this.vy *= Math.pow(friction, dt);
        this.va *= Math.pow(friction, dt);

        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.angle += this.va * dt;

        const ground = height - 100;
        
        // Ground collision
        if (this.y + this.radius > ground) {
          this.y = ground - this.radius;
          this.vy *= -bounce;
          this.vx *= 0.8;
          this.va *= 0.7;
          // Friction with floor helps stop rotation
          this.va += (0 - this.angle) * 0.01;
        }

        // Letter-to-letter collision
        for (const other of others) {
          if (other === this) continue;
          
          const dx = this.x - other.x;
          const dy = this.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = this.radius + other.radius - 35; 

          if (dist < minDist) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;
            
            // Separation
            const ratio = other.isSettled ? 1.0 : 0.5;
            this.x += nx * overlap * ratio;
            this.y += ny * overlap * ratio;
            if (!other.isSettled) {
              other.x -= nx * overlap * (1 - ratio);
              other.y -= ny * overlap * (1 - ratio);
            }
            
            // Basic impulse response
            const rvx = this.vx - other.vx;
            const rvy = this.vy - other.vy;
            const velAlongNormal = rvx * nx + rvy * ny;
            
            if (velAlongNormal < 0) {
                const impulse = -1.2 * velAlongNormal;
                this.vx += impulse * nx * ratio;
                this.vy += impulse * ny * ratio;
                if (!other.isSettled) {
                    other.vx -= impulse * nx * (1 - ratio);
                    other.vy -= impulse * ny * (1 - ratio);
                }
            }
          }
        }

        // Wall bounds
        const margin = 100;
        if (this.x < margin) { this.x = margin; this.vx *= -bounce; }
        if (this.x > width - margin) { this.x = width - margin; this.vx *= -bounce; }

        // Settle thresholds (stricter for slower movement)
        if (Math.abs(this.vy) < 0.05 && Math.abs(this.vx) < 0.05 && Math.abs(this.va) < 0.005) {
            if (this.y > height - 400) {
               this.isSettled = true;
               this.vx = 0;
               this.vy = 0;
               this.va = 0;
            }
        }
      }

      draw(context: CanvasRenderingContext2D, isScanner: boolean) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);

        // Apply magnification (1.1x) if it's the scanner view
        const currentFontSize = isScanner ? this.fontSize * 1.1 : this.fontSize;
        context.font = `900 ${currentFontSize}px Inter`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        if (isScanner) {
          // Scanner Overlay Style (Holographic White)
          context.fillStyle = '#FFFFFF';
          context.shadowColor = 'rgba(255,255,255,0.9)';
          context.shadowBlur = 40;
          context.fillText(this.char, 0, 0);
          context.strokeStyle = 'rgba(0,0,0,0.6)';
          context.lineWidth = 1;
          context.strokeText(this.char, 0, 0);
        } else {
          // Base shadow for depth
          context.fillStyle = 'rgba(0,0,0,0.8)';
          context.fillText(this.char, 12, 12);

          // Metallic Mirror Gradient
          const grad = context.createLinearGradient(-100, -100, 100, 100);
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.3, '#777777');
          grad.addColorStop(0.5, '#050505');
          grad.addColorStop(0.7, '#999999');
          grad.addColorStop(1, '#FFFFFF');
          
          context.fillStyle = grad;
          context.shadowColor = 'rgba(0,0,0,0.5)';
          context.shadowBlur = 20;
          context.fillText(this.char, 0, 0);

          // Polished outline
          context.strokeStyle = 'rgba(255,255,255,0.4)';
          context.lineWidth = 2;
          context.strokeText(this.char, 0, 0);
        }

        context.restore();
      }
    }

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      letters.length = 0;
      text.split('').forEach((char, i) => {
        letters.push(new Letter(char, i));
      });
    };

    const loop = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Perform multiple sub-steps for physics stability and smooth slow motion
      for (let i = 0; i < subSteps; i++) {
        letters.forEach(l => l.update(letters, 1 / subSteps));
      }

      // Draw main metallic layer
      letters.forEach(l => l.draw(ctx, false));

      // Scanner Interaction Box - Enlarged by 0.1x (from 240x170 to 264x187)
      const scanW = 264;
      const scanH = 187;
      const scanX = mouseRef.current.x - scanW / 2;
      const scanY = mouseRef.current.y - scanH / 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(scanX, scanY, scanW, scanH);
      ctx.clip();
      ctx.fillStyle = '#080808';
      ctx.fillRect(scanX, scanY, scanW, scanH);
      
      // Technical Grid inside scanner
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (let x = scanX % 40; x < width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, scanY); ctx.lineTo(x, scanY + scanH); ctx.stroke();
      }
      for (let y = scanY % 40; y < height; y += 40) {
        ctx.beginPath(); ctx.moveTo(scanX, y); ctx.lineTo(scanX + scanW, y); ctx.stroke();
      }

      letters.forEach(l => l.draw(ctx, true));
      ctx.restore();

      // Scanner Frame and Label
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(scanX, scanY, scanW, scanH);
      
      // Right side label for scanner
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 11px JetBrains Mono';
      ctx.textAlign = 'left';
      ctx.fillText('Three-Dimensional Design', scanX + scanW + 15, scanY + scanH / 2);
      
      // Connection line to label
      ctx.beginPath();
      ctx.moveTo(scanX + scanW, scanY + scanH / 2);
      ctx.lineTo(scanX + scanW + 10, scanY + scanH / 2);
      ctx.stroke();

      // Corner markers for aesthetic
      const markerSize = 8; 
      ctx.beginPath();
      ctx.moveTo(scanX, scanY + markerSize); ctx.lineTo(scanX, scanY); ctx.lineTo(scanX + markerSize, scanY);
      ctx.moveTo(scanX + scanW - markerSize, scanY); ctx.lineTo(scanX + scanW, scanY); ctx.lineTo(scanX + scanW, scanY + markerSize);
      ctx.stroke();

      requestAnimationFrame(loop);
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    });

    init();
    loop();

    return () => {
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default PhysicsLetters;
