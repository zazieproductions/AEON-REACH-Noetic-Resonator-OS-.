// Web Audio Engine for Reach-OS (RadioReach Mastermind OS)
class AudioEngine {
  private ctx: AudioContext | null = null;
  private droneOscL: OscillatorNode | null = null;
  private droneOscR: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private staticOsc: AudioWorkletNode | ScriptProcessorNode | null = null;
  private staticGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  public activeFrequency: number = 432; // Default cosmic flow frequency

  constructor() {
    // Audio Context is initialized lazily upon first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMasterVolume(vol: number) {
    this.initContext();
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.1);
    }
  }

  public playClick(pitch: number = 800, duration: number = 0.05, type: OscillatorType = 'sine') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      
      // Pitch slide for diagnostic sound
      if (type === 'triangle') {
        osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, this.ctx.currentTime + duration);
      }

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Web Audio Click error:", e);
    }
  }

  public playChime(frequencies: number[] = [261.63, 329.63, 392.00, 523.25]) {
    this.initContext();
    const ctx = this.ctx;
    const master = this.masterGain;
    if (!ctx || !master) return;

    const now = ctx.currentTime;
    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = index * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + delay);
      
      // Filter sweep for a lush "Aeon-Reach Acoustic Seal"
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(100, now + delay);
      filter.frequency.exponentialRampToValueAtTime(1800, now + delay + 0.2);

      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.1, now + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      osc.start(now + delay);
      osc.stop(now + delay + 1.5);
    });
  }

  public startFocusDrone(frequency: number = 432, binauralBeat: number = 10) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stopFocusDrone();
    this.activeFrequency = frequency;

    try {
      const now = this.ctx.currentTime;
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0, now);
      this.droneGain.gain.linearRampToValueAtTime(0.2, now + 1.0);

      // Create stereo split for true binaural beats (entrains brain waves into Alpha/Theta state)
      const pannerL = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      const pannerR = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      this.droneOscL = this.ctx.createOscillator();
      this.droneOscL.type = 'sine';
      // Pitch in left ear
      this.droneOscL.frequency.setValueAtTime(frequency - binauralBeat / 2, now);

      this.droneOscR = this.ctx.createOscillator();
      this.droneOscR.type = 'sine';
      // Pitch in right ear
      this.droneOscR.frequency.setValueAtTime(frequency + binauralBeat / 2, now);

      if (pannerL && pannerR) {
        pannerL.pan.setValueAtTime(-1, now);
        pannerR.pan.setValueAtTime(1, now);

        this.droneOscL.connect(pannerL);
        pannerL.connect(this.droneGain);

        this.droneOscR.connect(pannerR);
        pannerR.connect(this.droneGain);
      } else {
        // Fallback for browsers without StereoPanner
        this.droneOscL.connect(this.droneGain);
        this.droneOscR.connect(this.droneGain);
      }

      // Add a warm sub-harmonic low pass filter to make it soft and meditative
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(frequency * 1.5, now);

      this.droneGain.connect(lowpass);
      lowpass.connect(this.masterGain);

      this.droneOscL.start();
      this.droneOscR.start();
    } catch (e) {
      console.warn("Error starting focus drone:", e);
    }
  }

  public stopFocusDrone() {
    if (this.droneOscL) {
      try { this.droneOscL.stop(); } catch(e){}
      this.droneOscL = null;
    }
    if (this.droneOscR) {
      try { this.droneOscR.stop(); } catch(e){}
      this.droneOscR = null;
    }
    if (this.droneGain) {
      this.droneGain = null;
    }
  }

  public startStaticNoise() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stopStaticNoise();

    try {
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      // Generate pink/white noise for tuning simulation
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Simple pink noise approximation filter
        output[i] = (lastOut * 0.95 + white * 0.05);
        lastOut = output[i];
      }

      const whiteNoiseSource = this.ctx.createBufferSource();
      whiteNoiseSource.buffer = noiseBuffer;
      whiteNoiseSource.loop = true;

      this.staticGain = this.ctx.createGain();
      this.staticGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.staticGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.1);

      // Add highpass filter to sound like thin, crackly radio static
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

      whiteNoiseSource.connect(filter);
      filter.connect(this.staticGain);
      this.staticGain.connect(this.masterGain);

      whiteNoiseSource.start();
      this.staticOsc = whiteNoiseSource as any; // Store reference
    } catch(e) {
      console.warn("Error starting radio static:", e);
    }
  }

  public stopStaticNoise() {
    if (this.staticOsc) {
      try { (this.staticOsc as any).stop(); } catch(e){}
      this.staticOsc = null;
    }
    this.staticGain = null;
  }

  public triggerSwoosh() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(100, now);
      filter.frequency.exponentialRampToValueAtTime(1500, now + 0.3);
      filter.Q.setValueAtTime(8, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(now + 0.65);
    } catch(e) {
      console.warn("Swoosh audio error:", e);
    }
  }
}

export const audio = new AudioEngine();
