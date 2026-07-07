import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TOOLS_REGISTRY } from '@/registry/tools';
import GradientBlinds from '@/components/ui/GradientBlinds';

const COMPONENTS = [
  'Animated List','Scroll Stack','Magic Bento',
  'Strands','Magnet','Fluid Glass','Dock',
  'Sparkle Button','Matrix Rain','Glass Buttons','Back to Top',
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-zinc-100 flex flex-col items-center">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[calc(100vh-80px)] min-h-[600px] flex flex-col items-center justify-center overflow-hidden border-b border-zinc-900 bg-black">
        {/* WebGL shader */}
        <div className="absolute inset-0 z-0 opacity-90 select-none pointer-events-auto">
          <GradientBlinds
            gradientColors={['#FF0000', '#000000']}
            angle={35} noise={0.45} blindCount={12} blindMinWidth={60}
            spotlightRadius={0.45} spotlightSoftness={1.1} spotlightOpacity={1.0}
            mouseDampening={0.15} distortAmount={0}
            shineDirection="left" mixBlendMode="lighten"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center gap-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-3xl text-white select-none">
            Every dev tool you need,<br />in one place.
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed select-none">
            Six precision-built tools — code snippets, icons, colors, backgrounds, text effects, and UI components. Open source. Always free.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => navigate('/tools/components')}
              className="flex items-center gap-2 px-5 py-2.5 rounded bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 transition-colors"
            >
              Browse Tools <span className="opacity-60">→</span>
            </button>
            <a
              href="https://github.com/slythnox/Onyx-Tools"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded border border-zinc-700 bg-transparent text-zinc-200 font-mono text-xs font-bold hover:border-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ────────────────────────────────────────────── */}
      <section className="w-full max-w-4xl px-6 my-20">
        <h2 className="font-mono text-xs text-zinc-500 font-bold uppercase tracking-widest mb-6 text-left border-b border-zinc-900 pb-2">
          What's inside
        </h2>

        {/* ROW 1 — Components wide card + code preview narrow */}
        <div className="grid grid-cols-3 gap-3 mb-3">

          {/* A: 12 UI Components — col-span-2 */}
          <div className="col-span-2 p-6 rounded border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between min-h-[230px] overflow-hidden group hover:border-zinc-800 transition-all">
            <div className="flex flex-wrap gap-1.5 mb-6">
              {COMPONENTS.map(name => (
                <span key={name} className="font-mono text-[10px] px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors cursor-default select-none">
                  {name}
                </span>
              ))}
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white mb-1">12 UI Components</h3>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-md">
                Physics, 3D, WebGL and motion-powered. Preview live, tweak controls, copy clean TSX source.
              </p>
            </div>
          </div>

          {/* B: Copy-paste ready — col-span-1 */}
          <div className="col-span-1 p-5 rounded border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between min-h-[230px] hover:border-zinc-800 transition-all group">
            <div className="flex-1 flex items-start pt-1">
              <div className="w-full font-mono text-[10px] rounded border border-zinc-800 bg-black/70 p-3 space-y-1.5 opacity-50 group-hover:opacity-90 transition-opacity leading-snug">
                <div className="text-zinc-600 text-[9px] pb-1 border-b border-zinc-800/60">● ● ●&nbsp;&nbsp;component.tsx</div>
                <div><span className="text-purple-400">import</span> <span className="text-zinc-300">Dock</span> <span className="text-purple-400">from</span> <span className="text-green-400">'./Dock'</span></div>
                <div><span className="text-purple-400">import</span> <span className="text-zinc-300">Strands</span> <span className="text-purple-400">from</span> <span className="text-green-400">'./Strands'</span></div>
                <div className="text-zinc-600">{'// preview → tweak → copy'}</div>
                <div><span className="text-blue-400">{'<Dock'}</span> <span className="text-amber-300">magnification</span><span className="text-zinc-300">={'{70}'}</span> <span className="text-blue-400">{'/>'}</span></div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-mono text-sm font-bold text-white mb-1">Copy-Paste Ready</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Clean TSX + CSS. Drop into any React project instantly.</p>
            </div>
          </div>

        </div>

        {/* ROW 2 — 6 Tools full-width showcase */}
        <div className="rounded border border-zinc-900 bg-zinc-950/60 p-6 hover:border-zinc-800 transition-all group">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
            {TOOLS_REGISTRY.map(tool => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={`/tools/${tool.id}`}
                  className="flex items-start gap-3 group/item"
                >
                  <div className="w-7 h-7 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:border-zinc-600 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover/item:text-zinc-200 transition-colors" />
                  </div>
                  <div>
                    <div className="font-mono text-xs font-semibold text-zinc-200 group-hover/item:text-white transition-colors leading-tight mb-0.5">
                      {tool.title}
                    </div>
                    <div className="font-mono text-[10px] text-zinc-600 leading-snug line-clamp-2 group-hover/item:text-zinc-400 transition-colors">
                      {tool.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-white">6 Visual Tools</span>
            <span className="font-mono text-[10px] text-zinc-500">Studio-grade editors · Export production code</span>
          </div>
        </div>

      </section>

      {/* ── CTA SECTION ──────────────────────────────────────────────── */}
      <section className="w-full max-w-4xl px-6 mb-24">
        <div className="rounded border border-zinc-900 bg-zinc-950/40 px-8 py-14 flex flex-col items-center text-center gap-6 relative overflow-hidden group hover:border-zinc-800 transition-all">
          {/* subtle glow bg */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/10 to-transparent pointer-events-none" />
          <h2 className="relative font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Craft beautiful interfaces faster.
          </h2>
          <p className="relative text-sm text-zinc-400 max-w-md leading-relaxed">
            Bring your designs to life with a curated selection of advanced, copy-paste ready developer tools and interactive motion components.
          </p>
          <div className="relative flex items-center gap-3 flex-wrap justify-center font-mono">
            <Link
              to="/docs"
              className="flex items-center gap-2 px-5 py-2.5 rounded bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
            >
              Read Documentation <span className="opacity-60">→</span>
            </Link>
            <a
              href="https://github.com/slythnox/Onyx-Tools"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded border border-zinc-700 bg-transparent text-zinc-200 text-xs font-bold hover:border-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
