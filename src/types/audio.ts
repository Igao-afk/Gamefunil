export interface AudioConfig {
  src: string[]
  loop?: boolean
  defaultVolume?: number
}

export type AudioId =
  | 'keyboard-loop'
  | 'sirens'
  | 'footsteps'
  | 'gunshot-1'
  | 'gunshot-2'
  | 'dialing-tone'
  | 'call-connected'
  | 'static-noise'
  | 'voice-message-1'
  | 'voice-message-2'
  | 'voice-message-3'
  | 'code-voice-1'
  | 'code-voice-2'
  | 'suspense'
  | 'cellphone'
  | 'gun'
  | 'darkgirl-voice'
  | 'whatsapp'
  | 'darkgirl-whatsapp-audio-1'
  | 'darkgirl-whatsapp-audio-2'
