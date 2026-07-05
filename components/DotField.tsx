import React, { useEffect, useRef } from 'react';

interface DotFieldProps {
  canvasBg: string;
  dotRadius: number;
  dotSpacing: number;
  cursorRadius: number;
  cursorForce: number;
  bulgeOnly: boolean;
  bulgeStrength: number;
  glowRadius: number;
  sparkle: boolean;
  waveAmplitude: number;
  glowColor: string;
}

export const DotField: React.FC<DotFieldProps> = ({
  canvasBg, dotRadius, dotSpacing, cursorRadius, cursorForce,
  bulgeOnly, bulgeStrength, glowRadius, sparkle, waveAmplitude, glowColor
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animationId: number;
    const resize = () => { canvas.width = canvas.parentElement?.clientWidth || window.innerWidth; canvas.height = canvas.parentElement?.clientHeight || window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const onMouseMove = (e: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }; };
    window.addEventListener('mousemove', onMouseMove);
    let tick = 0;
    const render = () => {
      tick++;
      ctx.fillStyle = canvasBg; ctx.fillRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x; const my = mouseRef.current.y;
      if (mx > -500) { const grad = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius); grad.addColorStop(0, glowColor + '40'); grad.addColorStop(1, 'transparent'); ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      const cols = Math.ceil(canvas.width / dotSpacing) + 2; const rows = Math.ceil(canvas.height / dotSpacing) + 2;
      for (let c = 0; c < cols; c++) { for (let r = 0; r < rows; r++) {
        const origX = c * dotSpacing; let origY = r * dotSpacing;
        if (waveAmplitude > 0) origY += Math.sin(origX * 0.015 + tick * 0.05) * waveAmplitude;
        let drawX = origX; let drawY = origY;
        const dx = origX - mx; const dy = origY - my; const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < cursorRadius && dist > 0) { const force = Math.pow(1 - dist/cursorRadius, 2) * cursorForce * bulgeStrength; if (bulgeOnly) { drawX -= (dx/dist)*force*1.5; drawY -= (dy/dist)*force*1.5; } else { drawX += (dx/dist)*force; drawY += (dy/dist)*force; } }
        let opacity = 0.18; if (dist < cursorRadius) opacity = 0.18 + (1 - dist/cursorRadius)*0.65;
        let radius = dotRadius; if (sparkle && Math.random() > 0.996) { radius *= 2.5; opacity = 1; }
        ctx.fillStyle = `rgba(180,160,255,${opacity})`; ctx.beginPath(); ctx.arc(drawX, drawY, radius, 0, Math.PI*2); ctx.fill();
      }}
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMouseMove); };
  }, [canvasBg, dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, glowRadius, sparkle, waveAmplitude, glowColor]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

export default DotField;
