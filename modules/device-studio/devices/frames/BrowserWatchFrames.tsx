import React from 'react';
import { FrameProps } from '../../types';

function preserveAspect(fit: FrameProps['objectFit']) {
  if (fit === 'contain') return 'xMidYMid meet';
  if (fit === 'fill')    return 'none';
  return 'xMidYMid slice';
}

// ─── Chrome Window ────────────────────────────────────────────────────────────
// frameW=960, frameH=600  screen=(0, 40, 960, 560)
export function ChromeWindowFrame({ screenshot, uid, objectFit }: Omit<FrameProps, 'color'>) {
  const [sx, sy, sw, sh] = [0, 40, 960, 560];
  const cid = `${uid}-c`;

  return (
    <svg viewBox="0 0 960 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}><rect x={sx} y={sy} width={sw} height={sh} /></clipPath>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2c2c2e" />
          <stop offset="100%" stopColor="#1e1e1f" />
        </linearGradient>
      </defs>

      {/* Outer border & shadow placeholder */}
      <rect x="0" y="0" width="960" height="600" rx="8" fill="#131314" stroke="#2c2c2e" strokeWidth="1.5" />

      {/* Browser Header Bar */}
      <path d="M 0 8 A 8 8 0 0 1 8 0 L 952 0 A 8 8 0 0 1 960 8 L 960 40 L 0 40 Z" fill={`url(#${uid}-bg)`} />

      {/* Window Controls (Mac style) */}
      <circle cx="20" cy="20" r="6" fill="#ff5f56" />
      <circle cx="40" cy="20" r="6" fill="#ffbd2e" />
      <circle cx="60" cy="20" r="6" fill="#27c93f" />

      {/* Address Bar */}
      <rect x="90" y="8" width="700" height="24" rx="12" fill="#0d0d0e" stroke="#2c2c2e" strokeWidth="1" />
      <text x="110" y="24" fill="#8e8e93" fontSize="11" fontFamily="system-ui, sans-serif">https://onyx-tools.dev</text>

      {/* Tabs / Extensions suggestions (Subtle visual details) */}
      <rect x="810" y="12" width="40" height="16" rx="4" fill="rgba(255,255,255,0.06)" />
      <rect x="860" y="12" width="80" height="16" rx="4" fill="rgba(255,255,255,0.06)" />

      {/* Webpage Screen */}
      <rect x={sx} y={sy} width={sw} height={sh} fill="#000" />
      {screenshot ? (
        <image href={screenshot} x={sx} y={sy} width={sw} height={sh} clipPath={`url(#${cid})`} preserveAspectRatio={preserveAspect(objectFit)} />
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#0b0b0c" />
          <text x="480" y="320" fill="#2e2e36" fontSize="18" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui">Drop image here</text>
        </g>
      )}
    </svg>
  );
}

// ─── Apple Watch Series 9 ─────────────────────────────────────────────────────
// frameW=320, frameH=390  screen=(18, 22, 284, 346, 32)
export function AppleWatchFrame({ screenshot, color, uid, objectFit }: FrameProps) {
  const [sx, sy, sw, sh, sr] = [18, 22, 284, 346, 32];
  const cid = `${uid}-c`;

  return (
    <svg viewBox="0 0 320 390" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}><rect x={sx} y={sy} width={sw} height={sh} rx={sr} /></clipPath>
        <linearGradient id={`${uid}-band`} x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#121214" />
          <stop offset="50%" stopColor="#2c2c30" />
          <stop offset="100%" stopColor="#121214" />
        </linearGradient>
      </defs>

      {/* Watch Band (Top and Bottom extension) */}
      <path d="M 60 0 L 260 0 L 240 60 L 80 60 Z" fill={`url(#${uid}-band)`} />
      <path d="M 80 330 L 240 330 L 260 390 L 60 390 Z" fill={`url(#${uid}-band)`} />

      {/* Watch Case */}
      <rect x="10" y="12" width="300" height="366" rx="50" fill={color.frame} stroke={color.accent} strokeWidth="2.5" />

      {/* Inner Screen Bezel */}
      <rect x="16" y="18" width="288" height="354" rx="36" fill="#000" />

      {/* Display Screen */}
      <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#050505" />
      {screenshot ? (
        <image href={screenshot} x={sx} y={sy} width={sw} height={sh} clipPath={`url(#${cid})`} preserveAspectRatio={preserveAspect(objectFit)} />
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#0d0d10" />
          <text x="160" y="195" fill="#3a3a42" fontSize="12" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui">Drop image</text>
        </g>
      )}

      {/* Digital Crown (Right side) */}
      <rect x="308" y="90" width="12" height="66" rx="4" fill={color.button} />
      <rect x="308" y="98" width="12" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="308" y="110" width="12" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="308" y="122" width="12" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="308" y="134" width="12" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="308" y="146" width="12" height="4" rx="1" fill="rgba(255,255,255,0.2)" />

      {/* Side Button (Right side, below crown) */}
      <rect x="309" y="180" width="8" height="74" rx="4" fill={color.button} stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
    </svg>
  );
}
