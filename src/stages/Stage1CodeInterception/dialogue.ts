import type { DialogueLine } from '../../types/funnel'

// Delays calculados pelos timestamps exatos do áudio (sem buffer acumulativo)
// delay[i] = (ts[i] - ts[i-1]) * 1000 - typing[i-1]
// → cada linha aparece exatamente quando a voz diz aquela frase
export const CODE_DIALOGUE: DialogueLine[] = [
  {
    // ts: 0.1s
    text: 'Alô… você tá me ouvindo?',
    delay: 100,
    speed: 38,
  },
  {
    // ts: 5.18s | gap 5.08s - 912ms digitação = 4168ms
    text: 'Escuta… eu tenho pouquíssimo tempo.',
    delay: 4168,
    speed: 35,
  },
  {
    // ts: 7.21s | gap 2.03s - 1225ms digitação = 805ms
    text: 'Eu tô ligando porque você provavelmente tá passando pelo mesmo problema que milhares de criadores agora.',
    delay: 805,
    speed: 25,
  },
  {
    // ts: 15.4s | gap 8.19s - 2600ms digitação = 5590ms
    text: 'Eles crescem rápido no Instagram… mas profissionais como você continuam invisíveis.',
    delay: 5590,
    speed: 27,
  },
  {
    // ts: 23.11s | gap 7.71s - 2241ms digitação = 5469ms
    text: 'Mesmo postando todo dia… estudando estratégia… comprando curso atrás de curso… e nada muda.',
    delay: 5469,
    speed: 26,
  },
  {
    // ts: 32.04s | gap 8.93s - 2366ms digitação = 6564ms
    text: 'Isso acontece porque o sistema foi feito pra esconder quem tenta crescer sozinho.',
    delay: 6564,
    speed: 27,
  },
  {
    // ts: 37.0s | gap 4.96s - 2187ms digitação = 2773ms
    text: 'Mas eu desenvolvi uma tecnologia que quebra isso.',
    delay: 2773,
    speed: 32,
  },
  {
    // ts: 40.16s | gap 3.16s - 1568ms digitação = 1592ms
    text: 'Ela gera seguidores reais… interação orgânica… público comprador.',
    delay: 1592,
    speed: 30,
  },
  {
    // ts: 46.07s | gap 5.91s - 1950ms digitação = 3960ms
    text: 'Totalmente automático.',
    delay: 3960,
    speed: 42,
  },
  {
    // ts: 53.0s | gap 6.93s - 924ms digitação = 6006ms
    text: 'Droga… eles me encontraram.',
    delay: 6006,
    speed: 38,
  },
  // --- code-voice-2 começa aqui ---
  {
    // ts: 55.17s | gap 2.17s - 1026ms digitação = 1144ms
    text: 'Escuta com atenção.',
    delay: 1144,
    speed: 42,
  },
  {
    // ts: 56.95s | gap 1.78s - 798ms digitação = 982ms
    text: 'Se acontecer alguma coisa comigo…',
    delay: 982,
    speed: 33,
  },
  {
    // ts: 58.17s | gap 1.22s - 1089ms digitação = 131ms
    text: 'liga pra esse número.',
    delay: 131,
    speed: 40,
  },
  {
    // ts: 59.25s | gap 1.08s - 840ms digitação = 240ms
    text: 'Anota.',
    delay: 240,
    speed: 55,
  },
  {
    // ts: 1:00.22 | gap 0.97s - 330ms digitação = 640ms
    text: '11… 987654321',
    delay: 640,
    speed: 55,
  },
  {
    // ts: 1:07.21 | gap 6.99s - 715ms digitação = 6275ms
    text: 'Merda…',
    delay: 6275,
    speed: 48,
  },
  {
    // ts: 1:10.22 | gap 3.01s - 288ms digitação = 2722ms
    text: 'Vou repetir...',
    delay: 2722,
    speed: 42,
  },
  {
    // ts: 1:12.25 | gap 2.03s - 588ms digitação = 1442ms
    text: '11… 987654321',
    delay: 1442,
    speed: 52,
  },
]
