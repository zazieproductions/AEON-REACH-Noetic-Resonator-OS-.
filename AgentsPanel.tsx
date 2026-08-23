import React, { useState, useEffect, useRef } from 'react';
import { Bot, Terminal, Send, ShieldAlert, Cpu, Award } from 'lucide-react';
import { audio } from '../utils/AudioEngine';

interface Agent {
  id: string;
  name: string;
  role: string;
  color: string;
  avatarIcon: React.ReactNode;
  active: boolean;
  statusText: string;
  jargonWordbank: string[];
}

interface ChatMessage {
  sender: string;
  role: string;
  text: string;
  timestamp: string;
  agentColor: string;
  isBot: boolean;
}

export const AgentsPanel: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'agent-1',
      name: 'Acoustic Agent Alpha',
      role: 'Frequency & Sub-Bass Resonance Master',
      color: '#00f0ff',
      avatarIcon: <Cpu className="h-4 w-4" />,
      active: true,
      statusText: 'CALIBRATING CARRIER WAVE RESIDUALS...',
      jargonWordbank: ['432Hz somatic alignment', 'decibel compression limiters', 'comb filtering prevention', 'sub-bass floor resonance', 'octave-band harmonics']
    },
    {
      id: 'agent-2',
      name: 'Arbitrage Bot Gamma',
      role: 'Media Buying & Spot Arbitrage Analyzer',
      color: '#10b981',
      avatarIcon: <Terminal className="h-4 w-4" />,
      active: true,
      statusText: 'COMPUTING AFFILIATE SPOT RATES...',
      jargonWordbank: ['21/52 schedule arbitrage', 'Reach Media CPM spreads', 'off-peak inventory buying', 'local FM premium margins', 'cost-per-impression models']
    },
    {
      id: 'agent-3',
      name: 'Sonic Copywriter AI',
      role: 'Acoustic Psychology Scriptwriter',
      color: '#ec4899',
      avatarIcon: <Award className="h-4 w-4" />,
      active: true,
      statusText: 'GENERATING 15s SCRIPT VARIANTS...',
      jargonWordbank: ['high-impact hook overlays', 'baritone pitch persuasion', 'somatic brand verbalizing', 'attention retention markers', 'auditory memory triggers']
    },
    {
      id: 'agent-4',
      name: 'Neuro-Analyst Lambda',
      role: 'Listener Cognitive Focus Evaluator',
      color: '#a855f7',
      avatarIcon: <ShieldAlert className="h-4 w-4" />,
      active: true,
      statusText: 'SCANNING COMMUTER RETENTION INDEX...',
      jargonWordbank: ['alpha-wave focus entrainment', 'auditory cognitive loads', 'morning drive adrenaline curves', 'psychological habit loops', 'commuter attention window']
    }
  ]);

  const [selectedAgentId, setSelectedAgentId] = useState<string>('agent-1');
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatMessage] = useState<ChatMessage[]>([
    {
      sender: 'Aeon-Reach Base System',
      role: 'SYSTEM CORE',
      text: 'Aeon-Reach Apocryphal Oracle Guild initialized. Sound-branding Gnostic network is online. Ready for polymath instructions.',
      timestamp: '09:00:00',
      agentColor: '#64748b',
      isBot: true
    },
    {
      sender: 'Acoustic Agent Alpha',
      role: 'Frequency Specialist',
      text: 'Greetings Mastermind. I am calibrated to evaluate Aeon-Reach Solfeggio resonance matrices. Ask me how we utilize 432Hz to bypass the natural defenses of drive-time commuters.',
      timestamp: '09:02:15',
      agentColor: '#00f0ff',
      isBot: true
    }
  ]);

  const [autonomousLogs, setAutonomousLogs] = useState<string[]>([
    '[SYSTEM] Boot sequence loaded. 4 agents online.',
    '[Agent Alpha] Analyzing decibel envelope: Multi-band limiter set at -3.2dB for drive-time affiliates.',
    '[Bot Gamma] Affiliate Arbitrage scan: Spot price dip in Detroit radio market (-14.3%). Recommending high impact scheduling.',
    '[Lambda] Attention indexing: Commuter attention window peaking between 07:45 and 08:15 EST. Recommend short-burst 6s tags.'
  ]);

  const logsEndRef = useRef<HTMLDivElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [autonomousLogs]);

  // Auto scroll chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  // Autonomous Background Operation
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random active agent
      const activeAgents = agents.filter(a => a.active);
      if (activeAgents.length === 0) return;
      const agent = activeAgents[Math.floor(Math.random() * activeAgents.length)];
      
      // Select random jargon and targets
      const jargon1 = agent.jargonWordbank[Math.floor(Math.random() * agent.jargonWordbank.length)];
      const jargon2 = agent.jargonWordbank[Math.floor(Math.random() * agent.jargonWordbank.length)];
      
      const cities = ['New York Syndicate', 'Beirut Soundstage', 'Chicago Urban Network', 'Reach Gospel affiliates', 'Pandora National Stream'];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];

      const randomMath = (Math.random() * 40 + 5).toFixed(2);
      
      const logTemplates = [
        `[${agent.name}] Operational update: Deploying ${jargon1} over ${randomCity} networks.`,
        `[${agent.name}] Telemetry calibration: Adjusted parameters for ${jargon1} to balance out ${jargon2}. Efficiency shift: +${randomMath}%.`,
        `[${agent.name}] Diagnostic: Detected potential acoustic conflict on ${randomCity} airplay. Adjusting local carrier frequencies.`,
        `[${agent.name}] AI recommendation: Scale up ${jargon1} immediately to exploit off-peak buying opportunities on streaming nodes.`
      ];

      const chosenLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      
      setAutonomousLogs(prev => [...prev.slice(-30), chosenLog]); // Keep max 30 logs
      
      // Chance of playing low diagnostic click sound
      if (Math.random() > 0.4) {
        audio.playClick(300 + Math.random() * 600, 0.04, 'sine');
      }

    }, 8000); // Trigger random agent operation every 8 seconds

    return () => clearInterval(interval);
  }, [agents]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = userInput;
    setUserInput('');

    const activeAgent = agents.find(a => a.id === selectedAgentId);
    if (!activeAgent) return;

    audio.playClick(750, 0.06);

    const nowStr = new Date().toLocaleTimeString();
    
    // Add user message to chat history
    setChatMessage(prev => [...prev, {
      sender: 'Creative Mastermind (You)',
      role: 'POLYMATH CHIEF',
      text: userMsg,
      timestamp: nowStr,
      agentColor: '#10b981',
      isBot: false
    }]);

    // Simulate agent processing and replying
    setTimeout(() => {
      audio.playClick(600, 0.05, 'triangle');
      const jargon1 = activeAgent.jargonWordbank[0];
      const jargon2 = activeAgent.jargonWordbank[1];
      const jargon3 = activeAgent.jargonWordbank[2];

      let replyText = '';
      const promptLower = userMsg.toLowerCase();

      // Simple keywords responses to make agent sound intelligent
      if (promptLower.includes('script') || promptLower.includes('write') || promptLower.includes('ad')) {
        replyText = `Understood. Transmuting specialized Aeon-Reach alchemical script drafts. Our cosmic parameters require ${jargon1} paired with ${jargon2}. Here is our Gnostic draft:\n\n"[SFX: Astral Chime Sweep] (Ritualistic Baritone Voice) In a universe of chaotic noise, consistency is your divine authority. Aeon-Reach anchors your sigil directly in the memory grid."\n\nHow should we calibrate the underlying Solfeggio frequency for this broadcast?`;
      } else if (promptLower.includes('frequency') || promptLower.includes('hz') || promptLower.includes('sound')) {
        replyText = `Analyzing acoustics. Your query regarding spectrum settings correlates with our core Gnostic strategies. By aligning with ${jargon1}, we can dissolve auditory resistance. I suggest deploying a 21/52 sacred cycle paired with a consistent carrier frequency to optimize astral recall.`;
      } else if (promptLower.includes('reach') || promptLower.includes('market') || promptLower.includes('money') || promptLower.includes('cost')) {
        replyText = `Analyzing aetheric arbitrage spreads. Ad rates across the secular radio syndicates are fluctuating. Blending ${jargon2} with a nocturnal buying strategy grants us a direct 4.2x arbitrage return multiplier, harvesting off-peak dream cycles for optimal margins.`;
      } else {
        replyText = `Acolyte logs updated. Commencing alchemical alignment for: "${userMsg}". Incorporating this direction into our active OS planning loop. By integrating ${jargon1}, ${jargon2}, and deploying real-time ${jargon3}, we will maximize Aeon-Reach's broadcast resonance by ${(Math.random() * 15 + 8).toFixed(1)}%. Initiating coordinate simulations now.`;
      }

      setChatMessage(prev => [...prev, {
        sender: activeAgent.name,
        role: activeAgent.role,
        text: replyText,
        timestamp: new Date().toLocaleTimeString(),
        agentColor: activeAgent.color,
        isBot: true
      }]);

      // Play finished chime sound
      audio.playChime([432, 648]);

    }, 1500);
  };

  const toggleAgentStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    audio.playClick(800, 0.05);
    setAgents(prev => prev.map(a => {
      if (a.id === id) {
        const nextState = !a.active;
        const logMsg = `[SYSTEM] Agent "${a.name}" has been ${nextState ? 'RE-ACTIVATED' : 'SUSPENDED/MUTED'}.`;
        setAutonomousLogs(l => [...l, logMsg]);
        return { ...a, active: nextState, statusText: nextState ? 'STANDBY CALIBRATION...' : 'OFFLINE' };
      }
      return a;
    }));
  };

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  return (
    <div className="bg-[#0b0c1b]/95 border border-[#1e2243] rounded-lg p-4 font-mono select-none flex flex-col h-full text-slate-200 shadow-2xl shadow-black">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1e2243] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-cyan-400 animate-bounce" />
          <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
            Autonomous A.I. Sound-Branding Agents
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="flex items-center gap-1"><Cpu className="h-3 w-3 text-emerald-400" /> Cores: 16x</span>
          <span className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 px-1 rounded">AGENT DECK ON</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 flex-1 overflow-hidden">
        
        {/* Left 1/4: Agents Status Deck */}
        <div className="space-y-2 overflow-y-auto">
          <div className="text-[10px] text-slate-400 uppercase font-bold border-b border-[#1e2243] pb-1">
            Agents Status Deck
          </div>
          {agents.map(agent => {
            const isSelected = selectedAgentId === agent.id;
            return (
              <div
                key={agent.id}
                onClick={() => { setSelectedAgentId(agent.id); audio.playClick(600, 0.04); }}
                className={`p-2.5 rounded border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected 
                    ? 'bg-[#151c3d] border-[#00f0ff]' 
                    : 'bg-[#090b16] border-[#1e2243] hover:border-slate-500'
                } ${!agent.active ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: agent.color }}>{agent.avatarIcon}</span>
                    <span className="text-[10px] font-bold text-slate-100">{agent.name.split(' ')[0]}</span>
                  </div>
                  <button
                    onClick={(e) => toggleAgentStatus(agent.id, e)}
                    style={{
                      borderColor: agent.active ? agent.color : '#475569',
                      color: agent.active ? agent.color : '#475569'
                    }}
                    className="text-[8px] px-1 rounded border hover:bg-white/5 cursor-pointer uppercase font-extrabold"
                  >
                    {agent.active ? 'Mute' : 'Boot'}
                  </button>
                </div>
                
                <p className="text-[8px] text-slate-400 mt-1 truncate">{agent.role}</p>
                
                <div className="flex items-center gap-1.5 mt-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${agent.active ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`} />
                  <span className="text-[7px] text-slate-400 truncate tracking-tight">{agent.statusText}</span>
                </div>
              </div>
            );
          })}

          {/* Autonomous Telemetry Terminal Output */}
          <div className="bg-black/90 p-2 border border-[#1e2243] rounded flex flex-col h-40">
            <span className="text-[8px] text-emerald-400 font-bold block uppercase border-b border-[#131b2f] pb-1 mb-1 flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping" /> Autonomous Agent Log Feed
            </span>
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 font-mono text-[8px] leading-relaxed text-slate-300">
              {autonomousLogs.map((log, index) => {
                let colorClass = 'text-slate-400';
                if (log.includes('[Agent Alpha]')) colorClass = 'text-[#00f0ff]';
                if (log.includes('[Bot Gamma]')) colorClass = 'text-emerald-400';
                if (log.includes('[Lambda]')) colorClass = 'text-purple-400';
                if (log.includes('[SYSTEM]')) colorClass = 'text-amber-400 font-bold';

                return (
                  <div key={index} className={colorClass}>
                    {log}
                  </div>
                );
              })}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>

        {/* Right 3/4: Chat & Command Center */}
        <div className="xl:col-span-3 flex flex-col bg-black/50 border border-[#1e2243] rounded p-3 h-full overflow-hidden">
          {selectedAgent ? (
            <>
              {/* Target Agent Profile Banner */}
              <div className="flex items-center justify-between border-b border-[#1e2243] pb-2 mb-3 bg-[#0a0c1b] p-2 rounded">
                <div className="flex items-center gap-2">
                  <div style={{ color: selectedAgent.color }}>{selectedAgent.avatarIcon}</div>
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-100 uppercase tracking-wide">
                      {selectedAgent.name}
                    </h5>
                    <span className="text-[8px] text-slate-400 block">{selectedAgent.role}</span>
                  </div>
                </div>
                <div className="text-[9px] text-slate-400 bg-slate-900 border border-[#1e2243] px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="h-1 w-1 bg-emerald-400 rounded-full" /> Agent Calibrated
                </div>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3">
                {chatHistory.map((msg, index) => {
                  const isSystem = msg.role === 'SYSTEM CORE';
                  return (
                    <div 
                      key={index} 
                      className={`flex flex-col max-w-[90%] ${
                        isSystem 
                          ? 'mx-auto w-full bg-slate-950/80 p-2 border border-slate-800 rounded' 
                          : msg.isBot 
                          ? 'mr-auto items-start' 
                          : 'ml-auto items-end text-right'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-400 mb-0.5 font-bold">
                        <span style={{ color: msg.agentColor }}>{msg.sender}</span>
                        <span>•</span>
                        <span className="text-slate-500 font-normal">{msg.timestamp}</span>
                      </div>
                      <div 
                        className={`p-2 rounded text-[10px] leading-relaxed whitespace-pre-wrap ${
                          isSystem 
                            ? 'text-slate-400 font-normal text-center font-sans italic'
                            : msg.isBot 
                            ? 'bg-[#121631] text-slate-200 border border-[#1e2243]' 
                            : 'bg-[#1b3d5b] text-white border border-[#00f0ff]/30'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={`Command ${selectedAgent.name.split(' ')[0]}... (e.g., "write an ad script" or "market cost")`}
                  className="flex-1 bg-black border border-[#1e2243] rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#00f0ff] placeholder-slate-600 font-mono"
                />
                <button
                  type="submit"
                  className="bg-[#1a5b84] hover:bg-[#20699b] text-white border border-[#00f0ff]/40 px-3 rounded flex items-center justify-center transition-all cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-center">
              <Bot className="h-10 w-10 text-slate-600 animate-bounce" />
              <p className="text-[11px] font-mono leading-relaxed mt-2">
                No target AI agent loaded.<br />
                Select an agent from the deck on the left.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
export default AgentsPanel;
