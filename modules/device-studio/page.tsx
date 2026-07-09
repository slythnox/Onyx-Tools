import React, { useState, useEffect } from 'react';
import { CanvasDeviceInstance, CanvasBackground, ViewState } from './types';
import { getDevice } from './devices/registry';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import ExportPanel from './components/ExportPanel';

const INITIAL_BACKGROUND: CanvasBackground = {
  type: 'gradient',
  color: '#0f0f11',
  gradientFrom: '#1c1c24',
  gradientTo: '#09090c',
  gradientAngle: 135,
  preset: null,
};

const DEFAULT_SHADOW = {
  enabled: true,
  x: 0,
  y: 20,
  blur: 40,
  spread: 0,
  opacity: 0.45,
  color: 'rgba(0,0,0,0.5)',
};

const DEFAULT_GLOW = {
  enabled: false,
  color: '#7c3aed',
  blur: 20,
  opacity: 0.4,
};

export default function DeviceStudioPage() {
  const [devices, setDevices] = useState<CanvasDeviceInstance[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [background, setBackground] = useState<CanvasBackground>(INITIAL_BACKGROUND);
  const [viewState, setViewState] = useState<ViewState>({
    zoom: 0.65, // fit view on default load
    panX: 0,
    panY: 0,
  });

  // Load a default centered device on mount so the user has something to start with
  useEffect(() => {
    handleApplyLayoutPreset('hero');
  }, []);

  // Add Device helper
  const handleAddDevice = (deviceId: string) => {
    const def = getDevice(deviceId);
    if (!def) return;

    const defaultWidth = def.frameW;
    const height = def.frameH;

    const instance: CanvasDeviceInstance = {
      id: `${deviceId}-${Date.now()}`,
      deviceId: deviceId,
      x: Math.round(600 - defaultWidth / 2),
      y: Math.round(400 - height / 2),
      displayWidth: defaultWidth,
      rotation: 0,
      colorId: def.colors[0].id,
      screenshot: null,
      objectFit: 'cover',
      zIndex: devices.length + 1,
      opacity: 1,
      shadow: { ...DEFAULT_SHADOW },
      glow: { ...DEFAULT_GLOW },
      locked: false,
      label: def.name,
    };

    setDevices(prev => [...prev, instance]);
    setSelectedId(instance.id);
  };

  // Delete Device helper
  const handleDeleteDevice = (id: string) => {
    setDevices(prev => prev.filter(d => d.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  // Update Device property helper
  const handleUpdateDevice = (id: string, updates: Partial<CanvasDeviceInstance>) => {
    setDevices(prev =>
      prev.map(d => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  // Canvas background update helper
  const handleUpdateBackground = (updates: Partial<CanvasBackground>) => {
    setBackground(prev => {
      const next = { ...prev, ...updates };
      // Apply preset meshes
      if (updates.preset) {
        if (updates.preset === 'aurora-violet') {
          next.gradientFrom = '#4c1d95';
          next.gradientTo = '#0f0f16';
        } else if (updates.preset === 'aurora-emerald') {
          next.gradientFrom = '#064e3b';
          next.gradientTo = '#090b09';
        } else if (updates.preset === 'aurora-ocean') {
          next.gradientFrom = '#172554';
          next.gradientTo = '#090a0f';
        } else if (updates.preset === 'aurora-crimson') {
          next.gradientFrom = '#581c87';
          next.gradientTo = '#180828';
        }
      }
      return next;
    });
  };

  // Layout Presets generator logic
  const handleApplyLayoutPreset = (presetId: string) => {
    setSelectedId(null);

    if (presetId === 'center') {
      const def = getDevice('laptop');
      if (!def) return;
      const w = 760;
      const h = w * (def.frameH / def.frameW);

      setDevices([
        {
          id: `laptop-center`,
          deviceId: 'laptop',
          x: Math.round(600 - w / 2),
          y: Math.round(400 - h / 2),
          displayWidth: w,
          rotation: 0,
          colorId: def.colors[0].id,
          screenshot: null,
          objectFit: 'cover',
          zIndex: 1,
          opacity: 1,
          shadow: { ...DEFAULT_SHADOW },
          glow: { ...DEFAULT_GLOW },
          locked: false,
          label: def.name,
        },
      ]);
    } else if (presetId === 'hero') {
      const disp = getDevice('studio-display');
      const tab = getDevice('ipad-pro');
      const phone = getDevice('iphone');

      if (!disp || !tab || !phone) return;

      setDevices([
        // Back center display
        {
          id: 'hero-display',
          deviceId: 'studio-display',
          x: 240,
          y: 70,
          displayWidth: 720,
          rotation: 0,
          colorId: disp.colors[0].id,
          screenshot: null,
          objectFit: 'cover',
          zIndex: 1,
          opacity: 1,
          shadow: { ...DEFAULT_SHADOW, y: 15, blur: 30 },
          glow: { ...DEFAULT_GLOW },
          locked: false,
          label: disp.name,
        },
        // Front Left Tablet
        {
          id: 'hero-tablet',
          deviceId: 'ipad-pro',
          x: 160,
          y: 320,
          displayWidth: 220,
          rotation: 0,
          colorId: tab.colors[0].id,
          screenshot: null,
          objectFit: 'cover',
          zIndex: 2,
          opacity: 1,
          shadow: { ...DEFAULT_SHADOW, y: 25, blur: 40 },
          glow: { ...DEFAULT_GLOW },
          locked: false,
          label: tab.name,
        },
        // Front Right Phone
        {
          id: 'hero-phone',
          deviceId: 'iphone',
          x: 880,
          y: 280,
          displayWidth: 170,
          rotation: 0,
          colorId: phone.colors[0].id,
          screenshot: null,
          objectFit: 'cover',
          zIndex: 3,
          opacity: 1,
          shadow: { ...DEFAULT_SHADOW, y: 25, blur: 45 },
          glow: { ...DEFAULT_GLOW },
          locked: false,
          label: phone.name,
        },
      ]);
    } else if (presetId === 'stack') {
      const mac = getDevice('laptop');
      const ipad = getDevice('ipad-mini');
      const phone = getDevice('android');

      if (!mac || !ipad || !phone) return;

      setDevices([
        {
          id: 'stack-mac',
          deviceId: 'laptop',
          x: 120,
          y: 120,
          displayWidth: 600,
          rotation: 0,
          colorId: mac.colors[0].id,
          screenshot: null,
          objectFit: 'cover',
          zIndex: 1,
          opacity: 1,
          shadow: { ...DEFAULT_SHADOW },
          glow: { ...DEFAULT_GLOW },
          locked: false,
          label: mac.name,
        },
        {
          id: 'stack-ipad',
          deviceId: 'ipad-mini',
          x: 600,
          y: 240,
          displayWidth: 320,
          rotation: -8,
          colorId: ipad.colors[0].id,
          screenshot: null,
          objectFit: 'cover',
          zIndex: 2,
          opacity: 1,
          shadow: { ...DEFAULT_SHADOW },
          glow: { ...DEFAULT_GLOW },
          locked: false,
          label: ipad.name,
        },
        {
          id: 'stack-phone',
          deviceId: 'android',
          x: 820,
          y: 380,
          displayWidth: 180,
          rotation: 12,
          colorId: phone.colors[0].id,
          screenshot: null,
          objectFit: 'cover',
          zIndex: 3,
          opacity: 1,
          shadow: { ...DEFAULT_SHADOW },
          glow: { ...DEFAULT_GLOW },
          locked: false,
          label: phone.name,
        },
      ]);
    } else if (presetId === 'floating') {
      const chrome = getDevice('chrome-window');
      const phone = getDevice('iphone');
      const tab = getDevice('tablet');

      if (!chrome || !phone || !tab) return;

      setDevices([
        {
          id: 'float-chrome',
          deviceId: 'chrome-window',
          x: 150,
          y: 120,
          displayWidth: 680,
          rotation: -2,
          colorId: chrome.colors[0].id,
          screenshot: null,
          objectFit: 'cover',
          zIndex: 1,
          opacity: 1,
          shadow: { ...DEFAULT_SHADOW, y: 35, blur: 60 },
          glow: { ...DEFAULT_GLOW },
          locked: false,
          label: chrome.name,
        },
        {
          id: 'float-phone',
          deviceId: 'iphone',
          x: 800,
          y: 260,
          displayWidth: 190,
          rotation: 6,
          colorId: phone.colors[0].id,
          screenshot: null,
          objectFit: 'cover',
          zIndex: 2,
          opacity: 1,
          shadow: { ...DEFAULT_SHADOW, y: 35, blur: 50 },
          glow: { ...DEFAULT_GLOW },
          locked: false,
          label: phone.name,
        },
        {
          id: 'float-tablet',
          deviceId: 'tablet',
          x: 690,
          y: 420,
          displayWidth: 150,
          rotation: -10,
          colorId: tab.colors[0].id,
          screenshot: null,
          objectFit: 'cover',
          zIndex: 3,
          opacity: 1,
          shadow: { ...DEFAULT_SHADOW, y: 20, blur: 30 },
          glow: { ...DEFAULT_GLOW },
          locked: false,
          label: tab.name,
        },
      ]);
    } else if (presetId === 'presentation') {
      const mac = getDevice('laptop');
      const phone = getDevice('iphone');

      if (!mac || !phone) return;

      setDevices([
        {
          id: 'pres-mac',
          deviceId: 'laptop',
          x: 100,
          y: 160,
          displayWidth: 680,
          rotation: 0,
          colorId: mac.colors[0].id,
          screenshot: null,
          objectFit: 'cover',
          zIndex: 1,
          opacity: 1,
          shadow: { ...DEFAULT_SHADOW },
          glow: { ...DEFAULT_GLOW },
          locked: false,
          label: mac.name,
        },
        {
          id: 'pres-phone',
          deviceId: 'iphone',
          x: 840,
          y: 200,
          displayWidth: 220,
          rotation: 0,
          colorId: phone.colors[0].id,
          screenshot: null,
          objectFit: 'cover',
          zIndex: 2,
          opacity: 1,
          shadow: { ...DEFAULT_SHADOW },
          glow: { ...DEFAULT_GLOW },
          locked: false,
          label: phone.name,
        },
      ]);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClearAll = () => {
    setDevices([]);
    setSelectedId(null);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-black text-zinc-200">
      {/* 2-Panel Main Layout workspace */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Mobile Backdrop for Left Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}

        {/* Consolidated Left sidebar: Library, Settings & Background Setup */}
        <div className={`absolute md:relative left-0 top-0 bottom-0 z-50 md:z-auto transition-transform duration-300 w-[340px] shrink-0 h-full ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}>
          <Sidebar
            devices={devices}
            selectedId={selectedId}
            background={background}
            onAddDevice={handleAddDevice}
            onDeleteDevice={handleDeleteDevice}
            onSelectDevice={setSelectedId}
            onUpdateDevice={handleUpdateDevice}
            onUpdateBackground={handleUpdateBackground}
            onApplyLayoutPreset={handleApplyLayoutPreset}
          />
        </div>

        {/* Expanded Canvas Panel */}
        <Canvas
          devices={devices}
          selectedId={selectedId}
          background={background}
          viewState={viewState}
          setViewState={setViewState}
          onSelectDevice={setSelectedId}
          onUpdateDevice={handleUpdateDevice}
          onDeleteDevice={handleDeleteDevice}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Bottom Panel: Formats & triggers */}
      <ExportPanel
        devicesCount={devices.length}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
