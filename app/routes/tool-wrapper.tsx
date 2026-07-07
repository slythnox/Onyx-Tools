import React, { Suspense, useState, useEffect, useRef } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { TOOLS_REGISTRY } from '@/registry/tools';
import Skeleton from '@/components/ui/Skeleton';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ToolWrapper() {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = TOOLS_REGISTRY.find(t => t.id === toolId);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // If the tool does not exist in our registry, redirect back to landing / home
  if (!tool) {
    return <Navigate to="/" replace />;
  }

  const ToolComponent = tool.component;
  const ActiveIcon = tool.icon;

  const handleToolSelect = (id: string) => {
    navigate(`/tools/${id}`);
    setIsOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-black text-zinc-100">
      {/* Sub-header navigation row for tool page */}
      <div className="border-b border-zinc-900 bg-zinc-950/20 py-3 px-6 flex items-center justify-between z-40">
        
        {/* Dynamic Raycast-style Dropdown Switcher */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-zinc-900/60 border border-zinc-800 text-xs font-mono select-none">
            {/* Tool Switcher Clickable Area */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-left cursor-pointer focus-visible:ring-1 focus-visible:ring-zinc-500 focus-visible:outline-none hover:text-zinc-300 text-zinc-100 font-semibold rounded px-1 -mx-1"
            >
              <div className="w-5 h-5 rounded bg-black border border-zinc-850 flex items-center justify-center text-zinc-300">
                <ActiveIcon className="w-3.5 h-3.5" />
              </div>
              <span>{tool.title}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 ml-0.5" />
            </button>
            
            <div className="h-4 w-px bg-zinc-850" />
            
            {/* Link to Homepage */}
            <Link
              to="/"
              className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors font-normal cursor-pointer"
            >
              by <span className="text-zinc-400 font-bold hover:text-zinc-200">ONYX</span>
            </Link>
          </div>

          {/* Switcher Dropdown List Panel */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-[320px] rounded border border-zinc-800 bg-zinc-950 p-1.5 shadow-2xl flex flex-col gap-0.5 animate-in fade-in-0 slide-in-from-top-1 duration-100 z-50">
              <div className="px-2 py-1 text-[9px] font-bold font-mono text-zinc-600 uppercase tracking-widest border-b border-zinc-900 mb-1">
                Workspace Utilities
              </div>
              
              {TOOLS_REGISTRY.map(t => {
                const ItemIcon = t.icon;
                const isActive = t.id === tool.id;
                
                return (
                  <button
                    key={t.id}
                    onClick={() => handleToolSelect(t.id)}
                    className={cn(
                      'flex items-center gap-3 w-full p-2 rounded text-left transition-colors cursor-pointer',
                      isActive 
                        ? 'bg-zinc-900 text-white' 
                        : 'hover:bg-zinc-900/40 text-zinc-400 hover:text-zinc-100'
                    )}
                  >
                    <div className={cn(
                      'w-7 h-7 rounded border flex items-center justify-center shrink-0',
                      isActive ? 'border-zinc-700 bg-zinc-800 text-white' : 'border-zinc-850 bg-black text-zinc-400'
                    )}>
                      <ItemIcon className="w-3.5 h-3.5" />
                    </div>
                    
                    <div>
                      <div className="font-semibold text-xs text-zinc-100 font-mono">{t.title}</div>
                      <div className="text-[10px] text-zinc-500 font-normal mt-0.5 line-clamp-1">{t.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
          <span>Workspace engine</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Dynamic module suspense container */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <Suspense
          fallback={
            <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
              <Skeleton className="w-full max-w-4xl h-[550px] rounded" />
            </div>
          }
        >
          <ToolComponent />
        </Suspense>
      </div>
    </div>
  );
}
