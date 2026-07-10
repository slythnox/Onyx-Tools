import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import AppRouter from '@/app/router';
import { ToastProvider } from '@/app/providers/ToastProvider';
import '@/styles/globals.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
    <Analytics />
  </StrictMode>
);
 