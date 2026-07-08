import { DeviceDef } from '../types';

export const DEVICE_REGISTRY: DeviceDef[] = [
  // ─── PHONES ──────────────────────────────────────────────────────────────
  {
    id: 'iphone',
    name: 'iPhone',
    brand: 'Apple',
    category: 'phone',
    frameW: 375,
    frameH: 812,
    screen: { x: 14, y: 14, width: 347, height: 784, radius: 44 },
    colors: [
      { id: 'black-titanium',   name: 'Black Titanium',   frame: '#2a2a2c', accent: '#42424a', button: '#38383c' },
      { id: 'white-titanium',   name: 'White Titanium',   frame: '#dedad4', accent: '#f0ece6', button: '#e8e4de' },
      { id: 'natural-titanium', name: 'Natural Titanium', frame: '#9b9590', accent: '#c5bfba', button: '#a8a29c' },
    ],
    tags: ['apple', 'ios', 'mobile', 'iphone'],
  },
  {
    id: 'android',
    name: 'Android',
    brand: 'Google',
    category: 'phone',
    frameW: 360,
    frameH: 780,
    screen: { x: 10, y: 10, width: 340, height: 760, radius: 40 },
    colors: [
      { id: 'phantom-black',  name: 'Phantom Black',  frame: '#1a1a1e', accent: '#2a2a30', button: '#222228' },
      { id: 'marble-gray',    name: 'Marble Gray',    frame: '#8a8a90', accent: '#aaaab0', button: '#969698' },
    ],
    tags: ['android', 'mobile', 'galaxy', 'samsung'],
  },

  // ─── TABLETS ─────────────────────────────────────────────────────────────
  {
    id: 'ipad-pro',
    name: 'iPad Pro',
    brand: 'Apple',
    category: 'tablet',
    frameW: 834,
    frameH: 1194,
    screen: { x: 8, y: 8, width: 818, height: 1178, radius: 12 },
    colors: [
      { id: 'space-black', name: 'Space Black', frame: '#1c1c20', accent: '#2e2e34', button: '#282830' },
      { id: 'silver',      name: 'Silver',      frame: '#d0ceca', accent: '#e8e6e2', button: '#d8d6d2' },
    ],
    tags: ['apple', 'ipad', 'tablet', 'ios', 'pro'],
  },
  {
    id: 'ipad-mini',
    name: 'iPad Mini',
    brand: 'Apple',
    category: 'tablet',
    frameW: 744,
    frameH: 1058,
    screen: { x: 20, y: 20, width: 704, height: 1018, radius: 14 },
    colors: [
      { id: 'space-gray', name: 'Space Gray', frame: '#3c3c40', accent: '#545458', button: '#484848' },
      { id: 'starlight',  name: 'Starlight',  frame: '#dedad4', accent: '#f0ece6', button: '#e8e4de' },
    ],
    tags: ['apple', 'ipad', 'tablet', 'ios', 'mini'],
  },
  {
    id: 'tablet',
    name: 'Tablet',
    brand: 'Samsung',
    category: 'tablet',
    frameW: 820,
    frameH: 1280,
    screen: { x: 12, y: 12, width: 796, height: 1256, radius: 16 },
    colors: [
      { id: 'graphite', name: 'Graphite', frame: '#3a3a3e', accent: '#4e4e52', button: '#444448' },
      { id: 'beige',    name: 'Beige',    frame: '#d8c8b0', accent: '#ecdec8', button: '#e0d0b8' },
    ],
    tags: ['samsung', 'android', 'tablet', 'galaxy'],
  },

  {
    id: 'laptop',
    name: 'Laptop',
    brand: 'Premium',
    category: 'laptop',
    frameW: 820,
    frameH: 545,
    screen: { x: 24, y: 24, width: 772, height: 462, radius: 9 },
    colors: [
      { id: 'space-gray', name: 'Space Gray', frame: '#28292c', accent: '#3b3d42', button: '#1a1a1c' },
      { id: 'white',      name: 'Starlight White', frame: '#eef1f6', accent: '#ffffff', button: '#d2d4d8' },
    ],
    tags: ['laptop', 'notebook', 'macbook', 'windows'],
  },

  // ─── DESKTOP ─────────────────────────────────────────────────────────────
  {
    id: 'studio-display',
    name: 'Studio Display',
    brand: 'Apple',
    category: 'desktop',
    frameW: 1080,
    frameH: 840,
    screen: { x: 8, y: 8, width: 1064, height: 598, radius: 8 },
    colors: [
      { id: 'silver', name: 'Silver', frame: '#c8c6c2', accent: '#dedcda', button: '#d4d2ce' },
    ],
    tags: ['apple', 'monitor', 'display', 'desktop', 'studio'],
  },
  {
    id: 'ultrawide',
    name: 'UltraWide Monitor',
    brand: 'Generic',
    category: 'desktop',
    frameW: 1400,
    frameH: 700,
    screen: { x: 10, y: 10, width: 1380, height: 580, radius: 4 },
    colors: [
      { id: 'black', name: 'Matte Black', frame: '#1a1a1c', accent: '#2a2a2e', button: '#222226' },
      { id: 'white', name: 'White',       frame: '#e8e6e2', accent: '#f4f2ee', button: '#efede9' },
    ],
    tags: ['monitor', 'ultrawide', 'display', '21:9', 'desktop'],
  },
  {
    id: 'gaming-monitor',
    name: 'Gaming Monitor',
    brand: 'Generic',
    category: 'desktop',
    frameW: 1200,
    frameH: 760,
    screen: { x: 8, y: 8, width: 1184, height: 666, radius: 4 },
    colors: [
      { id: 'black',     name: 'Matte Black', frame: '#1c1c1e', accent: '#2c2c30', button: '#282830' },
      { id: 'black-red', name: 'Black / Red', frame: '#1a1a1e', accent: '#2a2030', button: '#e02040' },
    ],
    tags: ['gaming', 'monitor', 'rgb', 'desktop'],
  },
  {
    id: 'imac',
    name: 'iMac 24"',
    brand: 'Apple',
    category: 'desktop',
    frameW: 1060,
    frameH: 940,
    screen: { x: 10, y: 10, width: 1040, height: 584, radius: 10 },
    colors: [
      { id: 'silver', name: 'Silver', frame: '#c8c6c2', accent: '#dedcda', button: '#d4d2ce' },
      { id: 'blue',   name: 'Blue',   frame: '#4080e0', accent: '#60a0ff', button: '#5090f0' },
    ],
    tags: ['apple', 'imac', 'desktop', 'macos'],
  },
  {
    id: 'chrome-window',
    name: 'Chrome Window',
    brand: 'Google',
    category: 'desktop',
    frameW: 960,
    frameH: 600,
    screen: { x: 0, y: 40, width: 960, height: 560, radius: 0 },
    colors: [
      { id: 'dark', name: 'Dark Mode', frame: '#1e1e1f', accent: '#2c2c2e', button: '#2c2c2e' },
      { id: 'light', name: 'Light Mode', frame: '#f1f3f4', accent: '#ffffff', button: '#e8eaed' },
    ],
    tags: ['chrome', 'browser', 'window', 'web'],
  },
];

export function getDevice(id: string): DeviceDef | undefined {
  return DEVICE_REGISTRY.find(d => d.id === id);
}

export const DEVICE_CATEGORIES: { id: string; label: string }[] = [
  { id: 'all',     label: 'All' },
  { id: 'phone',   label: 'Phones' },
  { id: 'tablet',  label: 'Tablets' },
  { id: 'laptop',  label: 'Laptops' },
  { id: 'desktop', label: 'Monitors' },
];
