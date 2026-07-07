import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS_REGISTRY } from '@/registry/tools';
import GradientBlinds from '@/components/ui/GradientBlinds';

export default function LandingPage() {
  return (
    <div className="bg-black text-zinc-100 flex flex-col items-center">
      {/* 1. Cinematic Hero Section with Shader Background */}
      <section className="relative w-full h-[calc(100vh-80px)] min-h-[600px] flex flex-col items-center justify-center overflow-hidden border-b border-zinc-900 bg-black">
        {/* WebGL Shader Layer */}
        <div className="absolute inset-0 z-0 opacity-90 select-none pointer-events-none">
          <GradientBlinds
            gradientColors={['#FF0000', '#000000']}
            angle={35}
            noise={0.45}
            blindCount={12}
            blindMinWidth={60}
            spotlightRadius={0.45}
            spotlightSoftness={1.1}
            spotlightOpacity={1.0}
            mouseDampening={0.15}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
          />
          {/* Bottom edge fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        {/* Hero Text Foreground */}
        <div className="relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-3xl mb-6 text-white select-none">
            Your shortcut to everything.
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed select-none">
            A collection of powerful developer tools all within an extendable workspace. Fast, local and reliable.
          </p>
        </div>
      </section>

      {/* 2. Featured Tools Grid */}
      <section className="w-full max-w-4xl px-6 my-20">
        <h2 className="font-mono text-xs text-zinc-500 font-bold uppercase tracking-widest mb-6 text-left border-b border-zinc-900 pb-2">
          Featured Utilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TOOLS_REGISTRY.map(tool => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                to={`/tools/${tool.id}`}
                className="group flex flex-col justify-between p-5 rounded border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-950 hover:border-zinc-700 transition-all text-left"
              >
                <div>
                  <div className="w-8 h-8 rounded border border-zinc-800 bg-black flex items-center justify-center mb-4 group-hover:border-zinc-700 transition-colors">
                    <Icon className="w-4 h-4 text-zinc-400 group-hover:text-zinc-100 transition-colors" />
                  </div>
                  <h3 className="font-mono text-sm font-semibold text-zinc-100 mb-1 group-hover:text-white transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                
                <div className="mt-6 pt-3 border-t border-zinc-900/50 flex items-center justify-between font-mono text-[9px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  <span>Category: {tool.category}</span>
                  <span className="flex items-center gap-1 group-hover:text-zinc-200 transition-colors">
                    Open <kbd className="kbd-tag py-0 px-1 text-[8px] scale-90">{tool.shortcut}</kbd>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. What's Inside — Bento Feature Grid */}
      <section className="w-full max-w-4xl px-6 mb-20">
        <h2 className="font-mono text-xs text-zinc-500 font-bold uppercase tracking-widest mb-6 text-left border-b border-zinc-900 pb-2">
          What's inside
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* Card 1 — Component Chips showcase */}
          <div className="col-span-1 row-span-1 p-5 rounded border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between min-h-[220px] overflow-hidden relative group hover:border-zinc-800 transition-all">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['Animated List','Scroll Stack','Bubble Menu','Magic Bento','Strands','Magnet','Fluid Glass','Dock','Sparkle Button','Matrix Rain','Glass Buttons','Back to Top'].map(name => (
                <span key={name} className="font-mono text-[10px] px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-default select-none">
                  {name}
                </span>
              ))}
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white mb-1">12 UI Components</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Physics, 3D, WebGL and motion-powered components. Preview live, tweak controls, copy source.</p>
            </div>
          </div>

          {/* Card 2 — Visual Tools */}
          <div className="col-span-1 p-5 rounded border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between min-h-[220px] hover:border-zinc-800 transition-all group">
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-3 opacity-60 group-hover:opacity-80 transition-opacity">
                {[
                  { icon: '⬡', label: 'Icons' },
                  { icon: '◈', label: 'Colors' },
                  { icon: '▣', label: 'Backgrounds' },
                  { icon: '⟨/⟩', label: 'Snippets' },
                  { icon: 'T↗', label: 'Text FX' },
                  { icon: '⬚', label: 'Components' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <div className="w-9 h-9 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center font-mono text-xs text-zinc-400">
                      {icon}
                    </div>
                    <span className="font-mono text-[9px] text-zinc-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-mono text-sm font-bold text-white mb-1">6 Visual Tools</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Studio-grade editors with live preview. Generate and export production-ready code.</p>
            </div>
          </div>

          {/* Card 3 — Copy-paste ready */}
          <div className="col-span-1 p-5 rounded border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between min-h-[220px] hover:border-zinc-800 transition-all group">
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full font-mono text-[10px] rounded border border-zinc-800 bg-black/60 p-3 space-y-1.5 opacity-60 group-hover:opacity-90 transition-opacity">
                <div className="text-zinc-500 text-[9px] mb-1">● ● ●&nbsp;&nbsp;component.tsx</div>
                <div><span className="text-purple-400">import</span> <span className="text-zinc-300">Dock</span> <span className="text-purple-400">from</span> <span className="text-green-400">'./Dock'</span></div>
                <div><span className="text-purple-400">import</span> <span className="text-zinc-300">Strands</span> <span className="text-purple-400">from</span> <span className="text-green-400">'./Strands'</span></div>
                <div className="text-zinc-500">{'// preview → customize → copy'}</div>
                <div><span className="text-blue-400">{'<Dock'}</span> <span className="text-amber-300">magnification</span><span className="text-zinc-300">={'{70}'}</span> <span className="text-blue-400">{'/>'}</span></div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-mono text-sm font-bold text-white mb-1">Copy-Paste Ready</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Every component exports clean TSX + CSS source. Drop into any React project instantly.</p>
            </div>
          </div>

          {/* Card 4 — Stack options */}
          <div className="col-span-1 p-5 rounded border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between min-h-[200px] hover:border-zinc-800 transition-all group">
            <div className="flex-1 space-y-2 pt-2">
              {[
                { stack: 'React + TypeScript', dot: 'bg-violet-500' },
                { stack: 'CSS Modules', dot: 'bg-blue-500' },
                { stack: 'Framer Motion', dot: 'bg-pink-500' },
                { stack: 'GSAP + OGL + Three.js', dot: 'bg-emerald-500' },
              ].map(({ stack, dot }) => (
                <div key={stack} className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  <span className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />
                  {stack}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="font-mono text-sm font-bold text-white mb-1">Modern Stack</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Built with the tools you already use. No proprietary lock-in.</p>
            </div>
          </div>

          {/* Card 5 — Live customizer */}
          <div className="col-span-1 p-5 rounded border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between min-h-[200px] hover:border-zinc-800 transition-all group">
            <div className="flex-1 flex flex-col justify-center gap-2 pt-2">
              {[
                { label: 'Speed', pct: 72 },
                { label: 'Amplitude', pct: 48 },
                { label: 'Glow', pct: 85 },
              ].map(({ label, pct }) => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between font-mono text-[9px] text-zinc-500">
                    <span>{label}</span><span className="text-zinc-400">{pct}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-zinc-800">
                    <div className="h-1 rounded-full bg-gradient-to-r from-violet-600 to-purple-400 transition-all group-hover:opacity-100 opacity-60" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="font-mono text-sm font-bold text-white mb-1">Live Customize</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Sliders, toggles, color pickers. Tweak every prop and see changes instantly.</p>
            </div>
          </div>

          {/* Card 6 — Local-first / stat card */}
          <div className="col-span-1 p-5 rounded border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between min-h-[200px] hover:border-zinc-800 transition-all group relative overflow-hidden">
            <div className="flex-1 flex flex-col justify-center">
              <div className="font-mono font-extrabold text-5xl text-white tracking-tight leading-none mb-1 group-hover:text-violet-300 transition-colors">
                100%
              </div>
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Local & Private</div>
              {/* mini chart line */}
              <svg viewBox="0 0 120 36" className="mt-4 w-full opacity-30 group-hover:opacity-60 transition-opacity" fill="none">
                <polyline points="0,32 20,28 40,20 60,22 80,10 100,8 120,4" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white mb-1">Runs Offline</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">No telemetry, no accounts. Everything runs in your browser. Your data stays yours.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. About the Creator Section */}
      <section className="w-full max-w-4xl px-6 mb-24 mt-8">
        <h2 className="font-mono text-xs text-zinc-500 font-bold uppercase tracking-widest mb-6 text-left border-b border-zinc-900 pb-2">
          Creator
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded border border-zinc-900 bg-zinc-950/20 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-full border border-zinc-805 bg-zinc-900 flex items-center justify-center font-mono text-xl font-bold text-white shadow-inner shrink-0 select-none">
            SL
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h3 className="font-mono text-sm font-bold text-white">slythnox</h3>
            <p className="text-xs text-zinc-450 leading-relaxed max-w-2xl">
              Software architect and designer. Creator of ONYX. Building local-first developer utilities, minimal interfaces, and high-performance visual tools. Dedicated to creating polished workflows that run entirely in the browser, keeping your development data private and fast.
            </p>
            <div className="flex justify-center md:justify-start gap-4 pt-1 text-[10px] font-mono text-zinc-500">
              <a href="https://github.com/slythnox" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">github.com/slythnox</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
