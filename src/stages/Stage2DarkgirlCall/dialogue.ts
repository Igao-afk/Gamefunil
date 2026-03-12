import type { DialogueLine } from '../../types/funnel'

// Diálogo da DarkGirl — recalculado com timestamps exatos do áudio de 73s
// Diálogo inicia 500ms antes do áudio → cada legenda aparece ~500ms antes da voz
// delay[0]   = ts[0] * 1000  (≈ 0ms, usando 100ms como mínimo)
// delay[i>0] = (ts[i] - ts[i-1]) * 1000 - typing[i-1]
// typing[i]  = text[i].length * speed[i]
export const DARKGIRL_DIALOGUE: DialogueLine[] = [
  {
    // ts: 00:00
    text: 'Alô.',
    delay: 100,
    speed: 60,
    audioTrigger: 'call-connected',
  },
  {
    // ts: 00:01 | gap 1000ms - 240ms typing = 760ms
    text: 'Esse número não deveria estar sendo usado.',
    delay: 760,
    speed: 50,
  },
  {
    // ts: 00:04 | gap 3000ms - 2050ms typing = 950ms
    text: 'Deixa eu adivinhar: o Code te ligou, não foi?',
    delay: 950,
    speed: 50,
  },
  {
    // ts: 00:07 | gap 3000ms - 2250ms typing = 750ms
    text: 'Ele disse que não tinha muito tempo, falou sobre crescimento no Instagram...',
    delay: 750,
    speed: 35,
  },
  {
    // ts: 00:12 | gap 5000ms - 2660ms typing = 2340ms
    text: 'É... então significa que ele conseguiu.',
    delay: 2340,
    speed: 50,
  },
  {
    // ts: 00:15 | gap 3000ms - 1950ms typing = 1050ms
    text: 'Escuta, com calma.',
    delay: 1050,
    speed: 60,
  },
  {
    // ts: 00:17 | gap 2000ms - 1080ms typing = 920ms
    text: 'O Code criou algo que resolve o problema que praticamente todo criador enfrenta hoje: o crescimento orgânico imprevisível.',
    delay: 920,
    speed: 30,
  },
  {
    // ts: 00:26 | gap 9000ms - 3660ms typing = 5340ms
    text: 'Sabe por que os gurus repetem sempre as mesmas coisas? Hashtags, postar todos os dias, seguir tendências, Reels...',
    delay: 5340,
    speed: 30,
  },
  {
    // ts: 00:36 | gap 10000ms - 3420ms typing = 6580ms
    text: 'Mas isso não resolve o problema real.',
    delay: 6580,
    speed: 50,
  },
  {
    // ts: 00:39 | gap 3000ms - 1850ms typing = 1150ms
    text: 'O algoritmo responde à interação humana, e foi exatamente isso que o Code automatizou: interações estratégicas com pessoas reais, público interessado.',
    delay: 1150,
    speed: 30,
  },
  {
    // ts: 00:52 | gap 13000ms - 4500ms typing = 8500ms
    text: 'O resultado: seguidores de verdade, crescimento orgânico constante.',
    delay: 8500,
    speed: 42,
  },
  {
    // ts: 00:59 | gap 7000ms - 2814ms typing = 4186ms
    text: 'Espera... isso não é bom.',
    delay: 4186,
    speed: 55,
  },
  {
    // ts: 01:02 | gap 3000ms - 1375ms typing = 1625ms
    text: 'Estão tentando rastrear a chamada.',
    delay: 1625,
    speed: 50,
  },
  {
    // ts: 01:05 | gap 3000ms - 1700ms typing = 1300ms
    text: 'Precisamos parar aqui.',
    delay: 1300,
    speed: 55,
  },
  {
    // ts: 01:07 | gap 2000ms - 1210ms typing = 790ms
    text: 'Vou te enviar algo seguro.',
    delay: 790,
    speed: 50,
  },
  {
    // ts: 01:11 | gap 4000ms - 1250ms typing = 2750ms
    text: 'Fica atento.',
    delay: 2750,
    speed: 55,
  },
]

// Índice onde o glitch começa a crescer — "Espera... isso não é bom." (ts 00:59)
export const GLITCH_START_INDEX = 11
