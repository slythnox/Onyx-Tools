import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import CommandPalette from '@/components/command-palette/CommandPalette';
import { cn } from '@/lib/utils';

export default function AppLayout() {
  const location = useLocation();
  const isToolPage = location.pathname.startsWith('/tools');

  return (
    <div className="min-h-screen flex flex-col bg-black text-zinc-100 selection:bg-zinc-800 selection:text-white">
      {/* Floating Navbar */}
      {!isToolPage && <Navbar />}

      {/* Main Content Area */}
      <main className={cn('flex-1 flex flex-col', !isToolPage && 'pt-20')}>
        <Outlet />
      </main>

      {/* Global Command Palette */}
      <CommandPalette />

      {/* Workspace Footer */}
      {!isToolPage && (
        <footer className="border-t border-zinc-900 bg-black py-6 mt-auto">
          <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-600">
            <div>ONYX — Professional Developer Workspace.</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center sm:justify-end text-zinc-650">
              <a href="https://github.com/slythnox/Onyx-Tools" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">Open Source</a>
              <span>•</span>
              <span>Fully Local & Private</span>
              <span>•</span>
              <span>v1.1.0</span>
              <span>•</span>
              <span>Credits: <a href="https://reactbits.dev" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 underline decoration-zinc-850">ReactBits</a>, <a href="https://threejs.org" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 underline decoration-zinc-850">Three.js</a>, <a href="https://github.com/oopsaune/ogl" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 underline decoration-zinc-850">OGL</a>, <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 underline decoration-zinc-850">Lucide</a></span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
