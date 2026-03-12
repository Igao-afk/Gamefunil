import type { AudioConfig, AudioId } from '../types/audio'

export const AUDIO_MANIFEST: Record<AudioId, AudioConfig> = {
  'keyboard-loop': {
    src: ['/audio/keyboard-loop.mp3', '/audio/keyboard-loop.ogg'],
    loop: true,
    defaultVolume: 0.3,
  },
  'sirens': {
    src: ['/audio/sirens.mp3', '/audio/sirens.ogg'],
    loop: false,
    defaultVolume: 0.4,
  },
  'footsteps': {
    src: ['/audio/footsteps.mp3', '/audio/footsteps.ogg'],
    loop: false,
    defaultVolume: 0.6,
  },
  'gunshot-1': {
    src: ['/audio/gunshot-1.mp3', '/audio/gunshot-1.ogg'],
    loop: false,
    defaultVolume: 0.8,
  },
  'gunshot-2': {
    src: ['/audio/gunshot-2.mp3', '/audio/gunshot-2.ogg'],
    loop: false,
    defaultVolume: 0.8,
  },
  'dialing-tone': {
    src: ['/audio/dialing-tone.mp3', '/audio/dialing-tone.ogg'],
    loop: true,
    defaultVolume: 1.0,
  },
  'call-connected': {
    src: ['/audio/call-connected.mp3', '/audio/call-connected.ogg'],
    loop: false,
    defaultVolume: 0.6,
  },
  'static-noise': {
    src: ['/audio/static-noise.mp3', '/audio/static-noise.ogg'],
    loop: true,
    defaultVolume: 0,
  },
  'voice-message-1': {
    src: ['/audio/voice-message-1.mp3'],
    loop: false,
    defaultVolume: 0.9,
  },
  'voice-message-2': {
    src: ['/audio/voice-message-2.mp3'],
    loop: false,
    defaultVolume: 0.9,
  },
  'voice-message-3': {
    src: ['/audio/voice-message-3.mp3'],
    loop: false,
    defaultVolume: 0.9,
  },
  'code-voice-1': {
    src: ['/audio/code-voice-1.mp3'],
    loop: false,
    defaultVolume: 1.0,
  },
  'code-voice-2': {
    src: ['/audio/code-voice-2.mp3'],
    loop: false,
    defaultVolume: 1.0,
  },
  'suspense': {
    src: ['/audio/suspense.mp3'],
    loop: true,
    defaultVolume: 0.2,
  },
  'cellphone': {
    src: ['/audio/cellphone.mp3'],
    loop: true,
    defaultVolume: 1.0,
  },
  'gun': {
    src: ['/audio/gun.mp3'],
    loop: true,
    defaultVolume: 1.0,
  },
  'darkgirl-voice': {
    src: ['/audio/darkGirlVoice.mp3'],
    loop: false,
    defaultVolume: 1.0,
  },
  'whatsapp': {
    src: ['/audio/whatsapp.mp3'],
    loop: false,
    defaultVolume: 0.8,
  },
  'darkgirl-whatsapp-audio-1': {
    src: ['/audio/darkgirlWhatsAppAudio1.mp3'],
    loop: false,
    defaultVolume: 0.9,
  },
  'darkgirl-whatsapp-audio-2': {
    src: ['/audio/darkgirlWhatsAppAudio2.mp3'],
    loop: false,
    defaultVolume: 0.9,
  },
  'darkgirl-whatsapp-audio-3': {
    src: ['/audio/darkgirlWhatsAppAudio3.mp3'],
    loop: false,
    defaultVolume: 0.9,
  },
  'interferencia': {
    src: ['/audio/interferencia.mp3'],
    loop: false,
    defaultVolume: 1.0,
  },
  'glitch-sound': {
    src: ['/audio/glitch.mp3'],
    loop: false,
    defaultVolume: 1.0,
  },
}
