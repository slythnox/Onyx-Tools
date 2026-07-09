import { useEffect, useRef } from 'react';
import './FloatingLines.css';

type WavePosition = {
  x: number;
  y: number;
  rotate: number;
};

type FloatingLinesProps = {
  linesGradient?: string[];
  enabledWaves?: Array<'top' | 'middle' | 'bottom'>;
  lineCount?: number | number[];
  lineDistance?: number | number[];
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
};

function hexToRgb(hex: string): [number, number, number] {
  let value = hex.trim().replace('#', '');
  if (value.length === 3) {
    value = value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
  }
  const r = parseInt(value.slice(0, 2), 16) || 0;
  const g = parseInt(value.slice(2, 4), 16) || 0;
  const b = parseInt(value.slice(4, 6), 16) || 0;
  return [r, g, b];
}

function lerpColor(
  c1: [number, number, number],
  c2: [number, number, number],
  t: number
): string {
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
  return `rgb(${r},${g},${b})`;
}

function getGradientColor(colors: [number, number, number][], t: number): string {
  if (colors.length === 0) return 'rgb(233,71,245)';
  if (colors.length === 1) return `rgb(${colors[0][0]},${colors[0][1]},${colors[0][2]})`;
  const scaled = Math.max(0, Math.min(0.9999, t)) * (colors.length - 1);
  const idx = Math.floor(scaled);
  const f = scaled - idx;
  return lerpColor(colors[idx], colors[Math.min(idx + 1, colors.length - 1)], f);
}

export default function FloatingLines({
  linesGradient,
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = [6],
  lineDistance = [5],
  topWavePosition,
  middleWavePosition,
  bottomWavePosition = { x: 2.0, y: -0.7, rotate: -1 },
  animationSpeed = 1,
  interactive = true,
  bendRadius = 5.0,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode = 'normal'
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const smoothMouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const activeRef = useRef(true);

  const getLineCount = (waveType: 'top' | 'middle' | 'bottom'): number => {
    if (typeof lineCount === 'number') return lineCount;
    const index = enabledWaves.indexOf(waveType);
    if (index === -1) return 0;
    return lineCount[index] ?? 6;
  };

  const getLineDistance = (waveType: 'top' | 'middle' | 'bottom'): number => {
    if (typeof lineDistance === 'number') return lineDistance;
    const index = enabledWaves.indexOf(waveType);
    if (index === -1) return 5;
    return lineDistance[index] ?? 5;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    activeRef.current = true;

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d')!;

    let width = 0;
    let height = 0;

    const setSize = () => {
      width = container.clientWidth || 800;
      height = container.clientHeight || 600;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    // ResizeObserver
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        if (!activeRef.current) return;
        setSize();
      });
      ro.observe(container);
    }

    // Mouse tracking
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handlePointerLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    if (interactive) {
      canvas.addEventListener('pointermove', handlePointerMove);
      canvas.addEventListener('pointerleave', handlePointerLeave);
    }

    // Parse colors once
    const startTime = performance.now();

    const drawFrame = () => {
      if (!activeRef.current) return;

      const t = ((performance.now() - startTime) / 1000) * animationSpeed;

      // Smooth mouse
      const sm = smoothMouseRef.current;
      const tm = mouseRef.current;
      const damp = Math.max(0.01, Math.min(0.5, mouseDamping));
      if (tm.x > -1000) {
        sm.x += (tm.x - sm.x) * damp;
        sm.y += (tm.y - sm.y) * damp;
      } else {
        sm.x = -9999;
        sm.y = -9999;
      }

      // Parallax offset
      let pxOff = 0;
      let pyOff = 0;
      if (parallax && sm.x > -1000) {
        const cx = width / 2;
        const cy = height / 2;
        pxOff = ((sm.x - cx) / width) * parallaxStrength * 80;
        pyOff = ((sm.y - cy) / height) * parallaxStrength * 80;
      }

      // Parse gradient colors
      const parsedColors: [number, number, number][] = linesGradient && linesGradient.length > 0
        ? linesGradient.map(hexToRgb)
        : [[233, 71, 245], [47, 75, 162]];

      ctx.clearRect(0, 0, width, height);

      // Draw each wave group
      const groups: Array<{
        type: 'top' | 'middle' | 'bottom';
        yCenter: number;
        countMultiplier: number;
        waveFreq: number;
        waveAmp: number;
        distMult: number;
        rotateOff: number;
        posOff: WavePosition;
        alpha: number;
      }> = [
        {
          type: 'bottom',
          yCenter: height * 0.65,
          countMultiplier: 0.2,
          waveFreq: 1.0,
          waveAmp: 0.28,
          distMult: 1.0,
          rotateOff: (bottomWavePosition?.rotate ?? -1),
          posOff: bottomWavePosition ?? { x: 2, y: -0.7, rotate: -1 },
          alpha: 0.85
        },
        {
          type: 'middle',
          yCenter: height * 0.5,
          countMultiplier: 0.9,
          waveFreq: 0.85,
          waveAmp: 0.24,
          distMult: 1.2,
          rotateOff: (middleWavePosition?.rotate ?? 0.2),
          posOff: middleWavePosition ?? { x: 5, y: 0, rotate: 0.2 },
          alpha: 0.80
        },
        {
          type: 'top',
          yCenter: height * 0.35,
          countMultiplier: 0.1,
          waveFreq: 1.2,
          waveAmp: 0.20,
          distMult: 0.8,
          rotateOff: (topWavePosition?.rotate ?? -0.4),
          posOff: topWavePosition ?? { x: 10, y: 0.5, rotate: -0.4 },
          alpha: 0.65
        }
      ];

      for (const group of groups) {
        if (!enabledWaves.includes(group.type)) continue;

        const count = getLineCount(group.type);
        const dist = getLineDistance(group.type);
        if (count <= 0) continue;

        const lineSpacing = Math.max(10, (dist / 5) * (height * 0.04));
        const totalH = lineSpacing * (count - 1);
        const groupYStart = group.yCenter - totalH / 2 + pyOff * 0.5;

        for (let i = 0; i < count; i++) {
          const lineT = count > 1 ? i / (count - 1) : 0.5;
          const color = getGradientColor(parsedColors, lineT);

          const lineY = groupYStart + i * lineSpacing;
          const offset = (i * dist * 0.01 + (group.posOff?.x ?? 0) * 0.1) * 0.5;
          const freq = group.waveFreq * (1.0 + 0.2 * i);
          const amp = group.waveAmp * height * (0.8 + 0.2 * Math.sin(i + t * 0.3));
          const speed = t * 0.1 + offset;

          ctx.beginPath();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = color;
          ctx.globalAlpha = group.alpha * (0.7 + 0.3 * (i / Math.max(count - 1, 1)));

          // Mouse bend influence
          const hasMouse = sm.x > -1000 && interactive;

          for (let x = 0; x <= width; x += 2) {
            const nx = (x / width) * 2 - 1;
            const baseY = lineY + Math.sin(nx * freq * Math.PI + speed) * amp;

            let bendY = baseY;
            if (hasMouse) {
              const dx = x - sm.x;
              const dy = baseY - sm.y;
              const dist2 = dx * dx + dy * dy;
              const radius = bendRadius * bendRadius * 3000;
              const influence = Math.exp(-dist2 / radius);
              bendY += (sm.y - baseY) * influence * Math.abs(bendStrength) * Math.sign(-bendStrength) * 0.5;
            }

            if (x === 0) {
              ctx.moveTo(x + pxOff, bendY);
            } else {
              ctx.lineTo(x + pxOff, bendY);
            }
          }

          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      activeRef.current = false;
      cancelAnimationFrame(rafRef.current);
      if (ro) ro.disconnect();
      if (interactive) {
        canvas.removeEventListener('pointermove', handlePointerMove);
        canvas.removeEventListener('pointerleave', handlePointerLeave);
      }
      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
      canvasRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className="floating-lines-container"
      style={{ mixBlendMode }}
    />
  );
}
