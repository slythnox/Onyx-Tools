import React, { useState, useRef } from 'react';
import { Plus, Trash2, Image as ImageIcon, Monitor, Laptop, Tablet, Phone, ChevronDown, ChevronUp, Lock, Unlock, ArrowDown, ArrowUp } from 'lucide-react';
import { DEVICE_REGISTRY, DEVICE_CATEGORIES } from '../devices/registry';
import { CanvasDeviceInstance, CanvasBackground } from '../types';
import { getDevice } from '../devices/registry';

interface SidebarProps {
  devices: CanvasDeviceInstance[];
  selectedId: string | null;
  background: CanvasBackground;
  onAddDevice: (deviceId: string) => void;
  onDeleteDevice: (id: string) => void;
  onSelectDevice: (id: string | null) => void;
  onUpdateDevice: (id: string, updates: Partial<CanvasDeviceInstance>) => void;
  onUpdateBackground: (updates: Partial<CanvasBackground>) => void;
  onApplyLayoutPreset: (presetId: string) => void;
}

export default function Sidebar({
  devices,
  selectedId,
  background,
  onAddDevice,
  onDeleteDevice,
  onSelectDevice,
  onUpdateDevice,
  onUpdateBackground,
  onApplyLayoutPreset,
}: SidebarProps) {
  // Accordion Expand/Collapse states
  const [expandDevice, setExpandDevice] = useState(true);
  const [expandSettings, setExpandSettings] = useState(true);
  const [expandBackground, setExpandBackground] = useState(true);

  // Category filter
  const [activeCategory, setActiveCategory] = useState('all');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'phone': return <Phone className="w-3.5 h-3.5" />;
      case 'tablet': return <Tablet className="w-3.5 h-3.5" />;
      case 'laptop': return <Laptop className="w-3.5 h-3.5" />;
      case 'desktop': return <Monitor className="w-3.5 h-3.5" />;
      default: return <Plus className="w-3.5 h-3.5" />;
    }
  };

  const filteredDevices = DEVICE_REGISTRY.filter(device => {
    return activeCategory === 'all' || device.category === activeCategory;
  });

  const selectedInstance = devices.find(d => d.id === selectedId) || null;
  const selectedDef = selectedInstance ? getDevice(selectedInstance.deviceId) : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedInstance) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpdateDevice(selectedInstance.id, { screenshot: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[340px] border-r border-zinc-900 bg-zinc-950 flex flex-col h-full shrink-0 select-none overflow-hidden font-sans text-zinc-300">
      
      {/* Sidebar Header Title */}
      <div className="p-4 border-b border-zinc-900 flex items-center justify-between">
        <div className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
          Device Workspace Control
        </div>
      </div>

      {/* Main Accordion Scroller - Smooth scrolling container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth space-y-2 p-3">

        {/* ─── DROPDOWN 1: DEVICE (Library & Active List) ─── */}
        <div className="border border-zinc-900 rounded bg-zinc-950/40 overflow-hidden">
          <button
            onClick={() => setExpandDevice(!expandDevice)}
            className="w-full flex items-center justify-between p-3 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors text-left"
          >
            <span className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              1. Device Setup
            </span>
            {expandDevice ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
          </button>

          {expandDevice && (
            <div className="p-3 border-t border-zinc-900/60 space-y-4">
              
              {/* Add device section */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase">Add New Device</label>

                {/* Category selectors */}
                <div className="flex flex-wrap gap-1">
                  {DEVICE_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-2 py-0.5 rounded text-[9px] font-mono border transition-all cursor-pointer ${
                        activeCategory === cat.id
                          ? 'bg-zinc-100 text-black border-zinc-100 font-semibold'
                          : 'bg-zinc-900/40 text-zinc-400 border-zinc-850 hover:text-zinc-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Grid catalogue */}
                <div className="grid grid-cols-2 gap-1.5 max-h-[140px] overflow-y-auto custom-scrollbar pr-1">
                  {filteredDevices.map(dev => (
                    <button
                      key={dev.id}
                      onClick={() => onAddDevice(dev.id)}
                      className="flex items-center gap-2 p-2 rounded border border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900/40 text-left hover:border-zinc-800 transition-all cursor-pointer group"
                    >
                      <div className="w-6 h-6 rounded bg-black/40 border border-zinc-900 flex items-center justify-center text-zinc-500 group-hover:text-zinc-300">
                        {getCategoryIcon(dev.category)}
                      </div>
                      <div className="text-[10px] font-semibold text-zinc-300 group-hover:text-white line-clamp-1">
                        {dev.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active list section */}
              {devices.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-zinc-900/60">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase">Active Devices in Scene</label>
                  <div className="space-y-1 max-h-[120px] overflow-y-auto custom-scrollbar pr-1">
                    {devices.map(inst => {
                      const isSelected = selectedId === inst.id;
                      return (
                        <div
                          key={inst.id}
                          onClick={() => onSelectDevice(inst.id)}
                          className={`flex items-center justify-between p-2 rounded border transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-zinc-900/80 border-zinc-700 text-white' 
                              : 'bg-zinc-900/10 border-zinc-900 text-zinc-400 hover:bg-zinc-900/30'
                          }`}
                        >
                          <span className="text-[10px] font-mono font-semibold truncate max-w-[190px]">
                            {inst.label}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteDevice(inst.id);
                            }}
                            className="p-1 rounded hover:bg-zinc-800 hover:text-rose-400 text-zinc-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Layout Presets (Quick Setup) */}
              <div className="space-y-2 pt-2 border-t border-zinc-900/60">
                <label className="text-[10px] font-mono text-zinc-500 uppercase">Quick Layouts</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'center', label: 'Single MacBook' },
                    { id: 'hero', label: 'Hero Display' },
                    { id: 'stack', label: 'Diag Stack' },
                    { id: 'floating', label: 'Floating 3D' },
                  ].map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => onApplyLayoutPreset(preset.id)}
                      className="py-1 px-2 text-[10px] text-center font-mono border border-zinc-850 bg-zinc-900/20 hover:bg-zinc-900/50 hover:border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* ─── DROPDOWN 2: SETTINGS (Device Inspector details) ─── */}
        <div className="border border-zinc-900 rounded bg-zinc-950/40 overflow-hidden">
          <button
            onClick={() => setExpandSettings(!expandSettings)}
            className="w-full flex items-center justify-between p-3 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors text-left"
          >
            <span className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              2. Custom Settings
            </span>
            {expandSettings ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
          </button>

          {expandSettings && (
            <div className="p-3 border-t border-zinc-900/60 space-y-4 max-h-[360px] overflow-y-auto custom-scrollbar-smooth scroll-smooth">
              
              {/* Active Device Dropdown Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase">Selected Target</label>
                {devices.length === 0 ? (
                  <div className="p-2 text-center border border-dashed border-zinc-900 rounded text-[10px] font-mono text-zinc-600">
                    Add a device first
                  </div>
                ) : (
                  <select
                    value={selectedId || ''}
                    onChange={(e) => onSelectDevice(e.target.value || null)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded px-2 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-700 cursor-pointer"
                  >
                    <option value="">-- Click to Select Device --</option>
                    {devices.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {selectedInstance && selectedDef ? (
                <div className="space-y-4 pt-1 animate-in fade-in duration-200">
                  
                  {/* Screenshot upload & drop */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Upload Screenshot</span>
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 py-1.5 px-3 rounded border border-zinc-850 bg-zinc-900 hover:bg-zinc-850 text-xs font-mono text-zinc-300 font-semibold transition-colors cursor-pointer"
                      >
                        Choose File
                      </button>
                      {selectedInstance.screenshot && (
                        <button
                          onClick={() => onUpdateDevice(selectedInstance.id, { screenshot: null })}
                          className="py-1.5 px-2.5 rounded border border-zinc-850 bg-zinc-900 text-xs font-mono text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {/* Image fit mode */}
                    <div className="grid grid-cols-3 gap-1">
                      {(['cover', 'contain', 'fill'] as const).map(fit => (
                        <button
                          key={fit}
                          onClick={() => onUpdateDevice(selectedInstance.id, { objectFit: fit })}
                          className={`py-1 rounded text-[9px] font-mono border transition-all cursor-pointer ${
                            selectedInstance.objectFit === fit
                              ? 'bg-zinc-100 text-black border-zinc-100 font-semibold'
                              : 'bg-zinc-900/40 text-zinc-500 border-zinc-900 hover:text-zinc-200'
                          }`}
                        >
                          {fit.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Device properties sliders */}
                  <div className="space-y-3 pt-2 border-t border-zinc-900/60">
                    
                    {/* Colors */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase">Device Color</label>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedDef.colors.map(c => (
                          <button
                            key={c.id}
                            onClick={() => onUpdateDevice(selectedInstance.id, { colorId: c.id })}
                            title={c.name}
                            style={{ backgroundColor: c.frame }}
                            className={`w-4 h-4 rounded-full border transition-all cursor-pointer relative ${
                              selectedInstance.colorId === c.id
                                ? 'ring-1 ring-offset-1 ring-zinc-400 ring-offset-zinc-950 scale-110 border-white'
                                : 'border-zinc-850 hover:scale-105'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Scale */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                        <span>Display Width</span>
                        <span className="text-zinc-300">{selectedInstance.displayWidth}px</span>
                      </div>
                      <input
                        type="range"
                        min="160"
                        max="1200"
                        step="5"
                        value={selectedInstance.displayWidth}
                        onChange={(e) => onUpdateDevice(selectedInstance.id, { displayWidth: parseInt(e.target.value) })}
                        className="w-full h-1 bg-zinc-900 rounded appearance-none cursor-pointer accent-zinc-200"
                      />
                    </div>

                    {/* Rotation */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                        <span>Rotation</span>
                        <span className="text-zinc-300">{selectedInstance.rotation}°</span>
                      </div>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        step="1"
                        value={selectedInstance.rotation}
                        onChange={(e) => onUpdateDevice(selectedInstance.id, { rotation: parseInt(e.target.value) })}
                        className="w-full h-1 bg-zinc-900 rounded appearance-none cursor-pointer accent-zinc-200"
                      />
                    </div>

                    {/* Opacity */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                        <span>Opacity</span>
                        <span className="text-zinc-300">{Math.round(selectedInstance.opacity * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.15"
                        max="1"
                        step="0.05"
                        value={selectedInstance.opacity}
                        onChange={(e) => onUpdateDevice(selectedInstance.id, { opacity: parseFloat(e.target.value) })}
                        className="w-full h-1 bg-zinc-900 rounded appearance-none cursor-pointer accent-zinc-200"
                      />
                    </div>

                    {/* Lock state & Layer Ordering */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => onUpdateDevice(selectedInstance.id, { locked: !selectedInstance.locked })}
                        className={`flex items-center gap-1.5 py-1 px-2.5 rounded border text-[9px] font-mono transition-colors cursor-pointer ${
                          selectedInstance.locked 
                            ? 'bg-amber-950/40 text-amber-400 border-amber-900/60' 
                            : 'bg-zinc-900 text-zinc-400 border-zinc-850'
                        }`}
                      >
                        {selectedInstance.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                        <span>{selectedInstance.locked ? 'Locked' : 'Unlock'}</span>
                      </button>

                      <div className="flex gap-1">
                        <button
                          onClick={() => onUpdateDevice(selectedInstance.id, { zIndex: Math.max(selectedInstance.zIndex - 1, 1) })}
                          title="Send Back"
                          className="p-1 rounded bg-zinc-900 border border-zinc-850 hover:text-white transition-colors cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onUpdateDevice(selectedInstance.id, { zIndex: Math.min(selectedInstance.zIndex + 1, 99) })}
                          title="Bring Front"
                          className="p-1 rounded bg-zinc-900 border border-zinc-850 hover:text-white transition-colors cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Effects toggle (Shadow / Glow) */}
                  <div className="pt-2 border-t border-zinc-900/60 space-y-3">
                    
                    {/* Shadow toggle */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">Drop Shadow</span>
                        <input
                          type="checkbox"
                          checked={selectedInstance.shadow.enabled}
                          onChange={(e) => onUpdateDevice(selectedInstance.id, {
                            shadow: { ...selectedInstance.shadow, enabled: e.target.checked }
                          })}
                          className="accent-zinc-100 cursor-pointer"
                        />
                      </div>
                      {selectedInstance.shadow.enabled && (
                        <div className="space-y-2 pl-2 border-l border-zinc-900 mt-1.5">
                          <div className="space-y-0.5">
                            <div className="flex justify-between text-[8px] font-mono text-zinc-500">
                              <span>Offset Y</span>
                              <span>{selectedInstance.shadow.y}px</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="80"
                              value={selectedInstance.shadow.y}
                              onChange={(e) => onUpdateDevice(selectedInstance.id, {
                                shadow: { ...selectedInstance.shadow, y: parseInt(e.target.value) }
                              })}
                              className="w-full h-0.5 bg-zinc-900 appearance-none accent-zinc-300"
                            />
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex justify-between text-[8px] font-mono text-zinc-500">
                              <span>Blur</span>
                              <span>{selectedInstance.shadow.blur}px</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={selectedInstance.shadow.blur}
                              onChange={(e) => onUpdateDevice(selectedInstance.id, {
                                shadow: { ...selectedInstance.shadow, blur: parseInt(e.target.value) }
                              })}
                              className="w-full h-0.5 bg-zinc-900 appearance-none accent-zinc-300"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Glow toggle */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">Outer Glow</span>
                        <input
                          type="checkbox"
                          checked={selectedInstance.glow.enabled}
                          onChange={(e) => onUpdateDevice(selectedInstance.id, {
                            glow: { ...selectedInstance.glow, enabled: e.target.checked }
                          })}
                          className="accent-zinc-100 cursor-pointer"
                        />
                      </div>
                      {selectedInstance.glow.enabled && (
                        <div className="space-y-2 pl-2 border-l border-zinc-900 mt-1.5">
                          <div className="flex gap-1.5">
                            {['#7c3aed', '#db2777', '#2563eb', '#059669'].map(c => (
                              <button
                                key={c}
                                onClick={() => onUpdateDevice(selectedInstance.id, {
                                  glow: { ...selectedInstance.glow, color: c }
                                })}
                                style={{ backgroundColor: c }}
                                className={`w-3.5 h-3.5 rounded-full border ${
                                  selectedInstance.glow.color === c ? 'border-white scale-110' : 'border-transparent'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex justify-between text-[8px] font-mono text-zinc-500">
                              <span>Glow Blur</span>
                              <span>{selectedInstance.glow.blur}px</span>
                            </div>
                            <input
                              type="range"
                              min="2"
                              max="60"
                              value={selectedInstance.glow.blur}
                              onChange={(e) => onUpdateDevice(selectedInstance.id, {
                                glow: { ...selectedInstance.glow, blur: parseInt(e.target.value) }
                              })}
                              className="w-full h-0.5 bg-zinc-900 appearance-none accent-zinc-300"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              ) : (
                <div className="p-4 text-center text-zinc-500 font-mono text-[10px] border border-dashed border-zinc-900 rounded">
                  Select an active device above to customize options
                </div>
              )}

            </div>
          )}
        </div>

        {/* ─── DROPDOWN 3: BACKGROUND (Transparent, solid, gradient, preset mesh) ─── */}
        <div className="border border-zinc-900 rounded bg-zinc-950/40 overflow-hidden">
          <button
            onClick={() => setExpandBackground(!expandBackground)}
            className="w-full flex items-center justify-between p-3 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors text-left"
          >
            <span className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              3. Background Setup
            </span>
            {expandBackground ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
          </button>

          {expandBackground && (
            <div className="p-3 border-t border-zinc-900/60 space-y-4">
              
              {/* Type Grid */}
              <div className="grid grid-cols-3 gap-1">
                {(['transparent', 'solid', 'gradient'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => onUpdateBackground({ type })}
                    className={`py-1 rounded text-[9px] font-mono border transition-all cursor-pointer ${
                      background.type === type
                        ? 'bg-zinc-100 text-black border-zinc-100 font-semibold'
                        : 'bg-zinc-900/40 text-zinc-500 border-zinc-900 hover:text-zinc-200'
                    }`}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Solid Background Color inputs */}
              {background.type === 'solid' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase">Background Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={background.color}
                      onChange={(e) => onUpdateBackground({ color: e.target.value })}
                      className="w-7 h-7 rounded bg-transparent border border-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={background.color.toUpperCase()}
                      onChange={(e) => onUpdateBackground({ color: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded px-2.5 py-1 text-xs font-mono text-zinc-300"
                    />
                  </div>
                </div>
              )}

              {/* Gradient inputs */}
              {background.type === 'gradient' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex gap-1.5 items-center">
                      <input
                        type="color"
                        value={background.gradientFrom}
                        onChange={(e) => onUpdateBackground({ gradientFrom: e.target.value })}
                        className="w-6 h-6 rounded bg-transparent border border-zinc-800 cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-zinc-500">From</span>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <input
                        type="color"
                        value={background.gradientTo}
                        onChange={(e) => onUpdateBackground({ gradientTo: e.target.value })}
                        className="w-6 h-6 rounded bg-transparent border border-zinc-800 cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-zinc-500">To</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                      <span>Gradient Angle</span>
                      <span>{background.gradientAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={background.gradientAngle}
                      onChange={(e) => onUpdateBackground({ gradientAngle: parseInt(e.target.value) })}
                      className="w-full h-1 bg-zinc-900 rounded appearance-none accent-zinc-300"
                    />
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
