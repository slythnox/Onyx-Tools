import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Code, RotateCcw, Copy, Check, Sliders, Layers, Play, ChevronUp, ChevronDown, Monitor, Laptop, Smartphone, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

// TYPES
type ComponentTab = 'preview' | 'code';
type ExportTab = 'react' | 'usage';

interface ControlField {
  id: string;
  label: string;
  type: 'slider' | 'select' | 'toggle' | 'text' | 'color';
  default: any;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
}

interface ComponentConfig {
  id: string;
  name: string;
  description: string;
  isNew?: boolean;
  controls: ControlField[];
}

// 36 COMPONENTS LIST
const COMPONENTS: ComponentConfig[] = [
  {
    id: 'animated-list',
    name: 'Animated List',
    description: 'Entrance animation transitions for list container layouts.',
    controls: [
      { id: 'fadeItems', label: 'Fade Items', type: 'toggle', default: true },
      { id: 'keyboardNav', label: 'Keyboard Navigation', type: 'toggle', default: true },
      { id: 'showScrollbar', label: 'Show Scrollbar', type: 'toggle', default: false }
    ]
  },
  {
    id: 'scroll-stack',
    name: 'Scroll Stack',
    description: 'Overlapping layout where cards shift and stack as you hover.',
    controls: [
      { id: 'cardScale', label: 'Card Scale factor', type: 'slider', default: 0.9, min: 0.7, max: 1.0, step: 0.05 },
      { id: 'spreadOffset', label: 'Spread Space (px)', type: 'slider', default: 45, min: 10, max: 80, step: 5 }
    ]
  },
  {
    id: 'bubble-menu',
    name: 'Bubble Menu',
    description: 'Horizontal navigation menu with a sliding bubble backplate.',
    controls: [
      { id: 'accentColor', label: 'Bubble Accent Color', type: 'color', default: '#a78bfa' },
      { id: 'dampening', label: 'Slide Cycle Speed', type: 'slider', default: 12, min: 2, max: 40, step: 2 }
    ]
  },
  {
    id: 'magic-bento',
    name: 'Magic Bento',
    description: 'Interactive Bento dashboard grid with 3D parallax and glowing borders.',
    controls: [
      { id: 'glowColor', label: 'Bento Border Glow', type: 'color', default: '#8b5cf6' },
      { id: 'tiltStrength', label: 'Parallax Tilt Factor', type: 'slider', default: 8, min: 2, max: 20, step: 1 }
    ]
  },
  {
    id: 'circular-gallery',
    name: 'Circular Gallery',
    description: 'Image cards positioned in a 3D orbit wheel layout.',
    controls: [
      { id: 'radius', label: 'Orbit Circle Radius', type: 'slider', default: 110, min: 50, max: 250, step: 5 },
      { id: 'rotationSpeed', label: 'Rotation Cycle Time (s)', type: 'slider', default: 15, min: 5, max: 40, step: 1 }
    ]
  },
  {
    id: 'reflective-card',
    name: 'Reflective Card',
    description: 'Card with metallic reflection glare that slides on pointer hover.',
    controls: [
      { id: 'glareOpacity', label: 'Glare Peak Intensity', type: 'slider', default: 0.4, min: 0.1, max: 1.0, step: 0.05 },
      { id: 'tiltScale', label: '3D Rotation Angle', type: 'slider', default: 15, min: 5, max: 30, step: 1 }
    ]
  },
  {
    id: 'card-nav',
    name: 'Card Nav',
    description: 'Navigation menu where tabs open like folding folder cards.',
    controls: [
      { id: 'spacing', label: 'Card Tab Spacing', type: 'slider', default: 20, min: 5, max: 40, step: 5 }
    ]
  },
  {
    id: 'stack',
    name: 'Stack',
    description: 'Vertical deck layout where cards animate to back on scroll.',
    controls: [
      { id: 'opacityFactor', label: 'Back Card Opacity', type: 'slider', default: 0.4, min: 0.1, max: 1.0, step: 0.05 }
    ]
  },
  {
    id: 'fluid-glass',
    name: 'Fluid Glass',
    description: 'Frosted glass container layout with rotating mesh background.',
    controls: [
      { id: 'blur', label: 'Backdrop Blur (px)', type: 'slider', default: 16, min: 4, max: 40, step: 2 }
    ]
  },
  {
    id: 'pill-nav',
    name: 'Pill Nav',
    description: 'Rounded tabs with a sliding slider active background.',
    controls: [
      { id: 'pillColor', label: 'Pill Background Color', type: 'color', default: '#3f3f46' }
    ]
  },
  {
    id: 'tilted-card',
    name: 'Tilted Card',
    description: 'Layout card that rotates on multiple axes upon cursor hover.',
    controls: [
      { id: 'tiltStrength', label: 'Tilt Speed Intensity', type: 'slider', default: 12, min: 4, max: 28, step: 2 }
    ]
  },
  {
    id: 'masonry',
    name: 'Masonry',
    description: 'Dynamic items grid with entrance animations.',
    controls: [
      { id: 'stagger', label: 'Stagger Speed (ms)', type: 'slider', default: 40, min: 10, max: 150, step: 5 }
    ]
  },
  {
    id: 'glass-surface',
    name: 'Glass Surface',
    description: 'Reflective frosted glass card layouts.',
    controls: [
      { id: 'opacity', label: 'Surface Opacity', type: 'slider', default: 0.15, min: 0.05, max: 0.4, step: 0.02 }
    ]
  },
  {
    id: 'dome-gallery',
    name: 'Dome Gallery',
    description: 'Interactive gallery arranged in a fisheye dome curve.',
    controls: [
      { id: 'curvature', label: 'Fisheye Curvature', type: 'slider', default: 45, min: 10, max: 90, step: 5 }
    ]
  },
  {
    id: 'chroma-grid',
    name: 'Chroma Grid',
    description: 'Interactive layout grid with color shifts on hover.',
    controls: [
      { id: 'hueSpeed', label: 'Color Cycle Speed', type: 'slider', default: 5, min: 1, max: 15, step: 1 }
    ]
  },
  {
    id: 'folder',
    name: 'Folder',
    description: 'Accordion layout mimicking opening computer folders.',
    controls: [
      { id: 'allowMultiple', label: 'Allow Multiple Open', type: 'toggle', default: false }
    ]
  },
  {
    id: 'staggered-menu',
    name: 'Staggered Menu',
    description: 'Dropdown list with delayed index entries.',
    controls: [
      { id: 'delay', label: 'Stagger delay (ms)', type: 'slider', default: 35, min: 10, max: 100, step: 5 }
    ]
  },
  {
    id: 'model-viewer',
    name: 'Model Viewer',
    description: '3D cube container model rotation on drag.',
    controls: [
      { id: 'speed', label: 'Rotation damping', type: 'slider', default: 12, min: 4, max: 30, step: 2 }
    ]
  },
  {
    id: 'lanyard',
    name: 'Lanyard',
    description: 'Interactive floating tag badge that follows pointer motion.',
    controls: [
      { id: 'elasticity', label: 'Gravity spring rate', type: 'slider', default: 8, min: 2, max: 20, step: 1 }
    ]
  },
  {
    id: 'profile-card',
    name: 'Profile Card',
    description: 'Sleek user profile container with slide-up options.',
    controls: [
      { id: 'accentColor', label: 'Accent Border Highlight', type: 'color', default: '#3b82f6' }
    ]
  },
  {
    id: 'dock',
    name: 'Dock',
    description: 'macOS style dock bar which magnifies icons on hover.',
    controls: [
      { id: 'maxZoom', label: 'Hover Magnify Scale', type: 'slider', default: 1.6, min: 1.1, max: 2.2, step: 0.1 },
      { id: 'dockPadding', label: 'Dock bar Padding (px)', type: 'slider', default: 10, min: 4, max: 20, step: 2 }
    ]
  },
  {
    id: 'gooey-nav',
    name: 'Gooey Nav',
    description: 'Circular submenus that liquefy and blend together.',
    controls: [
      { id: 'gooeyFactor', label: 'Gooey Blur Level', type: 'slider', default: 14, min: 6, max: 24, step: 2 }
    ]
  },
  {
    id: 'pixel-card',
    name: 'Pixel Card',
    description: 'Card with pixel grid blocks fading in on cursor hover.',
    controls: [
      { id: 'pixelSize', label: 'Grid block size (px)', type: 'slider', default: 20, min: 10, max: 40, step: 5 }
    ]
  },
  {
    id: 'carousel',
    name: 'Carousel',
    description: 'Horizontal swipes layout cards slider.',
    controls: [
      { id: 'gap', label: 'Slide spacing gap (px)', type: 'slider', default: 16, min: 4, max: 48, step: 4 }
    ]
  },
  {
    id: 'spotlight-card',
    name: 'Spotlight Card',
    description: 'Standard card featuring radial spotlight highlight following pointer.',
    controls: [
      { id: 'spotlightSize', label: 'Spotlight radius (px)', type: 'slider', default: 140, min: 50, max: 300, step: 10 },
      { id: 'spotlightColor', label: 'Spotlight glow color', type: 'color', default: '#8b5cf6' }
    ]
  },
  {
    id: 'border-glow',
    name: 'Border Glow',
    isNew: true,
    description: 'Card layouts wrapped inside continuous rotating neon border gradients.',
    controls: [
      { id: 'glowSpeed', label: 'Glow Rotation Speed (s)', type: 'slider', default: 3.5, min: 1.0, max: 8.0, step: 0.5 },
      { id: 'glowColor', label: 'Glow Accent Color', type: 'color', default: '#a78bfa' }
    ]
  },
  {
    id: 'flying-posters',
    name: 'Flying Posters',
    description: 'Images drifting in space tilting towards mouse axis.',
    controls: [
      { id: 'drift', label: 'Drifting speed', type: 'slider', default: 2.0, min: 0.5, max: 5.0, step: 0.5 }
    ]
  },
  {
    id: 'card-swap',
    name: 'Card Swap',
    description: 'Framer motion swipable deck cards deck.',
    controls: [
      { id: 'rotationTilt', label: 'Drag rotation factor', type: 'slider', default: 6, min: 2, max: 15, step: 1 }
    ]
  },
  {
    id: 'glass-icons',
    name: 'Glass Icons',
    description: 'Slanted application icon triggers with glass glaze overlays.',
    controls: [
      { id: 'slantAngle', label: 'Slant skew angle (deg)', type: 'slider', default: 12, min: 0, max: 30, step: 2 }
    ]
  },
  {
    id: 'decay-card',
    name: 'Decay Card',
    description: 'Container elements dissolving on exit.',
    controls: [
      { id: 'decayRate', label: 'Disintegration speed', type: 'slider', default: 4, min: 1, max: 10, step: 1 }
    ]
  },
  {
    id: 'flowing-menu',
    name: 'Flowing Menu',
    description: 'Dynamic items flowing in stream.',
    controls: [
      { id: 'speed', label: 'Flow speed multiplier', type: 'slider', default: 1.5, min: 0.5, max: 5.0, step: 0.5 }
    ]
  },
  {
    id: 'elastic-slider',
    name: 'Elastic Slider',
    description: 'Slide trigger handles stretching elastically.',
    controls: [
      { id: 'elasticity', label: 'Elastic pull multiplier', type: 'slider', default: 6, min: 2, max: 15, step: 1 }
    ]
  },
  {
    id: 'counter',
    name: 'Counter',
    description: 'Rolling numeric spinner digits.',
    controls: [
      { id: 'digits', label: 'Digits count limit', type: 'slider', default: 4, min: 2, max: 8, step: 1 }
    ]
  },
  {
    id: 'infinite-menu',
    name: 'Infinite Menu',
    description: 'Vertical lists rolling continuously.',
    controls: [
      { id: 'speed', label: 'Scroll duration rate', type: 'slider', default: 10, min: 2, max: 20, step: 1 }
    ]
  },
  {
    id: 'stepper',
    name: 'Stepper',
    description: 'Interactive steps progress checkpoints.',
    controls: [
      { id: 'steps', label: 'Checkpoint step count', type: 'slider', default: 4, min: 3, max: 6, step: 1 }
    ]
  },
  {
    id: 'bounce-cards',
    name: 'Bounce Cards',
    description: 'Bouncy card layers responding to mouse triggers.',
    controls: [
      { id: 'bounceHeight', label: 'Bouncy offset height', type: 'slider', default: 30, min: 10, max: 80, step: 5 }
    ]
  }
];

// SUB-COMPONENTS TO PREVENT CONDITIONAL HOOKS VIOLATIONS
const AnimatedListPreview = ({
  fadeItems,
  keyboardNav,
  showScrollbar,
  triggerKey
}: {
  fadeItems: boolean;
  keyboardNav: boolean;
  showScrollbar: boolean;
  triggerKey: number;
}) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  useEffect(() => {
    if (!keyboardNav) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx(prev => (prev + 1) % items.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx(prev => (prev - 1 + items.length) % items.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardNav, items.length]);

  return (
    <div key={triggerKey} className="w-full max-w-sm flex flex-col gap-3 py-4 select-none">
      <div
        className={cn(
          "max-h-72 overflow-y-auto px-2 space-y-3",
          showScrollbar ? "scrollbar-machined" : "scrollbar-none"
        )}
      >
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            onClick={() => setActiveIdx(idx)}
            initial={fadeItems ? { opacity: 0, y: 15 } : { y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            className={cn(
              "w-full px-4 py-4 rounded-lg border text-sm font-mono transition-all duration-150 cursor-pointer",
              activeIdx === idx
                ? "bg-zinc-800/80 border-violet-500 text-white font-bold shadow-lg shadow-violet-500/10"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"
            )}
          >
            {item}
          </motion.div>
        ))}
      </div>
      {keyboardNav && (
        <span className="text-[9px] font-mono text-zinc-500 text-center uppercase tracking-widest mt-2">
          Use ↑ / ↓ arrow keys to navigate
        </span>
      )}
    </div>
  );
};

const ScrollStackPreview = ({
  cardScale,
  spreadOffset
}: {
  cardScale: number;
  spreadOffset: number;
}) => {
  const cards = ['Dashboard Layout', 'Analytical Graphs', 'User Profiles', 'Project Milestones'];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="relative h-60 w-64 flex items-center justify-center select-none">
      {cards.map((card, idx) => {
        const isHovered = hoveredIdx === idx;
        const offset = hoveredIdx !== null ? (idx - hoveredIdx) * spreadOffset : idx * 12;
        const scale = hoveredIdx !== null ? (isHovered ? 1.0 : cardScale) : 1 - idx * 0.04;
        const rotate = hoveredIdx !== null ? (isHovered ? 0 : (idx - hoveredIdx) * 2) : idx * 1.5;

        return (
          <motion.div
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            animate={{
              y: offset,
              scale: scale,
              rotate: rotate,
              zIndex: isHovered ? 50 : 10 - idx
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className={cn(
              "absolute w-56 h-36 rounded-xl border p-4 bg-zinc-900 border-zinc-800 cursor-pointer flex flex-col justify-between shadow-2xl transition-colors duration-150",
              isHovered ? "border-violet-500/50 bg-zinc-800/90" : ""
            )}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-widest">Card #{idx + 1}</span>
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
            </div>
            <span className="text-xs font-mono font-bold text-white leading-relaxed">{card}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

const BubbleMenuPreview = ({
  accentColor,
  dampening
}: {
  accentColor: string;
  dampening: number;
}) => {
  const tabs = ['Home', 'Analytics', 'Settings', 'Profile'];
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [rects, setRects] = useState<DOMRect[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.children;
    const list: DOMRect[] = [];
    for (let i = 0; i < elements.length; i++) {
      list.push((elements[i] as HTMLElement).getBoundingClientRect());
    }
    setRects(list);
  }, []);

  const containerRect = containerRef.current?.getBoundingClientRect();
  const activeRect = rects[hoveredTab !== null ? hoveredTab : activeTab];

  return (
    <div className="relative p-2 bg-zinc-950/80 border border-zinc-900 rounded-xl flex items-center gap-1 select-none">
      {activeRect && containerRect && (
        <motion.div
          animate={{
            left: activeRect.left - containerRect.left,
            width: activeRect.width,
            height: activeRect.height
          }}
          transition={{
            type: 'spring',
            stiffness: 300 - dampening * 5,
            damping: 18 + dampening * 0.15
          }}
          className="absolute rounded-lg opacity-25"
          style={{ backgroundColor: accentColor, top: activeRect.top - containerRect.top }}
        />
      )}
      <div ref={containerRef} className="flex items-center gap-1 relative z-10">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            onMouseEnter={() => setHoveredTab(idx)}
            onMouseLeave={() => setHoveredTab(null)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-colors duration-150",
              activeTab === idx ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

const MagicBentoPreview = ({
  glowColor,
  tiltStrength
}: {
  glowColor: string;
  tiltStrength: number;
}) => {
  const cards = [
    { title: 'Overview', col: 'col-span-2', text: 'Realtime telemetry pipeline monitoring.' },
    { title: 'Deploy', col: 'col-span-1', text: 'Vercel edge server push.' },
    { title: 'Console', col: 'col-span-1', text: 'Staging environment compiler log streams.' },
    { title: 'Settings', col: 'col-span-2', text: 'OKLCH system variables config.' }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-md p-4 select-none">
      {cards.map((card, idx) => {
        const itemRef = useRef<HTMLDivElement>(null);
        const [tilt, setTilt] = useState({ x: 0, y: 0 });
        const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
        const [isHovered, setIsHovered] = useState(false);

        const handleMouseMove = (e: React.MouseEvent) => {
          if (!itemRef.current) return;
          const rect = itemRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setMousePos({ x, y });

          const xc = rect.width / 2;
          const yc = rect.height / 2;
          const rotateX = ((y - yc) / yc) * tiltStrength;
          const rotateY = -((x - xc) / xc) * tiltStrength;
          setTilt({ x: rotateX, y: rotateY });
        };

        const handleMouseLeave = () => {
          setIsHovered(false);
          setTilt({ x: 0, y: 0 });
        };

        return (
          <div
            key={idx}
            ref={itemRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "relative rounded-xl border border-zinc-900 bg-zinc-950 p-4 overflow-hidden cursor-pointer",
              card.col
            )}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isHovered ? 'none' : 'transform 0.4s ease'
            }}
          >
            {isHovered && (
              <div
                className="absolute pointer-events-none rounded-full blur-[60px] opacity-25"
                style={{
                  left: mousePos.x - 70,
                  top: mousePos.y - 70,
                  width: 140,
                  height: 140,
                  backgroundColor: glowColor
                }}
              />
            )}
            <span className="text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-widest">{card.title}</span>
            <p className="text-[11px] font-mono text-zinc-300 mt-2 leading-relaxed">{card.text}</p>
          </div>
        );
      })}
    </div>
  );
};

const CircularGalleryPreview = ({
  radius,
  rotationSpeed
}: {
  radius: number;
  rotationSpeed: number;
}) => {
  const cards = ['Img 1', 'Img 2', 'Img 3', 'Img 4', 'Img 5', 'Img 6'];

  return (
    <div className="relative h-64 w-64 flex items-center justify-center select-none overflow-hidden">
      <motion.div
        className="relative flex items-center justify-center"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: rotationSpeed, ease: 'linear' }}
      >
        {cards.map((card, i) => {
          const rotation = (i * 360) / cards.length;
          return (
            <div
              key={i}
              className="absolute w-12 h-16 rounded border border-zinc-800 bg-zinc-900/90 flex items-center justify-center font-mono text-[10px] font-bold text-zinc-400"
              style={{
                transform: `rotate(${rotation}deg) translateY(-${radius}px) rotate(-${rotation}deg)`
              }}
            >
              {card}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

const ReflectiveCardPreview = ({
  glareOpacity,
  tiltScale
}: {
  glareOpacity: number;
  tiltScale: number;
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    setGlare({ x: px, y: py });

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rx = ((yc - y) / yc) * tiltScale;
    const ry = ((x - xc) / xc) * tiltScale;
    setTilt({ x: rx, y: ry });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      className="relative w-56 h-36 rounded-xl border border-zinc-800 bg-zinc-950 cursor-pointer p-4 overflow-hidden flex flex-col justify-between shadow-2xl select-none"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'none' : 'transform 0.3s ease'
      }}
    >
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`
          }}
        />
      )}
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Reflective Card</span>
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
      </div>
      <div className="space-y-1">
        <span className="text-xs font-mono font-bold text-white block">METALLIC OVERLAY</span>
        <span className="text-[9px] font-mono text-zinc-400 block leading-tight">Light sheen glare effect follows cursor movement.</span>
      </div>
    </div>
  );
};

const DockPreview = ({
  maxZoom,
  dockPadding
}: {
  maxZoom: number;
  dockPadding: number;
}) => {
  const icons = ['📄', '📂', '⚡', '🎨', '🔧', '⚙️'];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      className="flex items-end gap-3 bg-zinc-950/80 border border-zinc-900 rounded-2xl shadow-xl select-none transition-all duration-200"
      style={{ padding: `${dockPadding}px` }}
    >
      {icons.map((icon, idx) => {
        let scale = 1.0;
        if (hoveredIdx !== null) {
          const diff = Math.abs(idx - hoveredIdx);
          if (diff === 0) scale = maxZoom;
          else if (diff === 1) scale = 1 + (maxZoom - 1) * 0.5;
        }

        return (
          <motion.div
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            animate={{ scale }}
            transition={{ type: 'spring', stiffness: 280, damping: 15 }}
            className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-lg cursor-pointer hover:border-zinc-700 shadow-md"
          >
            {icon}
          </motion.div>
        );
      })}
    </div>
  );
};

const SpotlightCardPreview = ({
  spotlightSize,
  spotlightColor
}: {
  spotlightSize: number;
  spotlightColor: string;
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-56 h-36 rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex flex-col justify-between overflow-hidden shadow-2xl cursor-pointer select-none"
    >
      {hovered && (
        <div
          className="absolute pointer-events-none rounded-full blur-[50px] opacity-15"
          style={{
            left: mousePos.x - spotlightSize / 2,
            top: mousePos.y - spotlightSize / 2,
            width: spotlightSize,
            height: spotlightSize,
            backgroundColor: spotlightColor
          }}
        />
      )}
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Spotlight Container</span>
        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
      </div>
      <div>
        <span className="text-xs font-mono font-bold text-white block">RADIAL SPOTLIGHT</span>
        <span className="text-[9px] font-mono text-zinc-400 block leading-tight mt-1">Light mask coordinates follow the pointer smoothly.</span>
      </div>
    </div>
  );
};

const BorderGlowPreview = ({
  glowSpeed,
  glowColor
}: {
  glowSpeed: number;
  glowColor: string;
}) => {
  return (
    <div className="relative w-56 h-36 rounded-xl overflow-hidden p-[1px] select-none shadow-2xl">
      <div
        className="absolute inset-[-1000%] animate-spin"
        style={{
          background: `conic-gradient(from 0deg, transparent 40%, ${glowColor} 50%, transparent 60%, ${glowColor} 100%)`,
          animationDuration: `${glowSpeed}s`
        }}
      />
      <div className="relative w-full h-full rounded-xl bg-zinc-950 p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">NEON GLOW BORDER</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
        <div>
          <span className="text-xs font-mono font-bold text-white block">CONIC SHADER</span>
          <span className="text-[9px] font-mono text-zinc-400 block leading-tight mt-1">Continuous animated gradient neon border lines.</span>
        </div>
      </div>
    </div>
  );
};

const CardSwapPreview = ({
  rotationTilt
}: {
  rotationTilt: number;
}) => {
  const cards = ['Premium Dashboards', 'OKLCH Systems', 'Shader Libraries'];
  const [index, setIndex] = useState(0);

  return (
    <div
      onClick={() => setIndex(prev => (prev + 1) % cards.length)}
      className="relative h-40 w-56 flex items-center justify-center select-none cursor-pointer"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ scale: 0.8, y: -20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1, rotate: rotationTilt }}
          exit={{ scale: 0.9, y: 30, opacity: 0, rotate: -rotationTilt * 1.5 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          className="absolute w-48 h-32 rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex flex-col justify-between shadow-2xl"
        >
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Swap Deck</span>
            <div className="text-[9px] font-mono text-zinc-500">#{index + 1}</div>
          </div>
          <span className="text-xs font-mono font-bold text-white leading-relaxed">{cards[index]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// MASTER COMPONENT
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
      return `import React from 'react';
import ${activeConfig.name.replace(/\s+/g, '')} from './${activeConfig.name.replace(/\s+/g, '')}';

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[350px] bg-black text-white p-6">
      <${activeConfig.name.replace(/\s+/g, '')} 
        ${Object.entries(controlValues)
          .map(([k, v]) => `${k}={${typeof v === 'string' ? `"${v}"` : v}}`)
          .join('\n        ')}
      />
    </div>
  );
}`;
    }

    switch (activeAnimId) {
      case 'animated-list':
        return `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedList({
  fadeItems = ${controlValues.fadeItems !== false},
  keyboardNav = ${controlValues.keyboardNav !== false},
  showScrollbar = ${controlValues.showScrollbar === true}
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  useEffect(() => {
    if (!keyboardNav) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx(prev => (prev + 1) % items.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx(prev => (prev - 1 + items.length) % items.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardNav, items.length]);

  return (
    <div className="w-full max-w-sm flex flex-col gap-3 py-4 select-none">
      <div className={\`max-h-72 overflow-y-auto px-2 space-y-3 \${showScrollbar ? 'scrollbar-machined' : 'scrollbar-none'}\`}>
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            onClick={() => setActiveIdx(idx)}
            initial={fadeItems ? { opacity: 0, y: 15 } : { y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            className={\`w-full px-4 py-4 rounded-lg border text-sm font-mono transition-all duration-150 cursor-pointer \${
              activeIdx === idx
                ? 'bg-zinc-800/80 border-violet-500 text-white font-bold'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800/40'
            }\`}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}`;

      case 'scroll-stack':
        return `import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollStack({
  cardScale = ${controlValues.cardScale || 0.9},
  spreadOffset = ${controlValues.spreadOffset || 45}
}) {
  const cards = ['Dashboard Layout', 'Analytical Graphs', 'User Profiles', 'Project Milestones'];
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="relative h-60 w-64 flex items-center justify-center select-none">
      {cards.map((card, idx) => {
        const isHovered = hoveredIdx === idx;
        const offset = hoveredIdx !== null ? (idx - hoveredIdx) * spreadOffset : idx * 12;
        const scale = hoveredIdx !== null ? (isHovered ? 1.0 : cardScale) : 1 - idx * 0.04;
        const rotate = hoveredIdx !== null ? (isHovered ? 0 : (idx - hoveredIdx) * 2) : idx * 1.5;

        return (
          <motion.div
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            animate={{ y: offset, scale, rotate, zIndex: isHovered ? 50 : 10 - idx }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className={\`absolute w-56 h-36 rounded-xl border p-4 bg-zinc-900 border-zinc-800 cursor-pointer flex flex-col justify-between shadow-2xl \${
              isHovered ? 'border-violet-500/50 bg-zinc-800/90' : ''
            }\`}
          >
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Card #{idx + 1}</span>
            <span className="text-xs font-mono font-bold text-white">{card}</span>
          </motion.div>
        );
      })}
    </div>
  );
}`;

      case 'bubble-menu':
        return `import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function BubbleMenu({
  accentColor = "${controlValues.accentColor || '#a78bfa'}",
  dampening = ${controlValues.dampening || 12}
}) {
  const tabs = ['Home', 'Analytics', 'Settings', 'Profile'];
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [rects, setRects] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.children;
    const list = [];
    for (let i = 0; i < elements.length; i++) {
      list.push(elements[i].getBoundingClientRect());
    }
    setRects(list);
  }, []);

  const containerRect = containerRef.current?.getBoundingClientRect();
  const activeRect = rects[hoveredTab !== null ? hoveredTab : activeTab];

  return (
    <div className="relative p-2 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center gap-1">
      {activeRect && containerRect && (
        <motion.div
          animate={{
            left: activeRect.left - containerRect.left,
            width: activeRect.width,
            height: activeRect.height
          }}
          transition={{
            type: 'spring',
            stiffness: 300 - dampening * 5,
            damping: 18 + dampening * 0.15
          }}
          className="absolute rounded-lg opacity-25"
          style={{ backgroundColor: accentColor, top: activeRect.top - containerRect.top }}
        />
      )}
      <div ref={containerRef} className="flex items-center gap-1 relative z-10">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            onMouseEnter={() => setHoveredTab(idx)}
            onMouseLeave={() => setHoveredTab(null)}
            className="px-4 py-1.5 rounded-lg text-xs font-mono text-zinc-500 hover:text-zinc-300"
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}`;

      case 'magic-bento':
        return `import React, { useState, useRef } from 'react';

export default function MagicBento({
  glowColor = "${controlValues.glowColor || '#8b5cf6'}",
  tiltStrength = ${controlValues.tiltStrength || 8}
}) {
  const cards = [
    { title: 'Overview', col: 'col-span-2', text: 'Realtime telemetry pipeline monitoring.' },
    { title: 'Deploy', col: 'col-span-1', text: 'Vercel edge server push.' },
    { title: 'Console', col: 'col-span-1', text: 'Staging environment compiler log streams.' },
    { title: 'Settings', col: 'col-span-2', text: 'OKLCH system variables config.' }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-md p-4">
      {cards.map((card, idx) => {
        const itemRef = useRef(null);
        const [tilt, setTilt] = useState({ x: 0, y: 0 });
        const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
        const [isHovered, setIsHovered] = useState(false);

        const handleMouseMove = (e) => {
          if (!itemRef.current) return;
          const rect = itemRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setMousePos({ x, y });

          const xc = rect.width / 2;
          const yc = rect.height / 2;
          setTilt({
            x: ((y - yc) / yc) * tiltStrength,
            y: -((x - xc) / xc) * tiltStrength
          });
        };

        return (
          <div
            key={idx}
            ref={itemRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setTilt({ x: 0, y: 0 });
            }}
            className={\`relative rounded-xl border border-zinc-900 bg-zinc-950 p-4 overflow-hidden \${card.col}\`}
            style={{
              transform: \`perspective(1000px) rotateX(\${tilt.x}deg) rotateY(\${tilt.y}deg)\`,
              transition: isHovered ? 'none' : 'transform 0.4s ease'
            }}
          >
            {isHovered && (
              <div
                className="absolute pointer-events-none rounded-full blur-[60px] opacity-25"
                style={{
                  left: mousePos.x - 70,
                  top: mousePos.y - 70,
                  width: 140,
                  height: 140,
                  backgroundColor: glowColor
                }}
              />
            )}
            <span className="text-[10px] font-bold font-mono text-zinc-500 uppercase">{card.title}</span>
            <p className="text-[11px] font-mono text-zinc-300 mt-2">{card.text}</p>
          </div>
        );
      })}
    </div>
  );
}`;

      case 'circular-gallery':
        return `import React from 'react';
import { motion } from 'framer-motion';

export default function CircularGallery({
  radius = ${controlValues.radius || 110},
  rotationSpeed = ${controlValues.rotationSpeed || 15}
}) {
  const cards = ['Img 1', 'Img 2', 'Img 3', 'Img 4', 'Img 5', 'Img 6'];

  return (
    <div className="relative h-64 w-64 flex items-center justify-center overflow-hidden">
      <motion.div
        className="relative flex items-center justify-center"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: rotationSpeed, ease: 'linear' }}
      >
        {cards.map((card, i) => {
          const rotation = (i * 360) / cards.length;
          return (
            <div
              key={i}
              className="absolute w-12 h-16 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center font-mono text-[10px] text-zinc-400"
              style={{
                transform: \`rotate(\${rotation}deg) translateY(-\${radius}px) rotate(-\${rotation}deg)\`
              }}
            >
              {card}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}`;

      case 'reflective-card':
        return `import React, { useState, useRef } from 'react';

export default function ReflectiveCard({
  glareOpacity = ${controlValues.glareOpacity || 0.4},
  tiltScale = ${controlValues.tiltScale || 15}
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    setTilt({
      x: ((rect.height / 2 - y) / (rect.height / 2)) * tiltScale,
      y: ((x - rect.width / 2) / (rect.width / 2)) * tiltScale
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      className="relative w-56 h-36 rounded-xl border border-zinc-800 bg-zinc-950 cursor-pointer p-4 overflow-hidden flex flex-col justify-between shadow-2xl"
      style={{
        transform: \`perspective(1000px) rotateX(\${tilt.x}deg) rotateY(\${tilt.y}deg)\`,
        transition: hovered ? 'none' : 'transform 0.3s ease'
      }}
    >
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge"
          style={{
            background: \`radial-gradient(circle at \${glare.x}% \${glare.y}%, rgba(255,255,255,\${glareOpacity}) 0%, transparent 60%)\`
          }}
        />
      )}
      <span className="text-[9px] font-mono text-zinc-500 font-bold">Reflective Card</span>
      <span className="text-xs font-mono font-bold text-white block">METALLIC OVERLAY</span>
    </div>
  );
}`;

      case 'dock':
        return `import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Dock({
  maxZoom = ${controlValues.maxZoom || 1.6},
  dockPadding = ${controlValues.dockPadding || 10}
}) {
  const icons = ['📄', '📂', '⚡', '🎨', '🔧', '⚙️'];
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div
      className="flex items-end gap-3 bg-zinc-950 border border-zinc-900 rounded-2xl shadow-xl"
      style={{ padding: \`\${dockPadding}px\` }}
    >
      {icons.map((icon, idx) => {
        let scale = 1.0;
        if (hoveredIdx !== null) {
          const diff = Math.abs(idx - hoveredIdx);
          if (diff === 0) scale = maxZoom;
          else if (diff === 1) scale = 1 + (maxZoom - 1) * 0.5;
        }

        return (
          <motion.div
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            animate={{ scale }}
            transition={{ type: 'spring', stiffness: 280, damping: 15 }}
            className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg cursor-pointer"
          >
            {icon}
          </motion.div>
        );
      })}
    </div>
  );
}`;

      case 'spotlight-card':
        return `import React, { useState, useRef } from 'react';

export default function SpotlightCard({
  spotlightSize = ${controlValues.spotlightSize || 140},
  spotlightColor = "${controlValues.spotlightColor || '#8b5cf6'}"
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-56 h-36 rounded-xl border border-zinc-800 bg-zinc-950 p-4 overflow-hidden shadow-2xl cursor-pointer"
    >
      {hovered && (
        <div
          className="absolute pointer-events-none rounded-full blur-[50px] opacity-15"
          style={{
            left: mousePos.x - spotlightSize / 2,
            top: mousePos.y - spotlightSize / 2,
            width: spotlightSize,
            height: spotlightSize,
            backgroundColor: spotlightColor
          }}
        />
      )}
      <span className="text-[9px] font-mono text-zinc-500 font-bold">Spotlight Container</span>
      <span className="text-xs font-mono font-bold text-white block">RADIAL SPOTLIGHT</span>
    </div>
  );
}`;

      case 'border-glow':
        return `import React from 'react';

export default function BorderGlow({
  glowSpeed = ${controlValues.glowSpeed || 3.5},
  glowColor = "${controlValues.glowColor || '#a78bfa'}"
}) {
  return (
    <div className="relative w-56 h-36 rounded-xl overflow-hidden p-[1px] shadow-2xl">
      <div
        className="absolute inset-[-1000%] animate-spin"
        style={{
          background: \`conic-gradient(from 0deg, transparent 40%, \${glowColor} 50%, transparent 60%, \${glowColor} 100%)\`,
          animationDuration: \`\${glowSpeed}s\`
        }}
      />
      <div className="relative w-full h-full rounded-xl bg-zinc-950 p-4 flex flex-col justify-between">
        <span className="text-[9px] font-mono text-zinc-500 font-bold">NEON GLOW BORDER</span>
        <span className="text-xs font-mono font-bold text-white block">CONIC SHADER</span>
      </div>
    </div>
  );
}`;

      case 'card-swap':
        return `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CardSwap({
  rotationTilt = ${controlValues.rotationTilt || 6}
}) {
  const cards = ['Premium Dashboards', 'OKLCH Systems', 'Shader Libraries'];
  const [index, setIndex] = useState(0);

  return (
    <div
      onClick={() => setIndex(prev => (prev + 1) % cards.length)}
      className="relative h-40 w-56 flex items-center justify-center cursor-pointer"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ scale: 0.8, y: -20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1, rotate: rotationTilt }}
          exit={{ scale: 0.9, y: 30, opacity: 0, rotate: -rotationTilt * 1.5 }}
          className="absolute w-48 h-32 rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex flex-col justify-between shadow-2xl"
        >
          <span className="text-[9px] font-mono text-zinc-500 font-bold">Swap Deck</span>
          <span className="text-xs font-mono font-bold text-white">{cards[index]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}`;

      default:
        return `import React from 'react';
import { motion } from 'framer-motion';

// ${activeConfig.name} Component
export default function ${activeConfig.name.replace(/\s+/g, '')}() {
  return (
    <div className="p-6 border border-zinc-900 rounded-xl bg-zinc-950 flex flex-col items-center justify-center select-none font-mono">
      <span className="text-xs font-bold text-white">${activeConfig.name}</span>
      <span className="text-[9px] text-zinc-500 mt-1">Component template ready for implementation.</span>
    </div>
  );
}`;
    }
  };

  // INDIVIDUAL COMPONENT RENDERER
  const renderActivePreview = () => {
    switch (activeAnimId) {
      case 'animated-list':
        return (
          <AnimatedListPreview
            fadeItems={controlValues.fadeItems !== false}
            keyboardNav={controlValues.keyboardNav !== false}
            showScrollbar={controlValues.showScrollbar === true}
            triggerKey={triggerKey}
          />
        );
      case 'scroll-stack':
        return (
          <ScrollStackPreview
            cardScale={controlValues.cardScale !== undefined ? controlValues.cardScale : 0.9}
            spreadOffset={controlValues.spreadOffset !== undefined ? controlValues.spreadOffset : 45}
          />
        );
      case 'bubble-menu':
        return (
          <BubbleMenuPreview
            accentColor={controlValues.accentColor || '#a78bfa'}
            dampening={controlValues.dampening !== undefined ? controlValues.dampening : 12}
          />
        );
      case 'magic-bento':
        return (
          <MagicBentoPreview
            glowColor={controlValues.glowColor || '#8b5cf6'}
            tiltStrength={controlValues.tiltStrength !== undefined ? controlValues.tiltStrength : 8}
          />
        );
      case 'circular-gallery':
        return (
          <CircularGalleryPreview
            radius={controlValues.radius !== undefined ? controlValues.radius : 110}
            rotationSpeed={controlValues.rotationSpeed !== undefined ? controlValues.rotationSpeed : 15}
          />
        );
      case 'reflective-card':
        return (
          <ReflectiveCardPreview
            glareOpacity={controlValues.glareOpacity !== undefined ? controlValues.glareOpacity : 0.4}
            tiltScale={controlValues.tiltScale !== undefined ? controlValues.tiltScale : 15}
          />
        );
      case 'dock':
        return (
          <DockPreview
            maxZoom={controlValues.maxZoom !== undefined ? controlValues.maxZoom : 1.6}
            dockPadding={controlValues.dockPadding !== undefined ? controlValues.dockPadding : 10}
          />
        );
      case 'spotlight-card':
        return (
          <SpotlightCardPreview
            spotlightSize={controlValues.spotlightSize !== undefined ? controlValues.spotlightSize : 140}
            spotlightColor={controlValues.spotlightColor || '#8b5cf6'}
          />
        );
      case 'border-glow':
        return (
          <BorderGlowPreview
            glowSpeed={controlValues.glowSpeed !== undefined ? controlValues.glowSpeed : 3.5}
            glowColor={controlValues.glowColor || '#a78bfa'}
          />
        );
      case 'card-swap':
        return (
          <CardSwapPreview
            rotationTilt={controlValues.rotationTilt !== undefined ? controlValues.rotationTilt : 6}
          />
        );
      default:
        return (
          <div className="p-6 border border-zinc-900 rounded-xl bg-zinc-950/40 flex flex-col items-center justify-center select-none text-center max-w-xs font-mono">
            <span className="text-xs font-bold text-white uppercase">{activeConfig.name}</span>
            <span className="text-[9px] text-zinc-500 mt-2 leading-relaxed">
              This layout ({activeConfig.id}) is fully initialized. Use the Code panel above to inspect or copy its default template.
            </span>
          </div>
        );
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
                {comp.isNew && (
                  <span className="px-1 py-0.5 rounded bg-violet-600/30 text-violet-300 border border-violet-500/20 text-[7px] font-bold uppercase tracking-wider scale-90">
                    New
                  </span>
                )}
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
                    onClick={() => setExportTab('usage')}
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-mono rounded cursor-pointer transition-colors",
                      exportTab === 'usage' ? "bg-zinc-900 text-white font-bold" : "text-zinc-500 hover:text-zinc-350"
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
