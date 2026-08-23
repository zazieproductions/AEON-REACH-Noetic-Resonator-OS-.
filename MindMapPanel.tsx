import React, { useState, useRef, useEffect } from 'react';
import { GitCommit, GitPullRequest, HelpCircle, RefreshCw, Trash2, Zap } from 'lucide-react';
import { audio } from '../utils/AudioEngine';

export interface MindNode {
  id: string;
  label: string;
  category: 'Anchor' | 'Frequency' | 'Audience' | 'Channel' | 'Strategy';
  x: number;
  y: number;
  frequencyHz?: number;
  connections: string[]; // Connected node IDs
  details: string;
}

const PRESET_NODES: MindNode[] = [
  {
    id: 'node-a',
    label: 'Sonic Identity Anchor',
    category: 'Anchor',
    x: 220,
    y: 110,
    frequencyHz: 432,
    connections: ['node-b', 'node-c'],
    details: 'The core audio signature of the brand. Underpins all radio commercials and streaming intros.'
  },
  {
    id: 'node-b',
    label: '432Hz Sub-Carrier',
    category: 'Frequency',
    x: 100,
    y: 220,
    frequencyHz: 432,
    connections: ['node-a', 'node-d'],
    details: 'Background frequencies matched to the natural human auditory resonance scale.'
  },
  {
    id: 'node-c',
    label: 'Commuter Rush Hour',
    category: 'Audience',
    x: 350,
    y: 200,
    connections: ['node-a', 'node-e'],
    details: 'High-density, short-attention window listeners. Needs extreme dynamic range compression.'
  },
  {
    id: 'node-d',
    label: 'Reach Media Syndicate',
    category: 'Channel',
    x: 80,
    y: 350,
    connections: ['node-b'],
    details: 'Broadcast channel spanning 311+ affiliates and millions of weekly active radio listeners.'
  },
  {
    id: 'node-e',
    label: 'The 6s HIP Blockade',
    category: 'Strategy',
    x: 380,
    y: 350,
    connections: ['node-c'],
    details: 'Deploying rapid-fire 6-second advertisements at the exact onset of commercial breaks.'
  }
];

export const MindMapPanel: React.FC = () => {
  const [nodes, setNodes] = useState<MindNode[]>(PRESET_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node-a');
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [connectionSourceId, setConnectionSourceId] = useState<string | null>(null);
  
  // New Node details input state
  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeCategory, setNodeCategory] = useState<'Anchor' | 'Frequency' | 'Audience' | 'Channel' | 'Strategy'>('Strategy');
  const [nodeHz, setNodeHz] = useState(432);
  const [nodeDetails, setNodeDetails] = useState('');

  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  // Sync selected node fields to forms
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  useEffect(() => {
    if (selectedNode) {
      setNodeLabel(selectedNode.label);
      setNodeCategory(selectedNode.category);
      setNodeHz(selectedNode.frequencyHz || 432);
      setNodeDetails(selectedNode.details);
    }
  }, [selectedNodeId]);

  const handleUpdateNode = () => {
    if (!selectedNodeId) return;
    setNodes(prev => prev.map(n => {
      if (n.id === selectedNodeId) {
        return {
          ...n,
          label: nodeLabel || n.label,
          category: nodeCategory,
          frequencyHz: nodeHz,
          details: nodeDetails
        };
      }
      return n;
    }));
    audio.playChime([nodeHz * 0.5, nodeHz, nodeHz * 1.5]);
  };

  const handleCreateNode = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only spawn node on direct container click (not dragging nodes)
    if (e.target !== canvasContainerRef.current) return;
    
    const rect = canvasContainerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newId = `node-${Date.now()}`;
    const newNode: MindNode = {
      id: newId,
      label: 'New Acoustic Idea',
      category: 'Strategy',
      x: Math.round(clickX),
      y: Math.round(clickY),
      frequencyHz: 432,
      connections: selectedNodeId ? [selectedNodeId] : [],
      details: 'A fresh neuro-acoustic element mapped in real-time. Connect it to anchor concepts.'
    };

    setNodes(prev => [...prev, newNode]);
    setSelectedNodeId(newId);
    audio.playClick(600, 0.05);
  };

  const handleDeleteNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id).map(n => ({
      ...n,
      connections: n.connections.filter(c => c !== id)
    })));
    if (selectedNodeId === id) setSelectedNodeId(null);
    audio.playClick(300, 0.1, 'sawtooth');
  };

  // Node Dragging mechanics
  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(id);
    setActiveDragId(id);
    audio.playClick(700, 0.03);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!activeDragId || !canvasContainerRef.current) return;
    const rect = canvasContainerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // Boundaries check
    const boundaryX = Math.max(15, Math.min(rect.width - 15, currentX));
    const boundaryY = Math.max(15, Math.min(rect.height - 15, currentY));

    setNodes(prev => prev.map(n => {
      if (n.id === activeDragId) {
        return { ...n, x: Math.round(boundaryX), y: Math.round(boundaryY) };
      }
      return n;
    }));
  };

  const handleMouseUp = () => {
    setActiveDragId(null);
  };

  // Node Wiring/Connecting
  const handleStartConnection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConnectionSourceId(id);
    audio.playClick(900, 0.06);
  };

  const handleEndConnection = (targetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!connectionSourceId || connectionSourceId === targetId) {
      setConnectionSourceId(null);
      return;
    }

    setNodes(prev => prev.map(n => {
      if (n.id === connectionSourceId && !n.connections.includes(targetId)) {
        return { ...n, connections: [...n.connections, targetId] };
      }
      return n;
    }));

    audio.playChime([330, 440, 660]);
    setConnectionSourceId(null);
  };

  const handleRandomizeLayout = () => {
    setNodes(prev => prev.map(n => ({
      ...n,
      x: Math.floor(Math.random() * 300) + 50,
      y: Math.floor(Math.random() * 250) + 50
    })));
    audio.triggerSwoosh();
  };

  const getNodeColor = (cat: string) => {
    switch (cat) {
      case 'Anchor': return 'bg-cyan-500 shadow-cyan-500/50 text-black border-cyan-300';
      case 'Frequency': return 'bg-emerald-500 shadow-emerald-500/50 text-black border-emerald-300';
      case 'Audience': return 'bg-purple-500 shadow-purple-500/50 text-white border-purple-300';
      case 'Channel': return 'bg-amber-500 shadow-amber-500/50 text-black border-amber-300';
      case 'Strategy': return 'bg-rose-500 shadow-rose-500/50 text-white border-rose-300';
      default: return 'bg-slate-500 border-slate-300';
    }
  };

  return (
    <div className="bg-[#0b0c1b]/95 border border-[#1e2243] rounded-lg p-4 font-mono select-none flex flex-col h-full text-slate-200 shadow-2xl shadow-black">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-[#1e2243] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <GitPullRequest className="h-4 w-4 text-purple-400 animate-spin" />
          <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
            Acoustic Mind Synthesis Map
          </span>
        </div>
        <button
          onClick={handleRandomizeLayout}
          className="text-[10px] bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 px-2 py-0.5 rounded border border-[#1e2243] flex items-center gap-1 cursor-pointer transition-all"
        >
          <RefreshCw className="h-3 w-3" /> Auto-Align
        </button>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 overflow-hidden">
        
        {/* Left 2/3: Mind Map Canvas */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="text-[10px] text-slate-400 mb-1 flex justify-between">
            <span>🖱️ Click background to SPAWN node | Drag headers to REPOSITION</span>
            <span className="text-cyan-400 font-semibold flex items-center gap-1">
              <Zap className="h-3 w-3" /> Aeon-Reach Gnostic Engine
            </span>
          </div>

          <div
            ref={canvasContainerRef}
            onClick={handleCreateNode}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative flex-1 bg-black/60 rounded border border-[#1e2243] overflow-hidden cursor-crosshair min-h-[300px]"
          >
            {/* SVG Connecting lines */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255, 255, 255, 0.25)" />
                </marker>
              </defs>
              {nodes.map(node =>
                node.connections.map(targetId => {
                  const target = nodes.find(n => n.id === targetId);
                  if (!target) return null;
                  const isSelectedPath = selectedNodeId === node.id || selectedNodeId === target.id;
                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={isSelectedPath ? '#00f0ff' : 'rgba(255, 255, 255, 0.15)'}
                      strokeWidth={isSelectedPath ? 2.5 : 1}
                      strokeDasharray={isSelectedPath ? '5,5' : undefined}
                      className={isSelectedPath ? 'animate-[dash_10s_linear_infinite]' : ''}
                      markerEnd="url(#arrow)"
                    />
                  );
                })
              )}
            </svg>

            {/* Render Nodes */}
            {nodes.map(node => {
              const isSelected = selectedNodeId === node.id;
              const isWiringSource = connectionSourceId === node.id;
              
              return (
                <div
                  key={node.id}
                  style={{ left: node.x, top: node.y }}
                  onMouseDown={(e) => handleMouseDown(node.id, e)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded px-2.5 py-1.5 border w-44 font-mono select-none transition-shadow ${
                    isSelected 
                      ? 'border-[#00f0ff] ring-2 ring-cyan-400/40 shadow-xl' 
                      : 'border-[#1e2243] hover:border-slate-500'
                  } ${
                    isWiringSource ? 'animate-pulse border-amber-400 ring-2 ring-amber-400/30' : ''
                  } bg-[#0e1022]/95 text-slate-100 cursor-grab active:cursor-grabbing shadow-lg`}
                >
                  {/* Category Pill Tag */}
                  <div className="flex items-center justify-between text-[8px] mb-1">
                    <span className={`px-1 rounded uppercase font-bold tracking-wider ${getNodeColor(node.category)}`}>
                      {node.category}
                    </span>
                    {node.frequencyHz && (
                      <span className="text-[#00f0ff]">{node.frequencyHz}Hz</span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="text-[11px] font-bold truncate tracking-wide">
                    {node.label}
                  </div>

                  {/* Wire buttons */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#1b1f3c] text-[9px]">
                    {connectionSourceId ? (
                      <button
                        onClick={(e) => handleEndConnection(node.id, e)}
                        className="text-emerald-400 hover:text-emerald-300 font-bold bg-emerald-950/40 px-1 py-0.5 rounded cursor-pointer"
                      >
                        🔗 Link Here
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleStartConnection(node.id, e)}
                        className="text-amber-400 hover:text-amber-300 bg-amber-950/40 px-1 py-0.5 rounded cursor-pointer"
                      >
                        ⚡ Wire Node
                      </button>
                    )}

                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteNode(node.id); }}
                      className="text-rose-400 hover:text-rose-300 p-0.5 rounded cursor-pointer"
                      title="Destroy node"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1/3: Node parameters / Inspector */}
        <div className="flex flex-col bg-[#0e1022] border border-[#1e2243] rounded p-3 h-full overflow-y-auto">
          <div className="flex items-center gap-1 border-b border-[#1e2243] pb-1.5 mb-2.5 text-xs font-bold text-[#00f0ff]">
            <GitCommit className="h-3.5 w-3.5" />
            <span>NEURAL NODE INSPECTOR</span>
          </div>

          {selectedNode ? (
            <div className="space-y-3 flex-1 flex flex-col text-xs">
              {/* Field 1: Label */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">Node Concept Label</label>
                <input
                  type="text"
                  value={nodeLabel}
                  onChange={(e) => setNodeLabel(e.target.value)}
                  className="w-full bg-[#131730] border border-[#1e2243] rounded px-2 py-1 text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Field 2: Category */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">Acoustic Class</label>
                <select
                  value={nodeCategory}
                  onChange={(e) => setNodeCategory(e.target.value as any)}
                  className="w-full bg-[#131730] border border-[#1e2243] rounded px-2 py-1 text-slate-100 text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="Anchor">Anchor (Core Sonic Identity)</option>
                  <option value="Frequency">Frequency (Carrier Oscillations)</option>
                  <option value="Audience">Audience (Demographics & Commutes)</option>
                  <option value="Channel">Channel (Reach Syndicate Networks)</option>
                  <option value="Strategy">Strategy (Marketing Ad Campaigns)</option>
                </select>
              </div>

              {/* Field 3: Target Hertz */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                  <span>Auditory Frequency</span>
                  <span className="text-[#00f0ff]">{nodeHz} Hz</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="880"
                  value={nodeHz}
                  onChange={(e) => setNodeHz(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#131730] rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
                />
              </div>

              {/* Field 4: Details content */}
              <div className="space-y-1 flex-1 flex flex-col min-h-[80px]">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">Genius Core Analysis</label>
                <textarea
                  value={nodeDetails}
                  onChange={(e) => setNodeDetails(e.target.value)}
                  className="w-full flex-1 bg-[#131730] border border-[#1e2243] rounded px-2 py-1 text-slate-100 text-xs focus:outline-none focus:border-cyan-400 resize-none font-mono"
                  placeholder="Insert hyper-intellectual branding philosophy..."
                />
              </div>

              {/* Apply/Save button */}
              <button
                onClick={handleUpdateNode}
                className="w-full bg-[#1a5b84]/90 hover:bg-[#1a5b84] border border-[#00f0ff]/40 text-slate-100 font-bold py-1.5 rounded text-[11px] cursor-pointer flex items-center justify-center gap-1 transition-all"
              >
                <Zap className="h-3 w-3 text-[#00f0ff]" /> Save & Emit Harmonics
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-center space-y-2 py-10">
              <HelpCircle className="h-8 w-8 text-slate-600 animate-bounce" />
              <p className="text-[11px] font-mono leading-relaxed px-4">
                No active node selected.<br />
                Click an existing node to inspect its frequency and data, or click the empty space on the grid to spawn an acoustic node.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MindMapPanel;
