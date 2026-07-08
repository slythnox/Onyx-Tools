import React from 'react';
import { FrameProps } from '../../types';

function preserveAspect(fit: FrameProps['objectFit']) {
  if (fit === 'contain') return 'xMidYMid meet';
  if (fit === 'fill')    return 'none';
  return 'xMidYMid slice';
}

// ─── iPad Pro M4 ─────────────────────────────────────────────────────────────
export function IPadProFrame({ screenshot, color, uid, objectFit }: FrameProps) {
  const [sx, sy, sw, sh, sr] = [8, 8, 818, 1178, 12];
  const cid = `${uid}-c`;

  return (
    <svg viewBox="0 0 834 1194" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}><rect x={sx} y={sy} width={sw} height={sh} rx={sr} /></clipPath>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="1194" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={color.accent} />
          <stop offset="100%" stopColor={color.frame} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="834" height="1194" rx="18" fill={`url(#${uid}-g)`} />
      <rect x="1" y="1" width="832" height="1192" rx="17" fill="none" stroke={color.accent} strokeWidth="1" strokeOpacity="0.5" />

      <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#000" />
      {screenshot ? (
        <image href={screenshot} x={sx} y={sy} width={sw} height={sh} clipPath={`url(#${cid})`} preserveAspectRatio={preserveAspect(objectFit)} />
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#0f0f11" />
          <text x="417" y="597" fill="#333338" fontSize="18" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui">Drop image here</text>
        </g>
      )}

      {/* Face ID sensor bar — top center in the tiny 8px bezel */}
      <rect x="370" y="1" width="94" height="6" rx="3" fill="rgba(0,0,0,0.6)" />

      {/* Top button (right side, portrait) */}
      <rect x="822" y="280" width="6" height="72" rx="3" fill={color.button} />
      <rect x="822" y="280" width="6" height="72" rx="3" fill="none" stroke={color.accent} strokeWidth="0.5" strokeOpacity="0.3" />

      {/* Volume up / down (right side) */}
      <rect x="822" y="380" width="6" height="60" rx="3" fill={color.button} />
      <rect x="822" y="450" width="6" height="60" rx="3" fill={color.button} />
    </svg>
  );
}

// ─── iPad Mini ───────────────────────────────────────────────────────────────
export function IPadMiniFrame({ screenshot, color, uid, objectFit }: FrameProps) {
  const [sx, sy, sw, sh, sr] = [20, 20, 704, 1018, 14];
  const cid = `${uid}-c`;

  return (
    <svg viewBox="0 0 744 1058" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}><rect x={sx} y={sy} width={sw} height={sh} rx={sr} /></clipPath>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="1058" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={color.accent} />
          <stop offset="100%" stopColor={color.frame} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="744" height="1058" rx="24" fill={`url(#${uid}-g)`} />
      <rect x="1" y="1" width="742" height="1056" rx="23" fill="none" stroke={color.accent} strokeWidth="1" strokeOpacity="0.5" />

      <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#000" />
      {screenshot ? (
        <image href={screenshot} x={sx} y={sy} width={sw} height={sh} clipPath={`url(#${cid})`} preserveAspectRatio={preserveAspect(objectFit)} />
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#0f0f11" />
          <text x="372" y="529" fill="#333338" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui">Drop image here</text>
        </g>
      )}

      {/* Touch ID button (top right) */}
      <rect x="732" y="220" width="6" height="72" rx="3" fill={color.button} />
      <rect x="732" y="310" width="6" height="52" rx="3" fill={color.button} />
      <rect x="732" y="372" width="6" height="52" rx="3" fill={color.button} />
    </svg>
  );
}

// ─── Galaxy Tab S9 ───────────────────────────────────────────────────────────
export function GalaxyTabFrame({ screenshot, color, uid, objectFit }: FrameProps) {
  const [sx, sy, sw, sh, sr] = [12, 12, 796, 1256, 16];
  const cid = `${uid}-c`;

  return (
    <svg viewBox="0 0 820 1280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}><rect x={sx} y={sy} width={sw} height={sh} rx={sr} /></clipPath>
      </defs>

      <rect x="0" y="0" width="820" height="1280" rx="22" fill={color.frame} />
      <rect x="1" y="1" width="818" height="1278" rx="21" fill="none" stroke={color.accent} strokeWidth="1" strokeOpacity="0.4" />

      <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#000" />
      {screenshot ? (
        <image href={screenshot} x={sx} y={sy} width={sw} height={sh} clipPath={`url(#${cid})`} preserveAspectRatio={preserveAspect(objectFit)} />
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#0d0d10" />
          <text x="410" y="640" fill="#333338" fontSize="18" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui">Drop image here</text>
        </g>
      )}

      {/* Punch-hole camera */}
      <circle cx="410" cy="30" r="10" fill="#000" />
      <circle cx="410" cy="30" r="6"  fill="#060608" />
      <circle cx="410" cy="30" r="3.5" fill="#030304" />

      <rect x="808" y="240" width="6" height="60" rx="3" fill={color.button} />
      <rect x="808" y="316" width="6" height="52" rx="3" fill={color.button} />
      <rect x="808" y="378" width="6" height="52" rx="3" fill={color.button} />
    </svg>
  );
}
