import React, { useRef, useState, useEffect } from 'react';
import { CanvasDeviceInstance, CanvasBackground, ViewState } from '../types';
import { getDevice } from '../devices/registry';
import { DeviceFrame } from '../devices/frames';
import { ZoomIn, ZoomOut, Maximize2, Lock } from 'lucide-react';

interface CanvasProps {
  devices: CanvasDeviceInstance[];
  selectedId: string | null;
  background: CanvasBackground;
  viewState: ViewState;
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>;
  onSelectDevice: (id: string | null) => void;
  onUpdateDevice: (id: string, updates: Partial<CanvasDeviceInstance>) => void;
  onDeleteDevice: (id: string) => void;
}

export default function Canvas({
  devices,
  selectedId,
  background,
  viewState,
  setViewState,
  onSelectDevice,
  onUpdateDevice,
  onDeleteDevice,
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [deviceOffset, setDeviceOffset] = useState({ x: 0, y: 0 });

  // For Snap Guides
  const [snapLines, setSnapLines] = useState<{ x?: number; y?: number } | null>(null);

  // Logical canvas dimensions
  const canvasW = 1200;
  const canvasH = 800;

  // Handle Zoom
  const handleZoom = (factor: number) => {
    setViewState(prev => ({
      ...prev,
      zoom: Math.min(Math.max(prev.zoom * factor, 0.15), 4),
    }));
  };

  const resetView = () => {
    setViewState({ zoom: 0.65, panX: 0, panY: 0 });
  };

  // Canvas Pan Interaction
  const handleContainerMouseDown = (e: React.MouseEvent) => {
    // If clicking directly on container background (not a device)
    if (e.target === containerRef.current || (e.target as HTMLElement).classList.contains('canvas-grid-bg')) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewState.panX, y: e.clientY - viewState.panY });
      onSelectDevice(null);
    }
  };

  // Device Drag Interaction
  const handleDeviceMouseDown = (id: string, e: React.MouseEvent, instance: CanvasDeviceInstance) => {
    e.stopPropagation();
    if (instance.locked) {
      onSelectDevice(id);
      return;
    }

    onSelectDevice(id);
    setDraggedId(id);

    // Track starting point in screen coords, and device's current logical coords
    setDragStart({ x: e.clientX, y: e.clientY });
    setDeviceOffset({ x: instance.x, y: instance.y });
  };

  // Handle Mouse Move for Pan & Drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isPanning) {
        setViewState(prev => ({
          ...prev,
          panX: e.clientX - panStart.x,
          panY: e.clientY - panStart.y,
        }));
      }

      if (draggedId) {
        const instance = devices.find(d => d.id === draggedId);
        if (!instance) return;

        // Delta in screen pixels
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;

        // Convert screen delta to logical canvas coordinate system delta
        const logicalDx = dx / viewState.zoom;
        const logicalDy = dy / viewState.zoom;

        let newX = deviceOffset.x + logicalDx;
        let newY = deviceOffset.y + logicalDy;

        // ─── Snap Guides & Smart Alignment ───
        const snapThreshold = 10; // offset in logical pixels
        let snappedX: number | undefined;
        let snappedY: number | undefined;

        // 1. Center of canvas snapping
        const centerX = canvasW / 2;
        const centerY = canvasH / 2;

        if (Math.abs(newX + instance.displayWidth / 2 - centerX) < snapThreshold) {
          newX = centerX - instance.displayWidth / 2;
          snappedX = centerX;
        }
        if (Math.abs(newY + (instance.displayWidth * (getDevice(instance.deviceId)?.frameH || 800) / (getDevice(instance.deviceId)?.frameW || 600)) / 2 - centerY) < snapThreshold) {
          const devH = instance.displayWidth * (getDevice(instance.deviceId)?.frameH || 800) / (getDevice(instance.deviceId)?.frameW || 600);
          newY = centerY - devH / 2;
          snappedY = centerY;
        }

        // 2. Alignment with other devices
        devices.forEach(other => {
          if (other.id === draggedId) return;

          const otherDef = getDevice(other.deviceId);
          if (!otherDef) return;
          const otherH = other.displayWidth * otherDef.frameH / otherDef.frameW;

          // X alignment (centers)
          const otherCenterX = other.x + other.displayWidth / 2;
          const currentCenterX = newX + instance.displayWidth / 2;
          if (Math.abs(currentCenterX - otherCenterX) < snapThreshold) {
            newX = otherCenterX - instance.displayWidth / 2;
            snappedX = otherCenterX;
          }

          // Y alignment (centers)
          const otherCenterY = other.y + otherH / 2;
          const devH = instance.displayWidth * (getDevice(instance.deviceId)?.frameH || 800) / (getDevice(instance.deviceId)?.frameW || 600);
          const currentCenterY = newY + devH / 2;
          if (Math.abs(currentCenterY - otherCenterY) < snapThreshold) {
            newY = otherCenterY - devH / 2;
            snappedY = otherCenterY;
          }
        });

        // Update guides display
        if (snappedX || snappedY) {
          setSnapLines({ x: snappedX, y: snappedY });
        } else {
          setSnapLines(null);
        }

        onUpdateDevice(draggedId, { x: Math.round(newX), y: Math.round(newY) });
      }
    };

    const handleMouseUp = () => {
      setIsPanning(false);
      setDraggedId(null);
      setSnapLines(null);
    };

    if (isPanning || draggedId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPanning, draggedId, dragStart, deviceOffset, viewState.zoom, devices]);

  // Drop File handler for drag & drop screenshots directly onto target devices
  const handleDrop = (id: string, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpdateDevice(id, { screenshot: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Custom trigger for click-to-upload screenshot helper
  const triggerImageUpload = (id: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onUpdateDevice(id, { screenshot: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Render Background Style
  const getBackgroundStyle = (): React.CSSProperties => {
    if (background.type === 'solid') {
      return { backgroundColor: background.color };
    }
    if (background.type === 'gradient') {
      return {
        backgroundImage: `linear-gradient(${background.gradientAngle}deg, ${background.gradientFrom}, ${background.gradientTo})`,
      };
    }
    if (background.type === 'mesh') {
      // Mesh/Aurora style gradient
      return {
        backgroundImage: `radial-gradient(at 10% 20%, #7c3aed 0px, transparent 50%),
                          radial-gradient(at 90% 10%, #db2777 0px, transparent 50%),
                          radial-gradient(at 50% 80%, #059669 0px, transparent 50%),
                          radial-gradient(at 80% 90%, #2563eb 0px, transparent 50%)`,
        backgroundColor: '#09090b',
      };
    }
    return { backgroundColor: 'transparent' };
  };

  // Keyboard shortcut listener to delete selected device
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedId && (e.key === 'Delete' || e.key === 'Backspace')) {
        const activeEl = document.activeElement;
        // Don't delete if editing inside input fields
        if (activeEl?.tagName !== 'INPUT' && activeEl?.tagName !== 'TEXTAREA') {
          onDeleteDevice(selectedId);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, onDeleteDevice]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleContainerMouseDown}
      className={`flex-1 relative overflow-hidden bg-[#09090b] flex items-center justify-center cursor-grab ${
        isPanning ? 'cursor-grabbing' : ''
      }`}
    >
      {/* Grid Pattern Background */}
      <div className="canvas-grid-bg absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />

      {/* Infinite Transform Container */}
      <div
        style={{
          transform: `translate(${viewState.panX}px, ${viewState.panY}px) scale(${viewState.zoom})`,
          transformOrigin: 'center center',
          transition: isPanning ? 'none' : 'transform 0.05s ease-out',
        }}
        className="relative shrink-0 select-none"
      >
        {/* Render Canvas Scene */}
        <div
          id="device-scene-render"
          ref={canvasRef}
          style={{
            width: canvasW,
            height: canvasH,
            ...getBackgroundStyle(),
            boxShadow: '0 25px 70px -10px rgba(0, 0, 0, 0.7)',
            overflow: 'hidden',
          }}
          className="relative transition-all duration-300 rounded border border-zinc-900"
        >
          {/* Snap Guides Visuals */}
          {snapLines?.x !== undefined && (
            <div
              className="absolute top-0 bottom-0 border-l border-dashed border-sky-400 z-50 pointer-events-none"
              style={{ left: snapLines.x }}
            />
          )}
          {snapLines?.y !== undefined && (
            <div
              className="absolute left-0 right-0 border-t border-dashed border-sky-400 z-50 pointer-events-none"
              style={{ top: snapLines.y }}
            />
          )}

          {/* Render All Active Devices */}
          {devices.map(instance => {
            const def = getDevice(instance.deviceId);
            if (!def) return null;

            const isSelected = selectedId === instance.id;
            const height = instance.displayWidth * (def.frameH / def.frameW);

            // Fetch color details
            const activeColor = def.colors.find(c => c.id === instance.colorId) || def.colors[0];

            // Build style filters for shadow and glow
            const filters: string[] = [];
            if (instance.shadow.enabled) {
              const { x, y, blur, opacity } = instance.shadow;
              // Translate color to rgba for transparency support
              filters.push(`drop-shadow(${x}px ${y}px ${blur}px rgba(0,0,0,${opacity}))`);
            }
            if (instance.glow.enabled) {
              const { color, blur } = instance.glow;
              filters.push(`drop-shadow(0 0 ${blur}px ${color})`);
            }

            return (
              <div
                key={instance.id}
                onMouseDown={(e) => handleDeviceMouseDown(instance.id, e, instance)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(instance.id, e)}
                style={{
                  position: 'absolute',
                  left: instance.x,
                  top: instance.y,
                  width: instance.displayWidth,
                  height: height,
                  zIndex: instance.zIndex,
                  transform: `rotate(${instance.rotation}deg)`,
                  opacity: instance.opacity,
                  filter: filters.join(' '),
                  transition: draggedId === instance.id ? 'none' : 'transform 0.1s ease-out, filter 0.2s ease-out',
                }}
                className={`group cursor-move select-none relative ${isSelected ? 'z-[999]' : ''}`}
              >
                {/* Selection helper border & quick tools */}
                {isSelected && (
                  <div className="absolute -inset-2.5 border border-sky-500/70 rounded-lg pointer-events-none z-50">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 text-[9px] font-mono font-bold text-black px-1.5 py-0.5 rounded shadow flex items-center gap-1">
                      <span>{def.name}</span>
                      {instance.locked && <Lock className="w-2.5 h-2.5" />}
                    </div>
                  </div>
                )}

                {/* Main Render Block */}
                <div className="w-full h-full relative" onDoubleClick={() => !instance.locked && triggerImageUpload(instance.id)}>
                  <DeviceFrame
                    deviceId={instance.deviceId}
                    screenshot={instance.screenshot}
                    color={activeColor}
                    uid={instance.id}
                    objectFit={instance.objectFit}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Canvas Controls */}
      <div className="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-900 p-1.5 rounded-lg flex items-center gap-1 shadow-2xl z-40 select-none">
        <button
          onClick={() => handleZoom(0.85)}
          title="Zoom Out"
          className="p-1.5 hover:bg-zinc-900 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] font-mono text-zinc-500 px-2 min-w-[40px] text-center">
          {Math.round(viewState.zoom * 100)}%
        </span>
        <button
          onClick={() => handleZoom(1.15)}
          title="Zoom In"
          className="p-1.5 hover:bg-zinc-900 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <div className="h-4 w-px bg-zinc-850 mx-1" />
        <button
          onClick={resetView}
          title="Fit view"
          className="p-1.5 hover:bg-zinc-900 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Canvas Info overlay */}
      <div className="absolute top-4 left-4 text-[10px] font-mono text-zinc-600 select-none">
        1200 × 800 px scene
      </div>
    </div>
  );
}
