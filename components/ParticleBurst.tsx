import React, { useEffect, useRef } from 'react';

interface ParticleBurstProps {
  canvasBg: string;
  particleCount: number;
  magnetRadius: number;
  ringRadius: number;
  waveSpeed: number;
  waveAmplitude: number;
  particleSize: number;
  lerpSpeed: number;
  color: string;
  autoAnimate: boolean;
  particleVariance: number;
  rotationSpeed: number;
  depthFactor: number;
  pulseSpeed: number;
  particleShape: 'capsule' | 'circle' | 'square';
  fieldStrength: number;
}

export const ParticleBurst: React.FC<ParticleBurstProps> = ({
  canvasBg, particleCount, magnetRadius, ringRadius, waveSpeed, waveAmplitude,
  particleSize, lerpSpeed, color, autoAnimate, particleVariance, rotationSpeed,
  depthFactor, pulseSpeed, particleShape, fieldStrength
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animationId: number;
    const initParticles = () => {
      const arr = []; const voidRad = ringRadius * 12;
      for (let i = 0; i < particleCount; i++) { const angle = (i/particleCount)*Math.PI*2 + Math.random()*0.1; arr.push({ angle, dist: voidRad + Math.random()*Math.max(canvas.width,canvas.height)*0.5, speed: 0.8+Math.random()*2, opacity: 0.15+Math.random()*0.8, variance: 0.5+Math.random()*particleVariance, sizeOffset: Math.random()*1.5 }); }
      particlesRef.current = arr;
    };
    const resize = () => { canvas.width = canvas.parentElement?.clientWidth||window.innerWidth; canvas.height = canvas.parentElement?.clientHeight||window.innerHeight; initParticles(); };
    resize(); window.addEventListener('resize', resize);
    const onMouseMove = (e: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX-rect.left, y: e.clientY-rect.top }; };
    window.addEventListener('mousemove', onMouseMove);
    let tick = 0;
    const render = () => {
      tick++; ctx.fillStyle = canvasBg; ctx.fillRect(0,0,canvas.width,canvas.height);
      const cx = canvas.width/2; const cy = canvas.height/2; const mx = mouseRef.current.x; const my = mouseRef.current.y; const voidRad = ringRadius*12;
      particlesRef.current.forEach(p => {
        if (autoAnimate) { p.angle += rotationSpeed*0.003; p.dist += p.speed*waveSpeed*2.5; if (p.dist > Math.max(canvas.width,canvas.height)*0.8) p.dist = voidRad+Math.random()*20; }
        const pulse = 1 + Math.sin(tick*pulseSpeed*0.02)*0.15; const currentSize = (particleSize+p.sizeOffset)*pulse*p.variance;
        let px = cx + Math.cos(p.angle)*p.dist*depthFactor; let py = cy + Math.sin(p.angle)*p.dist*depthFactor;
        const distFromCenter = Math.sqrt((px-cx)**2+(py-cy)**2); if (distFromCenter < voidRad) return;
        if (waveAmplitude > 0) { const wave = Math.sin(p.dist*0.03-tick*0.06)*waveAmplitude*8; px += Math.cos(p.angle+Math.PI/2)*wave; py += Math.sin(p.angle+Math.PI/2)*wave; }
        const dx = px-mx; const dy = py-my; const d = Math.sqrt(dx*dx+dy*dy);
        if (d < magnetRadius*15 && d > 0) { const force = (1-d/(magnetRadius*15))*fieldStrength; px -= (dx/d)*force*lerpSpeed*12; py -= (dy/d)*force*lerpSpeed*12; }
        ctx.fillStyle = color; const fadePct = Math.max(0, 1-(p.dist/(Math.max(canvas.width,canvas.height)*0.7))); ctx.globalAlpha = p.opacity*fadePct;
        if (particleShape === 'capsule') {
          ctx.save(); ctx.translate(px,py); ctx.rotate(Math.atan2(py-cy,px-cx)); ctx.beginPath();
          const stretch = 1+(p.dist/voidRad)*0.25; const w = currentSize*5*stretch; const h = currentSize;
          ctx.roundRect(-w/2,-h/2,w,h,h/2); ctx.fill(); ctx.restore();
        } else if (particleShape === 'square') { ctx.fillRect(px-currentSize/2,py-currentSize/2,currentSize,currentSize); }
        else { ctx.beginPath(); ctx.arc(px,py,currentSize,0,Math.PI*2); ctx.fill(); }
      });
      ctx.globalAlpha = 1; animationId = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize',resize); window.removeEventListener('mousemove',onMouseMove); };
  }, [canvasBg, particleCount, magnetRadius, ringRadius, waveSpeed, waveAmplitude, particleSize, lerpSpeed, color, autoAnimate, particleVariance, rotationSpeed, depthFactor, pulseSpeed, particleShape, fieldStrength]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

export default ParticleBurst;
