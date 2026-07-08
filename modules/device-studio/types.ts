// ─── Device types ────────────────────────────────────────────────────────────

export type DeviceCategory = 'phone' | 'tablet' | 'laptop' | 'desktop' | 'browser' | 'watch';

export interface DeviceColor {
  id: string;
  name: string;
  /** Main body color */
  frame: string;
  /** Slightly lighter accent (inner rim, glossy strip) */
  accent: string;
  /** Side button color */
  button: string;
}

export interface DeviceScreen {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}

export interface DeviceDef {
  id: string;
  name: string;
  brand: string;
  category: DeviceCategory;
  /** SVG viewBox width */
  frameW: number;
  /** SVG viewBox height */
  frameH: number;
  screen: DeviceScreen;
  colors: DeviceColor[];
  tags: string[];
}

// ─── Canvas instance ─────────────────────────────────────────────────────────

export type ObjectFit = 'cover' | 'contain' | 'fill';

export interface ShadowSettings {
  enabled: boolean;
  x: number;
  y: number;
  blur: number;
  spread: number;
  opacity: number;
  color: string;
}

export interface GlowSettings {
  enabled: boolean;
  color: string;
  blur: number;
  opacity: number;
}

export interface CanvasDeviceInstance {
  id: string;
  deviceId: string;
  /** Position within the scene (canvas units) */
  x: number;
  y: number;
  /** Rendered width in canvas units — height is computed via aspect ratio */
  displayWidth: number;
  rotation: number;
  colorId: string;
  screenshot: string | null;
  objectFit: ObjectFit;
  zIndex: number;
  opacity: number;
  shadow: ShadowSettings;
  glow: GlowSettings;
  locked: boolean;
  label: string;
}

// ─── Background ───────────────────────────────────────────────────────────────

export type BgType = 'transparent' | 'solid' | 'gradient' | 'mesh';

export interface CanvasBackground {
  type: BgType;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  preset: string | null;
}

// ─── App state ───────────────────────────────────────────────────────────────

export type SidebarPanel = 'devices' | 'backgrounds' | 'effects' | 'scene' | 'export';

export interface SceneBounds {
  width: number;
  height: number;
}

export interface ViewState {
  zoom: number;
  panX: number;
  panY: number;
}

// ─── Frame component props ────────────────────────────────────────────────────

export interface FrameProps {
  screenshot: string | null;
  color: DeviceColor;
  /** Unique prefix for SVG def IDs — prevents conflicts when multiple same devices are on canvas */
  uid: string;
  objectFit: ObjectFit;
}
