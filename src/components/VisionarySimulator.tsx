import React, { useState, useEffect, useRef } from 'react';
import { Brain, Play, Square, Eye, Award, Activity, Save } from 'lucide-react';
import { audio } from '../lib/AudioEngine';

interface Epiphany {
  id: string;
  text: string;
  timestamp: string;
  intensityScore: number;
}

export const VisionarySimulator: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [focusIntensity, setFocusIntensity] = useState(85);
  const [entrainmentType, setEntrainmentType] = useState<'Alpha' | 'Theta' | 'Gamma'>('Alpha');
  const [philosophyStream, setPhilosophyStream] = useState<string[]>([
    'System: Synesthesia matrices synchronized. Calibration complete.',
    'Acoustic Core: Radio waves do not merely travel through air; they shake car doors. They trigger memories of childhood kitchens.',
    'Marketing Vector: Consistency beats amplitude. 21 spots/week for 52 weeks is a somatic drumbeat that builds empires.',
    'Neural Layer: Sound frequencies can bypass analytical defenses. The 432Hz natural frequency represents clean, non-tempered cognitive comfort.'
  ]);

  const [newEpiphany, setNewEpiphany] = useState('');
  const [epiphanies, setEpiphanies] = useState<Epiphany[]>([
    {
      id: 'ep-1',
      text: 'Morning commuters are hyper-receptive to sub-harmonic bass; reduce baritone voice mid-range frequencies to avoid listening fatigue.',
      timestamp: '09:12:44',
      intensityScore: 97
    }
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamEndRef = useRef<HTMLDivElement | null>(null);

  // Active Philosophy statements to feed
  const PHILOSOPHY_DB = [
    'Acoustic logos are somatic bookmarks in a listener’s mental landscape.',
    'The 3.4 weekly impressions threshold is a scientific law, not an option.',
    'Reach Media coverage of 94% means your sound signature is a national utility.',
    'Dynamic range compression is the paint; the radio frequency is the canvas.',
    'When the decibel envelope is compressed to -3dB, the subconscious treats it as a physical wall.',
    'Noetic alchemists do not sell advertisements. We compose somatic, aetheric acoustic seals.',
    'Alpha-wave entrainment at 10.4Hz generates a flow-state focus loop in commuting drivers.',
    'The acoustic spectrum is an open arbitrage market. Grab low-cost off-peak slots.',
    'Gospel radio networks cultivate high trust. Audio ads there must mirror the warm preacher frequency scales.',
    'Every sound signature needs a tactile sub-harmonic root tone to activate car speakers.',
    'Speech spoken at exactly 126 words-per-minute locks perfectly into heartbeat cadences.'
  ];

  // Feed philosophy stream
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const statement = PHILOSOPHY_DB[Math.floor(Math.random() * PHILOSOPHY_DB.length)];
      setPhilosophyStream(prev => [...prev.slice(-15), `Acoustic Insight: ${statement}`]);
      
      // Play high-tech ticker click
      audio.playClick(900 + Math.random() * 200, 0.02, 'sine');
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Scroll stream
  useEffect(() => {
    if (streamEndRef.current) {
      streamEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [philosophyStream]);

  // Handle Audio Focus Drone
  useEffect(() => {
    if (isActive) {
      const carrier = entrainmentType === 'Alpha' ? 432 : entrainmentType === 'Theta' ? 220 : 528;
      const beat = entrainmentType === 'Alpha' ? 10 : entrainmentType === 'Theta' ? 6 : 40;
      audio.startFocusDrone(carrier, beat);
    } else {
      audio.stopFocusDrone();
    }
    return () => {
      audio.stopFocusDrone();
    };
  }, [isActive, entrainmentType]);

  // Canvas Brainwave animation loop
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

      // Draw faint geometric brain outline or circular core matrix
      const cx = w / 2;
      const cy = h / 2;
      const activeRadius = Math.min(w, h) * 0.35;

      // Draw particle system
      ctx.shadowBlur = isActive ? 12 : 3;
      ctx.shadowColor = entrainmentType === 'Alpha' ? '#00f0ff' : entrainmentType === 'Theta' ? '#a855f7' : '#10b981';
      ctx.strokeStyle = ctx.shadowColor;
      ctx.lineWidth = 1;

      // Concentric circles representing neural rings
      for (let j = 1; j <= 5; j++) {
        ctx.beginPath();
        const r = activeRadius * (j / 5);
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `${ctx.shadowColor}${isActive ? '33' : '11'}`;
        ctx.stroke();
      }

      // Live Sine wave ripples representing entrainment waves
      ctx.beginPath();
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.strokeStyle = ctx.shadowColor;
      
      const waveCount = isActive ? 120 : 40;
      for (let i = 0; i < waveCount; i++) {
        const angle = (i / waveCount) * Math.PI * 2;
        
        // Multi-frequency resonance calculations
        const amplitudeMod = isActive ? (focusIntensity / 100) * 20 : 5;
        const wave1 = Math.sin(angle * 8 + phase) * amplitudeMod;
        const wave2 = Math.cos(angle * 16 - phase * 1.5) * (amplitudeMod * 0.3);
        const wave3 = Math.sin(angle * 4 + phase * 2.5) * (amplitudeMod * 0.5);

        const currentR = activeRadius + wave1 + wave2 + wave3;
        const px = cx + Math.cos(angle) * currentR;
        const py = cy + Math.sin(angle) * currentR;

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.stroke();

      // Matrix scrolling text coordinates on canvas background
      if (isActive && Math.random() > 0.75) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.font = '7px monospace';
        ctx.fillText(`ENTRAINMENT FREQ: ${entrainmentType === 'Alpha' ? '10.4Hz ALPHA (FLOW)' : entrainmentType === 'Theta' ? '6.0Hz THETA (CREATIVE)' : '40.0Hz GAMMA (COGNITIVE)'}`, Math.random() * (w - 180), Math.random() * (h - 20));
      }

      phase += isActive ? (focusIntensity / 100) * 0.15 : 0.02;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isActive, focusIntensity, entrainmentType]);

  const handleStartSimulation = () => {
    if (isActive) {
      setIsActive(false);
      audio.playClick(400, 0.1, 'sawtooth');
    } else {
      setIsActive(true);
      // Play deep chime sequence to boot
      audio.playChime([220, 330, 440, 528, 660]);
      audio.triggerSwoosh();
      setPhilosophyStream(prev => [
        ...prev,
        `=== SYSTEM ENTRAINMENT INITIALIZED ON ${new Date().toLocaleTimeString()} ===`,
        `Entrainment protocol configured: ${entrainmentType}-tier binaural wave state activated.`
      ]);
    }
  };

  const handleAddEpiphany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEpiphany.trim()) return;

    const insightScore = Math.floor(Math.random() * 8) + 92; // 92-99% genius intensity
    
    audio.playChime([528, 792, 1056]);

    setEpiphanies(prev => [
      {
        id: `ep-${Date.now()}`,
        text: newEpiphany,
        timestamp: new Date().toLocaleTimeString(),
        intensityScore: insightScore
      },
      ...prev
    ]);

    // Feed back into active stream
    setPhilosophyStream(prev => [
      ...prev,
      `✨ Epiphany Captured: "${newEpiphany}" [Genius Rating: ${insightScore}%]`
    ]);

    setNewEpiphany('');
  };

  return (
    <div className={`border rounded-lg p-4 font-mono select-none flex flex-col h-full text-slate-200 shadow-2xl shadow-black transition-all ${
      isActive 
        ? 'bg-[#04050e] border-[#00f0ff] ring-2 ring-cyan-500/20' 
        : 'bg-[#0b0c1b]/95 border-[#1e2243]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1e2243] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Brain className={`h-4 w-4 text-purple-400 ${isActive ? 'animate-bounce' : 'animate-pulse'}`} />
          <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
            Visionary Focus & Brainwave Simulator
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-[#00f0ff] animate-ping' : 'bg-slate-600'}`} />
          <span className="text-[10px] text-slate-400 uppercase tracking-tight">SENSORY ENTRAINMENT UNIT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 flex-1 overflow-hidden">
        
        {/* Left 3/5: Canvas wave & controller */}
        <div className="lg:col-span-3 flex flex-col space-y-3 h-full overflow-hidden">
          <div className="text-[10px] text-slate-400">
            {isActive 
              ? '🟢 NEURAL ENTRAINMENT ACTIVE: Put on headphones for true left-to-right binaural beats' 
              : '⚪ SIMULATOR IN STANDBY. Turn on to entrain flow state frequencies.'
            }
          </div>

          {/* Canvas box */}
          <div className="relative flex-1 bg-black/80 rounded border border-[#1e2243] overflow-hidden min-h-[160px]">
            <canvas
              ref={canvasRef}
              width={420}
              height={220}
              className="w-full h-full block"
            />
            {isActive && (
              <div className="absolute top-2 left-3 text-[9px] bg-[#0c1e30] border border-cyan-500/20 px-2 py-0.5 rounded text-[#00f0ff] uppercase animate-pulse flex items-center gap-1">
                <Activity className="h-3 w-3" /> Focus Locked • {focusIntensity}% Sync
              </div>
            )}
            <div className="absolute bottom-2 right-3 text-[8px] text-slate-500">
              REACH-OS RESONATOR v1.02
            </div>
          </div>

          {/* Entrainment Selection & Controls */}
          <div className="bg-[#121631] border border-[#1e2243] p-3 rounded grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Wave Type selection */}
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 uppercase font-bold block">Entrainment Spectrum</label>
              <div className="grid grid-cols-3 gap-1 bg-black p-0.5 rounded border border-[#1e2243]">
                <button
                  onClick={() => { setEntrainmentType('Alpha'); audio.playClick(600, 0.04); }}
                  className={`text-[10px] py-1 rounded cursor-pointer uppercase transition-all ${
                    entrainmentType === 'Alpha' 
                      ? 'bg-cyan-500 text-black font-extrabold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Alpha
                </button>
                <button
                  onClick={() => { setEntrainmentType('Theta'); audio.playClick(600, 0.04); }}
                  className={`text-[10px] py-1 rounded cursor-pointer uppercase transition-all ${
                    entrainmentType === 'Theta' 
                      ? 'bg-purple-500 text-white font-extrabold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Theta
                </button>
                <button
                  onClick={() => { setEntrainmentType('Gamma'); audio.playClick(600, 0.04); }}
                  className={`text-[10px] py-1 rounded cursor-pointer uppercase transition-all ${
                    entrainmentType === 'Gamma' 
                      ? 'bg-emerald-500 text-black font-extrabold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Gamma
                </button>
              </div>
            </div>

            {/* Slider Focus */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] text-slate-400 uppercase font-bold">
                <span>Resonance Gain</span>
                <span>{focusIntensity}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={focusIntensity}
                onChange={(e) => setFocusIntensity(parseInt(e.target.value))}
                className="w-full h-1 bg-[#131730] rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
              />
            </div>

            {/* Simulated Launch Trigger */}
            <button
              onClick={handleStartSimulation}
              className={`md:col-span-2 py-2.5 rounded font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                isActive 
                  ? 'bg-rose-950/60 border-rose-500 text-rose-300 animate-pulse' 
                  : 'bg-[#1a5b84]/95 border-[#00f0ff]/40 hover:bg-[#1a5b84] text-white shadow-lg'
              }`}
            >
              {isActive ? (
                <>
                  <Square className="h-4 w-4 fill-rose-300" />
                  Shutdown Entrainment Dome
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white text-[#00f0ff]" />
                  Initiate Genius Entrainment
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right 2/5: Epiphany logging + stream-of-consciousness philosophy scrolling */}
        <div className="lg:col-span-2 flex flex-col space-y-3 h-full overflow-hidden">
          
          {/* Philosophy Stream Terminal */}
          <div className="bg-black/95 p-3 border border-[#1e2243] rounded flex-1 flex flex-col h-[180px] overflow-hidden">
            <span className="text-[9px] text-[#00f0ff] font-bold block uppercase border-b border-[#131b2f] pb-1.5 mb-1.5 flex items-center gap-1">
              <Eye className="h-3 w-3 animate-pulse text-purple-400" /> Somatic Philosophy Streaming...
            </span>
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 font-mono text-[9px] leading-relaxed text-slate-300">
              {philosophyStream.map((p, index) => {
                let textCol = 'text-slate-400';
                if (p.includes('Acoustic Insight:')) textCol = 'text-[#00f0ff] font-sans';
                if (p.includes('✨ Epiphany')) textCol = 'text-emerald-400 font-extrabold';
                if (p.includes('===')) textCol = 'text-purple-400 font-bold';

                return (
                  <div key={index} className={textCol}>
                    {p}
                  </div>
                );
              })}
              <div ref={streamEndRef} />
            </div>
          </div>

          {/* Epiphanies ledger */}
          <div className="bg-[#090a18] p-3 border border-[#1e2243] rounded flex flex-col h-[200px] overflow-hidden">
            <span className="text-[9px] text-amber-400 font-bold block uppercase border-b border-[#1a1b2f] pb-1.5 mb-2.5 flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-amber-400 animate-spin" /> Epiphany Flash Ledger
            </span>

            {/* Add epiphany input form */}
            <form onSubmit={handleAddEpiphany} className="flex gap-1.5 mb-2.5">
              <input
                type="text"
                value={newEpiphany}
                onChange={(e) => setNewEpiphany(e.target.value)}
                placeholder="Log a flash marketing insight..."
                className="flex-1 bg-black border border-[#1e2243] rounded px-2.5 py-1 text-[10px] text-slate-200 focus:outline-none focus:border-purple-400 placeholder-slate-700"
              />
              <button
                type="submit"
                className="bg-purple-950/60 hover:bg-purple-950 border border-purple-500/50 text-purple-400 px-2 rounded flex items-center justify-center transition-all cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-[9px]">
              {epiphanies.map(ep => (
                <div key={ep.id} className="bg-black/40 p-2 rounded border border-[#1e2243]/50 hover:border-slate-500 relative">
                  <div className="flex justify-between items-center mb-1 font-bold">
                    <span className="text-purple-400">{ep.timestamp}</span>
                    <span className="text-[#00f0ff] font-mono font-extrabold bg-[#0c1e30] border border-cyan-500/20 px-1 rounded">
                      Genius: {ep.intensityScore}%
                    </span>
                  </div>
                  <p className="text-slate-300 font-sans italic leading-snug">"{ep.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default VisionarySimulator;
