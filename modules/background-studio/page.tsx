import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  RotateCcw,
  Share2,
  Plus,
  Trash2,
  ChevronDown,
  Check,
  Code,
  X
} from 'lucide-react';
import GradientBlinds from '@/components/ui/GradientBlinds';
import { useToast } from '@/app/providers/ToastProvider';
import { cn } from '@/lib/utils';

// Import official components
import LaserFlow from '@/components/LaserFlow';
import LightRays from '@/components/LightRays';
import FloatingLines from '@/components/FloatingLines';
import ColorBends from '@/components/ColorBends';
import DotField from '@/components/DotField';
import ParticleBurst from '@/components/ParticleBurst';

// Import component sources and styles as raw strings
import gradientBlindsSource from '@/components/ui/GradientBlinds.tsx?raw';
import gradientBlindsCss from '@/components/ui/GradientBlinds.css?raw';
import dotFieldSource from '@/components/DotField.tsx?raw';
import particleBurstSource from '@/components/ParticleBurst.tsx?raw';
import colorBendsSource from '@/components/ColorBends.tsx?raw';
import colorBendsCss from '@/components/ColorBends.css?raw';
import floatingLinesSource from '@/components/FloatingLines.tsx?raw';
import floatingLinesCss from '@/components/FloatingLines.css?raw';
import laserFlowSource from '@/components/LaserFlow.tsx?raw';
import laserFlowCss from '@/components/LaserFlow.css?raw';
import lightRaysSource from '@/components/LightRays.tsx?raw';
import lightRaysCss from '@/components/LightRays.css?raw';

type BackgroundType = 'blinds' | 'dot' | 'pb' | 'bends' | 'lines' | 'laser' | 'rays';

export default function BackgroundStudio() {
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeBg, setActiveBg] = useState<BackgroundType>('blinds');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [activeExportTab, setActiveExportTab] = useState<'cli' | 'usage' | 'component' | 'css'>('usage');
  const [copied, setCopied] = useState(false);
  const [showHeroOverlay, setShowHeroOverlay] = useState(true);

  const [canvasBg, setCanvasBg] = useState('#120f17');
  const [colors, setColors] = useState<string[]>(['#ff9ffc', '#5227ff']);

  // Blinds
  const [angle, setAngle] = useState(0);
  const [noise, setNoise] = useState(0.30);
  const [blindCount, setBlindCount] = useState(16);
  const [blindMinWidth, setBlindMinWidth] = useState(60);
  const [mouseDampening, setMouseDampening] = useState(0.15);
  const [mirrorGradient, setMirrorGradient] = useState(false);
  const [spotlightRadius, setSpotlightRadius] = useState(0.50);
  const [spotlightSoftness, setSpotlightSoftness] = useState(1.00);
  const [spotlightOpacity, setSpotlightOpacity] = useState(1.00);
  const [distortAmount, setDistortAmount] = useState(0.00);
  const [shineDirection, setShineDirection] = useState<'left'|'right'>('left');

  // Particle Burst
  const [pbCount, setPbCount] = useState(300);
  const [pbMagnetRadius, setPbMagnetRadius] = useState(10);
  const [pbRingRadius, setPbRingRadius] = useState(10);
  const [pbWaveSpeed, setPbWaveSpeed] = useState(0.40);
  const [pbWaveAmplitude, setPbWaveAmplitude] = useState(1.00);
  const [pbParticleSize, setPbParticleSize] = useState(2.00);
  const [pbLerpSpeed, setPbLerpSpeed] = useState(0.10);
  const [pbAutoAnimate, setPbAutoAnimate] = useState(false);
  const [pbVariance, setPbVariance] = useState(1.00);
  const [pbRotationSpeed, setPbRotationSpeed] = useState(0.00);
  const [pbDepthFactor, setPbDepthFactor] = useState(1.00);
  const [pbPulseSpeed, setPbPulseSpeed] = useState(3.00);
  const [pbShape, setPbShape] = useState<'capsule'|'circle'|'square'>('capsule');
  const [pbFieldStrength, setPbFieldStrength] = useState(10);

  // Color Bends
  const [cbRotation, setCbRotation] = useState(90);
  const [cbSpeed, setCbSpeed] = useState(0.20);
  const [cbTransparent, setCbTransparent] = useState(true);
  const [cbAutoRotate, setCbAutoRotate] = useState(0.00);
  const [cbScale, setCbScale] = useState(1.00);
  const [cbFrequency, setCbFrequency] = useState(1.00);
  const [cbWarpStrength, setCbWarpStrength] = useState(1.00);
  const [cbMouseInfluence, setCbMouseInfluence] = useState(1.00);
  const [cbParallax, setCbParallax] = useState(0.50);
  const [cbNoise, setCbNoise] = useState(0.15);
  const [cbIterations, setCbIterations] = useState(1);
  const [cbIntensity, setCbIntensity] = useState(1.50);
  const [cbBandWidth, setCbBandWidth] = useState(6.00);

  // Dot Field
  const [dfDotRadius, setDfDotRadius] = useState(3.00);
  const [dfDotSpacing, setDfDotSpacing] = useState(15);
  const [dfCursorRadius, setDfCursorRadius] = useState(550);
  const [dfCursorForce, setDfCursorForce] = useState(0.26);
  const [dfBulgeOnly, setDfBulgeOnly] = useState(false);
  const [dfBulgeStrength, setDfBulgeStrength] = useState(67);
  const [dfGlowRadius, setDfGlowRadius] = useState(160);
  const [dfSparkle, setDfSparkle] = useState(false);
  const [dfWaveAmplitude, setDfWaveAmplitude] = useState(0);
  const [dfGlowColor, setDfGlowColor] = useState('#5311c2');

  // Floating Lines
  const [flSpeed, setFlSpeed] = useState(1.00);
  const [flInteractive, setFlInteractive] = useState(true);
  const [flBendRadius, setFlBendRadius] = useState(5.00);
  const [flBendStrength, setFlBendStrength] = useState(-0.50);
  const [flMouseDamping, setFlMouseDamping] = useState(0.05);
  const [flParallax, setFlParallax] = useState(true);
  const [flParallaxStrength, setFlParallaxStrength] = useState(0.20);

  // Laser Flow
  const [lfWispDensity, setLfWispDensity] = useState(1.00);
  const [lfFlowSpeed, setLfFlowSpeed] = useState(0.35);
  const [lfVerticalSizing, setLfVerticalSizing] = useState(2.00);
  const [lfHorizontalSizing, setLfHorizontalSizing] = useState(0.50);
  const [lfFogIntensity, setLfFogIntensity] = useState(0.45);
  const [lfFogScale, setLfFogScale] = useState(0.30);
  const [lfWispSpeed, setLfWispSpeed] = useState(15);
  const [lfWispIntensity, setLfWispIntensity] = useState(5.00);
  const [lfFlowStrength, setLfFlowStrength] = useState(0.25);
  const [lfDecay, setLfDecay] = useState(1.10);
  const [lfHorizontalBeamOffset, setLfHorizontalBeamOffset] = useState(0.00);
  const [lfVerticalBeamOffset, setLfVerticalBeamOffset] = useState(-0.50);

  // Light Rays
  const [lrOrigin, setLrOrigin] = useState<'top-center'|'center'|'top-left'|'top-right'>('top-center');
  const [lrSpeed, setLrSpeed] = useState(1.00);
  const [lrSpread, setLrSpread] = useState(1.00);
  const [lrLength, setLrLength] = useState(2.00);
  const [lrPulsating, setLrPulsating] = useState(false);
  const [lrFadeDistance, setLrFadeDistance] = useState(1.00);
  const [lrSaturation, setLrSaturation] = useState(1.00);
  const [lrFollowMouse, setLrFollowMouse] = useState(true);
  const [lrMouseInfluence, setLrMouseInfluence] = useState(0.10);
  const [lrNoise, setLrNoise] = useState(0.00);
  const [lrDistortion, setLrDistortion] = useState(0.00);

  const canvasParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeBg === 'blinds') setColors(['#ff9ffc', '#5227ff']);
    else if (activeBg === 'bends') setColors(['#5227FF', '#FF9FFC', '#7cff67']);
    else if (activeBg === 'lines') setColors(['#E945F5', '#2F4BC0', '#E945F5']);
    else if (activeBg === 'dot') setColors(['#5311c2']);
    else if (activeBg === 'laser') setColors(['#FF79C6']);
    else if (activeBg === 'pb') setColors(['#ff9ffc']);
    else if (activeBg === 'rays') setColors(['#ffffff']);
  }, [activeBg]);

  useEffect(() => {
    const encoded = searchParams.get('state');
    if (encoded) {
      try {
        const decoded = JSON.parse(atob(encoded));
        if (decoded.bg) setActiveBg(decoded.bg);
        if (decoded.canvasBg) setCanvasBg(decoded.canvasBg);
        if (decoded.colors) setColors(decoded.colors);
        if (decoded.angle !== undefined) setAngle(decoded.angle);
        if (decoded.noise !== undefined) setNoise(decoded.noise);
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    try {
      const stateObj = { bg: activeBg, canvasBg, colors, angle, noise };
      const encoded = btoa(JSON.stringify(stateObj));
      setSearchParams({ state: encoded }, { replace: true });
    } catch (e) { console.error(e); }
  }, [activeBg, canvasBg, colors, angle, noise]);

  const handleUpdateColor = (idx: number, hex: string) => { const next = [...colors]; next[idx] = hex; setColors(next); };
  const handleAddColor = () => {
    if (colors.length >= 5) { showToast('Maximum 5 colors allowed', 'error'); return; }
    setColors([...colors, '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0')]);
  };
  const handleRemoveColor = (idx: number) => {
    if (colors.length <= 1) { showToast('At least 1 color is required', 'error'); return; }
    setColors(colors.filter((_,i) => i !== idx));
  };

  const handleReset = () => {
    setCanvasBg('#120f17'); setColors(['#ff9ffc','#5227ff']); setAngle(0); setNoise(0.3);
    setBlindCount(16); setBlindMinWidth(60); setMouseDampening(0.15); setMirrorGradient(false);
    setSpotlightRadius(0.5); setSpotlightSoftness(1); setSpotlightOpacity(1); setDistortAmount(0); setShineDirection('left');
    setPbCount(300); setPbRingRadius(10); setPbMagnetRadius(10); setPbShape('capsule');
    setCbRotation(90); setCbSpeed(0.2); setDfDotRadius(3); setDfDotSpacing(15);
    setLfVerticalSizing(2.0); setLfHorizontalSizing(0.5); setLfFogIntensity(0.45); setLfFogScale(0.3);
    setLfWispSpeed(15); setLfWispIntensity(5.0); setLfHorizontalBeamOffset(0.0); setLfVerticalBeamOffset(-0.5);
    setLrOrigin('top-center'); setLrSpeed(1); setLrSpread(1); setLrLength(2);
    setLrFollowMouse(true); setLrMouseInfluence(0.1); setLrNoise(0); setLrDistortion(0);
    showToast('Reset values to defaults', 'success');
  };

  const handleShare = () => { navigator.clipboard.writeText(window.location.href); showToast('Shareable link copied!', 'success'); };

  // Generate Tabbed Exporter Snippet Code
  const getExportCode = (): string => {
    const isCLI = activeExportTab === 'cli';
    const isComponent = activeExportTab === 'component';
    const isCSS = activeExportTab === 'css';

    const colorsArrStr = colors.map(c => `"${c}"`).join(', ');
    const rayColorVal = colors[0] || '#ffffff';
    const laserColorVal = colors[0] || '#FF79C6';

    const getCliCommand = () => {
      if (activeBg === 'blinds') return `npx shadcn@latest add @react-bits/GradientBlinds-TS-CSS`;
      if (activeBg === 'pb') return `npx shadcn@latest add @react-bits/ParticleBurst-TS-CSS`;
      if (activeBg === 'bends') return `npx shadcn@latest add @react-bits/ColorBends-TS-CSS`;
      if (activeBg === 'dot') return `npx shadcn@latest add @react-bits/DotField-TS-CSS`;
      if (activeBg === 'lines') return `npx shadcn@latest add @react-bits/FloatingLines-TS-CSS`;
      if (activeBg === 'laser') return `npx shadcn@latest add @react-bits/LaserFlow-TS-CSS`;
      if (activeBg === 'rays') return `npx shadcn@latest add @react-bits/LightRays-TS-CSS`;
      return '';
    };

    if (isCLI) {
      return getCliCommand();
    }

    if (isComponent) {
      if (activeBg === 'blinds') return gradientBlindsSource;
      if (activeBg === 'dot') return dotFieldSource;
      if (activeBg === 'pb') return particleBurstSource;
      if (activeBg === 'bends') return colorBendsSource;
      if (activeBg === 'lines') return floatingLinesSource;
      if (activeBg === 'laser') return laserFlowSource;
      if (activeBg === 'rays') return lightRaysSource;
      return '';
    }

    if (isCSS) {
      if (activeBg === 'blinds') return gradientBlindsCss;
      if (activeBg === 'bends') return colorBendsCss;
      if (activeBg === 'lines') return floatingLinesCss;
      if (activeBg === 'laser') return laserFlowCss;
      if (activeBg === 'rays') return lightRaysCss;
      return '/* No custom CSS style file required for this component. */';
    }

    // Default: 'usage' (exact React component usage snippet)
    if (activeBg === 'laser') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <LaserFlow
    color="${laserColorVal}"
    wispDensity={${lfWispDensity}}
    flowSpeed={${lfFlowSpeed}}
    verticalSizing={${lfVerticalSizing}}
    horizontalSizing={${lfHorizontalSizing}}
    fogIntensity={${lfFogIntensity}}
    fogScale={${lfFogScale}}
    wispSpeed={${lfWispSpeed}}
    wispIntensity={${lfWispIntensity}}
    flowStrength={${lfFlowStrength}}
    decay={${lfDecay}}
    horizontalBeamOffset={${lfHorizontalBeamOffset}}
    verticalBeamOffset={${lfVerticalBeamOffset}}
  />
</div>`;
    }

    if (activeBg === 'rays') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <LightRays
    raysOrigin="${lrOrigin}"
    raysColor="${rayColorVal}"
    raysSpeed={${lrSpeed}}
    lightSpread={${lrSpread}}
    rayLength={${lrLength}}
    pulsating={${lrPulsating}}
    fadeDistance={${lrFadeDistance}}
    saturation={${lrSaturation}}
    followMouse={${lrFollowMouse}}
    mouseInfluence={${lrMouseInfluence}}
    noiseAmount={${lrNoise}}
    distortion={${lrDistortion}}
  />
</div>`;
    }

    if (activeBg === 'lines') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <FloatingLines
    linesGradient={[${colorsArrStr}]}
    animationSpeed={${flSpeed}}
    interactive={${flInteractive}}
    bendRadius={${flBendRadius}}
    bendStrength={${flBendStrength}}
    mouseDamping={${flMouseDamping}}
    parallax={${flParallax}}
    parallaxStrength={${flParallaxStrength}}
  />
</div>`;
    }

    if (activeBg === 'bends') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <ColorBends
    rotation={${cbRotation}}
    speed={${cbSpeed}}
    colors={[${colorsArrStr}]}
    transparent={${cbTransparent}}
    autoRotate={${cbAutoRotate}}
    scale={${cbScale}}
    frequency={${cbFrequency}}
    warpStrength={${cbWarpStrength}}
    mouseInfluence={${cbMouseInfluence}}
    parallax={${cbParallax}}
    noise={${cbNoise}}
    iterations={${cbIterations}}
    intensity={${cbIntensity}}
    bandWidth={${cbBandWidth}}
  />
</div>`;
    }

    if (activeBg === 'blinds') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <GradientBlinds
    gradientColors={[${colorsArrStr}]}
    angle={angle}
    noise={noise}
    blindCount={blindCount}
    blindMinWidth={blindMinWidth}
    mouseDampening={mouseDampening}
    mirrorGradient={mirrorGradient}
    spotlightRadius={spotlightRadius}
    spotlightSoftness={spotlightSoftness}
    spotlightOpacity={spotlightOpacity}
    distortAmount={distortAmount}
    shineDirection="${shineDirection}"
  />
</div>`;
    }

    if (activeBg === 'dot') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <DotField
    canvasBg="${canvasBg}"
    dotRadius={dfDotRadius}
    dotSpacing={dfDotSpacing}
    cursorRadius={dfCursorRadius}
    cursorForce={dfCursorForce}
    bulgeOnly={dfBulgeOnly}
    bulgeStrength={dfBulgeStrength}
    glowRadius={dfGlowRadius}
    sparkle={dfSparkle}
    waveAmplitude={dfWaveAmplitude}
    glowColor="${dfGlowColor}"
  />
</div>`;
    }

    if (activeBg === 'pb') {
      return `${getCliCommand()}
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <ParticleBurst
    canvasBg="${canvasBg}"
    particleCount={pbCount}
    magnetRadius={pbMagnetRadius}
    ringRadius={pbRingRadius}
    waveSpeed={pbWaveSpeed}
    waveAmplitude={pbWaveAmplitude}
    particleSize={pbParticleSize}
    lerpSpeed={pbLerpSpeed}
    color="${colors[0]||'#ff9ffc'}"
    autoAnimate={pbAutoAnimate}
    particleVariance={pbVariance}
    rotationSpeed={pbRotationSpeed}
    depthFactor={pbDepthFactor}
    pulseSpeed={pbPulseSpeed}
    particleShape="${pbShape}"
    fieldStrength={pbFieldStrength}
  />
</div>`;
    }

    return '';
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getExportCode()); setCopied(true);
    showToast('Code copied!', 'success'); setTimeout(() => setCopied(false), 2000);
  };

  const PRESET_LABELS: Record<BackgroundType, string> = {
    blinds: 'Gradient Blinds', dot: 'Dot Field', pb: 'Particle Burst',
    bends: 'Color Bends', lines: 'Floating Lines', laser: 'Laser Flow', rays: 'Light Rays'
  };

  const showColorList = !['dot','laser','pb','rays'].includes(activeBg);
  const showSingleColor = ['dot','laser','pb','rays'].includes(activeBg);

  const hasCssTab = activeBg !== 'dot' && activeBg !== 'pb';

  return (
    <div className="flex-1 flex h-full w-full bg-[#120f17] text-zinc-150 min-h-0 min-w-0 overflow-hidden select-none">
      {/* LEFT SIDEBAR */}
      <div className="w-[320px] bg-[#09090b] border-r border-zinc-900/60 p-4 flex flex-col justify-between shrink-0 h-full z-10 relative">
        <div className="flex-1 overflow-y-auto scrollbar-machined pr-1.5 space-y-5">
          {/* Dropdown */}
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-left font-mono font-bold text-xs text-white cursor-pointer focus:outline-none">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" /><span>{PRESET_LABELS[activeBg]}</span></div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-950 p-1.5 shadow-2xl flex flex-col gap-0.5 z-50">
                {(['blinds','pb','bends','dot','lines','laser','rays'] as BackgroundType[]).map(id => (
                  <button key={id} onClick={() => { setActiveBg(id); setIsDropdownOpen(false); }}
                    className={cn('px-3 py-2 text-left rounded text-xs font-mono font-semibold transition-colors cursor-pointer w-full', activeBg === id ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-white')}>
                    {PRESET_LABELS[id]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-4 pt-2 border-t border-zinc-900/60">
            {/* Canvas BG */}
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wide">Canvas BG</label>
              <div className="flex items-center gap-2">
                <input type="color" value={canvasBg} onChange={e => setCanvasBg(e.target.value)} className="w-5 h-5 bg-transparent border-0 cursor-pointer rounded overflow-hidden" />
                <input type="text" value={canvasBg} onChange={e => setCanvasBg(e.target.value)} className="w-20 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 text-center font-mono text-[10px] text-zinc-300" />
              </div>
            </div>

            {/* Hero Overlay Toggle */}
            <div className="flex items-center justify-between py-1 border-b border-zinc-900/60 pb-2">
              <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wide">Hero Overlay</label>
              <input type="checkbox" checked={showHeroOverlay} onChange={e => setShowHeroOverlay(e.target.checked)} className="cursor-pointer bg-zinc-900 border-zinc-800 rounded accent-violet-600" />
            </div>

            {/* Multi-color list */}
            {showColorList && (
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wide">Gradient Colors</label>
                <div className="space-y-1.5">
                  {colors.map((color, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-zinc-900/40 border border-zinc-900 rounded p-1.5">
                      <div className="flex items-center gap-2">
                        <input type="color" value={color} onChange={e => handleUpdateColor(idx, e.target.value)} className="w-5 h-5 bg-transparent border-0 cursor-pointer rounded overflow-hidden" />
                        <input type="text" value={color} onChange={e => handleUpdateColor(idx, e.target.value)} className="w-16 bg-transparent border-0 outline-none font-mono text-[10px] text-zinc-350" />
                      </div>
                      {colors.length > 1 && <button onClick={() => handleRemoveColor(idx)} className="p-1 hover:bg-zinc-800 text-zinc-500 hover:text-red-400 rounded cursor-pointer"><Trash2 className="w-3 h-3" /></button>}
                    </div>
                  ))}
                </div>
                {colors.length < 5 && (
                  <button onClick={handleAddColor} className="flex items-center justify-center gap-1.5 w-full py-1.5 border border-dashed border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/20 rounded font-mono text-[10px] text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors">
                    <Plus className="w-3 h-3" /><span>Add Color</span>
                  </button>
                )}
              </div>
            )}

            {/* Single color */}
            {showSingleColor && (
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wide">{activeBg === 'rays' ? 'Rays Color' : 'Color'}</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={colors[0]||'#ffffff'} onChange={e => handleUpdateColor(0, e.target.value)} className="w-5 h-5 bg-transparent border-0 cursor-pointer rounded overflow-hidden" />
                  <input type="text" value={colors[0]||'#ffffff'} onChange={e => handleUpdateColor(0, e.target.value)} className="w-20 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 text-center font-mono text-[10px] text-zinc-300" />
                </div>
              </div>
            )}

            {/* BLINDS */}
            {activeBg === 'blinds' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                {[['Angle','',0,360,1,angle,setAngle],['Noise','',0,1,0.01,noise,setNoise,2],['Blind Count','',4,32,1,blindCount,setBlindCount],['Blind Min Width','',10,150,1,blindMinWidth,setBlindMinWidth],['Mouse Dampening','',0.01,0.99,0.01,mouseDampening,setMouseDampening,2],['Spotlight Radius','',0.1,2,0.05,spotlightRadius,setSpotlightRadius,2],['Spotlight Softness','',0.1,3,0.05,spotlightSoftness,setSpotlightSoftness,2],['Spotlight Opacity','',0,1,0.05,spotlightOpacity,setSpotlightOpacity,2],['Distort Amount','',0,5,0.05,distortAmount,setDistortAmount,2]].map(([label,,min,max,step,val,setter,dec]: any) => (
                  <div key={label}><div className="flex justify-between text-[10px] font-mono mb-1 text-zinc-400"><span>{label}</span><span>{dec ? (val as number).toFixed(dec) : val}</span></div><input type="range" min={min} max={max} step={step} value={val as number} onChange={e => (setter as Function)(Number(e.target.value))} className="w-full" /></div>
                ))}
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Mirror Gradient</span><input type="checkbox" checked={mirrorGradient} onChange={e => setMirrorGradient(e.target.checked)} className="cursor-pointer" /></div>
                <div><label className="block text-[10px] font-mono text-zinc-400 mb-1.5">Shine Direction</label><select value={shineDirection} onChange={e => setShineDirection(e.target.value as any)} className="select-machined w-full py-1 px-2.5 bg-zinc-900 border-zinc-800 text-xs font-mono"><option value="left">Left</option><option value="right">Right</option></select></div>
              </div>
            )}

            {/* PARTICLE BURST */}
            {activeBg === 'pb' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                {[['Particle Count','',50,500,1,pbCount,setPbCount],['Magnet Radius','',1,40,1,pbMagnetRadius,setPbMagnetRadius],['Ring Radius','',0,100,1,pbRingRadius,setPbRingRadius],['Wave Speed','',0,2,0.05,pbWaveSpeed,setPbWaveSpeed,2],['Wave Amplitude','',0,5,0.1,pbWaveAmplitude,setPbWaveAmplitude,2],['Particle Size','',0.5,10,0.1,pbParticleSize,setPbParticleSize,2],['Lerp Speed','',0.01,0.5,0.01,pbLerpSpeed,setPbLerpSpeed,2],['Particle Variance','',0,3,0.1,pbVariance,setPbVariance,2],['Rotation Speed','',0,5,0.1,pbRotationSpeed,setPbRotationSpeed,2],['Depth Factor','',0.1,4,0.1,pbDepthFactor,setPbDepthFactor,2],['Pulse Speed','',0,10,0.1,pbPulseSpeed,setPbPulseSpeed,2],['Field Strength','',1,30,1,pbFieldStrength,setPbFieldStrength]].map(([label,,min,max,step,val,setter,dec]: any) => (
                  <div key={label}><div className="flex justify-between text-[10px] font-mono mb-1 text-zinc-400"><span>{label}</span><span>{dec ? (val as number).toFixed(dec) : val}</span></div><input type="range" min={min} max={max} step={step} value={val as number} onChange={e => (setter as Function)(Number(e.target.value))} className="w-full" /></div>
                ))}
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Auto Animate</span><input type="checkbox" checked={pbAutoAnimate} onChange={e => setPbAutoAnimate(e.target.checked)} className="cursor-pointer" /></div>
                <div><label className="block text-[10px] font-mono text-zinc-400 mb-1.5">Particle Shape</label><select value={pbShape} onChange={e => setPbShape(e.target.value as any)} className="select-machined w-full py-1 px-2.5 bg-zinc-900 border-zinc-800 text-xs font-mono"><option value="capsule">Capsule</option><option value="circle">Circle</option><option value="square">Square</option></select></div>
              </div>
            )}

            {/* COLOR BENDS */}
            {activeBg === 'bends' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                {[['Speed','',0,2,0.05,cbSpeed,setCbSpeed,2],['Auto Rotate','',0,5,0.1,cbAutoRotate,setCbAutoRotate,2],['Scale','',0.1,3,0.05,cbScale,setCbScale,2],['Frequency','',0.1,5,0.1,cbFrequency,setCbFrequency,2],['Warp Strength','',0,5,0.1,cbWarpStrength,setCbWarpStrength,2],['Mouse Influence','',0,2,0.1,cbMouseInfluence,setCbMouseInfluence,2],['Parallax','',0,2,0.1,cbParallax,setCbParallax,2],['Noise','',0,2,0.05,cbNoise,setCbNoise,2],['Iterations','',1,4,1,cbIterations,setCbIterations],['Intensity','',0.1,5,0.1,cbIntensity,setCbIntensity,2],['Band Width','',2,20,0.5,cbBandWidth,setCbBandWidth,2]].map(([label,,min,max,step,val,setter,dec]: any) => (
                  <div key={label}><div className="flex justify-between text-[10px] font-mono mb-1 text-zinc-400"><span>{label}</span><span>{dec ? (val as number).toFixed(dec) : val}</span></div><input type="range" min={min} max={max} step={step} value={val as number} onChange={e => (setter as Function)(Number(e.target.value))} className="w-full" /></div>
                ))}
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Transparent BG</span><input type="checkbox" checked={cbTransparent} onChange={e => setCbTransparent(e.target.checked)} className="cursor-pointer" /></div>
              </div>
            )}

            {/* DOT FIELD */}
            {activeBg === 'dot' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                {[['Dot Radius','',0.5,12,0.1,dfDotRadius,setDfDotRadius,2],['Dot Spacing','',8,60,1,dfDotSpacing,setDfDotSpacing],['Cursor Radius','',100,800,20,dfCursorRadius,setDfCursorRadius],['Cursor Force','',0,1,0.02,dfCursorForce,setDfCursorForce,2],['Bulge Strength','',10,200,1,dfBulgeStrength,setDfBulgeStrength],['Glow Radius','',50,300,1,dfGlowRadius,setDfGlowRadius],['Wave Amplitude','',0,50,1,dfWaveAmplitude,setDfWaveAmplitude]].map(([label,,min,max,step,val,setter,dec]: any) => (
                  <div key={label}><div className="flex justify-between text-[10px] font-mono mb-1 text-zinc-400"><span>{label}</span><span>{dec ? (val as number).toFixed(dec) : val}</span></div><input type="range" min={min} max={max} step={step} value={val as number} onChange={e => (setter as Function)(Number(e.target.value))} className="w-full" /></div>
                ))}
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Bulge Only</span><input type="checkbox" checked={dfBulgeOnly} onChange={e => setDfBulgeOnly(e.target.checked)} className="cursor-pointer" /></div>
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Sparkle</span><input type="checkbox" checked={dfSparkle} onChange={e => setDfSparkle(e.target.checked)} className="cursor-pointer" /></div>
              </div>
            )}

            {/* FLOATING LINES */}
            {activeBg === 'lines' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                {[['Animation Speed','',0.1,3,0.1,flSpeed,setFlSpeed,2],['Bend Radius','',1,15,0.5,flBendRadius,setFlBendRadius,2],['Bend Strength','',-2,2,0.1,flBendStrength,setFlBendStrength,2],['Mouse Dampening','',0.01,0.5,0.01,flMouseDamping,setFlMouseDamping,2],['Parallax Strength','',0,1,0.05,flParallaxStrength,setFlParallaxStrength,2]].map(([label,,min,max,step,val,setter,dec]: any) => (
                  <div key={label}><div className="flex justify-between text-[10px] font-mono mb-1 text-zinc-400"><span>{label}</span><span>{dec ? (val as number).toFixed(dec) : val}</span></div><input type="range" min={min} max={max} step={step} value={val as number} onChange={e => (setter as Function)(Number(e.target.value))} className="w-full" /></div>
                ))}
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Interactive</span><input type="checkbox" checked={flInteractive} onChange={e => setFlInteractive(e.target.checked)} className="cursor-pointer" /></div>
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Parallax</span><input type="checkbox" checked={flParallax} onChange={e => setFlParallax(e.target.checked)} className="cursor-pointer" /></div>
              </div>
            )}

            {/* LASER FLOW */}
            {activeBg === 'laser' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                {[['Flow Speed','',0.05,2,0.05,lfFlowSpeed,setLfFlowSpeed,2],['Vertical Sizing','',0.5,2,0.05,lfVerticalSizing,setLfVerticalSizing,2],['Horizontal Sizing','',0.1,2,0.05,lfHorizontalSizing,setLfHorizontalSizing,2],['Fog Intensity','',0,1,0.05,lfFogIntensity,setLfFogIntensity,2],['Fog Scale','',0.1,2,0.05,lfFogScale,setLfFogScale,2],['Beam Sway','',0,30,1,lfWispSpeed,setLfWispSpeed],['Glow Intensity','',0,20,0.5,lfWispIntensity,setLfWispIntensity,2],['Horizontal Beam Offset','',-1,1,0.05,lfHorizontalBeamOffset,setLfHorizontalBeamOffset,2],['Vertical Beam Offset','',-0.5,0.5,0.05,lfVerticalBeamOffset,setLfVerticalBeamOffset,2]].map(([label,,min,max,step,val,setter,dec]: any) => (
                  <div key={label}><div className="flex justify-between text-[10px] font-mono mb-1 text-zinc-400"><span>{label}</span><span>{dec ? (val as number).toFixed(dec) : val}</span></div><input type="range" min={min} max={max} step={step} value={val as number} onChange={e => (setter as Function)(Number(e.target.value))} className="w-full" /></div>
                ))}
              </div>
            )}

            {/* LIGHT RAYS */}
            {activeBg === 'rays' && (
              <div className="space-y-3.5 pt-2 border-t border-zinc-900/60">
                <div><label className="block text-[10px] font-mono text-zinc-400 mb-1.5">Rays Origin</label><select value={lrOrigin} onChange={e => setLrOrigin(e.target.value as any)} className="select-machined w-full py-1 px-2.5 bg-zinc-900 border-zinc-800 text-xs font-mono"><option value="top-center">Top Center</option><option value="center">Center</option><option value="top-left">Top Left</option><option value="top-right">Top Right</option></select></div>
                {[['Rays Speed','',0.1,3,0.1,lrSpeed,setLrSpeed,2],['Light Spread','',0.2,2,0.05,lrSpread,setLrSpread,2],['Ray Length','',0.5,4,0.1,lrLength,setLrLength,2],['Fade Distance','',0.2,2.5,0.1,lrFadeDistance,setLrFadeDistance,2],['Saturation','',0,1,0.05,lrSaturation,setLrSaturation,2],['Mouse Influence','',0.01,0.5,0.01,lrMouseInfluence,setLrMouseInfluence,2],['Noise Amount','',0,1,0.05,lrNoise,setLrNoise,2],['Distortion','',0,1,0.05,lrDistortion,setLrDistortion,2]].map(([label,,min,max,step,val,setter,dec]: any) => (
                  <div key={label}><div className="flex justify-between text-[10px] font-mono mb-1 text-zinc-400"><span>{label}</span><span>{dec ? (val as number).toFixed(dec) : val}</span></div><input type="range" min={min} max={max} step={step} value={val as number} onChange={e => (setter as Function)(Number(e.target.value))} className="w-full" /></div>
                ))}
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Pulsating</span><input type="checkbox" checked={lrPulsating} onChange={e => setLrPulsating(e.target.checked)} className="cursor-pointer" /></div>
                <div className="flex items-center justify-between py-1"><span className="text-[10px] font-mono text-zinc-400">Follow Mouse</span><input type="checkbox" checked={lrFollowMouse} onChange={e => setLrFollowMouse(e.target.checked)} className="cursor-pointer" /></div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="space-y-2 mt-6 pt-4 border-t border-zinc-900/65 shrink-0 bg-black/80">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={handleReset} className="flex items-center justify-center gap-1.5 py-2 px-3 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 rounded-lg text-xs font-mono font-semibold cursor-pointer transition-colors"><RotateCcw className="w-3.5 h-3.5 text-zinc-500" /><span>Reset</span></button>
            <button onClick={handleShare} className="flex items-center justify-center gap-1.5 py-2 px-3 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 rounded-lg text-xs font-mono font-semibold cursor-pointer transition-colors"><Share2 className="w-3.5 h-3.5 text-zinc-500" /><span>Share</span></button>
          </div>
          <button onClick={() => { setActiveExportTab('usage'); setIsExportOpen(true); }} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-mono font-semibold text-xs transition-colors cursor-pointer">
            <Code className="w-4 h-4" /><span>Export Code</span>
          </button>
        </div>
      </div>

      {/* CANVAS PREVIEW */}
      <div ref={canvasParentRef} style={{ backgroundColor: canvasBg }} className="flex-1 h-full min-w-0 relative z-0 overflow-hidden transition-colors duration-300">
        {activeBg === 'blinds' && <GradientBlinds gradientColors={colors} angle={angle} noise={noise} blindCount={blindCount} blindMinWidth={blindMinWidth} mouseDampening={mouseDampening} mirrorGradient={mirrorGradient} spotlightRadius={spotlightRadius} spotlightSoftness={spotlightSoftness} spotlightOpacity={spotlightOpacity} distortAmount={distortAmount} shineDirection={shineDirection} />}
        {activeBg === 'pb' && <ParticleBurst canvasBg={canvasBg} particleCount={pbCount} magnetRadius={pbMagnetRadius} ringRadius={pbRingRadius} waveSpeed={pbWaveSpeed} waveAmplitude={pbWaveAmplitude} particleSize={pbParticleSize} lerpSpeed={pbLerpSpeed} color={colors[0]||'#ff9ffc'} autoAnimate={pbAutoAnimate} particleVariance={pbVariance} rotationSpeed={pbRotationSpeed} depthFactor={pbDepthFactor} pulseSpeed={pbPulseSpeed} particleShape={pbShape} fieldStrength={pbFieldStrength} />}
        {activeBg === 'bends' && <ColorBends rotation={cbRotation} speed={cbSpeed} colors={colors} transparent={cbTransparent} autoRotate={cbAutoRotate} scale={cbScale} frequency={cbFrequency} warpStrength={cbWarpStrength} mouseInfluence={cbMouseInfluence} parallax={cbParallax} noise={cbNoise} iterations={cbIterations} intensity={cbIntensity} bandWidth={cbBandWidth} />}
        {activeBg === 'dot' && <DotField canvasBg={canvasBg} dotRadius={dfDotRadius} dotSpacing={dfDotSpacing} cursorRadius={dfCursorRadius} cursorForce={dfCursorForce} bulgeOnly={dfBulgeOnly} bulgeStrength={dfBulgeStrength} glowRadius={dfGlowRadius} sparkle={dfSparkle} waveAmplitude={dfWaveAmplitude} glowColor={dfGlowColor} />}
        {activeBg === 'lines' && <FloatingLines linesGradient={colors} animationSpeed={flSpeed} interactive={flInteractive} bendRadius={flBendRadius} bendStrength={flBendStrength} mouseDamping={flMouseDamping} parallax={flParallax} parallaxStrength={flParallaxStrength} />}
        {activeBg === 'laser' && <LaserFlow color={colors[0]||'#FF79C6'} wispDensity={lfWispDensity} flowSpeed={lfFlowSpeed} verticalSizing={lfVerticalSizing} horizontalSizing={lfHorizontalSizing} fogIntensity={lfFogIntensity} fogScale={lfFogScale} wispSpeed={lfWispSpeed} wispIntensity={lfWispIntensity} flowStrength={lfFlowStrength} decay={lfDecay} horizontalBeamOffset={lfHorizontalBeamOffset} verticalBeamOffset={lfVerticalBeamOffset} />}
        {activeBg === 'rays' && <LightRays raysOrigin={lrOrigin} raysColor={colors[0]||'#ffffff'} raysSpeed={lrSpeed} lightSpread={lrSpread} rayLength={lrLength} pulsating={lrPulsating} fadeDistance={lrFadeDistance} saturation={lrSaturation} followMouse={lrFollowMouse} mouseInfluence={lrMouseInfluence} noiseAmount={lrNoise} distortion={lrDistortion} />}

        {/* Mock Hero Landing Page Overlay from Image Reference */}
        {showHeroOverlay && (
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 z-[2] pointer-events-none select-none text-white">
            {/* Header Navbar */}
            <div className="w-full max-w-4xl mx-auto flex items-center justify-between bg-zinc-950/40 border border-zinc-800/50 backdrop-blur-md rounded-2xl px-5 py-3 pointer-events-auto select-none">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-zinc-200 animate-spin-slow shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="50" cy="50" rx="15" ry="40" stroke="currentColor" strokeWidth="6" transform="rotate(30 50 50)" />
                  <ellipse cx="50" cy="50" rx="15" ry="40" stroke="currentColor" strokeWidth="6" transform="rotate(90 50 50)" />
                  <ellipse cx="50" cy="50" rx="15" ry="40" stroke="currentColor" strokeWidth="6" transform="rotate(150 50 50)" />
                  <circle cx="50" cy="50" r="6" fill="currentColor" />
                </svg>
                <span className="font-sans font-bold tracking-tight text-sm text-white">React Bits</span>
              </div>
              
              {/* Menu Links */}
              <div className="hidden sm:flex items-center gap-6">
                <a href="#features" className="text-xs text-zinc-400 hover:text-white transition-colors">Features</a>
                <a href="#about" className="text-xs text-zinc-400 hover:text-white transition-colors">About</a>
              </div>
              
              {/* Action Button */}
              <div>
                <button className="px-4 py-1.5 bg-white text-black hover:bg-zinc-200 text-xs font-semibold rounded-full transition-all duration-150">
                  Sign up
                </button>
              </div>
            </div>

            {/* Hero Main Content */}
            <div className="w-full max-w-2xl mx-auto text-center my-auto flex flex-col items-center justify-center pointer-events-auto mt-16 sm:mt-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800/60 bg-zinc-950/40 backdrop-blur-sm text-[11px] mb-6">
                <span className="bg-white text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-full leading-none">NEW</span>
                <span className="text-zinc-350">Just shipped v2.0</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-8 font-sans max-w-xl sm:max-w-2xl">
                You have the power to reshape your own destiny
              </h1>
              
              {/* CTA Buttons */}
              <div className="flex items-center gap-3.5 justify-center">
                <button className="px-6 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors text-xs sm:text-sm">
                  Get started
                </button>
                <button className="px-6 py-2.5 bg-violet-600/30 hover:bg-violet-650/45 text-white font-semibold rounded-full border border-violet-500/50 backdrop-blur-sm transition-all text-xs sm:text-sm shadow-lg shadow-violet-950/20">
                  Learn more
                </button>
              </div>
            </div>

            {/* Spacer */}
            <div className="h-12 hidden sm:block" />
          </div>
        )}

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-black/60 border border-zinc-800/80 backdrop-blur-md px-3 py-1.5 rounded-md text-[10px] font-mono text-zinc-350 font-bold uppercase select-none pointer-events-none">
          {PRESET_LABELS[activeBg]}
        </div>

        {/* Floating Toggle Button */}
        <button 
          onClick={() => setShowHeroOverlay(!showHeroOverlay)} 
          className="absolute top-4 right-4 bg-black/60 border border-zinc-800/80 hover:bg-zinc-900 hover:text-white backdrop-blur-md px-3 py-1.5 rounded-md text-[10px] font-mono text-zinc-350 font-bold uppercase select-none z-10 transition-colors cursor-pointer"
        >
          {showHeroOverlay ? 'Hide Hero Overlay' : 'Show Hero Overlay'}
        </button>
      </div>

      {/* EXPORT MODAL */}
      {isExportOpen && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in-0 duration-200">
          <div className="bg-zinc-950 border border-zinc-850 rounded-xl w-full max-w-2xl h-[480px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900">
              <div className="flex items-center gap-2"><Code className="w-4 h-4 text-violet-500" /><span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-200">Export Background Code</span></div>
              <button onClick={() => setIsExportOpen(false)} className="p-1 hover:bg-zinc-900 rounded text-zinc-500 hover:text-zinc-200 cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-900">
              <div className="flex gap-1">
                {(['cli','usage','component', 'css'] as const).map(tab => {
                  if (tab === 'css' && !hasCssTab) return null;
                  return (
                    <button key={tab} onClick={() => setActiveExportTab(tab)} className={cn('px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer transition-colors', activeExportTab === tab ? 'bg-zinc-900 text-zinc-100 font-bold border border-zinc-800' : 'text-zinc-500 hover:text-zinc-300')}>
                      {tab === 'cli' ? 'CLI Installation' : tab === 'usage' ? 'Component Usage' : tab === 'component' ? 'Component Source (.tsx)' : 'CSS Style (.css)'}
                    </button>
                  );
                })}
              </div>
              <button onClick={handleCopyCode} className="flex items-center gap-1.5 px-3 py-1 rounded bg-violet-600 hover:bg-violet-500 text-[10px] font-mono text-white cursor-pointer transition-colors">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}<span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <div className="flex-1 bg-black p-4 overflow-auto font-mono text-xs text-zinc-400 select-text"><pre>{getExportCode()}</pre></div>
          </div>
        </div>
      )}
    </div>
  );
}
