import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/app/layouts/AppLayout';
import LandingPage from '@/app/routes/landing';
import ToolsDirectory from '@/app/routes/tools-directory';
import ToolWrapper from '@/app/routes/tool-wrapper';
import DocsPage from '@/app/routes/docs';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/tools" element={<Navigate to="/tools/backgrounds" replace />} />
          <Route path="/tools/:toolId" element={<ToolWrapper />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
