import React, { useEffect, useRef, useState } from 'react';
import { Play, Square, Activity, Radio, Volume2, Waves, Sliders, Zap } from 'lucide-react';
import { audio } from '../lib/AudioEngine';

interface AcousticVisualizerProps {
  currentHz?: number;
  onHzChange?: (hz: number) => void;
  accentColor?: string;
}

export const AcousticVisualizer: React.FC<AcousticVisualizerProps> = ({
  currentHz = 432,
  onHzChange,
  accentColor = '#00f0ff'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlayingDrone, setIsPlayingDrone] = useState(false);
  const [isPlayingStatic, setIsPlayingStatic] = useState(false);
  const [frequency, setFrequency] = useState(currentHz);
  const [amplitude, setAmplitude] = useState(60);
  const [vizMode, setVizMode] = useState<'wave' | 'spectrogram' | 'radar'>('wave');
  const [volume, setVolume] = useState(30);

  useEffect(() => {
    if (currentHz !== frequency) {
      setFrequency(currentHz);
    }
  }, [currentHz]);

  // Adjust volume
  useEffect(() => {
    audio.setMasterVolume(volume / 100);
  }, [volume]);

  // Handle frequency updates to running drone
  useEffect(() => {
    if (isPlayingDrone) {
      audio.startFocusDrone(frequency, 10);
    }
  }, [frequency, isPlayingDrone]);

  // Toggle Binaural Focus Drone
  const handleToggleDrone = () => {
    if (isPlayingDrone) {
      audio.stopFocusDrone();
      setIsPlayingDrone(false);
    } else {
      audio.startFocusDrone(frequency, 10);
      setIsPlayingDrone(true);
      // Play high chime to celebrate
      audio.playChime([frequency * 0.5, frequency, frequency * 1.5, frequency * 2]);
    }
    audio.playClick(600, 0.08);
  };

  // Toggle Radio Static
  const handleToggleStatic = () => {
    if (isPlayingStatic) {
      audio.stopStaticNoise();
      setIsPlayingStatic(false);
    } else {
      audio.startStaticNoise();
      setIsPlayingStatic(true);
    }
    audio.playClick(500, 0.06);
  };

  // Audio Logo sweep
  const triggerAcousticLogo = () => {
    audio.playChime([frequency * 0.5, frequency, frequency * 1.25, frequency * 1.5]);
    audio.playClick(900, 0.04);
  };

  // Trigger airplay sweep
  const triggerAirplaySweep = () => {
    audio.triggerSwoosh();
  };

  // Canvas Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw faint grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      // Vertical grid lines
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      // Horizontal grid lines
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw active visualization
      if (vizMode === 'wave') {
        // Draw standard high-tech oscilliscope waves
        ctx.shadowBlur = 10;
        ctx.shadowColor = accentColor;
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;

        ctx.beginPath();
        for (let x = 0; x < w; x++) {
          // Compound sine waves for rich synthesis look
          const freqMultiplier = frequency / 200;
          const ampVal = amplitude * (0.3 + (isPlayingDrone ? 0.5 : 0.1) * Math.sin(phase * 0.1));
          
          const y1 = Math.sin(x * 0.02 * freqMultiplier + phase) * ampVal;
          const y2 = Math.cos(x * 0.005 * freqMultiplier - phase * 0.5) * (ampVal * 0.4);
          const y3 = Math.sin(x * 0.05 + phase * 2) * (isPlayingStatic ? 8 : 1); // Static jitter
          
          const finalY = h / 2 + y1 + y2 + y3;

          if (x === 0) {
            ctx.moveTo(x, finalY);
          } else {
            ctx.lineTo(x, finalY);
          }
        }
        ctx.stroke();
        ctx.shadowBlur = 0; // reset

        // Draw frequency text ticker
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '9px monospace';
        ctx.fillText(`SOLFEGGIO TUNER: ${frequency.toFixed(1)} Hz`, 12, 20);
        ctx.fillText(`APOCRYPHAL DOME RESONANCE: ${isPlayingDrone ? 'ALPHA/THETA ENTRAINMENT SECURE' : 'STANDBY MONITOR'}`, 12, 35);
        ctx.fillText(`SACRED COMPRESSION SCALES: 4.1:1`, w - 180, 20);

      } else if (vizMode === 'spectrogram') {
        // Draw circular or modular spectrum blocks
        const blocksCount = 30;
        const blockWidth = (w - 40) / blocksCount;

        for (let i = 0; i < blocksCount; i++) {
          const t = i / blocksCount;
          // Calculate high tech audio bar height
          let barHeight = (Math.sin(t * Math.PI + phase) + 1.2) * (amplitude * 0.5);
          
          // Add random jitter
          const activeSwell = isPlayingDrone || isPlayingStatic ? 0.7 : 0.15;
          barHeight += Math.random() * 20 * activeSwell;

          if (barHeight > h - 30) barHeight = h - 30;

          // Fill color with gradient look
          ctx.fillStyle = i % 2 === 0 ? accentColor : 'rgba(168, 85, 247, 0.75)'; // cyan & purple mix
          ctx.shadowBlur = 4;
          ctx.shadowColor = ctx.fillStyle;

          ctx.fillRect(
            20 + i * blockWidth,
            h - barHeight - 15,
            blockWidth - 3,
            barHeight
          );
        }
        ctx.shadowBlur = 0;

        // Peak line
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(20, h / 4 + Math.sin(phase) * 10);
        ctx.lineTo(w - 20, h / 4 + Math.sin(phase) * 10);
        ctx.stroke();
        ctx.fillStyle = '#ef4444';
        ctx.font = '8px monospace';
        ctx.fillText('CRITICAL ASTRAL OVERLOAD DETECTED', 25, h / 4 - 5);

      } else if (vizMode === 'radar') {
        // Draw RadioReach regional market coverage radar (USA networks)
        const cx = w / 2;
        const cy = h / 2;
        const radius = Math.min(w, h) * 0.45;

        // Outer radar circle
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner rings
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        [0.3, 0.6, 0.8].forEach(r => {
          ctx.beginPath();
          ctx.arc(cx, cy, radius * r, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Rotating radar sweep line
        const sweepAngle = phase * 0.4;
        ctx.strokeStyle = `${accentColor}4D`; // with opacity
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius);
        ctx.stroke();

        // Draw glowing audio towers / market locations (Reach Media points)
        const mockCities = [
          { name: 'Kether Antenna', x: -0.2, y: -0.3, pop: '2.4M' },
          { name: 'Malkuth FM Station', x: 0.5, y: -0.4, pop: '14.2M' },
          { name: 'Gospel Sanctuary Net', x: -0.4, y: 0.5, pop: '8.9M' },
          { name: 'Nocturnal Hermetic Grid', x: 0.3, y: 0.3, pop: '4.7M' }
        ];

        mockCities.forEach((city, index) => {
          const px = cx + city.x * radius;
          const py = cy + city.y * radius;
          
          // Pulsing reach node
          const pulse = (Math.sin(phase * 2 + index) + 1) * 3 + 2;
          ctx.fillStyle = accentColor;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `${accentColor}80`;
          ctx.beginPath();
          ctx.arc(px, py, pulse, 0, Math.PI * 2);
          ctx.stroke();

          // Label
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.font = '8px monospace';
          ctx.fillText(`${city.name} (${city.pop})`, px + 8, py + 3);
        });

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '9px monospace';
        ctx.fillText(`AETHERIC TRANSMISSION SPHERE: ALIGNED`, 15, h - 12);
      }

      phase += 0.05;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [frequency, amplitude, vizMode, isPlayingDrone, isPlayingStatic, accentColor]);

  const handleFreqSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setFrequency(val);
    if (onHzChange) {
      onHzChange(val);
    }
  };

  return (
    <div className="bg-[#0b0c1b]/95 border border-[#1e2243] rounded-lg p-4 font-mono select-none flex flex-col h-full text-slate-200 shadow-2xl shadow-black">
      {/* Header section with telemetry lights */}
      <div className="flex items-center justify-between border-b border-[#1e2243] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#00f0ff] animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
            Aeon-Reach Resonator & Wave Scope
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${isPlayingDrone ? 'bg-[#10b981] animate-ping' : 'bg-slate-600'}`} />
          <span className={`h-2 w-2 rounded-full ${isPlayingStatic ? 'bg-amber-500 animate-pulse' : 'bg-slate-600'}`} />
          <span className="text-[10px] text-slate-400">NOETIC.v9.01</span>
        </div>
      </div>

      {/* Actual canvas screen */}
      <div className="relative flex-1 bg-black/80 rounded border border-[#191d3a] overflow-hidden min-h-[140px] mb-3">
        <canvas
          ref={canvasRef}
          width={440}
          height={180}
          className="w-full h-full block"
        />
        {/* Glow corner decorations */}
        <div className="absolute top-0 left-0 border-t border-l border-[#00f0ff]/40 w-2 h-2" />
        <div className="absolute top-0 right-0 border-t border-r border-[#00f0ff]/40 w-2 h-2" />
        <div className="absolute bottom-0 left-0 border-b border-l border-[#00f0ff]/40 w-2 h-2" />
        <div className="absolute bottom-0 right-0 border-b border-r border-[#00f0ff]/40 w-2 h-2" />
      </div>

      {/* Visualizer Mode selector */}
      <div className="grid grid-cols-3 gap-1 mb-3 bg-[#131730] p-1 rounded border border-[#1e2243]">
        <button
          onClick={() => { setVizMode('wave'); audio.playClick(750, 0.04); }}
          className={`text-[10px] py-1 rounded transition-all text-center flex items-center justify-center gap-1 cursor-pointer uppercase ${
            vizMode === 'wave' ? 'bg-[#1a5b84] text-white font-bold border border-[#00f0ff]/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Waves className="h-3 w-3" />
          Oscilloscope
        </button>
        <button
          onClick={() => { setVizMode('spectrogram'); audio.playClick(750, 0.04); }}
          className={`text-[10px] py-1 rounded transition-all text-center flex items-center justify-center gap-1 cursor-pointer uppercase ${
            vizMode === 'spectrogram' ? 'bg-[#1a5b84] text-white font-bold border border-[#00f0ff]/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="h-3 w-3" />
          Spectrogram
        </button>
        <button
          onClick={() => { setVizMode('radar'); audio.playClick(750, 0.04); }}
          className={`text-[10px] py-1 rounded transition-all text-center flex items-center justify-center gap-1 cursor-pointer uppercase ${
            vizMode === 'radar' ? 'bg-[#1a5b84] text-white font-bold border border-[#00f0ff]/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="h-3 w-3 animate-pulse" />
          Reach Radar
        </button>
      </div>

      {/* Controls & sliders */}
      <div className="space-y-2 text-xs">
        {/* Slider 1: Frequency slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-cyan-400" /> Carrier Frequency</span>
            <span className="text-[#00f0ff] font-bold">{frequency.toFixed(0)} Hz</span>
          </div>
          <input
            type="range"
            min="40"
            max="880"
            step="1"
            value={frequency}
            onChange={handleFreqSliderChange}
            className="w-full h-1 bg-[#131730] rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
          />
        </div>

        {/* Slider 2: Gain Amplitude */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-slate-300">
            <span>Acoustic Amplitude</span>
            <span>{amplitude}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={amplitude}
            onChange={(e) => setAmplitude(parseInt(e.target.value))}
            className="w-full h-1 bg-[#131730] rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Action Button Grid */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={handleToggleDrone}
            className={`py-1.5 px-2 rounded border text-[11px] flex items-center justify-center gap-1.5 transition-all font-bold cursor-pointer uppercase ${
              isPlayingDrone
                ? 'bg-rose-950/60 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-emerald-950/40 border-emerald-500/50 hover:bg-emerald-950/80 text-emerald-400'
            }`}
          >
            {isPlayingDrone ? (
              <>
                <Square className="h-3.5 w-3.5 fill-rose-300" /> Stop focus
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-emerald-400" /> Focus drone
              </>
            )}
          </button>

          <button
            onClick={handleToggleStatic}
            className={`py-1.5 px-2 rounded border text-[11px] flex items-center justify-center gap-1.5 transition-all font-bold cursor-pointer uppercase ${
              isPlayingStatic
                ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                : 'bg-slate-800/40 border-slate-600 hover:bg-slate-800/80 text-slate-300'
            }`}
          >
            <Radio className="h-3.5 w-3.5" />
            {isPlayingStatic ? 'Static Mute' : 'Radio Static'}
          </button>
        </div>

        {/* Chime & Swoosh triggers */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={triggerAcousticLogo}
            className="py-1 px-2 rounded border border-[#1e2243] bg-slate-800/20 hover:bg-slate-800/50 text-[10px] text-slate-300 flex items-center justify-center gap-1 cursor-pointer"
          >
            <Volume2 className="h-3 w-3 text-cyan-400" /> Sonic Chime
          </button>
          <button
            onClick={triggerAirplaySweep}
            className="py-1 px-2 rounded border border-[#1e2243] bg-slate-800/20 hover:bg-slate-800/50 text-[10px] text-slate-300 flex items-center justify-center gap-1 cursor-pointer"
          >
            <Zap className="h-3 w-3 text-amber-400 animate-pulse" /> Radio Sweep
          </button>
        </div>

        {/* Master volume controller */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#1e2243] text-[10px] text-slate-400">
          <Volume2 className="h-3.5 w-3.5 text-slate-400" />
          <span>Vol</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="flex-1 h-1 bg-[#131730] rounded-lg appearance-none cursor-pointer accent-slate-400"
          />
          <span className="w-6 text-right">{volume}%</span>
        </div>
      </div>
    </div>
  );
};
export default AcousticVisualizer;
