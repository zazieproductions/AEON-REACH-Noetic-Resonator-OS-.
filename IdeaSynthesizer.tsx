import React, { useState } from 'react';
import { AcousticNote, SEEDED_NOTES } from '../utils/notesData';
import { audio } from '../utils/AudioEngine';
import { Cpu, RefreshCw, Zap, Sparkles, Check, Play } from 'lucide-react';

interface IdeaSynthesizerProps {
  availableNotes?: AcousticNote[];
}

export const IdeaSynthesizer: React.FC<IdeaSynthesizerProps> = ({
  availableNotes = SEEDED_NOTES
}) => {
  const [selectedNotes, setSelectedNotes] = useState<AcousticNote[]>([availableNotes[0], availableNotes[2]]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthStep, setSynthStep] = useState(0);
  const [synthesizedResult, setSynthesizedResult] = useState<{
    id: string;
    campaignName: string;
    freqHz: number;
    hexPrimary: string;
    hexSecondary: string;
    cognitiveScore: number;
    reachMillions: number;
    strategicBlueprint: string;
    script15s: string;
  } | null>(null);

  const synthLogs = [
    'Initializing Polymath Resonance Matrices...',
    'Analyzing psychoacoustic overlaps between chosen notes...',
    'Calibrating carrier wave spectrum to optimal brainwave resonance...',
    'Verifying Aeon-Reach Aetheric airplay bidding arbitrage ratios...',
    'Encoding decibel limiters & dynamic compression overlays...',
    'Synthesizing sonic brand blueprint and copy script...'
  ];

  const toggleSelectNote = (note: AcousticNote) => {
    audio.playClick(600, 0.05);
    if (selectedNotes.some(n => n.id === note.id)) {
      setSelectedNotes(prev => prev.filter(n => n.id !== note.id));
    } else {
      if (selectedNotes.length >= 4) {
        // limit to 4 notes for maximum acoustic focus
        audio.playClick(200, 0.1, 'sawtooth');
        return;
      }
      setSelectedNotes(prev => [...prev, note]);
    }
  };

  const handleSynthesize = () => {
    if (selectedNotes.length < 2) {
      audio.playClick(150, 0.2, 'sawtooth');
      alert("Please select at least 2 notes to synthesize a mastermind acoustic concept.");
      return;
    }

    setIsSynthesizing(true);
    setSynthesizedResult(null);
    setSynthStep(0);
    audio.triggerSwoosh();

    // Sound sequence during synthesis
    const interval = setInterval(() => {
      setSynthStep(prev => {
        // play diagnostic telemetry sounds during loading
        audio.playClick(400 + prev * 120, 0.06, 'triangle');
        
        if (prev >= synthLogs.length - 1) {
          clearInterval(interval);
          
          // Finished synthesis! Generate result
          const names = ['Hyperion-Resonance', 'Project Aether-Echo', 'Omega-Chime', 'Vortice-Vibe', 'Sonic-Gilded Shield', 'Spectral-Reach Apex'];
          const prefixes = ['Quantum', 'Neural', 'Bio-Acoustic', 'Cognitive', 'Somatic', 'Decibel'];
          
          const titlePart1 = prefixes[Math.floor(Math.random() * prefixes.length)];
          const titlePart2 = names[Math.floor(Math.random() * names.length)];
          const randomNum = Math.floor(Math.random() * 90) + 10;
          const campaignName = `${titlePart1} ${titlePart2}-${randomNum}`;
          
          // Combine frequency from notes or generate
          const combinedHz = Math.round(selectedNotes.reduce((acc, curr) => acc + (curr.frequencyHz || 432), 0) / selectedNotes.length);
          
          const hexes = ['#00f0ff', '#10b981', '#a855f7', '#ec4899', '#f59e0b', '#ef4444', '#06b6d4', '#6366f1', '#14b8a6'];
          const h1 = hexes[Math.floor(Math.random() * hexes.length)];
          let h2 = hexes[Math.floor(Math.random() * hexes.length)];
          if (h1 === h2) h2 = '#a855f7';

          const score = Math.floor(Math.random() * 8) + 92; // 92-99% genius efficiency
          const reach = parseFloat(((selectedNotes.length * 4.2) + Math.random() * 5).toFixed(1));

          const scripts = [
            `"[SFX: Warm low-pass chime sweep] When the noise of the market drowns your voice... Aeon-Reach anchors your sound. [SFX: Subtle 432Hz sine wave] Discover ultimate frequency consistency and build unbreakable local authority. Trust the signal."`,
            `"[SFX: Rapid 6-second electronic chime] You hear that? That's the sound of 38 million listeners choosing your brand. [SFX: Car horn & street ambiance fading into rich acoustic chime] Amplify your presence. Aeon-Reach is the soundscape of trust."`,
            `"[SFX: Deep bass pulse vibrating at 55Hz] The world moves at the speed of sound. [Voice overlay: Resonant baritone] Is your brand matching the rhythm? Aeon-Reach connects independent acoustic consultants to redefine your auditory identity. Tune in now."`
          ];

          const blueprints = `By combining the esoteric properties of ${selectedNotes.map(n => `"${n.title}"`).join(' and ')}, we've compiled an apocryphal acoustic blueprint. This approach focuses on aligning cosmic local FM and digital streaming bands simultaneously. By locking the brand's carrier tone to exactly ${combinedHz}Hz, we entrain listeners directly into an Alpha-state (Flow State) during high-congestion morning commutes. Visually, the brand must leverage synesthetic colors ${h1} and ${h2} in all regional streaming platforms to generate a cross-sensory cognitive resonance coefficient of ${score}%.`;

          setSynthesizedResult({
            id: `synth-${Date.now()}`,
            campaignName,
            freqHz: combinedHz,
            hexPrimary: h1,
            hexSecondary: h2,
            cognitiveScore: score,
            reachMillions: reach,
            strategicBlueprint: blueprints,
            script15s: scripts[Math.floor(Math.random() * scripts.length)]
          });

          // Play massive glorious acoustic chime to mark completion
          audio.playChime([combinedHz * 0.5, combinedHz, combinedHz * 1.5, combinedHz * 2]);
          setIsSynthesizing(false);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  const playDemoScriptSound = () => {
    if (!synthesizedResult) return;
    const hz = synthesizedResult.freqHz;
    // Play the frequency sound of the synthesis
    audio.playChime([hz * 0.5, hz, hz * 1.25, hz * 1.5, hz * 2]);
  };

  return (
    <div className="bg-[#0b0c1b]/95 border border-[#1e2243] rounded-lg p-4 font-mono select-none flex flex-col h-full text-slate-200 shadow-2xl shadow-black">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-[#1e2243] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
            Polymathic Idea Synthesis Lab
          </span>
        </div>
        <span className="text-[9px] bg-slate-900 border border-[#1e2243] px-2 py-0.5 rounded text-[#00f0ff] uppercase">
          COGNITIVE OVERLAP COMPILER
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-hidden">
        
        {/* Left Side: Selecting Notes */}
        <div className="flex flex-col h-full bg-black/40 rounded border border-[#1b1f3c] p-3 overflow-hidden">
          <div className="text-[11px] text-slate-300 mb-2 border-b border-[#1e2243] pb-1 flex justify-between items-center">
            <span>Select 2-4 Mastermind Notes to Fuse:</span>
            <span className="text-purple-400 font-bold">({selectedNotes.length}/4)</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {availableNotes.slice(0, 15).map(note => {
              const isSelected = selectedNotes.some(n => n.id === note.id);
              return (
                <div
                  key={note.id}
                  onClick={() => toggleSelectNote(note)}
                  className={`p-2 rounded border transition-all cursor-pointer text-left relative overflow-hidden ${
                    isSelected 
                      ? 'bg-[#151c3d] border-[#00f0ff] ring-1 ring-cyan-400/20' 
                      : 'bg-[#090b16] border-[#1e2243] hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-100 truncate w-3/4">{note.title}</span>
                    <span
                      style={{ backgroundColor: note.hexColor }}
                      className="h-2 w-2 rounded-full"
                    />
                  </div>
                  <p className="text-[9px] text-slate-400 line-clamp-2 leading-relaxed">{note.content}</p>
                  
                  {/* Select indicator */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 bg-[#00f0ff]/20 px-1 text-[8px] text-[#00f0ff] font-bold uppercase rounded-bl">
                      Active
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleSynthesize}
            disabled={isSynthesizing || selectedNotes.length < 2}
            className={`w-full py-2.5 mt-3 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isSynthesizing 
                ? 'bg-purple-950 text-purple-300 border border-purple-500/30' 
                : selectedNotes.length < 2
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-lg shadow-cyan-900/30 border border-[#00f0ff]/30'
            }`}
          >
            {isSynthesizing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-purple-400" />
                Fusing Acoustic Matrix...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-[#00f0ff]" />
                Compile Synthesis Breakthrough
              </>
            )}
          </button>
        </div>

        {/* Right Side: Synthesis output display */}
        <div className="flex flex-col h-full bg-[#0e1022] border border-[#1e2243] rounded p-3 overflow-y-auto">
          {isSynthesizing ? (
            <div className="flex-1 flex flex-col justify-center items-center space-y-4 py-8">
              <div className="relative">
                <Cpu className="h-12 w-12 text-[#00f0ff] animate-spin" />
                <span className="absolute inset-0 m-auto h-3 w-3 bg-purple-500 rounded-full animate-ping" />
              </div>
              
              <div className="w-full max-w-[280px] bg-slate-900 h-1.5 rounded-full overflow-hidden border border-[#1e2243]">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full transition-all duration-300"
                  style={{ width: `${((synthStep + 1) / synthLogs.length) * 100}%` }}
                />
              </div>

              <div className="text-center">
                <p className="text-[11px] text-[#00f0ff] font-bold uppercase animate-pulse">Running OS Compilers</p>
                <p className="text-[10px] text-slate-400 italic max-w-[240px] mt-1 h-8 leading-snug">
                  {synthLogs[synthStep]}
                </p>
              </div>
            </div>
          ) : synthesizedResult ? (
            <div className="space-y-4 text-xs flex-1 flex flex-col">
              {/* Output Header */}
              <div className="border-b border-[#1e2243] pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Acoustic Strategy Ready</span>
                  <div className="flex gap-1">
                    <span 
                      style={{ backgroundColor: synthesizedResult.hexPrimary }} 
                      className="h-3 w-3 rounded-full border border-white/20"
                      title={synthesizedResult.hexPrimary}
                    />
                    <span 
                      style={{ backgroundColor: synthesizedResult.hexSecondary }} 
                      className="h-3 w-3 rounded-full border border-white/20"
                      title={synthesizedResult.hexSecondary}
                    />
                  </div>
                </div>
                <h4 className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wide mt-1">
                  {synthesizedResult.campaignName}
                </h4>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-black/50 p-2 rounded border border-[#1e2243]">
                  <span className="text-[8px] text-slate-500 block uppercase">Carrier Spectrum</span>
                  <span className="text-sm font-bold text-[#00f0ff]">{synthesizedResult.freqHz} Hz</span>
                </div>
                <div className="bg-black/50 p-2 rounded border border-[#1e2243]">
                  <span className="text-[8px] text-slate-500 block uppercase">Cognitive Match</span>
                  <span className="text-sm font-bold text-emerald-400">{synthesizedResult.cognitiveScore}%</span>
                </div>
                <div className="bg-black/50 p-2 rounded border border-[#1e2243]">
                  <span className="text-[8px] text-slate-500 block uppercase">Proj. Reach</span>
                  <span className="text-sm font-bold text-amber-500">{synthesizedResult.reachMillions}M</span>
                </div>
              </div>

              {/* Blueprint Description */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Strategic Core Blueprint:</span>
                <p className="bg-black/30 p-2.5 rounded border border-[#181a34] text-[10px] text-slate-300 leading-relaxed font-mono">
                  {synthesizedResult.strategicBlueprint}
                </p>
              </div>

              {/* 15s Ad Copy Script */}
              <div className="space-y-1 flex-1 flex flex-col">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">15-Second Radio commercial script:</span>
                  <button
                    onClick={playDemoScriptSound}
                    className="text-cyan-400 hover:text-cyan-300 text-[10px] flex items-center gap-0.5 cursor-pointer"
                  >
                    <Play className="h-3 w-3 fill-cyan-400/20" /> Audify script
                  </button>
                </div>
                <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-2.5 rounded border border-purple-500/20 text-[10px] text-emerald-300 italic relative font-sans flex-1">
                  {synthesizedResult.script15s}
                  <div className="absolute bottom-1 right-2 text-[8px] text-slate-600 font-mono font-normal">
                    (ESTIMATED AIRTIME: 15.0 SECONDS)
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1e2243] flex gap-2">
                <button
                  onClick={() => {
                    audio.playChime();
                    alert("Acoustic Strategy added directly to reaching broadcast networks database!");
                  }}
                  className="flex-1 bg-emerald-950/60 hover:bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 py-1 rounded text-[10px] uppercase font-bold tracking-wide cursor-pointer flex items-center justify-center gap-1 transition-all"
                >
                  <Check className="h-3.5 w-3.5" /> Deploy Strategy
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-center space-y-2 py-12">
              <Zap className="h-10 w-12 text-[#1e2243] animate-pulse" />
              <p className="text-[11px] leading-relaxed max-w-[200px]">
                Acoustic fusion synthesizer is in standby.<br /><br />
                <span className="text-[#00f0ff] font-semibold">Select 2 or more notes</span> on the left panel, and click compile to synthesize your strategy.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
export default IdeaSynthesizer;
