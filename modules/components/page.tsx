import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Code, RotateCcw, Copy, Check, Sliders, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import UI presets
import { AnimatedList } from '@/components/ui/AnimatedList';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import BubbleMenu from '@/components/ui/BubbleMenu';
import MagicBento from '@/components/ui/MagicBento';
import SparkleButton from '@/components/ui/SparkleButton';
import JapaneseMatrix from '@/components/ui/JapaneseMatrix';
import BackToTop from '@/components/ui/BackToTop';
import GlassAppButtons from '@/components/ui/GlassAppButtons';
import Strands from '@/components/ui/Strands';
import Magnet from '@/components/ui/Magnet';
import FluidGlass from '@/components/ui/FluidGlass';

// TYPES
type ComponentTab = 'preview' | 'code';
type ExportTab = 'react' | 'css' | 'usage';

interface ControlField {
  id: string;
  label: string;
  type: 'slider' | 'toggle' | 'color' | 'select';
  default: any;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}

interface ComponentConfig {
  id: string;
  name: string;
  description: string;
  controls: ControlField[];
}

const COMPONENTS: ComponentConfig[] = [
  {
    id: 'animated-list',
    name: 'Animated List',
    description: 'Entrance animation transitions for list container layouts.',
    controls: [
      { id: 'showGradients', label: 'Show Gradients', type: 'toggle', default: true },
      { id: 'enableArrowNavigation', label: 'Enable Arrow Navigation', type: 'toggle', default: true },
      { id: 'displayScrollbar', label: 'Display Scrollbar', type: 'toggle', default: true },
      { id: 'initialSelectedIndex', label: 'Initial Selected Index', type: 'slider', default: -1, min: -1, max: 14, step: 1 }
    ]
  },
  {
    id: 'scroll-stack',
    name: 'Scroll Stack',
    description: 'Overlapping layout where cards shift and stack as you scroll.',
    controls: [
      { id: 'itemDistance', label: 'Item Distance (px)', type: 'slider', default: 100, min: 20, max: 200, step: 10 },
      { id: 'itemScale', label: 'Item Scale increment', type: 'slider', default: 0.03, min: 0.01, max: 0.1, step: 0.01 },
      { id: 'itemStackDistance', label: 'Item Stack Distance', type: 'slider', default: 30, min: 10, max: 80, step: 5 },
      { id: 'baseScale', label: 'Base Scale factor', type: 'slider', default: 0.85, min: 0.5, max: 1.0, step: 0.05 },
      { id: 'rotationAmount', label: 'Rotation amount (deg)', type: 'slider', default: 0, min: -15, max: 15, step: 1 },
      { id: 'blurAmount', label: 'Blur amount (px)', type: 'slider', default: 0, min: 0, max: 8, step: 1 }
    ]
  },
  {
    id: 'bubble-menu',
    name: 'Bubble Menu',
    description: 'Horizontal navigation menu with a sliding bubble backplate.',
    controls: [
      { id: 'menuBg', label: 'Menu Bg Color', type: 'color', default: '#ffffff' },
      { id: 'menuContentColor', label: 'Menu Content Color', type: 'color', default: '#111111' },
      { id: 'animationDuration', label: 'Animation Duration (s)', type: 'slider', default: 0.5, min: 0.1, max: 2.0, step: 0.1 },
      { id: 'staggerDelay', label: 'Stagger Delay (s)', type: 'slider', default: 0.12, min: 0.02, max: 0.5, step: 0.02 }
    ]
  },
  {
    id: 'magic-bento',
    name: 'Magic Bento',
    description: 'Interactive Bento dashboard grid with 3D parallax and glowing borders.',
    controls: [
      { id: 'textAutoHide', label: 'Text Auto Hide', type: 'toggle', default: true },
      { id: 'enableStars', label: 'Enable Stars', type: 'toggle', default: true },
      { id: 'enableSpotlight', label: 'Enable Spotlight', type: 'toggle', default: true },
      { id: 'enableBorderGlow', label: 'Enable Border Glow', type: 'toggle', default: true },
      { id: 'enableTilt', label: 'Enable Tilt', type: 'toggle', default: false },
      { id: 'enableMagnetism', label: 'Enable Magnetism', type: 'toggle', default: true },
      { id: 'clickEffect', label: 'Click Effect', type: 'toggle', default: true },
      { id: 'spotlightRadius', label: 'Spotlight Radius (px)', type: 'slider', default: 300, min: 100, max: 600, step: 20 },
      { id: 'particleCount', label: 'Particle Count', type: 'slider', default: 12, min: 4, max: 32, step: 2 },
      { id: 'glowColor', label: 'Glow Color Accent', type: 'color', default: '#8400ff' }
    ]
  },
  {
    id: 'strands',
    name: 'Strands',
    description: 'Dynamic flowing strands of glowing light (uses OGL framework).',
    controls: [
      { id: 'count', label: 'Strand Count', type: 'slider', default: 3, min: 1, max: 12, step: 1 },
      { id: 'speed', label: 'Speed multiplier', type: 'slider', default: 0.5, min: 0.1, max: 2.0, step: 0.1 },
      { id: 'amplitude', label: 'Wave Amplitude', type: 'slider', default: 1.0, min: 0.2, max: 3.0, step: 0.1 },
      { id: 'waviness', label: 'Waviness density', type: 'slider', default: 1.0, min: 0.2, max: 3.0, step: 0.1 },
      { id: 'thickness', label: 'Thickness factor', type: 'slider', default: 0.7, min: 0.1, max: 3.0, step: 0.1 },
      { id: 'glow', label: 'Glow intensity', type: 'slider', default: 2.6, min: 0.5, max: 5.0, step: 0.1 },
      { id: 'taper', label: 'Taper curve', type: 'slider', default: 3.0, min: 0.5, max: 10.0, step: 0.5 },
      { id: 'spread', label: 'Strand Spread', type: 'slider', default: 1.0, min: 0.2, max: 3.0, step: 0.1 },
      { id: 'scale', label: 'Overall scale', type: 'slider', default: 1.5, min: 0.5, max: 3.0, step: 0.1 },
      { id: 'glass', label: 'Enable Glass Orb', type: 'toggle', default: false },
      { id: 'refraction', label: 'Glass Refraction', type: 'slider', default: 1.0, min: 0.0, max: 3.0, step: 0.1 },
      { id: 'dispersion', label: 'Glass Dispersion', type: 'slider', default: 1.0, min: 0.0, max: 3.0, step: 0.1 },
      { id: 'glassSize', label: 'Glass Sphere size', type: 'slider', default: 1.0, min: 0.2, max: 2.0, step: 0.1 }
    ]
  },
  {
    id: 'magnet',
    name: 'Magnet',
    description: 'An interactive pull element that tracks proximity to mouse cursor.',
    controls: [
      { id: 'padding', label: 'Active Proximity Padding (px)', type: 'slider', default: 100, min: 20, max: 300, step: 10 },
      { id: 'disabled', label: 'Disable Magnet effect', type: 'toggle', default: false },
      { id: 'magnetStrength', label: 'Magnet pull damping factor', type: 'slider', default: 2, min: 1, max: 10, step: 1 }
    ]
  },
  {
    id: 'fluid-glass',
    name: 'Fluid Glass',
    description: 'Immersive 3D liquid glass morphic refraction effect (uses Three.js & Fiber).',
    controls: [
      { id: 'mode', label: 'Display Mode', type: 'select', default: 'lens', options: ['lens', 'cube', 'bar'] },
      { id: 'bgColor', label: 'Background Color', type: 'color', default: '#09090b' },
      { id: 'scale', label: 'Material Scale', type: 'slider', default: 0.25, min: 0.05, max: 0.5, step: 0.05 },
      { id: 'ior', label: 'Index of Refraction (ior)', type: 'slider', default: 1.15, min: 0.8, max: 2.0, step: 0.05 },
      { id: 'thickness', label: 'Transmission Thickness', type: 'slider', default: 5, min: 0.5, max: 15, step: 0.5 },
      { id: 'chromaticAberration', label: 'Chromatic Aberration', type: 'slider', default: 0.1, min: 0, max: 1.0, step: 0.05 },
      { id: 'anisotropy', label: 'Anisotropy Refraction', type: 'slider', default: 0.01, min: 0, max: 0.1, step: 0.005 }
    ]
  },
  {
    id: 'sparkle-button',
    name: 'Sparkle Button',
    description: 'A button with sparkling particles and micro-animations.',
    controls: []
  },
  {
    id: 'japanese-matrix',
    name: 'Matrix Rain',
    description: 'Falling digital rain made of random Japanese characters.',
    controls: []
  },
  {
    id: 'back-to-top',
    name: 'Back to Top',
    description: 'An expandable pill-to-circle layout button.',
    controls: []
  },
  {
    id: 'glass-app-buttons',
    name: 'Glass App Buttons',
    description: 'Neo-glassmorphic app button selectors with hovering gradient highlights.',
    controls: []
  }
];

// Color converter helper
const hexToRgbStr = (hex: string): string => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? `${result[1] ? parseInt(result[1], 16) : 132}, ${result[2] ? parseInt(result[2], 16) : 0}, ${result[3] ? parseInt(result[3], 16) : 255}`
    : '132, 0, 255';
};

export default function ComponentsPage() {
  const [activeAnimId, setActiveAnimId] = useState<string>('animated-list');
  const [activeTab, setActiveTab] = useState<ComponentTab>('preview');
  const [exportTab, setExportTab] = useState<ExportTab>('react');
  const [copied, setCopied] = useState<boolean>(false);
  const [triggerKey, setTriggerKey] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [controlValues, setControlValues] = useState<Record<string, any>>({});

  const activeConfig = COMPONENTS.find(c => c.id === activeAnimId) || COMPONENTS[0];

  // Initialize controls
  useEffect(() => {
    const initialValues: Record<string, any> = {};
    activeConfig.controls.forEach(c => {
      initialValues[c.id] = c.default;
    });
    setControlValues(initialValues);
    setTriggerKey(prev => prev + 1);
  }, [activeAnimId]);

  const handleControlChange = (controlId: string, val: any) => {
    setControlValues(prev => ({
      ...prev,
      [controlId]: val
    }));
  };

  const handleReset = () => {
    const defaultValues: Record<string, any> = {};
    activeConfig.controls.forEach(c => {
      defaultValues[c.id] = c.default;
    });
    setControlValues(defaultValues);
    setTriggerKey(prev => prev + 1);
    showToastNotification('Component state reset');
  };

  const showToastNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCopyCode = () => {
    const code = generateSourceCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    showToastNotification('Source code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  // SOURCE CODE GENERATOR
  const generateSourceCode = (): string => {
    if (exportTab === 'usage') {
      switch (activeAnimId) {
        case 'animated-list':
          return `import AnimatedList from './AnimatedList';

export default function Demo() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'];

  return (
    <div className="flex items-center justify-center min-h-[300px] bg-black text-white p-6">
      <AnimatedList
        items={items}
        onItemSelect={(item, index) => console.log(item, index)}
        showGradients={${controlValues.showGradients !== false}}
        enableArrowNavigation={${controlValues.enableArrowNavigation !== false}}
        displayScrollbar={${controlValues.displayScrollbar !== false}}
        initialSelectedIndex={${controlValues.initialSelectedIndex !== undefined ? controlValues.initialSelectedIndex : -1}}
      />
    </div>
  );
}`;

        case 'scroll-stack':
          return `import ScrollStack, { ScrollStackItem } from './ScrollStack';

export default function Demo() {
  return (
    <ScrollStack
      itemDistance={${controlValues.itemDistance ?? 100}}
      itemScale={${controlValues.itemScale ?? 0.03}}
      itemStackDistance={${controlValues.itemStackDistance ?? 30}}
      baseScale={${controlValues.baseScale ?? 0.85}}
      rotationAmount={${controlValues.rotationAmount ?? 0}}
      blurAmount={${controlValues.blurAmount ?? 0}}
    >
      <ScrollStackItem>
        <h2>Card 1</h2>
        <p>This is the first card in the stack</p>
      </ScrollStackItem>
      <ScrollStackItem>
        <h2>Card 2</h2>
        <p>This is the second card in the stack</p>
      </ScrollStackItem>
      <ScrollStackItem>
        <h2>Card 3</h2>
        <p>This is the third card in the stack</p>
      </ScrollStackItem>
    </ScrollStack>
  );
}`;

        case 'bubble-menu':
          return `import BubbleMenu from './BubbleMenu';

export default function Demo() {
  const items = [
    { label: 'home', href: '#', ariaLabel: 'Home', rotation: -8, hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' } },
    { label: 'about', href: '#', ariaLabel: 'About', rotation: 8, hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' } },
    { label: 'projects', href: '#', ariaLabel: 'Projects', rotation: 8, hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' } },
    { label: 'contact', href: '#', ariaLabel: 'Contact', rotation: -8, hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' } }
  ];

  return (
    <BubbleMenu
      logo={<span style={{ fontWeight: 700 }}>RB</span>}
      items={items}
      menuBg="${controlValues.menuBg || '#ffffff'}"
      menuContentColor="${controlValues.menuContentColor || '#111111'}"
      useFixedPosition={false}
      animationEase="back.out(1.5)"
      animationDuration={${controlValues.animationDuration ?? 0.5}}
      staggerDelay={${controlValues.staggerDelay ?? 0.12}}
    />
  );
}`;

        case 'magic-bento':
          return `import MagicBento from './MagicBento';

export default function Demo() {
  return (
    <MagicBento 
      textAutoHide={${controlValues.textAutoHide !== false}}
      enableStars={${controlValues.enableStars !== false}}
      enableSpotlight={${controlValues.enableSpotlight !== false}}
      enableBorderGlow={${controlValues.enableBorderGlow !== false}}
      enableTilt={${controlValues.enableTilt === true}}
      enableMagnetism={${controlValues.enableMagnetism !== false}}
      clickEffect={${controlValues.clickEffect !== false}}
      spotlightRadius={${controlValues.spotlightRadius ?? 300}}
      particleCount={${controlValues.particleCount ?? 12}}
      glowColor="${hexToRgbStr(controlValues.glowColor || '#8400ff')}"
    />
  );
}`;

        case 'strands':
          return `import Strands from './Strands';

export default function Demo() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Strands
        colors={["#FF4242", "#7C3AED", "#06B6D4", "#EAB308"]}
        count={${controlValues.count ?? 3}}
        speed={${controlValues.speed ?? 0.5}}
        amplitude={${controlValues.amplitude ?? 1}}
        waviness={${controlValues.waviness ?? 1}}
        thickness={${controlValues.thickness ?? 0.7}}
        glow={${controlValues.glow ?? 2.6}}
        taper={${controlValues.taper ?? 3}}
        spread={${controlValues.spread ?? 1}}
        scale={${controlValues.scale ?? 1.5}}
        glass={${controlValues.glass === true}}
        refraction={${controlValues.refraction ?? 1}}
        dispersion={${controlValues.dispersion ?? 1}}
        glassSize={${controlValues.glassSize ?? 1}}
      />
    </div>
  );
}`;

        case 'magnet':
          return `import Magnet from './Magnet';

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[200px] bg-black text-white">
      <Magnet
        padding={${controlValues.padding ?? 100}}
        disabled={${controlValues.disabled === true}}
        magnetStrength={${controlValues.magnetStrength ?? 2}}
      >
        <p>Star React Bits on GitHub!</p>
      </Magnet>
    </div>
  );
}`;

        case 'fluid-glass':
          return `import FluidGlass from './FluidGlass';

export default function Demo() {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <FluidGlass 
        mode="${controlValues.mode || 'lens'}"
        bgColor="${controlValues.bgColor || '#09090b'}"
        lensProps={{
          scale: ${controlValues.scale ?? 0.25},
          ior: ${controlValues.ior ?? 1.15},
          thickness: ${controlValues.thickness ?? 5},
          chromaticAberration: ${controlValues.chromaticAberration ?? 0.1},
          anisotropy: ${controlValues.anisotropy ?? 0.01}
        }}
        barProps={{
          scale: ${controlValues.scale ?? 0.25},
          ior: ${controlValues.ior ?? 1.15},
          thickness: ${controlValues.thickness ?? 5},
          chromaticAberration: ${controlValues.chromaticAberration ?? 0.1},
          anisotropy: ${controlValues.anisotropy ?? 0.01}
        }}
        cubeProps={{
          scale: ${controlValues.scale ?? 0.25},
          ior: ${controlValues.ior ?? 1.15},
          thickness: ${controlValues.thickness ?? 5},
          chromaticAberration: ${controlValues.chromaticAberration ?? 0.1},
          anisotropy: ${controlValues.anisotropy ?? 0.01}
        }}
      />
    </div>
  );
}`;

        case 'sparkle-button':
          return `import SparkleButton from './SparkleButton';

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[150px]">
      <SparkleButton />
    </div>
  );
}`;

        case 'japanese-matrix':
          return `import JapaneseMatrix from './JapaneseMatrix';

export default function Demo() {
  return (
    <div className="w-full max-w-md mx-auto">
      <JapaneseMatrix />
    </div>
  );
}`;

        case 'back-to-top':
          return `import BackToTop from './BackToTop';

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[150px]">
      <BackToTop />
    </div>
  );
}`;

        case 'glass-app-buttons':
          return `import GlassAppButtons from './GlassAppButtons';

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[150px] bg-black">
      <GlassAppButtons />
    </div>
  );
}`;
      }
    }

    if (exportTab === 'css') {
      switch (activeAnimId) {
        case 'animated-list':
          return `.scroll-list-container {
  position: relative;
  width: 500px;
}

.scroll-list {
  max-height: 400px;
  overflow-y: auto;
  padding: 16px;
}

.scroll-list::-webkit-scrollbar {
  width: 8px;
}

.scroll-list::-webkit-scrollbar-track {
  background: #120F17;
}

.scroll-list::-webkit-scrollbar-thumb {
  background: #2F293A;
  border-radius: 4px;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.item {
  padding: 16px;
  background-color: #2F293A;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.item.selected {
  background-color: #2F293A;
}

.item-text {
  color: white;
  margin: 0;
}

.top-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(to bottom, #120F17, transparent);
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.bottom-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to top, #120F17, transparent);
  pointer-events: none;
  transition: opacity 0.3s ease;
}`;

        case 'scroll-stack':
          return `.scroll-stack-scroller {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: visible;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  will-change: scroll-position;
}

.scroll-stack-inner {
  padding: 20vh 5rem 50rem;
  min-height: 100vh;
}

.scroll-stack-card-wrapper {
  position: relative;
}

.scroll-stack-card {
  transform-origin: top center;
  will-change: transform, filter;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  height: 20rem;
  width: 100%;
  margin: 30px 0;
  padding: 3rem;
  border-radius: 40px;
  box-sizing: border-box;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  position: relative;
}

.scroll-stack-end {
  width: 100%;
  height: 1px;
}`;

        case 'bubble-menu':
          return `.bubble-menu {
  left: 0;
  right: 0;
  top: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 2em;
  pointer-events: none;
  z-index: 99;
}

.bubble-menu.fixed {
  position: fixed;
}

.bubble-menu.absolute {
  position: absolute;
}

.bubble-menu .bubble {
  --bubble-size: 48px;
  width: var(--bubble-size);
  height: var(--bubble-size);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.bubble-menu .logo-bubble,
.bubble-menu .toggle-bubble {
  will-change: transform;
}

.bubble-menu .logo-bubble {
  width: auto;
  min-height: var(--bubble-size);
  height: var(--bubble-size);
  padding: 0 16px;
  border-radius: calc(var(--bubble-size) / 2);
  gap: 8px;
}

.bubble-menu .toggle-bubble {
  width: var(--bubble-size);
  height: var(--bubble-size);
}

.bubble-menu .bubble-logo {
  max-height: 60%;
  max-width: 100%;
  object-fit: contain;
  display: block;
}

.bubble-menu .logo-content {
  --logo-max-height: 60%;
  --logo-max-width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 100%;
}

.bubble-menu .logo-content > .bubble-logo,
.bubble-menu .logo-content > img,
.bubble-menu .logo-content > svg {
  max-height: var(--logo-max-height);
  max-width: var(--logo-max-width);
}

.bubble-menu .menu-btn {
  border: none;
  background: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.bubble-menu .menu-line {
  width: 26px;
  height: 2px;
  background: #111;
  border-radius: 2px;
  display: block;
  margin: 0 auto;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  transform-origin: center;
}

.bubble-menu .menu-line + .menu-line {
  margin-top: 6px;
}

.bubble-menu .menu-btn.open .menu-line:first-child {
  transform: translateY(4px) rotate(45deg);
}

.bubble-menu .menu-btn.open .menu-line:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

@media (min-width: 768px) {
  .bubble-menu .bubble {
    --bubble-size: 56px;
  }

  .bubble-menu .logo-bubble {
    padding: 0 16px;
  }
}

.bubble-menu-items {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 98;
}

.bubble-menu-items.fixed {
  position: fixed;
}

.bubble-menu-items.absolute {
  position: absolute;
}

.bubble-menu-items .pill-list {
  list-style: none;
  margin: 0;
  padding: 0 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  row-gap: 4px;
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  pointer-events: auto;
  justify-content: stretch;
}

.bubble-menu-items .pill-list .pill-spacer {
  width: 100%;
  height: 0;
  pointer-events: none;
}

.bubble-menu-items .pill-list .pill-col {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex: 0 0 calc(100% / 3);
  box-sizing: border-box;
}

.bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {
  margin-left: calc(100% / 6);
}

.bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {
  margin-left: calc(100% / 3);
}

.bubble-menu-items .pill-link {
  --pill-bg: #ffffff;
  --pill-color: #111;
  --pill-border: rgba(0, 0, 0, 0.12);
  --item-rot: 0deg;
  --pill-min-h: 160px;
  --hover-bg: #f3f4f6;
  --hover-color: #111;
  width: 100%;
  min-height: var(--pill-min-h);
  padding: clamp(1.5rem, 3vw, 8rem) 0;
  font-size: clamp(1.5rem, 4vw, 4rem);
  font-weight: 400;
  line-height: 0;
  border-radius: 999px;
  background: var(--pill-bg);
  color: var(--pill-color);
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition:
    background 0.3s ease,
    color 0.3s ease;
  will-change: transform;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  height: 10px;
}

@media (min-width: 900px) {
  .bubble-menu-items .pill-link {
    transform: rotate(var(--item-rot));
  }

  .bubble-menu-items .pill-link:hover {
    transform: rotate(var(--item-rot)) scale(1.06);
    background: var(--hover-bg);
    color: var(--hover-color);
  }

  .bubble-menu-items .pill-link:active {
    transform: rotate(var(--item-rot)) scale(0.94);
  }
}

.bubble-menu-items .pill-link .pill-label {
  display: inline-block;
  will-change: transform, opacity;
  height: 1.2em;
  line-height: 1.2;
}

@media (max-width: 899px) {
  .bubble-menu-items {
    padding-top: 0px;
    align-items: flex-start;
    padding-top: 120px;
  }

  .bubble-menu-items .pill-list {
    row-gap: 16px;
  }

  .bubble-menu-items .pill-list .pill-col {
    flex: 0 0 100%;
    margin-left: 0 !important;
    overflow: visible;
  }

  .bubble-menu-items .pill-link {
    font-size: clamp(1.2rem, 3vw, 4rem);
    padding: clamp(1rem, 2vw, 2rem) 0;
    min-height: 80px;
  }

  .bubble-menu-items .pill-link:hover {
    transform: scale(1.06);
    background: var(--hover-bg);
    color: var(--hover-color);
  }

  .bubble-menu-items .pill-link:active {
    transform: scale(0.94);
  }
}
`;

        case 'magic-bento':
          return `:root {
  --hue: 27;
  --sat: 69%;
  --white: hsl(0, 0%, 100%);
  --purple-primary: rgba(132, 0, 255, 1);
  --purple-glow: rgba(132, 0, 255, 0.2);
  --purple-border: rgba(132, 0, 255, 0.8);
  --border-color: #2F293A;
  --background-dark: #120F17;
  color-scheme: light dark;
}

.card-grid {
  display: grid;
  gap: 0.5em;
  padding: 0.75em;
  max-width: 54em;
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.5rem);
}

.magic-bento-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  aspect-ratio: 4/3;
  min-height: 200px;
  width: 100%;
  max-width: 100%;
  padding: 1.25em;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  background: var(--background-dark);
  font-weight: 300;
  overflow: hidden;
  transition: all 0.3s ease;

  --glow-x: 50%;
  --glow-y: 50%;
  --glow-intensity: 0;
  --glow-radius: 200px;
}

.magic-bento-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.magic-bento-card__header,
.magic-bento-card__content {
  display: flex;
  position: relative;
  color: var(--white);
}

.magic-bento-card__header {
  gap: 0.75em;
  justify-content: space-between;
}

.magic-bento-card__content {
  flex-direction: column;
}

.magic-bento-card__label {
  font-size: 16px;
}

.magic-bento-card__title,
.magic-bento-card__description {
  --clamp-title: 1;
  --clamp-desc: 2;
}

.magic-bento-card__title {
  font-weight: 400;
  font-size: 16px;
  margin: 0 0 0.25em;
}

.magic-bento-card__description {
  font-size: 12px;
  line-height: 1.2;
  opacity: 0.9;
}

.magic-bento-card--text-autohide .magic-bento-card__title,
.magic-bento-card--text-autohide .magic-bento-card__description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.magic-bento-card--text-autohide .magic-bento-card__title {
  -webkit-line-clamp: var(--clamp-title);
  line-clamp: var(--clamp-title);
}

.magic-bento-card--text-autohide .magic-bento-card__description {
  -webkit-line-clamp: var(--clamp-desc);
  line-clamp: var(--clamp-desc);
}

@media (max-width: 599px) {
  .card-grid {
    grid-template-columns: 1fr;
    width: 90%;
    margin: 0 auto;
    padding: 0.5em;
  }

  .magic-bento-card {
    width: 100%;
    min-height: 180px;
  }
}

@media (min-width: 600px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .magic-bento-card:nth-child(3) {
    grid-column: span 2;
    grid-row: span 2;
  }

  .magic-bento-card:nth-child(4) {
    grid-column: 1 / span 2;
    grid-row: 2 / span 2;
  }

  .magic-bento-card:nth-child(6) {
    grid-column: 4;
    grid-row: 3;
  }
}

.magic-bento-card--border-glow::after {
  content: '';
  position: absolute;
  inset: 0;
  padding: 6px;
  background: radial-gradient(
    var(--glow-radius) circle at var(--glow-x) var(--glow-y),
    rgba(132, 0, 255, calc(var(--glow-intensity) * 0.8)) 0%,
    rgba(132, 0, 255, calc(var(--glow-intensity) * 0.4)) 30%,
    transparent 60%
  );
  border-radius: inherit;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.magic-bento-card--border-glow:hover::after {
  opacity: 1;
}

.magic-bento-card--border-glow:hover {
  box-shadow:
    0 4px 20px rgba(46, 24, 78, 0.4),
    0 0 30px var(--purple-glow);
}

.particle-container {
  position: relative;
  overflow: hidden;
}

.particle::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: rgba(132, 0, 255, 0.2);
  border-radius: 50%;
  z-index: -1;
}

.particle-container:hover {
  box-shadow:
    0 4px 20px rgba(46, 24, 78, 0.2),
    0 0 30px var(--purple-glow);
}

.global-spotlight {
  mix-blend-mode: screen;
  will-change: transform, opacity;
  z-index: 200 !important;
  pointer-events: none;
}

.bento-section {
  position: relative;
  user-select: none;
}`;

        case 'strands':
          return `.strands-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: transparent;
}

.strands-container canvas {
  display: block;
  width: 100%;
  height: 100%;
}`;

        case 'magnet':
          return `/* This component is fully styled using inline dynamic styles. No additional CSS stylesheets are required. */`;

        case 'fluid-glass':
          return `/* This component is fully styled using inline dynamic styles. No additional CSS stylesheets are required. */`;

        case 'sparkle-button':
          return `.sparkle-button {
  --active: 0;
  --bg: radial-gradient(
      40% 50% at center 100%,
      hsl(270 calc(var(--active) * 97%) 72% / var(--active)),
      transparent
    ),
    radial-gradient(
      80% 100% at center 120%,
      hsl(260 calc(var(--active) * 97%) 70% / var(--active)),
      transparent
    ),
    hsl(260 calc(var(--active) * 97%) calc((var(--active) * 44%) + 12%));
  background: var(--bg);
  font-size: 1.2rem;
  font-weight: 500;
  border: 0;
  cursor: pointer;
  padding: 1em 2em;
  display: flex;
  align-items: center;
  gap: 0.25em;
  white-space: nowrap;
  border-radius: 100px;
  position: relative;
  box-shadow: 0 0 calc(var(--active) * 3em) calc(var(--active) * 1em) hsl(260 97% 61% / 0.75),
    0 0em 0 0 hsl(260 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset,
    0 -0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc(var(--active) * 60%)) inset;
  transition: box-shadow 0.3s, scale 0.3s, background 0.3s;
  scale: calc(1 + (var(--active) * 0.1));
}

.sparkle-button:active {
  scale: 1;
  transition: .3s;
}

.sparkle path {
  color: hsl(0 0% calc((var(--active, 0) * 70%) + var(--base)));
  transform-box: fill-box;
  transform-origin: center;
  fill: currentColor;
  stroke: currentColor;
  animation-delay: calc((0.3s * 1.5) + (var(--delay) * 1s));
  animation-duration: 0.6s;
  transition: color 0.3s;
}

.sparkle-button:is(:hover, :focus-visible) path {
  animation-name: bounce;
}

@keyframes bounce {
  35%, 65% {
    scale: var(--scale);
  }
}

.sparkle path:nth-of-type(1) {
  --scale: 0.5;
  --delay: 0.1;
  --base: 40%;
}

.sparkle path:nth-of-type(2) {
  --scale: 1.5;
  --delay: 0.2;
  --base: 20%;
}

.sparkle path:nth-of-type(3) {
  --scale: 2.5;
  --delay: 0.35;
  --base: 30%;
}

.sparkle-button:before {
  content: "";
  position: absolute;
  inset: -0.2em;
  z-index: -1;
  border: 0.25em solid hsl(260 97% 50% / 0.5);
  border-radius: 100px;
  opacity: var(--active, 0);
  transition: opacity 0.3s;
}

.spark {
  position: absolute;
  inset: 0;
  border-radius: 100px;
  rotate: 0deg;
  overflow: hidden;
  mask: linear-gradient(white, transparent 50%);
  animation: flip calc(var(--spark, 1s) * 2) infinite steps(2, end);
}

@keyframes flip {
  to {
    rotate: 360deg;
  }
}

.spark:before {
  content: "";
  position: absolute;
  width: 200%;
  aspect-ratio: 1;
  top: 0%;
  left: 50%;
  z-index: -1;
  translate: -50% -15%;
  rotate: 0;
  transform: rotate(-90deg);
  opacity: calc((var(--active)) + 0.4);
  background: conic-gradient(
    from 0deg,
    transparent 0 340deg,
    white 360deg
  );
  transition: opacity 0.3s;
  animation: rotate var(--spark, 1s) linear infinite both;
}

.spark:after {
  content: "";
  position: absolute;
  inset: var(--cut, 1px);
  border-radius: 100px;
}

.backdrop {
  position: absolute;
  inset: var(--cut, 1px);
  background: var(--bg);
  border-radius: 100px;
  transition: background 0.3s;
}

@keyframes rotate {
  to {
    transform: rotate(90deg);
  }
}

.sparkle-button:is(:hover, :focus-visible) ~ :is(.bodydrop, .particle-pen) {
  --active: 1;
  --play-state: running;
}

.sparkle-button:is(:hover, :focus-visible) {
  --active: 1;
  --play-state: running;
}

.sp {
  position: relative;
}

.particle-pen {
  position: absolute;
  width: 200%;
  aspect-ratio: 1;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  -webkit-mask: radial-gradient(white, transparent 65%);
  z-index: -1;
  opacity: var(--active, 0);
  transition: opacity 0.3s;
}

.particle {
  fill: white;
  width: calc(var(--size, 0.25) * 1rem);
  aspect-ratio: 1;
  position: absolute;
  top: calc(var(--y) * 1%);
  left: calc(var(--x) * 1%);
  opacity: var(--alpha, 1);
  animation: float-out calc(var(--duration, 1) * 1s) calc(var(--delay) * -1s) infinite linear;
  transform-origin: var(--origin-x, 1000%) var(--origin-y, 1000%);
  z-index: -1;
  animation-play-state: var(--play-state, paused);
}

.particle path {
  fill: hsl(0 0% 90%);
  stroke: none;
}

.particle:nth-of-type(even) {
  animation-direction: reverse;
}

@keyframes float-out {
  to {
    rotate: 360deg;
  }
}

.text {
  translate: 2% -6%;
  letter-spacing: 0.01ch;
  background: linear-gradient(90deg, hsl(0 0% calc((var(--active) * 100%) + 65%)), hsl(0 0% calc((var(--active) * 100%) + 26%)));
  -webkit-background-clip: text;
  color: transparent;
  transition: background 0.3s;
}

.sparkle-button svg {
  inline-size: 1.25em;
  translate: -25% -5%;
}`;

        case 'japanese-matrix':
          return `.jp-matrix-wrapper {
  width: 100%;
  height: 300px;
  background-color: #05050a;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 1px solid #111;
}

.jp-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
  grid-auto-rows: 24px;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: rgba(0, 150, 255, 0.4);
  font-family: "Courier New", Courier, monospace;
  justify-content: center;
  align-content: center;
  user-select: none;
  padding: 8px;
  box-sizing: border-box;
}

.jp-matrix > span {
  text-align: center;
  text-shadow: 0 0 5px rgba(0, 150, 255, 0.5);
  transition: color 0.5s, text-shadow 0.5s;
  line-height: 1;
}

.jp-matrix > span:nth-child(19n + 2) {
  animation: smooth-pulse 3.5s ease-in-out infinite 0.2s;
}
.jp-matrix > span:nth-child(29n + 1) {
  animation: smooth-pulse 4.1s ease-in-out infinite 0.7s;
}
.jp-matrix > span:nth-child(11n) {
  color: rgba(100, 200, 255, 0.7);
  animation: smooth-pulse 2.9s ease-in-out infinite 1.1s;
}
.jp-matrix > span:nth-child(37n + 10) {
  animation: smooth-pulse 5.3s ease-in-out infinite 1.5s;
}
.jp-matrix > span:nth-child(41n + 1) {
  animation: smooth-pulse 3.9s ease-in-out infinite 0.4s;
}
.jp-matrix > span:nth-child(17n + 9) {
  animation: smooth-pulse 2.8s ease-in-out infinite 0.9s;
}
.jp-matrix > span:nth-child(23n + 18) {
  animation: smooth-pulse 4.3s ease-in-out infinite 1.3s;
}
.jp-matrix > span:nth-child(31n + 4) {
  animation: smooth-pulse 5.6s ease-in-out infinite 0.1s;
}
.jp-matrix > span:nth-child(43n + 20) {
  animation: smooth-pulse 3.6s ease-in-out infinite 1.8s;
}
.jp-matrix > span:nth-child(13n + 6) {
  animation: smooth-pulse 3.2s ease-in-out infinite 1.2s;
}
.jp-matrix > span:nth-child(53n + 5) {
  animation: smooth-pulse 4.9s ease-in-out infinite 0.5s;
}
.jp-matrix > span:nth-child(47n + 15) {
  animation: smooth-pulse 5.9s ease-in-out infinite 1s;
}

@keyframes smooth-pulse {
  0%,
  100% {
    color: rgba(0, 150, 255, 0.4);
    text-shadow: 0 0 5px rgba(0, 150, 255, 0.5);
  }
  30% {
    color: rgba(100, 200, 255, 1);
    text-shadow:
      0 0 10px rgba(100, 200, 255, 1),
      0 0 15px rgba(100, 200, 255, 1);
  }
  50% {
    color: rgba(255, 105, 180, 1);
    text-shadow:
      0 0 10px rgba(255, 105, 180, 1),
      0 0 15px rgba(255, 105, 180, 1);
  }
  70% {
    color: #ffffff;
    text-shadow:
      0 0 10px #fff,
      0 0 15px #fff,
      0 0 20px #fff;
  }
}`;

        case 'back-to-top':
          return `.back-to-top-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
}

.svgIcon {
  width: 12px;
  transition-duration: 0.3s;
}

.svgIcon path {
  fill: white;
}

.back-to-top-button:hover {
  width: 140px;
  border-radius: 50px;
  transition-duration: 0.3s;
  background-color: rgb(181, 160, 255);
  align-items: center;
}

.back-to-top-button:hover .svgIcon {
  transition-duration: 0.3s;
  transform: translateY(-200%);
}

.back-to-top-button::before {
  position: absolute;
  bottom: -20px;
  content: "Back to Top";
  color: white;
  font-size: 0px;
  font-family: monospace;
}

.back-to-top-button:hover::before {
  font-size: 13px;
  opacity: 1;
  bottom: unset;
  transition-duration: 0.3s;
}`;

        case 'glass-app-buttons':
          return `/* This component is fully styled using utility classes from Tailwind CSS. No additional CSS stylesheets are required. */`;
      }
    }

    switch (activeAnimId) {
      case 'animated-list':
        return `/* Source from AnimatedList.tsx */`;
      case 'scroll-stack':
        return `/* Source from ScrollStack.tsx */`;
      case 'bubble-menu':
        return `/* Source from BubbleMenu.tsx */`;
      case 'magic-bento':
        return `/* Source from MagicBento.tsx */`;
      case 'strands':
        return `/* Source from Strands.tsx */`;
      case 'magnet':
        return `/* Source from Magnet.tsx */`;
      case 'fluid-glass':
        return `import * as THREE from 'three';
import { useRef, useState, useEffect, memo, ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree, ThreeElements } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  useScroll,
  Image,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei';
import { easing } from 'maath';

type Mode = 'lens' | 'bar' | 'cube';

interface NavItem {
  label: string;
  link: string;
}

type ModeProps = Record<string, unknown>;

interface FluidGlassProps {
  mode?: Mode;
  lensProps?: ModeProps;
  barProps?: ModeProps;
  cubeProps?: ModeProps;
  bgColor?: string;
}

export default function FluidGlass({
  mode = 'lens',
  lensProps = {},
  barProps = {},
  cubeProps = {},
  bgColor = '#09090b'
}: FluidGlassProps) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  const {
    navItems = [
      { label: 'Home', link: '' },
      { label: 'About', link: '' },
      { label: 'Contact', link: '' }
    ],
    ...modeProps
  } = rawOverrides;

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
      <ScrollControls damping={0.2} pages={3} distance={0.4}>
        {mode === 'bar' && <NavItems items={navItems as NavItem[]} />}
        <Wrapper modeProps={modeProps} bgColor={bgColor}>
          <Scroll>
            <Typography />
            <Images />
          </Scroll>
          <Scroll html />
          <Preload />
        </Wrapper>
      </ScrollControls>
    </Canvas>
  );
}

type MeshProps = ThreeElements['mesh'];

interface ModeWrapperProps extends MeshProps {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
  bgColor?: string;
}

interface ZoomMaterial extends THREE.Material {
  zoom: number;
}

interface ZoomMesh extends THREE.Mesh<THREE.BufferGeometry, ZoomMaterial> {}

type ZoomGroup = THREE.Group & { children: ZoomMesh[] };

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  bgColor = '#09090b',
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());
  const geoWidthRef = useRef<number>(1);

  useEffect(() => {
    const geo = (nodes[geometryKey] as THREE.Mesh)?.geometry;
    if (geo) {
      geo.computeBoundingBox();
      geoWidthRef.current = geo.boundingBox!.max.x - geo.boundingBox!.min.x || 1;
    }
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if ((modeProps as { scale?: number }).scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(new THREE.Color(bgColor), 1);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps as {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: unknown;
  };

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={(nodes[geometryKey] as THREE.Mesh)?.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...(typeof extraMat === 'object' && extraMat !== null ? extraMat : {})}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, bgColor, ...p }: { modeProps?: ModeProps; bgColor?: string } & MeshProps) {
  return <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} bgColor={bgColor} {...p} />;
}

function Cube({ modeProps, bgColor, ...p }: { modeProps?: ModeProps; bgColor?: string } & MeshProps) {
  return <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="Cube" followPointer modeProps={modeProps} bgColor={bgColor} {...p} />;
}

function Bar({ modeProps = {}, bgColor, ...p }: { modeProps?: ModeProps; bgColor?: string } & MeshProps) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      bgColor={bgColor}
      {...p}
    />
  );
}

function NavItems({ items }: { items: NavItem[] }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 }
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);

    group.current.children.forEach((child, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = (link: string) => {
    if (!link) return;
    link.startsWith('#') ? (window.location.hash = link) : (window.location.href = link);
  };

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          renderOrder={10}
          onClick={e => {
            e.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function Images() {
  const group = useRef<ZoomGroup>(null!);
  const data = useScroll();
  const { height } = useThree(s => s.viewport);

  useFrame(() => {
    if (!group.current || !group.current.children || group.current.children.length < 5) return;
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
  });

  return (
    <group ref={group}>
      <Image position={[-2, 0, 0]} scale={[3, height / 1.1]} url="/assets/demo/cs1.webp" />
      <Image position={[2, 0, 3]} scale={3} url="/assets/demo/cs2.webp" />
      <Image position={[-2.05, -height, 6]} scale={[1, 3]} url="/assets/demo/cs3.webp" />
      <Image position={[-0.6, -height, 9]} scale={[1, 2]} url="/assets/demo/cs1.webp" />
      <Image position={[0.75, -height, 10.5]} scale={1.5} url="/assets/demo/cs2.webp" />
    </group>
  );
}

function Typography() {
  const DEVICE = {
    mobile: { fontSize: 0.2 },
    tablet: { fontSize: 0.4 },
    desktop: { fontSize: 0.6 }
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { fontSize } = DEVICE[device];

  return (
    <Text
      position={[0, 0, 12]}
      fontSize={fontSize}
      letterSpacing={-0.05}
      outlineWidth={0}
      outlineBlur="20%"
      outlineColor="#000"
      outlineOpacity={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      Onyx Tools
    </Text>
  );
}`;
      case 'sparkle-button':
        return `import React from 'react';
import './SparkleButton.css';

export const SparkleButton: React.FC = () => {
  return (
    <div className="sp">
      <button className="sparkle-button">
        <span className="spark" />
        <span className="backdrop" />
        <svg className="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text">Generate Site</span>
      </button>
      <div className="bodydrop" />
      <span aria-hidden="true" className="particle-pen">
        {Array.from({ length: 20 }).map((_, i) => (
          <svg
            key={i}
            className="particle"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              '--x': Math.random() * 100,
              '--y': Math.random() * 100,
              '--delay': Math.random() * -10,
              '--duration': 2 + Math.random() * 4,
              '--size': 0.1 + Math.random() * 0.35,
              '--alpha': 0.3 + Math.random() * 0.7
            } as React.CSSProperties}
          >
            <path d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ))}
      </span>
    </div>
  );
};

export default SparkleButton;`;

      case 'japanese-matrix':
        return `import React from 'react';
import './JapaneseMatrix.css';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ';

export const JapaneseMatrix: React.FC = () => {
  const spans = Array.from({ length: 150 }).map((_, i) => {
    const char = CHARS[Math.floor(Math.random() * CHARS.length)];
    return <span key={i}>{char}</span>;
  });

  return (
    <div className="jp-matrix-wrapper">
      <div className="jp-matrix">
        {spans}
      </div>
    </div>
  );
};

export default JapaneseMatrix;`;

      case 'back-to-top':
        return `import React from 'react';
import './BackToTop.css';

export const BackToTop: React.FC = () => {
  return (
    <button className="back-to-top-button">
      <svg className="svgIcon" viewBox="0 0 384 512">
        <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
      </svg>
    </button>
  );
};

export default BackToTop;`;

      case 'glass-app-buttons':
        return `/* This component is fully styled using utility classes from Tailwind CSS. No additional CSS stylesheets are required. */`;
      default:
        return '';
    }
  };

  // INDIVIDUAL COMPONENT RENDERER
  const renderActivePreview = () => {
    switch (activeAnimId) {
      case 'animated-list':
        return (
          <div className="w-full max-w-sm flex items-center justify-center p-4">
            <AnimatedList
              key={triggerKey}
              showGradients={controlValues.showGradients !== false}
              enableArrowNavigation={controlValues.enableArrowNavigation !== false}
              displayScrollbar={controlValues.displayScrollbar !== false}
              initialSelectedIndex={controlValues.initialSelectedIndex !== undefined ? controlValues.initialSelectedIndex : -1}
            />
          </div>
        );
      case 'scroll-stack':
        return (
          <div className="w-full max-w-lg h-96 border border-zinc-900 bg-zinc-950/60 rounded-2xl overflow-hidden relative">
            <ScrollStack
              key={triggerKey}
              itemDistance={controlValues.itemDistance !== undefined ? controlValues.itemDistance : 100}
              itemScale={controlValues.itemScale !== undefined ? controlValues.itemScale : 0.03}
              itemStackDistance={controlValues.itemStackDistance !== undefined ? controlValues.itemStackDistance : 30}
              baseScale={controlValues.baseScale !== undefined ? controlValues.baseScale : 0.85}
              rotationAmount={controlValues.rotationAmount !== undefined ? controlValues.rotationAmount : 0}
              blurAmount={controlValues.blurAmount !== undefined ? controlValues.blurAmount : 0}
              useWindowScroll={false}
            >
              <ScrollStackItem>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wide">Card 1</h2>
                  <p className="text-xs text-zinc-400 font-mono">This is the first card in the stack. Scroll down inside this frame to stack cards.</p>
                </div>
              </ScrollStackItem>
              <ScrollStackItem>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wide">Card 2</h2>
                  <p className="text-xs text-zinc-400 font-mono">This is the second card in the stack. Cards dynamically shrink and blur as stack builds up.</p>
                </div>
              </ScrollStackItem>
              <ScrollStackItem>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wide">Card 3</h2>
                  <p className="text-xs text-zinc-400 font-mono">This is the third card in the stack. Custom options allow adjusting spacing, scaling, and tilt angles.</p>
                </div>
              </ScrollStackItem>
            </ScrollStack>
          </div>
        );
      case 'bubble-menu':
        return (
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-zinc-900">
            <BubbleMenu
              key={triggerKey}
              logo={<span className="font-extrabold text-white font-mono tracking-wider">RB</span>}
              menuBg={controlValues.menuBg || '#ffffff'}
              menuContentColor={controlValues.menuContentColor || '#111111'}
              useFixedPosition={false}
              animationDuration={controlValues.animationDuration !== undefined ? controlValues.animationDuration : 0.5}
              staggerDelay={controlValues.staggerDelay !== undefined ? controlValues.staggerDelay : 0.12}
            />
          </div>
        );
      case 'magic-bento':
        return (
          <div className="w-full max-h-[380px] overflow-y-auto flex items-center justify-center p-4 border border-zinc-900 bg-zinc-950/40 rounded-2xl scrollbar-machined">
            <MagicBento
              key={triggerKey}
              textAutoHide={controlValues.textAutoHide !== false}
              enableStars={controlValues.enableStars !== false}
              enableSpotlight={controlValues.enableSpotlight !== false}
              enableBorderGlow={controlValues.enableBorderGlow !== false}
              enableTilt={controlValues.enableTilt === true}
              enableMagnetism={controlValues.enableMagnetism !== false}
              clickEffect={controlValues.clickEffect !== false}
              spotlightRadius={controlValues.spotlightRadius !== undefined ? controlValues.spotlightRadius : 300}
              particleCount={controlValues.particleCount !== undefined ? controlValues.particleCount : 12}
              glowColor={hexToRgbStr(controlValues.glowColor || '#8400ff')}
            />
          </div>
        );
      case 'strands':
        return (
          <div className="w-full max-w-lg h-80 rounded-2xl border border-zinc-900 overflow-hidden relative">
            <Strands
              key={triggerKey}
              count={controlValues.count !== undefined ? controlValues.count : 3}
              speed={controlValues.speed !== undefined ? controlValues.speed : 0.5}
              amplitude={controlValues.amplitude !== undefined ? controlValues.amplitude : 1.0}
              waviness={controlValues.waviness !== undefined ? controlValues.waviness : 1.0}
              thickness={controlValues.thickness !== undefined ? controlValues.thickness : 0.7}
              glow={controlValues.glow !== undefined ? controlValues.glow : 2.6}
              taper={controlValues.taper !== undefined ? controlValues.taper : 3.0}
              spread={controlValues.spread !== undefined ? controlValues.spread : 1.0}
              scale={controlValues.scale !== undefined ? controlValues.scale : 1.5}
              glass={controlValues.glass === true}
              refraction={controlValues.refraction !== undefined ? controlValues.refraction : 1.0}
              dispersion={controlValues.dispersion !== undefined ? controlValues.dispersion : 1.0}
              glassSize={controlValues.glassSize !== undefined ? controlValues.glassSize : 1.0}
            />
          </div>
        );
      case 'magnet':
        return (
          <div className="w-full h-40 flex items-center justify-center p-4">
            <Magnet
              key={triggerKey}
              padding={controlValues.padding !== undefined ? controlValues.padding : 100}
              disabled={controlValues.disabled === true}
              magnetStrength={controlValues.magnetStrength !== undefined ? controlValues.magnetStrength : 2}
            >
              <button className="px-6 py-3 rounded-xl border border-violet-500 bg-violet-600/10 text-violet-400 hover:text-white hover:bg-violet-600 font-mono text-xs transition-colors duration-200 shadow-lg shadow-violet-600/10 cursor-pointer">
                Hover close to pull me!
              </button>
            </Magnet>
          </div>
        );
      case 'fluid-glass':
        const mode = controlValues.mode || 'lens';
        const bgColor = controlValues.bgColor || '#09090b';
        const modeProps = {
          scale: controlValues.scale !== undefined ? controlValues.scale : 0.25,
          ior: controlValues.ior !== undefined ? controlValues.ior : 1.15,
          thickness: controlValues.thickness !== undefined ? controlValues.thickness : 5,
          chromaticAberration: controlValues.chromaticAberration !== undefined ? controlValues.chromaticAberration : 0.1,
          anisotropy: controlValues.anisotropy !== undefined ? controlValues.anisotropy : 0.01
        };
        return (
          <div className="w-full max-w-lg h-96 border border-zinc-900 bg-zinc-950 rounded-2xl overflow-hidden relative">
            <FluidGlass
              key={triggerKey + '-' + mode}
              mode={mode}
              lensProps={modeProps}
              barProps={modeProps}
              cubeProps={modeProps}
              bgColor={bgColor}
              barLockToBottom={false}
            />
          </div>
        );
      case 'sparkle-button':
        return (
          <div className="w-full h-40 flex items-center justify-center p-4">
            <SparkleButton />
          </div>
        );
      case 'japanese-matrix':
        return (
          <div className="w-full max-w-sm p-4">
            <JapaneseMatrix />
          </div>
        );
      case 'back-to-top':
        return (
          <div className="w-full h-40 flex items-center justify-center p-4">
            <BackToTop />
          </div>
        );
      case 'glass-app-buttons':
        return (
          <div className="w-full p-4 flex items-center justify-center">
            <GlassAppButtons />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex min-h-0 bg-black text-zinc-100">
      {/* 1. COMPONENT SELECTION SIDEBAR */}
      <aside className="w-60 border-r border-zinc-900 bg-zinc-950/20 p-4 flex flex-col min-h-0 shrink-0">
        <div className="px-1 py-1 text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-900/50 pb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-zinc-500" />
          <span>Components</span>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1 mt-2.5 scrollbar-machined">
          {COMPONENTS.map(comp => {
            const isActive = comp.id === activeAnimId;
            return (
              <button
                key={comp.id}
                onClick={() => setActiveAnimId(comp.id)}
                className={cn(
                  "group w-full flex items-center justify-between px-3 py-2 rounded-lg border text-left font-mono transition-all duration-150 cursor-pointer",
                  isActive
                    ? "bg-zinc-900 border-zinc-800 text-white font-bold"
                    : "bg-transparent border-transparent hover:bg-zinc-900/30 text-zinc-400 hover:text-zinc-200"
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={cn(
                      "w-1 h-3 rounded shrink-0 transition-all duration-150",
                      isActive ? "bg-violet-500" : "bg-transparent group-hover:bg-zinc-800"
                    )}
                  />
                  <span className="text-[11px] font-semibold tracking-wide truncate">{comp.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-3 border-t border-zinc-900/50 mt-4 flex items-center justify-between text-[9px] text-zinc-600 font-mono shrink-0">
          <span>Onyx engine v1.1.0</span>
          <span>Ready</span>
        </div>
      </aside>

      {/* 2. MAIN PREVIEW & CONTROLS WORKSPACE */}
      <main className="flex-1 flex flex-col min-h-0 bg-black overflow-y-auto p-6 md:p-8 scrollbar-machined">
        {/* Module Header Title */}
        <div className="flex flex-col gap-1 mb-6">
          <h1 className="text-3xl font-black font-sans tracking-tight text-white select-none">
            {activeConfig.name}
          </h1>
          <p className="text-[11px] font-mono text-zinc-400 select-none">
            {activeConfig.description}
          </p>
        </div>

        {/* Tab Selection Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-colors",
                activeTab === 'preview' ? "bg-zinc-900 text-white border border-zinc-800" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-colors",
                activeTab === 'code' ? "bg-zinc-900 text-white border border-zinc-800" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 border-l border-zinc-900 pl-4">
            <button
              onClick={handleReset}
              title="Reset component state"
              className="p-2 border border-zinc-900 hover:border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 rounded-md cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Panel Content Area */}
        <div className="flex-1 flex flex-col gap-6 min-h-0">
          {activeTab === 'preview' ? (
            /* PREVIEW BOX */
            <div className="flex-1 min-h-[320px] rounded-xl border border-zinc-900 bg-zinc-950/40 flex items-center justify-center relative overflow-hidden group">
              <div className="relative z-10 p-8 flex items-center justify-center w-full h-full">
                {renderActivePreview()}
              </div>
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 z-0 pointer-events-none" />
            </div>
          ) : (
            /* CODE EXPORTER */
            <div className="flex-1 rounded-xl border border-zinc-900 bg-zinc-950/40 flex flex-col overflow-hidden min-h-[320px]">
              {/* Code Panel Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-900 bg-zinc-950/60">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setExportTab('react')}
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer transition-colors",
                      exportTab === 'react' ? "bg-zinc-900 text-white font-bold" : "text-zinc-500 hover:text-zinc-350"
                    )}
                  >
                    Component Source (.tsx)
                  </button>
                  <button
                    onClick={() => setExportTab('css')}
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer transition-colors",
                      exportTab === 'css' ? "bg-zinc-900 text-white font-bold" : "text-zinc-500 hover:text-zinc-355"
                    )}
                  >
                    Styles (.css)
                  </button>
                  <button
                    onClick={() => setExportTab('usage')}
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer transition-colors",
                      exportTab === 'usage' ? "bg-zinc-950 text-white font-bold" : "text-zinc-550 hover:text-zinc-355"
                    )}
                  >
                    Usage Example
                  </button>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-3 py-1 rounded bg-violet-600 hover:bg-violet-500 text-[10px] font-mono text-white cursor-pointer transition-colors"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Code text block */}
              <pre className="flex-1 p-5 font-mono text-[11px] text-zinc-300 overflow-auto select-all leading-relaxed whitespace-pre bg-zinc-950 scrollbar-machined">
                <code>{generateSourceCode()}</code>
              </pre>
            </div>
          )}

          {/* 3. CUSTOMIZE INSPECTOR */}
          <div className="rounded-xl border border-zinc-900 bg-zinc-950/40 p-5 space-y-6">
            <div className="flex items-center gap-2 border-b border-zinc-900/50 pb-3">
              <Sliders className="w-4 h-4 text-violet-500" />
              <h2 className="text-sm font-extrabold text-white tracking-wide font-mono uppercase">Customize</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {/* Auto Render Config Controls */}
              {activeConfig.controls.length > 0 ? (
                activeConfig.controls.map(field => {
                  const value = controlValues[field.id] !== undefined ? controlValues[field.id] : field.default;

                  return (
                    <div key={field.id} className="flex flex-col gap-2 bg-zinc-950/20 p-3 rounded-lg border border-zinc-900/40">
                      <div className="flex justify-between items-center text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-wider">
                        <span>{field.label}</span>
                        {field.type === 'slider' && <span className="text-zinc-300 font-semibold">{value}</span>}
                      </div>

                      {field.type === 'slider' && (
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            value={value}
                            onChange={(e) => handleControlChange(field.id, parseFloat(e.target.value))}
                            className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer bg-zinc-900 accent-violet-500"
                          />
                        </div>
                      )}

                      {field.type === 'toggle' && (
                        <button
                          type="button"
                          onClick={() => handleControlChange(field.id, !value)}
                          className={cn(
                            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                            value ? "bg-violet-600" : "bg-zinc-800"
                          )}
                        >
                          <span
                            className={cn(
                              "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                              value ? "translate-x-4" : "translate-x-0"
                            )}
                          />
                        </button>
                      )}

                      {field.type === 'color' && (
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={value}
                            onChange={(e) => handleControlChange(field.id, e.target.value)}
                            className="w-6 h-6 rounded border border-zinc-800 bg-transparent cursor-pointer overflow-hidden"
                          />
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">{value}</span>
                        </div>
                      )}

                      {field.type === 'select' && (
                        <select
                          value={value}
                          onChange={(e) => handleControlChange(field.id, e.target.value)}
                          className="w-full bg-zinc-900 text-zinc-300 text-[10px] font-mono p-2 rounded border border-zinc-800 focus:outline-none focus:border-violet-500 cursor-pointer"
                        >
                          {field.options?.map(opt => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-4 text-center text-xs font-mono text-zinc-500">
                  No customization parameters available for this layout component template.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Toast Notification System */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300 flex items-center gap-2 shadow-2xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
