export type StageNumber = 0 | 1 | 2 | 3 | 4 | 5
// 0 = TapToStart, 1–5 = stages do funil

export interface DialogueLine {
  text: string
  delay: number       // ms antes de iniciar esta linha
  speed?: number      // ms por caractere (padrão: 40)
  audioTrigger?: string // ID do som disparado quando a linha inicia
}

export interface TextMessage {
  type: 'text'
  content: string
  delay: number
}

export interface AudioMessage {
  type: 'audio'
  audioId: string
  duration: string // ex: "0:42"
  delay: number
}

export type QueuedMessage = TextMessage | AudioMessage

export interface VideoConfig {
  src: string
  title: string
  description: string
  initialLikeCount: number
}
