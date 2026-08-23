import React, { useState } from 'react';
import { AcousticNote, generateHundredsOfNotes } from '../data/notesData';
import { audio } from '../lib/AudioEngine';
import { Search, Database, Plus, Trash2, Calendar, Award, Zap, Sliders, Check } from 'lucide-react';

interface NotesPanelProps {
  onTuneFrequency?: (hz: number) => void;
  onAddNoteToSynth?: (note: AcousticNote) => void;
  allNotes: AcousticNote[];
  setAllNotes: React.Dispatch<React.SetStateAction<AcousticNote[]>>;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({
  onTuneFrequency,
  onAddNoteToSynth,
  allNotes,
  setAllNotes
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(allNotes[0]?.id || null);
  const [sortOrder, setSortOrder] = useState<'intensity' | 'date'>('intensity');

  // New custom note states
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Acoustic Psychology' | 'Reach Strategy' | 'Frequency Arbitrage' | 'Neural Branding' | 'Creative Copypasta'>('Neural Branding');
  const [newContent, setNewContent] = useState('');
  const [newHz, setNewHz] = useState(432);
  const [newTags, setNewTags] = useState('');

  const handleGenerateMassiveDB = () => {
    audio.playChime([330, 440, 550, 660]);
    const massive = generateHundredsOfNotes(180);
    setAllNotes(massive);
    setSelectedNoteId(massive[0]?.id || null);
  };

  const handleCreateCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      audio.playClick(150, 0.2, 'sawtooth');
      alert('Please fill out the title and content fields.');
      return;
    }

    const tagsArray = newTags
      ? newTags.split(',').map(t => t.trim())
      : ['Custom', 'User-Created'];

    const newNoteObj: AcousticNote = {
      id: `custom-note-${Date.now()}`,
      title: newTitle,
      content: newContent,
      category: newCategory as any,
      tags: tagsArray,
      hexColor: '#10b981',
      intensity: Math.floor(Math.random() * 20) + 80, // 80-99%
      date: new Date().toISOString().split('T')[0],
      frequencyHz: newHz
    };

    setAllNotes(prev => [newNoteObj, ...prev]);
    setSelectedNoteId(newNoteObj.id);
    setIsCreatingNew(false);
    
    // Clear inputs
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    
    audio.playChime([newHz * 0.5, newHz, newHz * 1.5]);
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    audio.playClick(250, 0.1, 'sawtooth');
    setAllNotes(prev => prev.filter(n => n.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(allNotes.find(n => n.id !== id)?.id || null);
    }
  };

  // Filter & Search logic
  const filteredNotes = allNotes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'All' || 
      note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort logic
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortOrder === 'intensity') {
      return b.intensity - a.intensity;
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const selectedNote = allNotes.find(n => n.id === selectedNoteId);

  const categories = ['All', 'Acoustic Psychology', 'Reach Strategy', 'Frequency Arbitrage', 'Neural Branding', 'Creative Copypasta'];

  return (
    <div className="bg-[#0b0c1b]/95 border border-[#1e2243] rounded-lg p-4 font-mono select-none flex flex-col h-full text-slate-200 shadow-2xl shadow-black">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1e2243] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-[#00f0ff] animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
            Acoustic Mastermind Notes Registry
          </span>
        </div>
        <div className="flex gap-2">
          {allNotes.length < 50 && (
            <button
              onClick={handleGenerateMassiveDB}
              className="text-[10px] bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-extrabold px-3 py-1 rounded border border-[#00f0ff]/30 cursor-pointer animate-pulse"
            >
              ⚡ GENERATE 180 NOTES
            </button>
          )}
          <span className="text-[10px] bg-slate-900 border border-[#1e2243] px-2 py-0.5 rounded text-[#00f0ff]">
            Total Entries: <strong className="text-emerald-400 font-extrabold">{allNotes.length}</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 overflow-hidden">
        
        {/* Left 1/3: Search, Filters & Scrollable Notes List */}
        <div className="lg:col-span-1 flex flex-col bg-black/40 rounded border border-[#1b1f3c] p-3 overflow-hidden">
          
          {/* Search bar */}
          <div className="relative mb-2">
            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword/tag/frequency..."
              className="w-full bg-slate-950 border border-[#1e2243] rounded pl-7 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#00f0ff] placeholder-slate-600 font-mono"
            />
          </div>

          {/* Category Scroller */}
          <div className="flex gap-1 overflow-x-auto pb-2 mb-2 scrollbar-thin">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); audio.playClick(600, 0.04); }}
                className={`text-[9px] px-2 py-0.5 rounded-full border shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1a5b84] border-[#00f0ff] text-white font-semibold'
                    : 'bg-black/50 border-[#1e2243] text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Toggles & Add button */}
          <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2 border-b border-[#131730] pb-1.5">
            <div className="flex gap-2">
              <span className="text-slate-500 font-bold uppercase">Sort:</span>
              <button
                onClick={() => { setSortOrder('intensity'); audio.playClick(600, 0.04); }}
                className={`cursor-pointer ${sortOrder === 'intensity' ? 'text-[#00f0ff] font-bold' : 'hover:text-slate-300'}`}
              >
                Genius %
              </button>
              <button
                onClick={() => { setSortOrder('date'); audio.playClick(600, 0.04); }}
                className={`cursor-pointer ${sortOrder === 'date' ? 'text-[#00f0ff] font-bold' : 'hover:text-slate-300'}`}
              >
                Date
              </button>
            </div>

            <button
              onClick={() => { setIsCreatingNew(true); audio.playClick(800, 0.05); }}
              className="text-emerald-400 hover:text-emerald-300 font-extrabold flex items-center gap-0.5 cursor-pointer"
            >
              <Plus className="h-3 w-3" /> Custom Note
            </button>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
            {sortedNotes.length > 0 ? (
              sortedNotes.map(note => {
                const isSelected = selectedNoteId === note.id;
                return (
                  <div
                    key={note.id}
                    onClick={() => { setSelectedNoteId(note.id); audio.playClick(700, 0.04); }}
                    className={`p-2 rounded border transition-all text-left relative cursor-pointer ${
                      isSelected 
                        ? 'bg-[#151c3d] border-[#00f0ff] ring-1 ring-cyan-400/20' 
                        : 'bg-[#090b16] border-[#1e2243] hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold text-slate-100 truncate w-3/4">{note.title}</span>
                      <span className="text-[8px] text-slate-500 shrink-0 font-normal">{note.date}</span>
                    </div>

                    <div className="flex items-center justify-between text-[8px] mt-1 text-slate-400">
                      <span className="truncate max-w-[70%]">{note.category}</span>
                      <div className="flex items-center gap-1 shrink-0 font-mono text-cyan-400">
                        <Award className="h-2.5 w-2.5 text-amber-500" />
                        <span>{note.intensity}%</span>
                      </div>
                    </div>

                    {/* Delete note */}
                    <button
                      onClick={(e) => handleDeleteNote(note.id, e)}
                      className="absolute right-1 bottom-1 text-slate-600 hover:text-rose-400 p-0.5 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-slate-500 text-[10px] py-10 leading-relaxed">
                No matching master notes found.<br />
                Try adjusting filters, or click <strong className="text-emerald-400">Custom Note</strong> to draft one.
              </div>
            )}
          </div>
        </div>

        {/* Right 2/3: Inspector & Creator Drawer */}
        <div className="lg:col-span-2 flex flex-col bg-[#0e1022] border border-[#1e2243] rounded p-3 h-full overflow-y-auto">
          {isCreatingNew ? (
            /* Custom Note Creation Form */
            <form onSubmit={handleCreateCustomNote} className="space-y-3 flex-1 flex flex-col">
              <div className="border-b border-[#1e2243] pb-2 flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1">
                  <Plus className="h-3.5 w-3.5" /> DRAFT NEW ACOUSTIC FORMULA
                </span>
                <button
                  type="button"
                  onClick={() => { setIsCreatingNew(false); audio.playClick(600, 0.05); }}
                  className="text-[10px] text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Title */}
                <div className="space-y-1 col-span-2">
                  <label className="text-[9px] text-slate-400 uppercase font-bold block">Formula Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="The Somatic Frequency Alignment Method..."
                    className="w-full bg-[#131730] border border-[#1e2243] rounded px-2 py-1 text-slate-100 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-bold block">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#131730] border border-[#1e2243] rounded px-2 py-1 text-slate-100 focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Acoustic Psychology">Acoustic Psychology</option>
                    <option value="Reach Strategy">Reach Strategy</option>
                    <option value="Frequency Arbitrage">Frequency Arbitrage</option>
                    <option value="Neural Branding">Neural Branding</option>
                    <option value="Creative Copypasta">Creative Copypasta</option>
                  </select>
                </div>

                {/* Hz */}
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-bold block">Target Frequency (Hz)</label>
                  <input
                    type="number"
                    min="40"
                    max="1000"
                    value={newHz}
                    onChange={(e) => setNewHz(parseInt(e.target.value) || 432)}
                    className="w-full bg-[#131730] border border-[#1e2243] rounded px-2 py-1 text-slate-100 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1 text-xs">
                <label className="text-[9px] text-slate-400 uppercase font-bold block">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Somatic, Commute, 432Hz, Reach"
                  className="w-full bg-[#131730] border border-[#1e2243] rounded px-2 py-1 text-slate-100 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Content text */}
              <div className="space-y-1 flex-1 flex flex-col min-h-[120px]">
                <label className="text-[9px] text-slate-400 uppercase font-bold block">Mastermind Concept Content</label>
                <textarea
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Analyze listeners somatic response parameters..."
                  className="w-full flex-1 bg-[#131730] border border-[#1e2243] rounded px-2.5 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-emerald-400 resize-none font-mono leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-950/60 hover:bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 py-2 rounded text-xs font-bold uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="h-4 w-4" /> Save Acoustic Note
              </button>
            </form>
          ) : selectedNote ? (
            /* Selected Note Details Screen */
            <div className="space-y-4 text-xs flex-1 flex flex-col">
              
              {/* Top Banner */}
              <div className="border-b border-[#1e2243] pb-2 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] bg-[#1a2d54] text-[#00f0ff] border border-[#00f0ff]/30 px-2 py-0.5 rounded uppercase font-bold">
                      {selectedNote.category}
                    </span>
                    {selectedNote.frequencyHz && (
                      <span className="text-[9px] text-cyan-400 font-bold flex items-center gap-0.5">
                        ⚡ {selectedNote.frequencyHz}Hz
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-black text-slate-100 leading-snug">
                    {selectedNote.title}
                  </h4>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    <span>{selectedNote.date}</span>
                  </div>
                  <div className="text-[9px] text-[#00f0ff] font-bold mt-1 font-mono bg-[#0c1e30] border border-cyan-500/20 px-1 rounded flex items-center gap-1">
                    <Award className="h-3 w-3 text-amber-400" /> Efficiency Score: {selectedNote.intensity}%
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 bg-black/30 p-4 rounded border border-[#1e2243] text-slate-200 leading-relaxed font-mono whitespace-pre-wrap text-[11px]">
                {selectedNote.content}
              </div>

              {/* Tags deck */}
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-bold uppercase">Associated Tags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNote.tags.map(t => (
                    <span 
                      key={t}
                      className="text-[9px] bg-[#131730] border border-[#1e2243] text-slate-300 px-2.5 py-0.5 rounded-full"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action operations drawer */}
              <div className="pt-3 border-t border-[#1e2243] grid grid-cols-2 gap-3">
                {selectedNote.frequencyHz && onTuneFrequency && (
                  <button
                    onClick={() => {
                      audio.playClick(600, 0.05);
                      onTuneFrequency(selectedNote.frequencyHz!);
                    }}
                    className="bg-[#1a5b84]/95 hover:bg-[#1a5b84] border border-[#00f0ff]/40 text-slate-100 font-bold py-1.5 rounded text-[10px] uppercase cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sliders className="h-3.5 w-3.5 text-cyan-400" />
                    Tune OS to {selectedNote.frequencyHz}Hz
                  </button>
                )}
                {onAddNoteToSynth && (
                  <button
                    onClick={() => {
                      audio.playClick(600, 0.05);
                      onAddNoteToSynth(selectedNote);
                    }}
                    className="bg-purple-950/60 hover:bg-purple-950 border border-purple-500/50 text-purple-300 font-bold py-1.5 rounded text-[10px] uppercase cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Zap className="h-3.5 w-3.5 text-purple-400" />
                    Queue in Synthesizer Lab
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-center py-20">
              <Database className="h-12 w-12 text-[#1e2243] animate-pulse" />
              <p className="text-xs font-bold text-slate-400 mt-2">NO NOTES IN DOCKED REGISTRY</p>
              <p className="text-[10px] max-w-[240px] leading-relaxed mt-1 text-slate-500">
                Click "⚡ GENERATE 180 NOTES" above to programmatically populate the creative genius corpus instantly.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
export default NotesPanel;
