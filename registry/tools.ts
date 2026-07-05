import React from 'react';
import { Code, Palette, Pipette, Layers, LucideIcon } from 'lucide-react';

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
    id: 'snippets',
    title: 'Code Snippets',
    description: 'Generate beautiful high-retina code snippet screenshots with window controls.',
    category: 'Developer',
    icon: Code,
    shortcut: 'S',
    keywords: ['code', 'screenshot', 'carbon', 'snippet', 'export', 'image', 'png', 'developer'],
    featured: true,
    component: React.lazy(() => import('@/modules/snippets'))
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
    id: 'backgrounds',
    title: 'Background Studio',
    description: 'Design and export production-ready HTML, CSS, Tailwind, or React backgrounds.',
    category: 'Design',
    icon: Layers,
    shortcut: 'B',
    keywords: ['background', 'mesh', 'aurora', 'grid', 'css', 'tailwind', 'svg', 'generator'],
    featured: true,
    component: React.lazy(() => import('@/modules/background-studio'))
  }
];
