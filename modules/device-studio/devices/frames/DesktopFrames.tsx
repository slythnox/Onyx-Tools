import React from 'react';
import { FrameProps } from '../../types';

function preserveAspect(fit: FrameProps['objectFit']) {
  if (fit === 'contain') return 'xMidYMid meet';
  if (fit === 'fill')    return 'none';
  return 'xMidYMid slice';
}

// ─── Studio Display ───────────────────────────────────────────────────────────
// frameW=1080, frameH=840  screen=(8,8,1064,598)
export function StudioDisplayFrame({ screenshot, color, uid, objectFit }: FrameProps) {
  const [sx, sy, sw, sh, sr] = [8, 8, 1064, 598, 8];
  const cid = `${uid}-c`;

  const isLight = color.id === 'white' || color.id === 'silver';
  const neckStop1 = isLight ? '#cbd5e1' : '#1e2022';
  const neckStop2 = isLight ? '#f8fafc' : '#3b3d42';
  const neckStop3 = isLight ? '#cbd5e1' : '#28292c';
  const neckStop4 = isLight ? '#94a3b8' : '#141517';

  const baseStop1 = isLight ? '#f8fafc' : '#323438';
  const baseStop2 = isLight ? '#cbd5e1' : '#1c1c1e';
  const edgeColor = isLight ? '#94a3b8' : '#0e0f10';

  return (
    <svg viewBox="0 0 1080 840" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}><rect x={sx} y={sy} width={sw} height={sh} rx={sr} /></clipPath>
        
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="614" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={color.accent} />
          <stop offset="100%" stopColor={color.frame} />
        </linearGradient>

        {/* Neck horizontal reflection gradient */}
        <linearGradient id={`${uid}-neck`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={neckStop1} />
          <stop offset="25%" stopColor={neckStop2} />
          <stop offset="65%" stopColor={neckStop3} />
          <stop offset="100%" stopColor={neckStop4} />
        </linearGradient>

        {/* Base top surface vertical gradient */}
        <linearGradient id={`${uid}-base`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={baseStop1} />
          <stop offset="100%" stopColor={baseStop2} />
        </linearGradient>
      </defs>

      {/* Monitor body */}
      <rect x="0" y="0" width="1080" height="614" rx="12" fill={`url(#${uid}-g)`} />
      <rect x="1" y="1" width="1078" height="612" rx="11" fill="none" stroke={color.accent} strokeWidth="1.5" strokeOpacity="0.5" />

      {/* Screen */}
      <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#000" />
      {screenshot ? (
        <image href={screenshot} x={sx} y={sy} width={sw} height={sh} clipPath={`url(#${cid})`} preserveAspectRatio={preserveAspect(objectFit)} />
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#0d0d0f" />
          <text x="540" y="303" fill="#2e2e36" fontSize="20" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui">Drop image here</text>
        </g>
      )}

      {/* Bottom chin */}
      <rect x="0" y="606" width="1080" height="8" rx="0" fill={color.frame} />
      <rect x="0" y="606" width="1080" height="8" rx="0" fill="rgba(0,0,0,0.15)" />

      {/* Camera */}
      <circle cx="540" cy="4.5" r="3" fill="#1a1a1a" />

      {/* ─── Apple-style Anodized Aluminum Stand (Tapered) ─── */}
      <g>
        {/* Floor Drop Shadow under stand base */}
        <path d="M 400 812 L 680 812 C 720 812 700 838 670 838 H 410 C 380 838 360 812 400 812 Z" fill="rgba(0,0,0,0.35)" filter="blur(6px)" />

        {/* Tapered back-leaning neck */}
        <path d="M 485 614 L 500 772 C 500 775 502 778 506 778 H 574 C 578 778 580 775 580 772 L 595 614 Z" fill={`url(#${uid}-neck)`} />
        
        {/* Trapezoidal Flat Base Plate */}
        <path d="M 490 778 H 590 L 676 822 C 680 824 678 827 674 827 H 406 C 402 827 400 824 404 822 Z" fill={`url(#${uid}-base)`} stroke={edgeColor} strokeWidth="0.5" />
        
        {/* Front lip thickness bevel */}
        <path d="M 405 827 H 675 L 670 832 H 410 Z" fill={edgeColor} />
      </g>
    </svg>
  );
}

// ─── UltraWide Monitor ───────────────────────────────────────────────────────
// frameW=1400, frameH=700  screen=(10,10,1380,580)
export function UltraWideFrame({ screenshot, color, uid, objectFit }: FrameProps) {
  const [sx, sy, sw, sh, sr] = [10, 10, 1380, 580, 4];
  const cid = `${uid}-c`;

  return (
    <svg viewBox="0 0 1400 700" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}><rect x={sx} y={sy} width={sw} height={sh} rx={sr} /></clipPath>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={color.accent} />
          <stop offset="100%" stopColor={color.frame} />
        </linearGradient>
      </defs>

      {/* Monitor body (curved-ish) */}
      <rect x="0" y="0" width="1400" height="600" rx="8" fill={`url(#${uid}-g)`} />
      <rect x="1" y="1" width="1398" height="598" rx="7" fill="none" stroke={color.accent} strokeWidth="1" strokeOpacity="0.4" />

      <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#000" />
      {screenshot ? (
        <image href={screenshot} x={sx} y={sy} width={sw} height={sh} clipPath={`url(#${cid})`} preserveAspectRatio={preserveAspect(objectFit)} />
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#0d0d0f" />
          <text x="700" y="295" fill="#2e2e36" fontSize="20" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui">Drop image here</text>
        </g>
      )}

      {/* Stand */}
      <rect x="650" y="600" width="100" height="60" rx="4" fill={color.frame} />
      <rect x="650" y="600" width="100" height="60" rx="4" fill="rgba(0,0,0,0.1)" />
      <ellipse cx="700" cy="670" rx="180" ry="16" fill={color.frame} />
      <ellipse cx="700" cy="670" rx="180" ry="16" fill="rgba(0,0,0,0.12)" />
    </svg>
  );
}

// ─── Gaming Monitor ───────────────────────────────────────────────────────────
// frameW=1200, frameH=760  screen=(8,8,1184,666)
export function GamingMonitorFrame({ screenshot, color, uid, objectFit }: FrameProps) {
  const [sx, sy, sw, sh, sr] = [8, 8, 1184, 666, 4];
  const cid = `${uid}-c`;
  const rgbColor = color.id === 'black-red' ? '#e02040' : '#6060ff';

  return (
    <svg viewBox="0 0 1200 760" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}><rect x={sx} y={sy} width={sw} height={sh} rx={sr} /></clipPath>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="682" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={color.accent} />
          <stop offset="100%" stopColor={color.frame} />
        </linearGradient>
      </defs>

      {/* Aggressive monitor body */}
      <rect x="0" y="0" width="1200" height="682" rx="6" fill={`url(#${uid}-g)`} />
      <rect x="1" y="1" width="1198" height="680" rx="5" fill="none" stroke={color.accent} strokeWidth="0.75" strokeOpacity="0.3" />

      {/* RGB strip at bottom */}
      <rect x="0" y="676" width="1200" height="6" rx="0" fill={rgbColor} opacity="0.8" />

      <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#000" />
      {screenshot ? (
        <image href={screenshot} x={sx} y={sy} width={sw} height={sh} clipPath={`url(#${cid})`} preserveAspectRatio={preserveAspect(objectFit)} />
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#0d0d0f" />
          <text x="600" y="337" fill="#2e2e36" fontSize="20" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui">Drop image here</text>
        </g>
      )}

      {/* Stand (aggressive V-shape suggestion) */}
      <polygon points="540,682 660,682 640,730 560,730" fill={color.frame} />
      <polygon points="540,682 660,682 640,730 560,730" fill="rgba(0,0,0,0.1)" />
      {/* Stand base */}
      <rect x="450" y="730" width="300" height="18" rx="4" fill={color.frame} />
      <rect x="450" y="730" width="300" height="18" rx="4" fill="rgba(0,0,0,0.1)" />
      {/* RGB underglow on stand */}
      <rect x="450" y="742" width="300" height="6" rx="3" fill={rgbColor} opacity="0.5" />
    </svg>
  );
}

// ─── iMac 24" ────────────────────────────────────────────────────────────────
// frameW=1060, frameH=940  screen=(10,10,1040,584)
export function IMacFrame({ screenshot, color, uid, objectFit }: FrameProps) {
  const [sx, sy, sw, sh, sr] = [10, 10, 1040, 584, 10];
  const cid = `${uid}-c`;

  return (
    <svg viewBox="0 0 1060 940" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}><rect x={sx} y={sy} width={sw} height={sh} rx={sr} /></clipPath>
        <linearGradient id={`${uid}-disp`} x1="0" y1="0" x2="0" y2="660" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
        <linearGradient id={`${uid}-chin`} x1="0" y1="610" x2="0" y2="660" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={color.accent} />
          <stop offset="100%" stopColor={color.frame} />
        </linearGradient>
      </defs>

      {/* Ultra-thin display bezel */}
      <rect x="0" y="0" width="1060" height="614" rx="14" fill={color.frame} />
      {/* Glass overlay shine */}
      <rect x="0" y="0" width="1060" height="614" rx="14" fill={`url(#${uid}-disp)`} />
      <rect x="1" y="1" width="1058" height="612" rx="13" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

      {/* Screen */}
      <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#000" />
      {screenshot ? (
        <image href={screenshot} x={sx} y={sy} width={sw} height={sh} clipPath={`url(#${cid})`} preserveAspectRatio={preserveAspect(objectFit)} />
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#0d0d0f" />
          <text x="530" y="297" fill="#2e2e36" fontSize="20" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui">Drop image here</text>
        </g>
      )}

      {/* Camera */}
      <circle cx="530" cy="5.5" r="3" fill="rgba(0,0,0,0.5)" />

      {/* Colored chin */}
      <rect x="0" y="606" width="1060" height="48" rx="0" fill={`url(#${uid}-chin)`} />
      <rect x="0" y="606" width="1060" height="48" fill="rgba(255,255,255,0.06)" />
      {/* Bottom of chin */}
      <rect x="0" y="648" width="1060" height="6" rx="0" fill={color.frame} />
      <rect x="0" y="648" width="1060" height="6" fill="rgba(0,0,0,0.1)" />

      {/* Apple logo on chin */}
      <text x="530" y="635" fill="rgba(255,255,255,0.3)" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui"></text>

      {/* Stand arm */}
      <rect x="490" y="654" width="80" height="150" rx="5" fill={color.frame} />
      <rect x="490" y="654" width="80" height="150" rx="5" fill="rgba(0,0,0,0.1)" />
      <rect x="492" y="654" width="8" height="150" rx="4" fill="rgba(255,255,255,0.06)" />

      {/* Stand base */}
      <rect x="330" y="800" width="400" height="18" rx="9" fill={color.frame} />
      <rect x="330" y="800" width="400" height="18" rx="9" fill="rgba(0,0,0,0.12)" />
      <rect x="332" y="802" width="100" height="8" rx="4" fill="rgba(255,255,255,0.06)" />
    </svg>
  );
}
