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
    </div>
  );
}
