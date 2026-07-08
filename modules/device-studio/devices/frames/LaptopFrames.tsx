import React from 'react';
import { FrameProps } from '../../types';

function preserveAspect(fit: FrameProps['objectFit']) {
  if (fit === 'contain') return 'xMidYMid meet';
  if (fit === 'fill')    return 'none';
  return 'xMidYMid slice';
}

// ─── 1. FRONT-FACING LAPTOP FRAME ───
// Pixel-perfect replica of the front-facing laptop mockup from Figma export.
export function LaptopFrontFrame({ screenshot, color, uid, objectFit }: FrameProps) {
  const [sx, sy, sw, sh, sr] = [24, 24, 772, 462, 9];
  const cid = `${uid}-c-front`;

  const isLight = color.id === 'white';
  const strokeColor = isLight ? '#4b5563' : '#111827';
  const lidColor = isLight ? '#f9fafc' : '#222325';
  const baseColor = isLight ? '#f1f3f6' : '#1d1e20';
  const bezelColor = '#000000';

  return (
    <svg viewBox="0 0 820 535" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}>
          <rect x={sx} y={sy} width={sw} height={sh} rx={sr} />
        </clipPath>
      </defs>

      {/* Base shadow */}
      <path d="M 12 503 L 808 503 C 818 503 805 528 780 528 H 40 C 15 528 2 503 12 503 Z" fill="rgba(0,0,0,0.32)" filter="blur(5px)" />

      {/* ─── Laptop Lid Casing ─── */}
      <rect x="10" y="10" width="800" height="490" rx="16" fill={lidColor} stroke={strokeColor} strokeWidth="1.5" />
      
      {/* Screen Bezel Area */}
      <rect x="22" y="22" width="776" height="466" rx="10" fill={bezelColor} stroke={strokeColor} strokeWidth="0.75" />

      {/* Screen content viewport */}
      <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#000000" />
      {screenshot ? (
        <g clipPath={`url(#${cid})`}>
          <image href={screenshot} x={sx} y={sy} width={sw} height={sh} preserveAspectRatio={preserveAspect(objectFit)} />
        </g>
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#0c0c0f" />
          <text x="410" y="255" fill="#2c2d32" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui">Drop screenshot here</text>
        </g>
      )}

      {/* Webcam dot */}
      <circle cx="410" cy="16" r="2" fill="#141416" />
      <circle cx="410" cy="16" r="0.75" fill="#08080a" />

      {/* ─── Bottom Shelf Base Plate (Slimmed to 24px) ─── */}
      <path d="M 10 500 H 810 C 815 500 817 503 814 506 L 800 518 C 796 522 788 524 775 524 H 45 C 32 524 24 522 20 518 L 6 506 C 3 503 5 500 10 500 Z" fill={baseColor} stroke={strokeColor} strokeWidth="1.5" />

      {/* Center opening thumb notch / scoop cut */}
      <path d="M 370 500 C 370 504 376 507 385 507 H 435 C 444 507 450 504 450 500 Z" fill={lidColor} stroke={strokeColor} strokeWidth="1" />
    </svg>
  );
}


