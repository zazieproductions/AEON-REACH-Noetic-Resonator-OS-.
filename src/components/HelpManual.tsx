import React from 'react';
import { BookOpen, Radio, ShieldAlert, Award, FileText } from 'lucide-react';
import { audio } from '../lib/AudioEngine';

export const HelpManual: React.FC = () => {
  const triggerAudioChime = () => {
    audio.playChime([330, 440, 660, 880]);
  };

  return (
    <div className="bg-[#0b0c1b]/95 border border-[#1e2243] rounded-lg p-4 font-mono select-none flex flex-col h-full text-slate-200 shadow-2xl shadow-black overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1e2243] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
            Aeon-Reach Apocryphal Brand Codex
          </span>
        </div>
        <button
          onClick={triggerAudioChime}
          className="text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded border border-[#1e2243] cursor-pointer flex items-center gap-1"
        >
          <Radio className="h-3 w-3 text-cyan-400 animate-pulse" /> Solfeggio Call Chime
        </button>
      </div>

      <div className="space-y-4 text-xs">
        {/* Intro */}
        <div className="bg-[#121631] border border-[#1e2243] p-3 rounded leading-relaxed text-slate-300 font-sans">
          <h4 className="font-mono text-[11px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <Award className="h-4 w-4 text-amber-500" /> RadioReach Esoteric Geometry
          </h4>
          We operate as a hermetic network of independent sound alchemists specialized in carving, tuning, and anchoring unique auditory signatures for private enterprises and global networks. We bypass typical marketing friction to connect brand essence directly to the primordial listener mind. This dashboard is your **Alchemical Operating Deck** to formulate these sacred broadcasts.
        </div>

        {/* The Rules of Sound Branding */}
        <div className="space-y-2">
          <h5 className="font-bold text-[#00f0ff] uppercase border-b border-[#1e2243] pb-1 flex items-center gap-1 text-[10px]">
            <FileText className="h-3.5 w-3.5" /> Hermetic Laws of Transmitting Acoustic Gnosis
          </h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px]">
            {/* Rule 1 */}
            <div className="bg-[#090b16] border border-[#1e2243] p-2.5 rounded">
              <h6 className="font-bold text-emerald-400 uppercase">1. The 21/52 Astral Alignment</h6>
              <p className="text-slate-400 leading-snug mt-1 font-sans">
                Aetheric dominance demands continuous loops. Transmitting exactly 21 audio sigils per week across 52 weeks (the 21/52 decree) secures 3.4 weekly mental impressions per commuter, welding the brand's vibration into their subconscious recall maps.
              </p>
            </div>

            {/* Rule 2 */}
            <div className="bg-[#090b16] border border-[#1e2243] p-2.5 rounded">
              <h6 className="font-bold text-cyan-400 uppercase">2. Decibel Boundary Modulations</h6>
              <p className="text-slate-400 leading-snug mt-1 font-sans">
                Airwave friction must be softened. By compressing dynamic curves to a -3dB ceiling while emitting a soft 55Hz sub-bass heartbeat, we trigger comfortable kinetic car-door vibration, drawing physical compliance from the recipient.
              </p>
            </div>

            {/* Rule 3 */}
            <div className="bg-[#090b16] border border-[#1e2243] p-2.5 rounded">
              <h6 className="font-bold text-purple-400 uppercase">3. Synesthetic Hex Mapping</h6>
              <p className="text-slate-400 leading-snug mt-1 font-sans">
                Sight and Sound are twin sisters. Layering a 440Hz octaval sweep with specific alchemical colors like Noetic Cyan (#00f0ff) and Alchemical Amethyst (#a855f7) increases digital streaming recall on streaming portals by 32%.
              </p>
            </div>

            {/* Rule 4 */}
            <div className="bg-[#090b16] border border-[#1e2243] p-2.5 rounded">
              <h6 className="font-bold text-rose-400 uppercase">4. The 6-Second Noetic Blockade</h6>
              <p className="text-slate-400 leading-snug mt-1 font-sans">
                Deploy rapid-fire, high-density 6-second audio talismans at the absolute threshold of commercial breaks across four major affiliates. This seals memory windows before listeners can execute preset frequency hops.
              </p>
            </div>
          </div>
        </div>

        {/* Operating instructions */}
        <div className="bg-[#0c1328]/50 border border-purple-500/20 p-3 rounded">
          <h5 className="font-bold text-purple-400 uppercase tracking-widest text-[10px] mb-2 flex items-center gap-1.5">
            <ShieldAlert className="h-4 w-4 animate-pulse text-amber-500" />
            OPERATING STEPS FOR THE CHIEF ARCHITECT
          </h5>
          <ol className="space-y-1.5 pl-4 list-decimal text-[10.5px] leading-relaxed text-slate-300">
            <li>
              <strong>Sensory Initiation:</strong> Open the <span className="text-amber-400 font-bold">Focus & Brainwave Simulator</span> and select <span className="text-cyan-400 font-semibold">Initiate Genius Entrainment</span>. Connect headphones to trigger stereo-dephased binaural Solfeggio carriers (Alpha, Theta, Gamma).
            </li>
            <li>
              <strong>Aetheric Net Mapping:</strong> Launch the <span className="text-amber-400 font-bold">Aetheric Synaptic Map</span>. Double-click to spawn new ideas, link connections, and alter carrier frequencies inside the Gnostic Inspector.
            </li>
            <li>
              <strong>Spectrum Analytics:</strong> Run the <span className="text-amber-400 font-bold">Noetic Telemetry Spectrogram</span> to monitor real-time waves, spectrogram splits, and geographic reach radar locations.
            </li>
            <li>
              <strong>Intellectual Database Harvest:</strong> Open the <span className="text-[#00f0ff] font-bold">Esoteric Gnosis Note Registry</span>. Click <span className="text-rose-400 font-extrabold">Generate 180 Notes</span> to instantly seed nearly 200 searchable, alchemical marketing theories.
            </li>
            <li>
              <strong>Alchemical Fusions:</strong> Select target ideas inside the <span className="text-amber-400 font-bold">Synthesis Crypt</span>. Click compile to transmute them into unified, highly detailed radio scripts and visual palettes.
            </li>
            <li>
              <strong>Oracle Consultations:</strong> Chat directly with any of the 4 autonomous agents. Ask them to write scripts or analyze media budgets to exploit arbitrage spreads.
            </li>
          </ol>
        </div>

        {/* Footer info */}
        <div className="text-center text-[10px] text-slate-500 pt-2 border-t border-[#1e2243]">
          RadioReach Alchemical Operating Deck • Version 9.01 Active
        </div>
      </div>
    </div>
  );
};
export default HelpManual;
