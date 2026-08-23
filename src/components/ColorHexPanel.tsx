import React, { useState } from 'react';
import { Palette, Volume2, Eye, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';
import { audio } from '../lib/AudioEngine';

interface SynColor {
  hex: string;
  name: string;
  frequency: number;
  description: string;
  rgb: string;
}

export const ColorHexPanel: React.FC = () => {
  const [brandInput, setBrandInput] = useState('AeonReach');
  const [vibeTheme, setVibeTheme] = useState<'neon' | 'gospel' | 'commuter' | 'corporate'>('neon');
  const [generatedColors, setGeneratedColors] = useState<SynColor[]>([
    {
      hex: '#00f0ff',
      name: 'Gnostic Cyan',
      frequency: 432,
      description: 'Cerebral focus carrier. Evokes digital clarity, trust, and wide open broadcasting ranges.',
      rgb: 'rgb(0, 240, 255)'
    },
    {
      hex: '#a855f7',
      name: 'Alchemical Amethyst',
      frequency: 660,
      description: 'Creative synthesis resonance. Triggers dopamine pathways associated with narrative memory retention.',
      rgb: 'rgb(168, 85, 247)'
    },
    {
      hex: '#0b0c1b',
      name: 'Karmic Obsidian',
      frequency: 55,
      description: 'Physical tactile grounding. Vibrates low-end speaker cabinets during car rides to force attention.',
      rgb: 'rgb(11, 12, 27)'
    }
  ]);

  const [activeCopiedHex, setActiveCopiedHex] = useState<string | null>(null);

  const handleGenerateSpectrum = () => {
    audio.playChime([330, 440, 550]);
    audio.triggerSwoosh();

    const textSeed = brandInput || 'AeonReach';
    
    // Generate spectrum based on text inputs and vibes
    let scheme: SynColor[] = [];
    if (vibeTheme === 'neon') {
      scheme = [
        {
          hex: '#00f0ff',
          name: 'Spectrum Cyan',
          frequency: 432,
          description: 'High-clarity stream overlay. Matches digital audio fidelity parameters.',
          rgb: 'rgb(0, 240, 255)'
        },
        {
          hex: '#ec4899',
          name: 'Late-Night Sunset Pink',
          frequency: 528,
          description: 'Binaural focus frequency. Stimulates late-night driving relaxation.',
          rgb: 'rgb(236, 72, 153)'
        },
        {
          hex: '#6366f1',
          name: 'Affiliate Indigo',
          frequency: 330,
          description: 'Mid-range warm harmonics. Anchor tone for general announcements.',
          rgb: 'rgb(99, 102, 241)'
        }
      ];
    } else if (vibeTheme === 'gospel') {
      scheme = [
        {
          hex: '#f59e0b',
          name: 'Sanctuary Amber Gold',
          frequency: 392,
          description: 'Spiritual faith warmth. Evokes high listener trust, comfort, and community ties.',
          rgb: 'rgb(245, 158, 11)'
        },
        {
          hex: '#10b981',
          name: 'Eternal Mint Green',
          frequency: 440,
          description: 'Peaceful acoustic alignment. Ideal for quiet morning prayers and announcements.',
          rgb: 'rgb(16, 185, 129)'
        },
        {
          hex: '#78350f',
          name: 'Resonant Mahogany Brown',
          frequency: 110,
          description: 'Deep pulpit wood grounding tone. Anchors backing hymns.',
          rgb: 'rgb(120, 53, 15)'
        }
      ];
    } else if (vibeTheme === 'commuter') {
      scheme = [
        {
          hex: '#ef4444',
          name: 'Adrenaline Drive Red',
          frequency: 880,
          description: 'High-attention alert spike. Breaks through highway hypnosis immediately.',
          rgb: 'rgb(239, 68, 68)'
        },
        {
          hex: '#f97316',
          name: 'Commute Traffic Gold',
          frequency: 660,
          description: 'Energetic broadcast tone. Stimulates prompt actions and search queries.',
          rgb: 'rgb(249, 115, 22)'
        },
        {
          hex: '#1e293b',
          name: 'Dashboard Slate Dark',
          frequency: 80,
          description: 'Sub-bass cabin cabin resonance. Vibrates door framing slightly to anchor sound.',
          rgb: 'rgb(30, 41, 59)'
        }
      ];
    } else {
      scheme = [
        {
          hex: '#06b6d4',
          name: 'B2B Broadcast Sapphire',
          frequency: 432,
          description: 'Premium corporate messaging. Direct representation of professional ROI scales.',
          rgb: 'rgb(6, 182, 212)'
        },
        {
          hex: '#14b8a6',
          name: 'Consultant Teal Blue',
          frequency: 587,
          description: 'Analytical integrity wave. Represents accurate listener demographic maps.',
          rgb: 'rgb(20, 184, 166)'
        },
        {
          hex: '#0f172a',
          name: 'Premium Boardroom Slate',
          frequency: 65,
          description: 'Corporate luxury grounding tone. Establishes dynamic contrast in logo chimes.',
          rgb: 'rgb(15, 23, 42)'
        }
      ];
    }

    // Jitter frequencies slightly based on brandInput characters to make it feel custom synthesized
    const offset = textSeed.charCodeAt(0) % 20;
    scheme = scheme.map(color => ({
      ...color,
      frequency: color.frequency + offset
    }));

    setGeneratedColors(scheme);
  };

  const playColorFrequency = (color: SynColor) => {
    // Play tone representing the color!
    audio.playClick(color.frequency, 0.4, color.frequency > 200 ? 'sine' : 'triangle');
    
    // Play secondary chime overlay if high pitch
    if (color.frequency > 300) {
      setTimeout(() => {
        audio.playClick(color.frequency * 1.5, 0.2, 'triangle');
      }, 80);
    }
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    audio.playClick(1000, 0.04);
    setActiveCopiedHex(hex);
    setTimeout(() => {
      setActiveCopiedHex(null);
    }, 2000);
  };

  return (
    <div className="bg-[#0b0c1b]/95 border border-[#1e2243] rounded-lg p-4 font-mono select-none flex flex-col h-full text-slate-200 shadow-2xl shadow-black">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1e2243] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-rose-400" />
          <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
            Sound-Color Synesthesia Spectrum Designer
          </span>
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-tight">HEX x RES MEMORY MATCH</span>
      </div>

      <div className="space-y-3 flex-1 flex flex-col overflow-hidden">
        
        {/* Dynamic Vibe controller */}
        <div className="bg-[#121631] border border-[#1e2243] p-3 rounded space-y-2 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {/* Input field */}
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 uppercase font-bold block">Brand / Campaign Anchor Name</label>
              <input
                type="text"
                value={brandInput}
                onChange={(e) => setBrandInput(e.target.value)}
                placeholder="RadioReach Campaign..."
                className="w-full bg-black border border-[#1e2243] rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-rose-400 font-mono"
              />
            </div>

            {/* Vibe selection */}
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 uppercase font-bold block">Sonic Aesthetic Vibe</label>
              <select
                value={vibeTheme}
                onChange={(e) => setVibeTheme(e.target.value as any)}
                className="w-full bg-black border border-[#1e2243] rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-rose-400 font-mono"
              >
                <option value="neon">Late-Night Neon FM</option>
                <option value="gospel">Acoustic Faith & Gospel</option>
                <option value="commuter">High-Congestion Drive Time</option>
                <option value="corporate">Premium Consultant B2B</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateSpectrum}
            className="w-full bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-extrabold py-1.5 rounded text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-1 border border-[#00f0ff]/20"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Synthesize Synesthesia Palette
          </button>
        </div>

        {/* Generated hex codes cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 overflow-y-auto pr-1">
          {generatedColors.map((color, index) => {
            const isCopied = activeCopiedHex === color.hex;
            return (
              <div
                key={color.hex + index}
                className="bg-[#090b16] border border-[#1e2243] rounded p-2.5 flex flex-col justify-between hover:border-slate-500 transition-all text-xs"
              >
                {/* Visual Swatch Color */}
                <div
                  style={{ backgroundColor: color.hex }}
                  className="w-full h-14 rounded border border-white/20 shadow-inner flex items-center justify-center relative group overflow-hidden"
                >
                  {/* Glowing hover state */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => playColorFrequency(color)}
                      className="bg-black/80 hover:bg-black p-1.5 rounded-full text-[#00f0ff] border border-cyan-500/30 cursor-pointer"
                      title="Play Synesthetic Frequency"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => copyToClipboard(color.hex)}
                      className="bg-black/80 hover:bg-black p-1.5 rounded-full text-emerald-400 border border-emerald-500/30 cursor-pointer"
                      title="Copy Hex Code"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Hex Text */}
                  <span className="font-extrabold text-white text-xs px-2 py-0.5 bg-black/60 rounded border border-white/10 tracking-widest pointer-events-none shadow-md">
                    {color.hex}
                  </span>
                </div>

                {/* Color and resonance info */}
                <div className="mt-2.5 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h6 className="font-bold text-slate-100 truncate text-[11px] uppercase tracking-wide">
                      {color.name}
                    </h6>
                    <span className="text-[8px] text-slate-500 block font-mono">{color.rgb}</span>
                    <p className="text-[9px] text-slate-400 leading-snug mt-1 font-sans italic">
                      {color.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#121631] flex items-center justify-between text-[9px] text-[#00f0ff] font-bold">
                    <span className="flex items-center gap-0.5"><Layers className="h-3 w-3" /> Reso: {color.frequency}Hz</span>
                    <button
                      onClick={() => copyToClipboard(color.hex)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer uppercase text-[8px] border transition-all ${
                        isCopied 
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-400' 
                          : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {isCopied ? (
                        <span className="flex items-center gap-0.5"><CheckCircle2 className="h-2.5 w-2.5" /> COPIED</span>
                      ) : (
                        'Copy HEX'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Synthesized mockup look */}
        <div className="bg-[#0f1128] border border-[#1e2243] rounded p-2 text-[10px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5 text-rose-400 animate-pulse" /> Synesthetic Branding Mockup compiled.</span>
          <span className="text-[#00f0ff] uppercase tracking-tight">Active Matrix Deck: 3 Bands Loaded</span>
        </div>

      </div>
    </div>
  );
};
export default ColorHexPanel;
