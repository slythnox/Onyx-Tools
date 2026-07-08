/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { FrameProps } from '../../types';
import { IPhone16ProFrame, GalaxyS25Frame } from './PhoneFrames';
import { IPadProFrame, IPadMiniFrame, GalaxyTabFrame } from './TabletFrames';
import { LaptopFrontFrame } from './LaptopFrames';
import { StudioDisplayFrame, UltraWideFrame, GamingMonitorFrame, IMacFrame } from './DesktopFrames';
import { ChromeWindowFrame } from './BrowserWatchFrames';

export const FrameRendererMap: Record<string, React.ComponentType<FrameProps>> = {
  'iphone': IPhone16ProFrame,
  'android': GalaxyS25Frame,
  'ipad-pro': IPadProFrame,
  'ipad-mini': IPadMiniFrame,
  'tablet': GalaxyTabFrame,
  'laptop': LaptopFrontFrame,
  'studio-display': StudioDisplayFrame,
  'ultrawide': UltraWideFrame,
  'gaming-monitor': GamingMonitorFrame,
  'imac': IMacFrame,
  'chrome-window': ChromeWindowFrame,
};

interface DeviceFrameProps extends FrameProps {
  deviceId: string;
}

export function DeviceFrame({ deviceId, ...props }: DeviceFrameProps) {
  const Component = FrameRendererMap[deviceId];
  if (!Component) {
    return (
      <div className="w-full h-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 font-mono text-xs">
        Frame Not Found ({deviceId})
      </div>
    );
  }
  return <Component {...props} />;
}
