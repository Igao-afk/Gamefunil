import type { DialogueLine } from '../../types/funnel'

// Diálogo da DarkGirl — calculado pelos timestamps do áudio
// Diálogo inicia 500ms antes do áudio (compensa drift do React)
// delay[0]   = ts[0] * 1000
// delay[i>0] = (ts[i] - ts[i-1]) * 1000 - typing[i-1]
// typing[i]  = text[i].length * speed[i]
export const DARKGIRL_DIALOGUE: DialogueLine[] = [
  {
    // ts: 00:03 | adiantado 3s para compensar offset de cena
    text: '...alô?',
    delay: 100,
    speed: 60,
    audioTrigger: 'call-connected',
  },
  {
    // ts: 00:05 | gap 2000ms - 420ms typing = 1580ms
    text: 'Esse número… não deveria estar sendo usado.',
    delay: 1580,
    speed: 50,
  },
  {
    // ts: 00:08 | gap original 850ms - 5000ms adiantamento = -4150ms
    text: '...deixa eu adivinhar.',
    delay: -4150,
    speed: 55,
  },
  {
    // ts: 00:11 | gap 3000ms - 1210ms typing = 1790ms
    text: 'O Code te ligou.',
    delay: 1790,
    speed: 60,
  },
  {
    // ts: 00:14 | gap 3000ms - 960ms typing = 2040ms
    text: 'Ele disse que não tinha muito tempo.',
    delay: 2040,
    speed: 50,
  },
  {
    // ts: 00:18 | gap 4000ms - 1800ms typing = 2200ms
    text: 'E falou sobre crescimento no Instagram.',
    delay: 2200,
    speed: 50,
  },
  {
    // ts: 00:21 | gap 3000ms - 1900ms typing = 1100ms
    text: 'Então significa que ele conseguiu.',
    delay: 1100,
    speed: 55,
  },
  {
    // ts: 00:25 | gap 4000ms - 1870ms typing = 2130ms
    text: 'Escuta com calma.',
    delay: 2130,
    speed: 60,
  },
  {
    // ts: 00:29 | gap 4000ms - 1020ms typing = 2980ms
    text: 'O Code criou algo que resolve o problema que praticamente todo criador enfrenta hoje.',
    delay: 2980,
    speed: 35,
  },
  {
    // ts: 00:34 | gap original 2025ms - 5000ms adiantamento = -2975ms
    text: 'crescimento orgânico imprevisível',
    delay: -2975,
    speed: 50,
  },
  {
    // ts: 00:38 | gap 4000ms - 1650ms typing = 2350ms
    text: 'Por isso gurus ficam repetindo sempre as mesmas coisas.',
    delay: 2350,
    speed: 42,
  },
  {
    // ts: 00:44 | gap 6000ms - 2310ms typing = 3690ms
    text: 'hashtags.',
    delay: 3690,
    speed: 60,
  },
  {
    // ts: 00:48 | gap 4000ms - 540ms typing = 3460ms
    text: 'postar todos os dias.',
    delay: 3460,
    speed: 55,
  },
  {
    // ts: 00:52 | gap 4000ms - 1155ms typing = 2845ms
    text: 'seguir tendências.',
    delay: 2845,
    speed: 55,
  },
  {
    // ts: 00:55 | gap 3000ms - 990ms typing = 2010ms
    text: 'reels',
    delay: 2010,
    speed: 60,
  },
  {
    // ts: 00:58 | gap 3000ms - 300ms typing = 2700ms
    text: 'Mas isso não resolve o problema estrutural',
    delay: 2700,
    speed: 50,
  },
  {
    // ts: 01:02 | gap 4000ms - 2100ms typing = 1900ms
    text: 'O algoritmo responde a interação humana.',
    delay: 1900,
    speed: 48,
  },
  {
    // ts: 01:08 | gap 6000ms - 1920ms typing = 4080ms
    text: 'E foi exatamente isso que o Code automatizou.',
    delay: 4080,
    speed: 48,
  },
  {
    // ts: 01:13 | gap 5000ms - 2160ms typing = 2840ms
    text: 'Interações estratégicas.',
    delay: 2840,
    speed: 55,
  },
  {
    // ts: 01:18 | gap 5000ms - 1320ms typing = 3680ms
    text: 'com pessoas reais.',
    delay: 3680,
    speed: 55,
  },
  {
    // ts: 01:23 | gap 5000ms - 990ms typing = 4010ms
    text: 'público interessado.',
    delay: 4010,
    speed: 55,
  },
  {
    // ts: 01:28 | gap 5000ms - 1100ms typing = 3900ms
    text: 'resultado?',
    delay: 3900,
    speed: 60,
  },
  {
    // ts: 01:31 | gap 3000ms - 600ms typing = 2400ms
    text: 'seguidores reais.',
    delay: 2400,
    speed: 55,
  },
  {
    // ts: 01:36 | gap 5000ms - 935ms typing = 4065ms
    text: 'crescimento orgânico constante',
    delay: 4065,
    speed: 50,
  },
  // SFX: interferência eletrônica 01:40–01:43 (sem legenda)
  {
    // ts: 01:43 | gap 7000ms (inclui SFX 3s) - 1500ms typing = 5500ms
    text: '...espera.',
    delay: 5500,
    speed: 60,
  },
  {
    // ts: 01:46 | gap 3000ms - 600ms typing = 2400ms
    text: '...isso não é bom.',
    delay: 2400,
    speed: 55,
  },
  {
    // ts: 01:49 | gap 3000ms - 825ms typing = 2175ms
    text: 'estão tentando rastrear a chamada.',
    delay: 2175,
    speed: 50,
  },
  {
    // ts: 01:52 | gap 3000ms - 1700ms typing = 1300ms
    text: 'precisamos parar aqui.',
    delay: 1300,
    speed: 55,
  },
  {
    // ts: 01:56 | gap 4000ms - 1210ms typing = 2790ms
    text: 'eu vou te enviar algo seguro',
    delay: 2790,
    speed: 50,
  },
  {
    // ts: 02:00 | gap 4000ms - 1400ms typing = 2600ms
    text: 'fica atento',
    delay: 2600,
    speed: 55,
  },
]

// Índice a partir do qual o glitch começa a crescer — "...espera." (01:43)
export const GLITCH_START_INDEX = 24
