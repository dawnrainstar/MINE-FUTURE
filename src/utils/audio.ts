/**
 * Chthonic Subterranean Sound Synthesizer using Web Audio API
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private droneGain: GainNode | null = null;
  private isDronePlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    } else if (!this.isMuted && this.droneGain && this.ctx && this.isDronePlaying) {
      this.droneGain.gain.setTargetAtTime(0.04, this.ctx.currentTime, 0.5);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public startSubterraneanDrone() {
    if (this.isDronePlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      this.isDronePlaying = true;
      const now = this.ctx.currentTime;

      // Master drone gain
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(this.isMuted ? 0 : 0.04, now);
      this.droneGain.connect(this.ctx.destination);

      // Low fundamental 55Hz (A1 Earth fundamental)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, now);

      // Harmonic 110Hz (A2 warm overtone)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110.2, now);

      // LFO for slow tectonic pulse
      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.08, now); // slow breathing

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(15, now);
      lfo.connect(lfoGain.gain);

      // Lowpass filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);
      filter.Q.setValueAtTime(2, now);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(this.droneGain);

      osc1.start(now);
      osc2.start(now);
      lfo.start(now);
    } catch (e) {
      console.warn('Audio start note:', e);
    }
  }

  public playCardReveal() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880]; // Crystalline A major triad
    const note = notes[Math.floor(Math.random() * notes.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, now);
    osc.frequency.exponentialRampToValueAtTime(note * 1.5, now + 0.6);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(note * 1.2, now);
    filter.Q.setValueAtTime(5, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.2);
  }

  public playSeismicStrike() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, now);
    filter.frequency.exponentialRampToValueAtTime(40, now + 0.8);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.8);
  }

  public playMineralClink() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const freqs = [1200, 1500, 1800, 2200, 2600];
    const freq = freqs[Math.floor(Math.random() * freqs.length)];
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.8, now + 0.3);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }
}

export const sound = new SoundEngine();
