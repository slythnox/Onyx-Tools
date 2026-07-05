import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from '@/app/router';
import { ToastProvider } from '@/app/providers/ToastProvider';
import '@/styles/globals.css';
import { initProtection } from '@/lib/protection';

// Initialize code protection layer only in Production
if (import.meta.env.PROD) {
  initProtection();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  </StrictMode>
);
