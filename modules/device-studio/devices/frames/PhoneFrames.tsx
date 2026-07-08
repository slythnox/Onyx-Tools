import React from 'react';
import { FrameProps } from '../../types';

function preserveAspect(fit: FrameProps['objectFit']) {
  if (fit === 'contain') return 'xMidYMid meet';
  if (fit === 'fill')    return 'none';
  return 'xMidYMid slice'; // cover (default)
}

// ─── iPhone 16 Pro ───────────────────────────────────────────────────────────
export function IPhone16ProFrame({ screenshot, color, uid, objectFit }: FrameProps) {
  const [sx, sy, sw, sh, sr] = [14, 14, 347, 784, 44];
  const cid = `${uid}-c`;

  return (
    <svg viewBox="0 0 375 812" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}><rect x={sx} y={sy} width={sw} height={sh} rx={sr} /></clipPath>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="375" y2="812" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={color.accent} />
          <stop offset="40%"  stopColor={color.frame} />
          <stop offset="100%" stopColor={color.frame} />
        </linearGradient>
      </defs>

      {/* Body */}
      <rect x="0" y="0" width="375" height="812" rx="54" fill={`url(#${uid}-g)`} />
      {/* Outer edge highlight */}
      <rect x="1" y="1" width="373" height="810" rx="53" fill="none" stroke={color.accent} strokeWidth="1.5" strokeOpacity="0.6" />
      {/* Inner edge shadow */}
      <rect x="3" y="3" width="369" height="806" rx="51" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />

      {/* Screen background */}
      <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#000" />

      {/* Screenshot / placeholder */}
      {screenshot ? (
        <image href={screenshot} x={sx} y={sy} width={sw} height={sh} clipPath={`url(#${cid})`} preserveAspectRatio={preserveAspect(objectFit)} />
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#131315" />
          <text x="187" y="400" fill="#3a3a40" fontSize="14" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui, -apple-system, sans-serif">Drop image here</text>
        </g>
      )}

      {/* Dynamic Island */}
      <rect x="138" y="24" width="99" height="33" rx="16.5" fill="#000" />
      <circle cx="217" cy="40.5" r="6.5" fill="#0a0a0a" />
      <circle cx="217" cy="40.5" r="4"   fill="#070707" />
      <circle cx="217" cy="40.5" r="2"   fill="#050505" />
      <circle cx="219" cy="38.5" r="0.8" fill="rgba(255,255,255,0.08)" />

      {/* Home indicator */}
      <rect x="148" y="789" width="79" height="5" rx="2.5" fill="rgba(255,255,255,0.45)" />

      {/* Left: Action button */}
      <rect x="-3.5" y="145" width="5" height="28" rx="2.5" fill={color.button} />
      <rect x="-3.5" y="145" width="5" height="28" rx="2.5" fill="none" stroke={color.accent} strokeWidth="0.5" strokeOpacity="0.4" />
      {/* Left: Volume Up */}
      <rect x="-3.5" y="186" width="5" height="60" rx="2.5" fill={color.button} />
      <rect x="-3.5" y="186" width="5" height="60" rx="2.5" fill="none" stroke={color.accent} strokeWidth="0.5" strokeOpacity="0.4" />
      {/* Left: Volume Down */}
      <rect x="-3.5" y="258" width="5" height="60" rx="2.5" fill={color.button} />
      <rect x="-3.5" y="258" width="5" height="60" rx="2.5" fill="none" stroke={color.accent} strokeWidth="0.5" strokeOpacity="0.4" />

      {/* Right: Power */}
      <rect x="373.5" y="218" width="5" height="92" rx="2.5" fill={color.button} />
      <rect x="373.5" y="218" width="5" height="92" rx="2.5" fill="none" stroke={color.accent} strokeWidth="0.5" strokeOpacity="0.4" />
    </svg>
  );
}

// ─── iPhone 16 ───────────────────────────────────────────────────────────────
export function IPhone16Frame({ screenshot, color, uid, objectFit }: FrameProps) {
  const [sx, sy, sw, sh, sr] = [14, 14, 347, 784, 44];
  const cid = `${uid}-c`;

  return (
    <svg viewBox="0 0 375 812" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}><rect x={sx} y={sy} width={sw} height={sh} rx={sr} /></clipPath>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="375" y2="812" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={color.accent} />
          <stop offset="60%"  stopColor={color.frame} />
          <stop offset="100%" stopColor={color.frame} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="375" height="812" rx="54" fill={`url(#${uid}-g)`} />
      <rect x="1.5" y="1.5" width="372" height="809" rx="52.5" fill="none" stroke={color.accent} strokeWidth="1" strokeOpacity="0.5" />
      <rect x="3" y="3" width="369" height="806" rx="51" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.75" />

      <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#000" />
      {screenshot ? (
        <image href={screenshot} x={sx} y={sy} width={sw} height={sh} clipPath={`url(#${cid})`} preserveAspectRatio={preserveAspect(objectFit)} />
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#131315" />
          <text x="187" y="400" fill="#3a3a40" fontSize="14" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui">Drop image here</text>
        </g>
      )}

      {/* Dynamic Island */}
      <rect x="138" y="24" width="99" height="33" rx="16.5" fill="#000" />
      <circle cx="217" cy="40.5" r="6" fill="#0a0a0a" />
      <circle cx="217" cy="40.5" r="3.5" fill="#050505" />

      <rect x="148" y="789" width="79" height="5" rx="2.5" fill="rgba(255,255,255,0.45)" />

      <rect x="-3.5" y="145" width="5" height="28" rx="2.5" fill={color.button} />
      <rect x="-3.5" y="186" width="5" height="60" rx="2.5" fill={color.button} />
      <rect x="-3.5" y="258" width="5" height="60" rx="2.5" fill={color.button} />
      <rect x="373.5" y="218" width="5" height="92" rx="2.5" fill={color.button} />
    </svg>
  );
}

// ─── Samsung Galaxy S25 ───────────────────────────────────────────────────────
export function GalaxyS25Frame({ screenshot, color, uid, objectFit }: FrameProps) {
  const [sx, sy, sw, sh, sr] = [10, 10, 340, 760, 40];
  const cid = `${uid}-c`;

  return (
    <svg viewBox="0 0 360 780" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <clipPath id={cid}><rect x={sx} y={sy} width={sw} height={sh} rx={sr} /></clipPath>
      </defs>

      <rect x="0" y="0" width="360" height="780" rx="48" fill={color.frame} />
      <rect x="0.75" y="0.75" width="358.5" height="778.5" rx="47.25" fill="none" stroke={color.accent} strokeWidth="1" strokeOpacity="0.4" />

      <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#000" />
      {screenshot ? (
        <image href={screenshot} x={sx} y={sy} width={sw} height={sh} clipPath={`url(#${cid})`} preserveAspectRatio={preserveAspect(objectFit)} />
      ) : (
        <g clipPath={`url(#${cid})`}>
          <rect x={sx} y={sy} width={sw} height={sh} fill="#0e0e12" />
          <text x="180" y="390" fill="#3a3a42" fontSize="14" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui">Drop image here</text>
        </g>
      )}

      {/* Punch-hole camera */}
      <circle cx="180" cy="34" r="10" fill="#000" />
      <circle cx="180" cy="34" r="6.5" fill="#060608" />
      <circle cx="180" cy="34" r="4" fill="#030304" />
      <circle cx="182" cy="32" r="1" fill="rgba(255,255,255,0.08)" />

      {/* Home indicator */}
      <rect x="148" y="758" width="64" height="4" rx="2" fill="rgba(255,255,255,0.35)" />

      {/* Volume buttons */}
      <rect x="-3" y="200" width="5" height="54" rx="2.5" fill={color.button} />
      <rect x="-3" y="264" width="5" height="54" rx="2.5" fill={color.button} />
      {/* Power */}
      <rect x="358" y="230" width="5" height="80" rx="2.5" fill={color.button} />
    </svg>
  );
}
