// ==========================================================================
// PyMaster — Tactile Haptics & Mechanical Audio Synthesizer
// Zero external dependencies. Uses native Web Audio API to create
// authentic physical mechanical clicks, switch snaps, and relay clunks.
// ==========================================================================

let audioCtx = null;
let soundEnabled = true;

// Load persisted sound preference
try {
  const saved = localStorage.getItem('pymaster_sound_enabled');
  if (saved !== null) {
    soundEnabled = saved === 'true';
  }
} catch (e) {
  // Ignore localStorage errors
}

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a synthesized mechanical click sound.
 * @param {'click' | 'switch' | 'snap' | 'knob' | 'pass' | 'fail'} type
 */
export function playSound(type = 'click') {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    switch (type) {
      case 'click': {
        // Crisp tactile micro-switch click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(820, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case 'switch': {
        // Physical rocker / toggle switch thud & snap
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(220, now);
        osc1.frequency.exponentialRampToValueAtTime(60, now + 0.05);
        gain1.gain.setValueAtTime(0.22, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.05);

        // High transient click
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(1400, now + 0.005);
        osc2.frequency.exponentialRampToValueAtTime(300, now + 0.025);
        gain2.gain.setValueAtTime(0.08, now + 0.005);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.005);
        osc2.stop(now + 0.03);
        break;
      }

      case 'knob': {
        // Subtle stepped rotary detent click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.02);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.025);
        break;
      }

      case 'snap': {
        // Segmented pill snap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.03);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.035);
        break;
      }

      case 'pass': {
        // Subtle dual harmonic relay chime (subtle green success indicator)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc2.frequency.setValueAtTime(659.25, now); // E5
        osc1.frequency.setValueAtTime(783.99, now + 0.08); // G5
        osc2.frequency.setValueAtTime(1046.50, now + 0.08); // C6
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.3);
        osc2.stop(now + 0.3);
        break;
      }

      case 'fail': {
        // Low relay reject thud (subtle red fail indicator)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.16);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
        break;
      }
    }
  } catch (err) {
    // Graceful fallback if audio is blocked by user interaction policy
  }
}

/**
 * Toggle sound effects on/off.
 * @returns {boolean} New sound state
 */
export function toggleSound() {
  soundEnabled = !soundEnabled;
  try {
    localStorage.setItem('pymaster_sound_enabled', String(soundEnabled));
  } catch (e) {}
  if (soundEnabled) {
    playSound('switch');
  }
  return soundEnabled;
}

/**
 * Check if sound is currently enabled.
 * @returns {boolean}
 */
export function isSoundEnabled() {
  return soundEnabled;
}
