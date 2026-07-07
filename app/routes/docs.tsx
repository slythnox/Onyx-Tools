import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Code, 
  Palette, 
  Pipette, 
  Layers, 
  Type, 
  Sparkles, 
  Info,
  ChevronRight,
  Heart
} from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  icon: any;
}

export default function DocsPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('intro');

  const SECTIONS: DocSection[] = [
    { id: 'intro', title: 'Introduction', icon: BookOpen },
    { id: 'tools', title: 'Visual Editors (6)', icon: Layers },
    { id: 'components', title: 'UI Components (12)', icon: Code },
    { id: 'credits', title: 'Credits & Resources', icon: Heart },
  ];

  return (
    <div className="w-full min-h-screen bg-black text-zinc-300 flex justify-center pb-24">
      <div className="w-full max-w-5xl px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pt-10">
        
        {/* SIDEBAR */}
        <div className="md:col-span-1 space-y-6">
          <div className="sticky top-28 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
              <BookOpen className="w-4 h-4 text-red-500" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">Documentation</span>
            </div>
            
            <nav className="space-y-1">
              {SECTIONS.map(sec => {
                const Icon = sec.icon;
                const active = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSection(sec.id);
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-left font-mono text-xs transition-all ${
                      active 
                        ? 'bg-zinc-900/60 text-white font-bold border-l-2 border-red-500' 
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" />
                      {sec.title}
                    </span>
                    <ChevronRight className={`w-3 h-3 transition-transform ${active ? 'opacity-100 rotate-90' : 'opacity-0'}`} />
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-zinc-900">
              <button
                onClick={() => navigate('/')}
                className="w-full px-3 py-2 rounded text-center font-mono text-xs font-bold border border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* DOCS CONTENT */}
        <div className="md:col-span-3 space-y-16">
          
          {/* Section 1: Introduction */}
          <section id="intro" className="space-y-4 scroll-mt-28">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Introduction</h1>
            <p className="text-sm leading-relaxed text-zinc-400">
              Onyx Tools is an open-source, developer-first workspace designed to eliminate visual boilerplate code. Instead of spending hours styling buttons, configuring layouts, or animating components from scratch, Onyx gives you six visual studio-grade editors to live-customize and export production-ready code.
            </p>
            <div className="p-4 rounded border border-zinc-900 bg-zinc-950/40 space-y-2 flex gap-3 items-start">
              <Info className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-500 leading-relaxed">
                <strong>Local-First & Privacy Preserved:</strong> All design and code generation runs completely locally inside your browser. No analytics tracking, no forced sign-ins, and zero developer lock-in. Tweak controls, copy the clean source, and keep building.
              </div>
            </div>
          </section>

          {/* Section 2: Visual Editors */}
          <section id="tools" className="space-y-6 scroll-mt-28">
            <h2 className="text-2xl font-bold text-white tracking-tight border-b border-zinc-900 pb-2">
              Visual Editors
            </h2>
            <p className="text-sm text-zinc-400">
              Onyx comes equipped with six design-system and graphics tools ready to generate optimized CSS, canvas code, and React files:
            </p>

            <div className="space-y-4">
              
              <div className="p-5 rounded border border-zinc-900 bg-zinc-950/20 space-y-2">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-red-500" />
                  <h3 className="font-mono text-sm font-bold text-white">1. Code Snippets</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Export code blocks into gorgeous high-retina screenshots. Customize editor themes, toggle macOS window controls, adjust padding/margins, change gradients, and download high-resolution PNGs instantly.
                </p>
              </div>

              <div className="p-5 rounded border border-zinc-900 bg-zinc-950/20 space-y-2">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-red-500" />
                  <h3 className="font-mono text-sm font-bold text-white">2. Icon Studio</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Search and customize over 1,400 Lucide vector icons. Adjust stroke width, colors, sizes, and padding. Download as SVGs, raw PNG files, or pre-formatted React JSX code.
                </p>
              </div>

              <div className="p-5 rounded border border-zinc-900 bg-zinc-950/20 space-y-2">
                <div className="flex items-center gap-2">
                  <Pipette className="w-4 h-4 text-red-500" />
                  <h3 className="font-mono text-sm font-bold text-white">3. OKLCH Generator</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Design perceptually-uniform color systems using the modern OKLCH standard. Generates consistent contrast levels between dark and light modes, outputting clean CSS custom properties ready for Tailwind or vanilla CSS configs.
                </p>
              </div>

              <div className="p-5 rounded border border-zinc-900 bg-zinc-950/20 space-y-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-red-500" />
                  <h3 className="font-mono text-sm font-bold text-white">4. Background Studio</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Generate abstract, high-performance web backgrounds. Instantly customize parameters like blind count, noise, distort amounts, angles, and color stops. Exports raw CSS, Tailwind configuration, or custom React wrapper components.
                </p>
              </div>

              <div className="p-5 rounded border border-zinc-900 bg-zinc-950/20 space-y-2">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-red-500" />
                  <h3 className="font-mono text-sm font-bold text-white">5. Text Animations</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  High-performance text animation presets (SplitText, Typetransitions, Scrambled, and more). Customize stagger delays, spring physics, and CSS transforms. Export clean Framer Motion React nodes.
                </p>
              </div>

              <div className="p-5 rounded border border-zinc-900 bg-zinc-950/20 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-500" />
                  <h3 className="font-mono text-sm font-bold text-white">6. Components Studio</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  The primary showcase and sandbox for 12 layout-ready interactive React UI components. Tweak physics sliders, view live render boxes, and copy the full source files.
                </p>
              </div>

            </div>
          </section>

          {/* Section 3: UI Components */}
          <section id="components" className="space-y-6 scroll-mt-28">
            <h2 className="text-2xl font-bold text-white tracking-tight border-b border-zinc-900 pb-2">
              UI Components
            </h2>
            <p className="text-sm text-zinc-400">
              The 12 interactive components inside Onyx are optimized for developer workflows:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded border border-zinc-900 bg-zinc-950/40">
                <h4 className="font-mono text-xs font-bold text-white mb-1">Dock</h4>
                <p className="text-[11px] text-zinc-500">MacOS style spring-physics magnifying application bar.</p>
              </div>
              <div className="p-4 rounded border border-zinc-900 bg-zinc-950/40">
                <h4 className="font-mono text-xs font-bold text-white mb-1">Fluid Glass</h4>
                <p className="text-[11px] text-zinc-500">3D WebGL transmission refraction materials using React Three Fiber.</p>
              </div>
              <div className="p-4 rounded border border-zinc-900 bg-zinc-950/40">
                <h4 className="font-mono text-xs font-bold text-white mb-1">Animated List</h4>
                <p className="text-[11px] text-zinc-500">Keyboard navigable staggered layout list with scroll-opacity filters.</p>
              </div>
              <div className="p-4 rounded border border-zinc-900 bg-zinc-950/40">
                <h4 className="font-mono text-xs font-bold text-white mb-1">Scroll Stack</h4>
                <p className="text-[11px] text-zinc-500">Lenis-driven sticky stacking layout cards with scales, rotates, and blurs.</p>
              </div>

              <div className="p-4 rounded border border-zinc-900 bg-zinc-950/40">
                <h4 className="font-mono text-xs font-bold text-white mb-1">Strands</h4>
                <p className="text-[11px] text-zinc-500">High-performance WebGL mesh animation shader using the OGL canvas library.</p>
              </div>
              <div className="p-4 rounded border border-zinc-900 bg-zinc-950/40">
                <h4 className="font-mono text-xs font-bold text-white mb-1">Magic Bento</h4>
                <p className="text-[11px] text-zinc-500">Magnetism-equipped grid cards containing star fields and particle spotlights.</p>
              </div>
              <div className="p-4 rounded border border-zinc-900 bg-zinc-950/40">
                <h4 className="font-mono text-xs font-bold text-white mb-1">Magnet</h4>
                <p className="text-[11px] text-zinc-500">Clean wrapper component that pulls nested content towards the hover coordinate.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Credits & Resources */}
          <section id="credits" className="space-y-6 scroll-mt-28">
            <h2 className="text-2xl font-bold text-white tracking-tight border-b border-zinc-900 pb-2">
              Credits &amp; Resources
            </h2>
            <p className="text-sm text-zinc-400">
              Onyx is made possible by building upon incredible open-source research and libraries from the modern web developer ecosystem:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-1">
                <h3 className="font-mono text-sm font-bold text-white">ReactBits</h3>
                <p className="text-xs text-zinc-500">
                  Many presets, typography animations, and particle/mesh backgrounds originated from codebases or snippets inspired by the excellent catalogs on{' '}
                  <a href="https://reactbits.dev" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">reactbits.dev</a>.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-mono text-sm font-bold text-white">Three.js &amp; Fiber</h3>
                <p className="text-xs text-zinc-500">
                  All 3D layouts, transmission refractions, and mesh renders rely on Three.js, React Three Fiber, and Drei wrappers to handle WebGL calculations.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-mono text-sm font-bold text-white">OGL</h3>
                <p className="text-xs text-zinc-500">
                  A minimal WebGL library created by oopsaune, utilized within the high-performance particle paths and shader pipelines (e.g. Strands).
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-mono text-sm font-bold text-white">GSAP &amp; Framer Motion</h3>
                <p className="text-xs text-zinc-500">
                  Handles all standard layout triggers, spring physics loops, staggering menu animations, and UI transforms seamlessly.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
