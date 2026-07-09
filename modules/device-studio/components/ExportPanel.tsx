import React, { useState } from 'react';
import { Download, Clipboard, Check, RefreshCw } from 'lucide-react';
import { toPng, toJpeg } from 'html-to-image';
import { useToast } from '@/app/providers/ToastProvider';

interface ExportPanelProps {
  devicesCount: number;
  onClearAll: () => void;
}

export default function ExportPanel({ devicesCount, onClearAll }: ExportPanelProps) {
  const [format, setFormat] = useState<'png' | 'jpg'>('png');
  const [scale, setScale] = useState<number>(2); // 2x by default
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { showToast } = useToast();

  const handleExport = async (mode: 'download' | 'copy') => {
    const node = document.getElementById('device-scene-render');
    if (!node) {
      showToast('Error: Scene element not found', 'error');
      return;
    }

    setIsExporting(true);

    try {
      // Configure export settings for html-to-image
      const options = {
        pixelRatio: scale,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: '1200px',
          height: '800px',
        },
      };

      if (mode === 'download') {
        const dataUrl = format === 'png' 
          ? await toPng(node, options) 
          : await toJpeg(node, { ...options, quality: 0.95 });

        const link = document.createElement('a');
        link.download = `onyx-device-mockup-${Date.now()}.${format}`;
        link.href = dataUrl;
        link.click();
        showToast('Mockup exported successfully!', 'success');
      } else {
        // Copy to clipboard
        const dataUrl = await toPng(node, options);
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ]);
        setCopied(true);
        showToast('Image copied to clipboard!', 'success');
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error(err);
      showToast('Export failed. Please check image constraints.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-auto md:h-14 py-3 md:py-0 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 select-none z-45">
      {/* Scene Summary */}
      <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          <span>{devicesCount} {devicesCount === 1 ? 'device' : 'devices'} in scene</span>
        </span>
        {devicesCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-[10px] text-zinc-500 hover:text-rose-400 hover:underline transition-all cursor-pointer"
          >
            Clear Scene
          </button>
        )}
      </div>

      {/* Export Options */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {/* Format Selector */}
        <div className="flex items-center bg-zinc-900 p-0.5 rounded border border-zinc-850">
          {(['png', 'jpg'] as const).map(fmt => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer uppercase ${
                format === fmt ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        {/* Resolution Scale Selector */}
        <div className="flex items-center bg-zinc-900 p-0.5 rounded border border-zinc-850">
          {([1, 2, 4] as const).map(s => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={`px-2.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                scale === s ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-zinc-900 mx-1" />

        {/* Copy Button (only PNG supported by clipboard API in browsers) */}
        {format === 'png' && (
          <button
            onClick={() => handleExport('copy')}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        )}

        {/* Download Button */}
        <button
          onClick={() => handleExport('download')}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-zinc-100 hover:bg-white text-xs font-mono font-semibold text-black transition-all cursor-pointer disabled:opacity-50"
        >
          {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
          <span>{isExporting ? 'Exporting...' : 'Export'}</span>
        </button>
      </div>
    </div>
  );
}
