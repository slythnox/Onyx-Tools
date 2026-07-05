import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md rounded-lg h-12 px-4 shadow-xl pointer-events-auto">
        {/* Brand Logo & Navigation */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-mono text-sm font-bold tracking-widest text-white uppercase">
              NOX
            </span>
          </Link>
          <div className="w-px h-4 bg-zinc-800" />
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className={cn(
                'text-xs font-mono px-2.5 py-1 rounded transition-colors',
                isLanding ? 'text-white bg-zinc-900' : 'text-zinc-400 hover:text-zinc-100'
              )}
            >
              Home
            </Link>
            <Link
              to="/tools/snippets"
              className={cn(
                'text-xs font-mono px-2.5 py-1 rounded transition-colors',
                location.pathname.startsWith('/tools') ? 'text-white bg-zinc-900' : 'text-zinc-400 hover:text-zinc-100'
              )}
            >
              Tools
            </Link>
          </nav>
        </div>

        {/* Global actions: GitHub Link */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/slythnox/NOX-Tools"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
