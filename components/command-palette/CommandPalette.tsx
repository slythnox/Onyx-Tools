import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft } from 'lucide-react';
import Dialog from '@/components/ui/Dialog';
import { TOOLS_REGISTRY } from '@/registry/tools';
import { cn } from '@/lib/utils';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Key event listeners for opening the palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  // Reset indices on query or open state changes
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      // Timeout to ensure inputs render before focus
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Filter tools based on search terms
  const filteredTools = TOOLS_REGISTRY.filter(tool => {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return true;
    return (
      tool.title.toLowerCase().includes(normalizedQuery) ||
      tool.description.toLowerCase().includes(normalizedQuery) ||
      tool.category.toLowerCase().includes(normalizedQuery) ||
      tool.keywords.some(kw => kw.toLowerCase().includes(normalizedQuery))
    );
  });

  // Keyboard navigation within the dropdown list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredTools.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        selectTool(filteredTools[selectedIndex].id);
      }
    }
  };

  const selectTool = (toolId: string) => {
    navigate(`/tools/${toolId}`);
    setIsOpen(false);
  };

  return (
    <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} className="p-0">
      <div className="flex flex-col max-h-[480px] overflow-hidden bg-zinc-950 font-mono text-xs" onKeyDown={handleListKeyDown}>
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-900">
          <Search className="w-4 h-4 text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a tool name, category, or keyword..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent border-0 outline-none text-zinc-100 placeholder:text-zinc-600 focus:ring-0 py-0"
          />
          <span className="kbd-tag text-[9px]">ESC</span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-machined">
          {filteredTools.length === 0 ? (
            <div className="py-8 text-center text-zinc-600">
              No developer tools matching "{query}" found.
            </div>
          ) : (
            <div className="space-y-0.5">
              <div className="px-2 py-1 text-[10px] text-zinc-600 font-bold uppercase tracking-wider">
                {query ? 'Search Results' : 'Registered Utilities'}
              </div>
              {filteredTools.map((tool, index) => {
                const Icon = tool.icon;
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={tool.id}
                    onClick={() => selectTool(tool.id)}
                    className={cn(
                      'flex items-center justify-between px-3 py-2.5 rounded cursor-pointer transition-colors',
                      isSelected ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-900/50 text-zinc-400'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-7 h-7 rounded border flex items-center justify-center shrink-0',
                        isSelected ? 'border-zinc-700 bg-zinc-850' : 'border-zinc-800 bg-black'
                      )}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-zinc-100">{tool.title}</div>
                        <div className="text-[10px] text-zinc-500 line-clamp-1">{tool.description}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] px-1.5 py-0.5 rounded border border-zinc-900 bg-black text-zinc-500 scale-90">
                        {tool.category}
                      </span>
                      {isSelected ? (
                        <span className="flex items-center gap-0.5 text-zinc-500 text-[10px]">
                          <CornerDownLeft className="w-3 h-3" />
                        </span>
                      ) : (
                        <kbd className="kbd-tag text-[9px] scale-90 uppercase">
                          {tool.shortcut}
                        </kbd>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-900 bg-zinc-950 text-[10px] text-zinc-600 select-none">
          <div className="flex gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <div>NOX Workspace</div>
        </div>
      </div>
    </Dialog>
  );
}
