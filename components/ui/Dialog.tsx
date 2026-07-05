import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@/lib/utils';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Dialog({ isOpen, onClose, children, className }: DialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />
      {/* Modal Dialog Content */}
      <div
        className={cn(
          'relative w-full max-w-xl rounded border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden focus:outline-none',
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
