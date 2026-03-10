import type { DialogueLine } from '../../types/funnel'

// Diálogo da DarkGirl — tom calmo, analítico, confiante
// glitchAt: índice onde o glitch começa a crescer (controlado no componente)
export const DARKGIRL_DIALOGUE: DialogueLine[] = [
  {
    text: 'Você ligou. Bom.',
    delay: 600,
    speed: 55,
    audioTrigger: 'call-connected',
  },
  {
    text: 'Pode me chamar de DarkGirl.',
    delay: 1000,
    speed: 55,
  },
  {
    text: 'Eu trabalho com o CODE há três anos.',
    delay: 900,
    speed: 55,
  },
  {
    text: 'O método que ele mencionou... é real.',
    delay: 1100,
    speed: 55,
  },
  {
    text: 'Explorei a falha nos algoritmos do Instagram.',
    delay: 900,
    speed: 50,
  },
  {
    text: 'Crescimento orgânico automatizado. Sem bots. Sem ban.',
    delay: 1000,
    speed: 48,
  },
  {
    text: 'Já testei em 847 perfis nos últimos 6 meses.',
    delay: 900,
    speed: 52,
  },
  {
    text: '... espera.',
    delay: 1500,
    speed: 60,
    audioTrigger: 'static-noise',
  },
  {
    text: 'Estão rastreando essa linha.',
    delay: 700,
    speed: 45,
  },
  {
    text: 'Tenho pouco tempo.',
    delay: 600,
    speed: 50,
  },
  {
    text: 'Vou te mandar tudo pelo WhatsApp. Agora.',
    delay: 800,
    speed: 48,
  },
  {
    text: '[[CONEXÃO ENCERRADA]]',
    delay: 400,
    speed: 30,
  },
]

// Índice a partir do qual o glitch começa a crescer
export const GLITCH_START_INDEX = 8 // "Estão rastreando essa linha"
