export interface AcousticNote {
  id: string;
  title: string;
  content: string;
  category: 'Acoustic Psychology' | 'Reach Strategy' | 'Frequency Arbitrage' | 'Neural Branding' | 'Creative Copypasta' | 'OS Telemetry';
  tags: string[];
  hexColor: string;
  intensity: number; // 1-100 score of genius tier
  date: string;
  frequencyHz?: number;
}

export const SEEDED_NOTES: AcousticNote[] = [
  {
    id: 'note-1',
    title: 'The Solfeggio Gnosis 432Hz Carrier Wave',
    content: 'Apocryphal psychoacoustic maps reveal that vocal modulations overlayed with an esoteric 432Hz Solfeggio frequency bypassed the logical shields of drive-time commuters by 18.4%. Standard 440Hz tuning represents artificial constraint; the natural 432Hz aetheric key triggers somatic alignment and primordial comfort in listener neural grids. Suggested vocal cast: ritualistic baritone, 126 rhythmic pulses per minute.',
    category: 'Acoustic Psychology',
    tags: ['Solfeggio', 'Aetheric Key', 'Primordial Comfort', 'Vocal Ritual'],
    hexColor: '#00f0ff',
    intensity: 99,
    date: '2026-03-12',
    frequencyHz: 432
  },
  {
    id: 'note-2',
    title: 'The Sacred Kabbalah 21/52 Broadcast Law',
    content: 'Esoteric radio media metrics reveal the divine 21/52 ritual of consistency: 21 broadcast spots weekly, 52 weeks a year. This cycle enforces exactly 3.4 karmic impressions per listener, forming an astral seal in auditory memory. Relying on erratic, short-burst ads is a cardinal failure of media-buying geometry. Broadcasters must secure consistent micro-intervals to achieve perpetual presence in local FM realms.',
    category: 'Reach Strategy',
    tags: ['Kabbalah 21/52', 'Astral Seal', 'Broadcast Geometry', 'Perpetual Presence'],
    hexColor: '#10b981',
    intensity: 95,
    date: '2026-03-11',
    frequencyHz: 340
  },
  {
    id: 'note-3',
    title: 'Hermetic Acoustic Anchoring & Color Alchemy',
    content: 'A Gnostic acoustic emblem must never exceed 1.8 seconds. It requires a perfect golden ratio sweep (e.g., 220Hz root to 440Hz octave) to unlock the pineal expectation pathways. Color equivalents are #00f0ff (Noetic Cyan / Sight) and #a855f7 (Alchemical Amethyst / Dream). Aligning visual hex frequencies with corresponding auditory pitches boosts streaming retention by 32%.',
    category: 'Neural Branding',
    tags: ['Golden Ratio', 'Alchemical Swatch', 'Gnostic Emblem', 'Sight-Sound Lock'],
    hexColor: '#a855f7',
    intensity: 98,
    date: '2026-03-10',
    frequencyHz: 440
  },
  {
    id: 'note-4',
    title: 'Astral De-phased Binaural Entrainment',
    content: 'Because stereo headsets establish two isolated acoustic paths, audio branding inside podcast matrices is highly receptive to astral entrainment. Emitting a 200Hz tone in the left channel and a 210Hz tone in the right channel coaxes the brain into a 10Hz Alpha wave (Creative Trance). Inserting the core brand talisman exactly 14 seconds after entrainment seeds memory into the deep unconscious.',
    category: 'Acoustic Psychology',
    tags: ['Astral De-phase', 'Creative Trance', 'Talisman Seed', 'Pineal Gate'],
    hexColor: '#ec4899',
    intensity: 94,
    date: '2026-03-09',
    frequencyHz: 210
  },
  {
    id: 'note-5',
    title: 'The Nocturnal Arbitrage Matrix',
    content: 'Under-valued, nocturnal radio segments (2:00 AM - 5:00 AM) represent empty space ripe for alchemical harvest. In transportation, hospitality, and distribution spheres, night-watchers are highly attuned to distant AM/FM antennas. RadioReach networks show a 4.2x arbitrage return on overnight ambient narratives, catching the sub-conscious mind during relaxed dreamlike receptive hours.',
    category: 'Frequency Arbitrage',
    tags: ['Nocturnal Harvest', 'Alchemical Spreads', 'Antenna Gnosis', 'Dream Receptive'],
    hexColor: '#f59e0b',
    intensity: 89,
    date: '2026-03-08',
    frequencyHz: 180
  },
  {
    id: 'note-6',
    title: 'Subliminal Speaker Membrane Modulations',
    content: 'To dominate vehicular stereos, advertisements must harness physical kinetic dynamics. Calibrating a multi-band limiter at -3dB while driving a continuous 55Hz sub-bass tone triggers physical cabinet vibration in automotive doors. This tactile resonance bypasses intellect entirely, forcing the vegetative nervous system to treat the auditory branding as a concrete physical structure.',
    category: 'Neural Branding',
    tags: ['Kinetic Mod', 'Vegetative Wave', 'Sub-bass Ritual', 'Physical Structure'],
    hexColor: '#ef4444',
    intensity: 97,
    date: '2026-03-07',
    frequencyHz: 55
  },
  {
    id: 'note-7',
    title: 'The High-Impact Noetic 6s Blockade',
    content: 'Deploying a 6-second acoustic shockwave at the absolute boundary of commercial breaks across four major regional FM affiliates in synchronized grid locks. The structure is purely Gnostic: Immediate sound rift (shattered glass or chime) -> Core Brand Title -> Singular Sigil Phrase. This anchors the attention window before commuters can execute preset frequency hops.',
    category: 'Reach Strategy',
    tags: ['Acoustic Rift', 'Sigil Phrase', 'Grid Lockout', 'Attention Anchor'],
    hexColor: '#06b6d4',
    intensity: 91,
    date: '2026-03-06',
    frequencyHz: 880
  }
];

// High-tech vocabulary arrays for generating massive quantities of mastermind ideas
const ACOUSTIC_VERBS = [
  'alchemize', 'entrain', 'resonate', 'harvest', 'filter', 'attenuate', 'anchor', 
  'harmonize', 'transmute', 'de-phase', 'project', 'frequency-lock', 'decode', 
  'polarize', 'oscillate', 'saturate', 'arbitrage', 're-engineer', 'modulate', 'compress'
];

const ACOUSTIC_NOUNS = [
  'pineal gateways', 'sub-bass fields', 'sacred geometries', 'binaural vectors', 'FM carrier bands',
  'drive-time demographics', 'acoustic sigils', 'astral retention', 'karmic feedback', 'cognitive loads',
  'somatic wave envelopes', 'ambient soundscapes', 'airplay contracts', 'noetic limiters',
  'subliminal anchors', 'spectral harmonics', 'attention economics', 'arbitrage spreads', 'sonic triggers'
];

const ACOUSTIC_TARGETS = [
  'during high-congestion morning commutes', 'for premium streaming listeners', 'across regional gospel networks',
  'for truck-driver night shifts', 'inside high-income metropolitan suburbs', 'specifically for gen-Z podcast junkies',
  'targeting retail soundscapes', 'to disrupt competitive corporate advertisements', 'in sports talk radio niches'
];

const ACOUSTIC_HEX = ['#00f0ff', '#10b981', '#a855f7', '#ec4899', '#f59e0b', '#ef4444', '#06b6d4', '#6366f1', '#14b8a6', '#f43f5e'];

const CATEGORIES = ['Acoustic Psychology', 'Reach Strategy', 'Frequency Arbitrage', 'Neural Branding', 'Creative Copypasta'] as const;

export function generateHundredsOfNotes(count: number = 180): AcousticNote[] {
  const generated: AcousticNote[] = [...SEEDED_NOTES];
  
  for (let i = 0; i < count; i++) {
    const verb1 = ACOUSTIC_VERBS[Math.floor(Math.random() * ACOUSTIC_VERBS.length)];
    const verb2 = ACOUSTIC_VERBS[Math.floor(Math.random() * ACOUSTIC_VERBS.length)];
    const noun1 = ACOUSTIC_NOUNS[Math.floor(Math.random() * ACOUSTIC_NOUNS.length)];
    const noun2 = ACOUSTIC_NOUNS[Math.floor(Math.random() * ACOUSTIC_NOUNS.length)];
    const target = ACOUSTIC_TARGETS[Math.floor(Math.random() * ACOUSTIC_TARGETS.length)];
    const hexColor = ACOUSTIC_HEX[Math.floor(Math.random() * ACOUSTIC_HEX.length)];
    const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    
    const intensity = Math.floor(Math.random() * 45) + 55; // 55 to 99
    const freqHz = Math.floor(Math.random() * 800) + 40; // 40Hz to 840Hz
    
    // Capitalize first letter of verb
    const capitalizedVerb = verb1.charAt(0).toUpperCase() + verb1.slice(1);
    const title = `${capitalizedVerb}ing ${noun1} for Maximum ${noun2.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`;
    
    const content = `Through exhaustive mathematical modeling, our RadioReach agency suggests we must ${verb1} ${noun1} ${target}. By implementing an automated cycle to ${verb2} ${noun2}, we increase core listener recall by ${(Math.random() * 25 + 10).toFixed(1)}%. This dynamic alignment generates high acoustic stability and establishes immediate neural synchronization. Deploy instantly with a targeting frequency spectrum calibrated to ${freqHz}Hz, utilizing hex-visual profiles corresponding to ${hexColor}.`;

    // Make some tags
    const tags = [
      noun1.split(' ').slice(-1)[0],
      verb1 + 'ing',
      `${freqHz}Hz`,
      'RadioReach-OS'
    ].map(t => t.charAt(0).toUpperCase() + t.slice(1));

    // Calculate a mock date in 2026
    const month = String(Math.floor(Math.random() * 3) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const date = `2026-${month}-${day}`;

    generated.push({
      id: `gen-note-${i}`,
      title,
      content,
      category: cat,
      tags,
      hexColor,
      intensity,
      date,
      frequencyHz: freqHz
    });
  }
  
  return generated;
}
