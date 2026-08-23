import React, { useState, useEffect } from 'react';
import { 
  Activity, Cpu, Database, Palette, Bot, GitPullRequest, 
  BookOpen, Waves, Volume2, Monitor, Grid, 
  Terminal, ShieldCheck, RefreshCw, Power, Info
} from 'lucide-react';
import { audio } from './utils/AudioEngine';
import { SEEDED_NOTES, AcousticNote } from './utils/notesData';
import { AcousticVisualizer } from './components/AcousticVisualizer';
import { MindMapPanel } from './components/MindMapPanel';
import { IdeaSynthesizer } from './components/IdeaSynthesizer';
import { AgentsPanel } from './components/AgentsPanel';
import { ColorHexPanel } from './components/ColorHexPanel';
import { NotesPanel } from './components/NotesPanel';
import { HelpManual } from './components/HelpManual';
import { VisionarySimulator } from './components/VisionarySimulator';

// App window configuration
interface OSWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  zIndex: number;
}

export const App: React.FC = () => {
  // Master state
  const [currentHz, setCurrentHz] = useState(432);
  const [allNotes, setAllNotes] = useState<AcousticNote[]>(SEEDED_NOTES);
  const [isBooted, setIsBooted] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [workspaceMode, setWorkspaceMode] = useState<'float' | 'grid'>('float');
  const [systemVolume, setSystemVolume] = useState(30);
  const [systemTime, setSystemTime] = useState('');
  const [cpuLoad, setCpuLoad] = useState(24);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [isFocusSimulatorOpen, setIsFocusSimulatorOpen] = useState(false);

  // Floating windows coordinates and configurations
  const [windows, setWindows] = useState<OSWindow[]>([
    {
      id: 'telemetry',
      title: 'Noetic Telemetry Spectrogram',
      icon: <Activity className="h-4 w-4" />,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 30,
      y: 70,
      w: 460,
      h: 500,
      zIndex: 10
    },
    {
      id: 'mindmap',
      title: 'Aetheric Synaptic Map',
      icon: <GitPullRequest className="h-4 w-4" />,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 520,
      y: 70,
      w: 780,
      h: 500,
      zIndex: 8
    },
    {
      id: 'synthesis',
      title: 'Alchemical Idea Synthesis Crypt',
      icon: <Cpu className="h-4 w-4" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 80,
      y: 120,
      w: 800,
      h: 530,
      zIndex: 5
    },
    {
      id: 'agents',
      title: 'Apocryphal AI Oracle Guild',
      icon: <Bot className="h-4 w-4" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 160,
      y: 160,
      w: 850,
      h: 500,
      zIndex: 5
    },
    {
      id: 'synesthesia',
      title: 'Chromatic Sound Synesthesia Ledger',
      icon: <Palette className="h-4 w-4" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 240,
      y: 200,
      w: 780,
      h: 460,
      zIndex: 5
    },
    {
      id: 'notes',
      title: 'Esoteric Gnosis Note Registry',
      icon: <Database className="h-4 w-4" />,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 310,
      y: 280,
      w: 880,
      h: 520,
      zIndex: 9
    },
    {
      id: 'manual',
      title: 'Hermetic Brand Codex',
      icon: <BookOpen className="h-4 w-4" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 200,
      y: 90,
      w: 640,
      h: 500,
      zIndex: 5
    }
  ]);

  const [topZIndex, setTopZIndex] = useState(15);

  // Time clock update
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // CPU jitter telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuLoad(prev => {
        const change = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.max(12, Math.min(68, prev + change));
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Randomized notification broadcaster for creative LARPing
  useEffect(() => {
    if (!isBooted) return;
    const interval = setInterval(() => {
      const notifications = [
        'Astral Alert: Kether network aligned to the 432Hz Solfeggio carrier.',
        'Arbitrage Bot: Off-peak overnight FM spots dipping into high-yield alchemical ratios.',
        'Pineal Analyst: Commuter adrenaline spike observed. Unleashing the 6s Gnostic Blockade.',
        'Oracle Guild: Channeled three new somatic broadcast scripts.',
        'Aeon Network: Sacred listener impressions topped 38.4 Million this cycle.',
        'Vibrational Shield: Standardizing -3dB dynamic limits for drive-time rituals.'
      ];
      const notifyText = notifications[Math.floor(Math.random() * notifications.length)];
      setActiveNotification(notifyText);
      audio.playClick(900, 0.05, 'triangle');
      
      // Auto-hide notification
      setTimeout(() => {
        setActiveNotification(null);
      }, 5000);
    }, 15000);

    return () => clearInterval(interval);
  }, [isBooted]);

  // Boot bios steps
  const bootLogs = [
    'AEON-REACH ESOTERIC BIOS v9.01 COMPILING...',
    'INTEGRATING SACRED SOUND ENGINE REGISTRY... [ESTABLISHED]',
    'BOOTSTRAPPING APOCRYPHAL WEB AUDIO API RESONATORS... [OK]',
    'SHIELDING FM TRANSCEIVERS FROM 440HZ TEMPERED BIAS... [SECURE]',
    'DIALING REACHGOSPELRADIO.COM BROADCAST CHANNELS... [LINK ACTIVE]',
    'SYNCHRONIZING WITH 94% BLACK AMERICAN DEMOGRAPHIC MAPS... [OK]',
    'FUSING ACOUSTIC MASTERMIND GNOSIS CORPUS... [OK]',
    'ALIGNING SUBLIMINAL KABBALIST ATTENTION SCALES... [100% SECURE]',
    'ORACLE GUILD SYNAPTIC ENTRAINMENT LOOPS DOCKED... [OK]',
    'PREPARED TO EMIT THE PRIME 432Hz SOLFEGGIO FIELDS.',
    'APOCRYPHAL BIOS COMPILING COMPLETED. SYSTEM READY FOR THE CHIEF ARCHITECT.'
  ];

  useEffect(() => {
    if (isBooted) return;
    const timer = setInterval(() => {
      setBootStep(prev => {
        if (prev >= bootLogs.length - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 450);
    return () => clearInterval(timer);
  }, [isBooted]);

  // Handle booting up OS
  const handleLaunchOS = () => {
    audio.playChime([220, 330, 440, 528, 660]);
    audio.triggerSwoosh();
    setIsBooted(true);
    setActiveNotification('AEON-REACH OS loaded. Solfeggio frequency active at 432Hz.');
    setTimeout(() => {
      setActiveNotification(null);
    }, 5000);
  };

  // Window sorting
  const bringToFront = (id: string) => {
    setTopZIndex(prev => {
      const nextZ = prev + 1;
      setWindows(wins => wins.map(w => {
        if (w.id === id) {
          return { ...w, zIndex: nextZ, isMinimized: false };
        }
        return w;
      }));
      return nextZ;
    });
  };

  const toggleWindow = (id: string) => {
    audio.playClick(600, 0.04);
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        const nextOpen = !w.isOpen;
        if (nextOpen) {
          bringToFront(id);
        }
        return { ...w, isOpen: nextOpen, isMinimized: false };
      }
      return w;
    }));
  };

  const minimizeWindow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    audio.playClick(400, 0.05);
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, isMinimized: true };
      }
      return w;
    }));
  };

  const maximizeWindow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    audio.playClick(750, 0.04);
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, isMaximized: !w.isMaximized };
      }
      return w;
    }));
  };

  // Drag window trigger
  const handleStartDrag = (windowId: string, e: React.MouseEvent) => {
    bringToFront(windowId);
    
    // Only left click drags
    if (e.button !== 0) return;
    
    const windowObj = windows.find(w => w.id === windowId);
    if (!windowObj || windowObj.isMaximized) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = windowObj.x;
    const initialY = windowObj.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      setWindows(prev => prev.map(w => {
        if (w.id === windowId) {
          return {
            ...w,
            x: Math.max(10, initialX + deltaX),
            y: Math.max(45, initialY + deltaY) // margin for status bar
          };
        }
        return w;
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Tune OS Frequency helper
  const handleTuneFrequency = (hz: number) => {
    setCurrentHz(hz);
    audio.playChime([hz * 0.5, hz, hz * 1.5]);
    setActiveNotification(`OS Carrier Wave successfully calibrated to ${hz} Hz.`);
    setTimeout(() => {
      setActiveNotification(null);
    }, 4000);
  };

  // Queue note inside IdeaSynthesizer
  const handleAddNoteToSynth = (note: AcousticNote) => {
    // Open synthesis lab if not open
    setWindows(prev => prev.map(w => {
      if (w.id === 'synthesis') {
        return { ...w, isOpen: true, isMinimized: false };
      }
      return w;
    }));
    bringToFront('synthesis');
    
    setActiveNotification(`Queued note: "${note.title}" directly in Synthesis Lab.`);
    setTimeout(() => {
      setActiveNotification(null);
    }, 4000);
  };

  // Change OS volume
  const handleVolumeChange = (vol: number) => {
    setSystemVolume(vol);
    audio.setMasterVolume(vol / 100);
  };

  // Desktop Icons config
  const desktopLaunchers = [
    { id: 'telemetry', title: 'Resonator.sys', label: 'Telemetry Visualizer', color: 'text-cyan-400', icon: <Activity className="h-6 w-6" /> },
    { id: 'mindmap', title: 'Aetheric.net', label: 'Mind Synthesis Map', color: 'text-purple-400', icon: <GitPullRequest className="h-6 w-6" /> },
    { id: 'synthesis', title: 'Alchemist.lab', label: 'Synthesis Lab', color: 'text-emerald-400', icon: <Cpu className="h-6 w-6" /> },
    { id: 'agents', title: 'Oracle.deck', label: 'Autonomous Agents', color: 'text-pink-400', icon: <Bot className="h-6 w-6" /> },
    { id: 'synesthesia', title: 'Alchemy.rgb', label: 'Synesthesia Palettes', color: 'text-amber-400', icon: <Palette className="h-6 w-6" /> },
    { id: 'notes', title: 'Gnosis.db', label: 'Notes Database', color: 'text-indigo-400', icon: <Database className="h-6 w-6" /> },
    { id: 'manual', title: 'Hermetic.codex', label: 'Brand Operating Manual', color: 'text-slate-300', icon: <BookOpen className="h-6 w-6" /> }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#020205] text-slate-100 font-mono relative flex flex-col">
      {/* Background grid canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#070919] via-[#020205] to-[#010103] pointer-events-none z-0" />
      <div 
        className="absolute inset-0 opacity-10 bg-repeat pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Screen frame / CRT scanline overlay effect for immersive genius roleplay */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,6px_100%] mix-blend-overlay opacity-80" />

      {/* BOOT bios screen loader */}
      {!isBooted && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col justify-between p-8 font-mono select-none">
          <div className="space-y-4 max-w-4xl">
            {/* Logo */}
            <div className="flex items-center gap-2.5 border-b border-[#1e2243] pb-4 mb-4 text-[#00f0ff]">
              <Monitor className="h-7 w-7 text-[#00f0ff] animate-pulse" />
              <div>
                <h1 className="text-xl font-black tracking-widest text-slate-100">
                  AEON-REACH <span className="text-[#00f0ff]">v9.01</span>
                </h1>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-extrabold block mt-0.5">
                  SOLFEGGIO GNOSIS INTEGRATIVE COGNITION DECK
                </span>
              </div>
            </div>

            {/* Terminal logs list */}
            <div className="space-y-1.5 text-xs">
              {bootLogs.slice(0, bootStep + 1).map((log, index) => {
                const isSystem = log.includes('[OK]') || log.includes('[ESTABLISHED]');
                return (
                  <div key={index} className="flex gap-2 leading-relaxed">
                    <span className="text-slate-600">[{100 + index * 10}]</span>
                    <span className={isSystem ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                      {log}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prompt options */}
          <div className="border-t border-[#1e2243] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[10px] text-slate-500 leading-snug font-sans">
              *Warning: This operating console utilizes sub-harmonic carrier beats designed to entrain focusing states. By pressing launch, you consent to hearing synthesized 432Hz binaural focus sweeps.
            </div>
            
            {bootStep >= bootLogs.length - 1 ? (
              <button
                onClick={handleLaunchOS}
                className="bg-gradient-to-r from-[#00f0ff] to-purple-600 hover:from-[#00f0ff] hover:to-purple-500 text-white font-black text-sm uppercase px-8 py-3 rounded border border-white/20 hover:scale-102 hover:shadow-2xl hover:shadow-[#00f0ff]/20 active:scale-98 transition-all cursor-pointer flex items-center gap-2 animate-bounce"
              >
                <Power className="h-4.5 w-4.5 animate-pulse text-white" />
                Initialize OS Desktop
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#00f0ff] font-bold uppercase animate-pulse">
                <RefreshCw className="h-4 w-4 animate-spin text-[#00f0ff]" />
                Assembling Synaptic Deck...
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOP SYSTEM STATUS TELEMETRY BAR */}
      <header className="h-10 bg-[#070919]/95 border-b border-[#1b1f3c] flex items-center justify-between px-4 z-40 select-none backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Logo brand link */}
          <div className="flex items-center gap-2 cursor-help" onClick={() => toggleWindow('manual')}>
            <Monitor className="h-4 w-4 text-[#00f0ff]" />
            <span className="text-xs font-black tracking-widest text-slate-100 flex items-center gap-1.5">
              AEON-REACH <span className="text-[9px] px-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">GNOSIS</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[10px] border-l border-[#1b1f3c] pl-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Cpu className="h-3 w-3 text-cyan-400" /> CORE: <strong className="text-slate-200">{cpuLoad}%</strong>
            </span>
            <span className="flex items-center gap-1">
              <Waves className="h-3 w-3 text-purple-400 animate-pulse" /> SOLFEGGIO: <strong className="text-[#00f0ff]">{currentHz}Hz</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> ASTRAL TIER: <strong className="text-emerald-400 font-extrabold">Grand Noetic Architect</strong>
            </span>
          </div>
        </div>

        {/* Global Notification ticker */}
        {activeNotification && (
          <div className="absolute left-1/2 -translate-x-1/2 bg-[#0c1e30] border border-[#00f0ff]/40 rounded px-4 py-1.5 text-[9px] text-[#00f0ff] flex items-center gap-2 animate-bounce z-50 font-bold shadow-lg shadow-black">
            <Info className="h-3 w-3 text-cyan-400 animate-pulse" />
            <span>{activeNotification}</span>
          </div>
        )}

        {/* Right tools and actions */}
        <div className="flex items-center gap-4 text-[10px]">
          {/* Volume dial */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <Volume2 className="h-3.5 w-3.5" />
            <input
              type="range"
              min="0"
              max="100"
              value={systemVolume}
              onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
              className="w-16 h-0.5 bg-[#1e2243] appearance-none cursor-pointer accent-[#00f0ff]"
            />
          </div>

          {/* Mode Workspace toggle */}
          <div className="flex bg-black p-0.5 rounded border border-[#1b1f3c]">
            <button
              onClick={() => { setWorkspaceMode('float'); audio.playClick(600, 0.04); }}
              className={`p-1 rounded cursor-pointer ${workspaceMode === 'float' ? 'bg-[#1a5b84] text-[#00f0ff]' : 'text-slate-500 hover:text-slate-300'}`}
              title="Floating Sandbox Workspace"
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => { setWorkspaceMode('grid'); audio.playClick(600, 0.04); }}
              className={`p-1 rounded cursor-pointer ${workspaceMode === 'grid' ? 'bg-[#1a5b84] text-[#00f0ff]' : 'text-slate-500 hover:text-slate-300'}`}
              title="Docked Grid Panel Layout"
            >
              <Grid className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Immersive Focus state triggers */}
          <button
            onClick={() => {
              audio.playClick(700, 0.06);
              setIsFocusSimulatorOpen(prev => !prev);
            }}
            className={`px-2.5 py-1 rounded font-bold uppercase tracking-wider text-[9px] border transition-all cursor-pointer ${
              isFocusSimulatorOpen 
                ? 'bg-purple-950/60 border-purple-500 text-purple-300 animate-pulse shadow-md shadow-purple-500/20' 
                : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200'
            }`}
          >
            🧠 {isFocusSimulatorOpen ? 'Exit Entrainment' : 'Focus Simulator'}
          </button>

          {/* Clock */}
          <div className="text-slate-300 bg-black/60 px-2 py-0.5 border border-[#1b1f3c] rounded text-[9px]">
            {systemTime || '09:00:00'}
          </div>
        </div>
      </header>

      {/* CORE WORKSPACE */}
      <main className="flex-1 relative z-10 overflow-hidden">
        {isFocusSimulatorOpen ? (
          /* Full workspace focus entrainment simulation screen overlay */
          <div className="absolute inset-0 bg-[#03030b] z-30 p-4">
            <div className="h-full w-full max-w-7xl mx-auto">
              <VisionarySimulator />
            </div>
          </div>
        ) : workspaceMode === 'float' ? (
          /* FLOATING WORKSPACE SANDBOX DOME */
          <div className="w-full h-full relative p-4">
            
            {/* Desktop Icons Left */}
            <div className="absolute top-6 left-6 flex flex-col gap-5 z-10 select-none">
              {desktopLaunchers.map(icon => {
                const isOpen = windows.find(w => w.id === icon.id)?.isOpen;
                return (
                  <button
                    key={icon.id}
                    onDoubleClick={() => toggleWindow(icon.id)}
                    onClick={() => {
                      audio.playClick(700, 0.04);
                      // On single click, if closed, open it.
                      if (!isOpen) toggleWindow(icon.id);
                      else bringToFront(icon.id);
                    }}
                    className="flex flex-col items-center justify-center w-20 p-1 rounded hover:bg-white/5 active:bg-white/10 transition-colors group cursor-pointer"
                  >
                    <div className={`${icon.color} group-hover:scale-105 transition-transform filter drop-shadow-[0_0_8px_currentColor]`}>
                      {icon.icon}
                    </div>
                    <span className="text-[9px] font-bold text-slate-300 mt-1 truncate w-full text-center tracking-tight text-shadow-sm">
                      {icon.title}
                    </span>
                    <span className="text-[7px] text-slate-500 uppercase tracking-tight scale-90 mt-0.5">
                      {isOpen ? 'Running' : 'Ready'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Draggable Active Windows */}
            {windows.map(win => {
              if (!win.isOpen) return null;
              if (win.isMinimized) return null;

              const style: React.CSSProperties = win.isMaximized 
                ? {
                    top: '40px',
                    left: '0px',
                    width: '100%',
                    height: 'calc(100vh - 80px)',
                    zIndex: win.zIndex
                  }
                : {
                    top: `${win.y}px`,
                    left: `${win.x}px`,
                    width: `${win.w}px`,
                    height: `${win.h}px`,
                    zIndex: win.zIndex
                  };

              return (
                <div
                  key={win.id}
                  style={style}
                  onMouseDown={() => bringToFront(win.id)}
                  className={`absolute rounded-lg border bg-[#05060b]/98 flex flex-col overflow-hidden text-slate-200 transition-shadow ${
                    win.zIndex === topZIndex 
                      ? 'border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.25)] ring-1 ring-cyan-500/20' 
                      : 'border-[#1b1f3c] shadow-2xl shadow-black/85'
                  }`}
                >
                  {/* Draggable Window Header */}
                  <div
                    onMouseDown={(e) => handleStartDrag(win.id, e)}
                    className={`h-8 px-3 border-b flex items-center justify-between cursor-move select-none ${
                      win.zIndex === topZIndex 
                        ? 'bg-gradient-to-r from-[#0d162d] to-[#05060b] border-[#00f0ff]/50' 
                        : 'bg-[#080914] border-[#1b1f3c]'
                    }`}
                  >
                    {/* Header Left Title */}
                    <div className="flex items-center gap-2">
                      <span className={win.zIndex === topZIndex ? 'text-[#00f0ff]' : 'text-slate-500'}>
                        {win.icon}
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest truncate max-w-[200px] md:max-w-none ${
                        win.zIndex === topZIndex ? 'text-slate-100' : 'text-slate-400'
                      }`}>
                        {win.title}
                      </span>
                    </div>

                    {/* Window Controls */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => minimizeWindow(win.id, e)}
                        className="w-3.5 h-3.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full border border-slate-700/50 flex items-center justify-center text-[9px] font-bold cursor-pointer"
                        title="Minimize to Dock"
                      >
                        -
                      </button>
                      <button
                        onClick={(e) => maximizeWindow(win.id, e)}
                        className="w-3.5 h-3.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full border border-slate-700/50 flex items-center justify-center text-[7px] font-bold cursor-pointer"
                        title="Maximize Screen"
                      >
                        {win.isMaximized ? '🗗' : '🗖'}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleWindow(win.id); }}
                        className="w-3.5 h-3.5 bg-rose-950/60 hover:bg-rose-600 text-rose-300 hover:text-white rounded-full border border-rose-500/30 flex items-center justify-center text-[8px] font-bold cursor-pointer"
                        title="Close Window"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  {/* Window Content */}
                  <div className="flex-1 overflow-hidden relative">
                    {win.id === 'telemetry' && (
                      <AcousticVisualizer 
                        currentHz={currentHz} 
                        onHzChange={setCurrentHz}
                      />
                    )}
                    {win.id === 'mindmap' && <MindMapPanel />}
                    {win.id === 'synthesis' && <IdeaSynthesizer availableNotes={allNotes} />}
                    {win.id === 'agents' && <AgentsPanel />}
                    {win.id === 'synesthesia' && <ColorHexPanel />}
                    {win.id === 'notes' && (
                      <NotesPanel
                        onTuneFrequency={handleTuneFrequency}
                        onAddNoteToSynth={handleAddNoteToSynth}
                        allNotes={allNotes}
                        setAllNotes={setAllNotes}
                      />
                    )}
                    {win.id === 'manual' && <HelpManual />}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* FIXED GRID MULTIPANE WORKSPACE MODE */
          <div className="w-full h-full p-4 overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              
              {/* Telemetry Visualizer */}
              <div className="h-[480px] bg-[#05060b] border border-[#1b1f3c] rounded-lg overflow-hidden shadow-xl">
                <div className="bg-[#080914] px-3 py-1.5 border-b border-[#1b1f3c] flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#00f0ff]" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-100">Acoustic Telemetry Processor</span>
                </div>
                <div className="h-[calc(100%-29px)]">
                  <AcousticVisualizer currentHz={currentHz} onHzChange={setCurrentHz} />
                </div>
              </div>

              {/* Mind map panel */}
              <div className="h-[480px] bg-[#05060b] border border-[#1b1f3c] rounded-lg overflow-hidden shadow-xl">
                <div className="bg-[#080914] px-3 py-1.5 border-b border-[#1b1f3c] flex items-center gap-2">
                  <GitPullRequest className="h-4 w-4 text-purple-400" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-100">Acoustic Mind Synthesis Map</span>
                </div>
                <div className="h-[calc(100%-29px)]">
                  <MindMapPanel />
                </div>
              </div>

              {/* Notes panel */}
              <div className="h-[520px] bg-[#05060b] border border-[#1b1f3c] rounded-lg overflow-hidden shadow-xl xl:col-span-2">
                <div className="bg-[#080914] px-3 py-1.5 border-b border-[#1b1f3c] flex items-center gap-2">
                  <Database className="h-4 w-4 text-indigo-400" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-100">Mastermind Notes Registry Database</span>
                </div>
                <div className="h-[calc(100%-29px)]">
                  <NotesPanel
                    onTuneFrequency={handleTuneFrequency}
                    onAddNoteToSynth={handleAddNoteToSynth}
                    allNotes={allNotes}
                    setAllNotes={setAllNotes}
                  />
                </div>
              </div>

              {/* Idea synthesis panel */}
              <div className="h-[520px] bg-[#05060b] border border-[#1b1f3c] rounded-lg overflow-hidden shadow-xl">
                <div className="bg-[#080914] px-3 py-1.5 border-b border-[#1b1f3c] flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-emerald-400" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-100">Polymathic Synthesis Lab</span>
                </div>
                <div className="h-[calc(100%-29px)]">
                  <IdeaSynthesizer availableNotes={allNotes} />
                </div>
              </div>

              {/* AI Agents panel */}
              <div className="h-[520px] bg-[#05060b] border border-[#1b1f3c] rounded-lg overflow-hidden shadow-xl">
                <div className="bg-[#080914] px-3 py-1.5 border-b border-[#1b1f3c] flex items-center gap-2">
                  <Bot className="h-4 w-4 text-pink-400" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-100">Autonomous A.I. Sound-Branding Agents</span>
                </div>
                <div className="h-[calc(100%-29px)]">
                  <AgentsPanel />
                </div>
              </div>

              {/* Color Synesthesia panel */}
              <div className="h-[480px] bg-[#05060b] border border-[#1b1f3c] rounded-lg overflow-hidden shadow-xl">
                <div className="bg-[#080914] px-3 py-1.5 border-b border-[#1b1f3c] flex items-center gap-2">
                  <Palette className="h-4 w-4 text-amber-400" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-100">Sound-Color Synesthesia Spectrum Designer</span>
                </div>
                <div className="h-[calc(100%-29px)]">
                  <ColorHexPanel />
                </div>
              </div>

              {/* Help brand manual panel */}
              <div className="h-[480px] bg-[#05060b] border border-[#1b1f3c] rounded-lg overflow-hidden shadow-xl">
                <div className="bg-[#080914] px-3 py-1.5 border-b border-[#1b1f3c] flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-slate-300" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-100">RadioReach Brand Master Operating Manual</span>
                </div>
                <div className="h-[calc(100%-29px)] text-slate-200">
                  <HelpManual />
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* BOTTOM OS TASKBAR & OPEN TABS DOCK */}
      <footer className="h-10 bg-[#070919]/95 border-t border-[#1b1f3c] flex items-center justify-between px-4 z-40 select-none backdrop-blur-md">
        
        {/* Dock left shortcuts & manual helper link */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => { toggleWindow('manual'); audio.playClick(600, 0.04); }}
            className="flex items-center justify-center gap-1.5 bg-[#121631] border border-[#1b1f3c] hover:bg-slate-800 text-[10px] text-slate-300 px-3 py-1 rounded cursor-pointer uppercase transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
            <span>Start Brand Deck</span>
          </button>
          
          <span className="h-4 border-l border-[#1b1f3c] block hidden md:block" />

          {/* Quick action triggers */}
          <div className="hidden md:flex gap-1.5">
            <button
              onClick={() => handleTuneFrequency(432)}
              className="text-[9px] bg-slate-900 border border-cyan-500/20 px-2 py-0.5 rounded text-[#00f0ff] hover:bg-slate-800 cursor-pointer"
            >
              🌌 432Hz Core
            </button>
            <button
              onClick={() => handleTuneFrequency(528)}
              className="text-[9px] bg-slate-900 border border-pink-500/20 px-2 py-0.5 rounded text-pink-400 hover:bg-slate-800 cursor-pointer"
            >
              💮 528Hz Focus
            </button>
            <button
              onClick={() => handleTuneFrequency(110)}
              className="text-[9px] bg-slate-900 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 hover:bg-slate-800 cursor-pointer"
            >
              🎹 110Hz Bass
            </button>
          </div>
        </div>

        {/* Taskbar open windows tabs */}
        <div className="flex-1 flex justify-center max-w-[50%] md:max-w-[70%] gap-1.5 overflow-x-auto px-4 scrollbar-none scroll-smooth">
          {windows.map(win => {
            const isFront = win.zIndex === topZIndex && win.isOpen && !win.isMinimized;
            
            return (
              <button
                key={win.id}
                onClick={() => {
                  audio.playClick(600, 0.04);
                  if (!win.isOpen) {
                    toggleWindow(win.id);
                  } else if (win.isMinimized) {
                    bringToFront(win.id);
                  } else if (isFront) {
                    // if already active front, minimize
                    setWindows(prev => prev.map(w => w.id === win.id ? { ...w, isMinimized: true } : w));
                  } else {
                    bringToFront(win.id);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-[9px] uppercase font-bold shrink-0 transition-colors border cursor-pointer ${
                  isFront 
                    ? 'bg-[#152a4e] border-[#00f0ff] text-white' 
                    : win.isOpen && !win.isMinimized
                    ? 'bg-[#121631] border-[#1b1f3c] text-slate-300 hover:bg-slate-800'
                    : 'bg-black/40 border-dashed border-[#1b1f3c] text-slate-500 hover:text-slate-400'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${win.isOpen && !win.isMinimized ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`} />
                <span>{win.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* System copyright and credits */}
        <div className="hidden lg:flex items-center gap-1 text-[9px] text-slate-500">
          <Terminal className="h-3.5 w-3.5" />
          <span>AEON-REACH // The Gnostic Resonator System</span>
        </div>

      </footer>
    </div>
  );
};
export default App;
