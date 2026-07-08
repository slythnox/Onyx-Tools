import React from 'react';
import { Code, Palette, Pipette, Layers, Type, Monitor, LucideIcon } from 'lucide-react';

export interface ToolMetadata {
  id: string;
  title: string;
  description: string;
  category: 'Developer' | 'Design' | 'Images' | 'Color' | 'Utilities';
  icon: LucideIcon;
  shortcut: string; // Keyboard shortcut key, e.g. "S" (press S on directory page)
  keywords: string[];
  featured: boolean;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}

export const TOOLS_REGISTRY: ToolMetadata[] = [
  {
    id: 'device-studio',
    title: 'Device Studio',
    description: 'Design and export high-resolution device mockup scenes with realistic shadows.',
    category: 'Design',
    icon: Monitor,
    shortcut: 'V',
    keywords: ['device', 'mockup', 'iphone', 'macbook', 'ipad', 'screenshot', 'canvas', 'scene'],
    featured: true,
    component: React.lazy(() => import('@/modules/device-studio'))
  },
  {
    id: 'components',
    title: 'Components',
    description: 'Preview, customize, and export custom high-performance interactive React UI components.',
    category: 'Design',
    icon: Layers,
    shortcut: 'D',
    keywords: ['component', 'ui', 'react', 'animated', 'list', 'bento', 'dock', 'motion'],
    featured: true,
    component: React.lazy(() => import('@/modules/components'))
  },
  {
    id: 'text-animations',
    title: 'Text Animations',
    description: 'Preview, customize, and export high-performance interactive React text animations.',
    category: 'Design',
    icon: Type,
    shortcut: 'T',
    keywords: ['text', 'animation', 'reactbits', 'split-text', 'scramble', 'typewriter', 'motion'],
    featured: true,
    component: React.lazy(() => import('@/modules/text-animations'))
  },
  {
    id: 'backgrounds',
    title: 'Background Studio',
    description: 'Design and export production-ready HTML, CSS, Tailwind, or React backgrounds.',
    category: 'Design',
    icon: Layers,
    shortcut: 'B',
    keywords: ['background', 'mesh', 'aurora', 'grid', 'css', 'tailwind', 'svg', 'generator'],
    featured: true,
    component: React.lazy(() => import('@/modules/background-studio'))
  },
  {
    id: 'colors',
    title: 'OKLCH Generator',
    description: 'Construct perceptually-uniform OKLCH color systems for dark and light modes.',
    category: 'Color',
    icon: Pipette,
    shortcut: 'C',
    keywords: ['oklch', 'color', 'palette', 'css', 'design-system', 'contrast', 'ui'],
    featured: true,
    component: React.lazy(() => import('@/modules/colors'))
  },
  {
    id: 'icons',
    title: 'Icon Studio',
    description: 'Search, customize, and export 1,400+ Lucide icons as PNG, SVG, or JSX.',
    category: 'Design',
    icon: Palette,
    shortcut: 'I',
    keywords: ['lucide', 'icons', 'export', 'svg', 'png', 'customize', 'jsx', 'studio'],
    featured: true,
    component: React.lazy(() => import('@/modules/icons'))
  },
  {
    id: 'snippets',
    title: 'Code Snippets',
    description: 'Generate beautiful high-retina code snippet screenshots with window controls.',
    category: 'Developer',
    icon: Code,
    shortcut: 'S',
    keywords: ['code', 'screenshot', 'carbon', 'snippet', 'export', 'image', 'png', 'developer'],
    featured: true,
    component: React.lazy(() => import('@/modules/snippets'))
  }
];
