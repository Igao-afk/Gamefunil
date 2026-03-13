import { motion } from 'framer-motion'
import SalesPageSection from '../../components/ui/SalesPageSection'
import FAQAccordion from '../../components/ui/FAQAccordion'
import { config } from '../../config'

const FAQ_ITEMS = [
  {
    q: 'O Conectagram é seguro para minha conta?',
    a: 'Sim. O sistema não usa bots nem automação que viola os Termos de Uso do Instagram. Trabalhamos explorando padrões do algoritmo público — sem acesso à sua senha ou dados sensíveis.',
  },
  {
    q: 'Em quanto tempo começo a ver resultados?',
    a: 'A maioria dos usuários vê os primeiros resultados em 7 a 14 dias. O crescimento acelera progressivamente conforme o algoritmo aprende o seu perfil.',
  },
  {
    q: 'Funciona para qualquer nicho?',
    a: 'Funciona para todos os nichos testados: fitness, finanças, moda, gastronomia, educação, negócios locais e muito mais. O método é agnóstico ao nicho.',
  },
  {
    q: 'Posso cancelar a qualquer momento?',
    a: 'Sim. Sem contratos, sem fidelidade. Cancele quando quiser direto no painel, sem precisar falar com ninguém.',
  },
  {
    q: 'Preciso ter conhecimento técnico?',
    a: 'Não. O painel é pensado para quem nunca usou nenhuma ferramenta de crescimento. Setup em menos de 5 minutos.',
  },
  {
    q: 'O que acontece com meus seguidores existentes?',
    a: 'Nada muda. O Conectagram só adiciona crescimento orgânico, sem remover, substituir ou interagir com seus seguidores atuais.',
  },
]

const TESTIMONIALS = [
  {
    handle: '@mari.fitness_',
    growth: '+18.400 seguidores',
    period: 'em 45 dias',
    text: 'Nunca imaginei que fosse tão simples. Meu engajamento triplicou e as marcas começaram a me procurar.',
  },
  {
    handle: '@investidor.real',
    growth: '+9.200 seguidores',
    period: 'em 30 dias',
    text: 'Já testei tudo: compra de seguidores, agências, cursos. Nada chegou perto do Conectagram.',
  },
  {
    handle: '@chef.urbano',
    growth: '+23.100 seguidores',
    period: 'em 60 dias',
    text: 'Meu restaurante lotou depois que meu perfil explodiu. Retorno do investimento em menos de 1 semana.',
  },
]

const BENEFITS = [
  'Crescimento orgânico real — sem bots',
  'Painel de controle simples e intuitivo',
  'Relatórios semanais de performance',
  'Suporte prioritário 7 dias por semana',
  'Funciona em qualquer nicho',
  'Cancelamento a qualquer momento',
]

const openCheckout = () => {
  const url = config.checkoutUrl || '#'
  window.location.href = url
}

// CTA verde com glow pulsante — reutilizado em múltiplos pontos
const GreenCTA = ({ label = 'Ativar Conectagram' }: { label?: string }) => (
  <motion.button
    onClick={openCheckout}
    className="w-full max-w-xs rounded-full py-5 font-mono text-sm font-bold tracking-widest text-black"
    style={{ backgroundColor: '#00FF41' }}
    animate={{
      boxShadow: [
        '0 0 16px rgba(0,255,65,0.4)',
        '0 0 32px rgba(0,255,65,0.75)',
        '0 0 16px rgba(0,255,65,0.4)',
      ],
    }}
    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    whileTap={{ scale: 0.97 }}
    aria-label={label}
  >
    {label} →
  </motion.button>
)

const Stage5SalesPage = () => (
  <div className="h-full w-full overflow-y-auto bg-black text-white">
    <div className="mx-auto flex max-w-[390px] flex-col gap-16 px-6 pb-20 pt-16">

      {/* ── HERO ── */}
      <SalesPageSection className="flex flex-col items-center gap-6 text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] text-hacker-green/70">
          SISTEMA CLASSIFICADO
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          O algoritmo não quer que você saiba disso.
        </h1>
        <p className="text-base leading-relaxed text-white/60">
          Descobrimos uma falha nos padrões de distribuição do Instagram. O Conectagram
          a usa para acelerar seu crescimento de forma silenciosa e sustentável.
        </p>
        <GreenCTA label="Quero crescer agora" />
        <p className="font-mono text-[11px] text-white/30">Sem fidelidade · Cancele quando quiser</p>
      </SalesPageSection>

      {/* ── PROBLEMA ── */}
      <SalesPageSection className="flex flex-col gap-5">
        <p className="font-mono text-[10px] tracking-widest text-white/30">O PROBLEMA</p>
        <h2 className="text-xl font-bold leading-snug">
          Você posta, trabalha duro — e ninguém vê.
        </h2>
        <p className="text-sm leading-relaxed text-white/60">
          Não é falta de talento. É que o algoritmo foi projetado para sufocar perfis menores
          e favorecer quem já tem audiência. Isso é intencional.
        </p>
        <ul className="flex flex-col gap-3">
          {[
            'Alcance caiu sem motivo aparente',
            'Posts bons ficam com 50 visualizações',
            'Concorrentes crescem sem conteúdo melhor',
            'Nenhuma estratégia "oficial" funciona de verdade',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-white/70">
              <span className="mt-0.5 text-danger">✕</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="rounded-xl border border-hacker-green/20 bg-hacker-green/5 p-4 text-center">
          <p className="font-mono text-2xl font-bold text-hacker-green">94%</p>
          <p className="mt-1 text-xs text-white/50">
            dos criadores nunca passam de 10k seguidores — não por falta de esforço.
          </p>
        </div>
      </SalesPageSection>

      {/* ── O SISTEMA ── */}
      <SalesPageSection className="flex flex-col gap-5">
        <p className="font-mono text-[10px] tracking-widest text-white/30">COMO O ALGORITMO FUNCIONA</p>
        <h2 className="text-xl font-bold leading-snug">
          O algoritmo decide quem cresce. Nós descobrimos como interferir nessa decisão.
        </h2>

        {/* Diagrama CSS simples */}
        <div className="flex flex-col gap-2 rounded-xl border border-white/8 bg-white/3 p-4">
          {[
            { label: 'Novo post publicado', color: 'bg-white/20' },
            { label: 'Janela de 30 min', color: 'bg-yellow-500/60', arrow: true },
            { label: 'Algoritmo mede engajamento inicial', color: 'bg-white/20' },
            { label: 'Conectagram amplifica nessa janela', color: 'bg-hacker-green/70', arrow: true },
            { label: 'Distribuição orgânica acelerada', color: 'bg-hacker-green' },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`w-full rounded-lg px-3 py-2 text-center font-mono text-[11px] text-black font-semibold ${step.color}`}>
                {step.label}
              </div>
              {step.arrow && (
                <span className="font-mono text-xs text-white/30">↓</span>
              )}
            </div>
          ))}
        </div>

        <p className="border-l-2 border-hacker-green/40 pl-4 text-sm italic text-white/50">
          "Não quebramos as regras. Usamos as regras que eles não divulgam."
          <span className="mt-1 block not-italic text-hacker-green/60">— CODE</span>
        </p>
      </SalesPageSection>

      {/* ── A SOLUÇÃO ── */}
      <SalesPageSection className="flex flex-col gap-5">
        <p className="font-mono text-[10px] tracking-widest text-white/30">A SOLUÇÃO</p>
        <h2 className="text-xl font-bold leading-snug">
          Conectagram: o sistema que trabalha enquanto você dorme.
        </h2>
        <div className="flex flex-col gap-4">
          {[
            { step: '01', title: 'Conecte seu perfil', desc: 'Setup em 5 minutos. Sem senha, sem acesso ao painel do Instagram.' },
            { step: '02', title: 'Ative o modo crescimento', desc: 'O sistema identifica a janela do algoritmo e amplifica cada post no momento certo.' },
            { step: '03', title: 'Acompanhe os resultados', desc: 'Painel com métricas em tempo real. Veja o crescimento acontecendo.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <span className="font-mono text-2xl font-bold text-hacker-green/30">{item.step}</span>
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-0.5 text-sm text-white/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SalesPageSection>

      {/* ── PROVA SOCIAL ── */}
      <SalesPageSection className="flex flex-col gap-5">
        <p className="font-mono text-[10px] tracking-widest text-white/30">RESULTADOS REAIS</p>
        <h2 className="text-xl font-bold">O que acontece depois de ativar.</h2>
        <div className="flex flex-col gap-4">
          {TESTIMONIALS.map((t, i) => (
            <SalesPageSection key={i} delay={i * 0.1} className="rounded-xl border border-white/8 p-4 bg-[#0D0D0D]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-hacker-green">{t.handle}</span>
                <div className="text-right">
                  <p className="font-mono text-sm font-bold text-white">{t.growth}</p>
                  <p className="font-mono text-[10px] text-white/30">{t.period}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/60">"{t.text}"</p>
            </SalesPageSection>
          ))}
        </div>
      </SalesPageSection>

      {/* ── OFERTA ── */}
      <SalesPageSection className="flex flex-col items-center gap-5 text-center">
        <p className="font-mono text-[10px] tracking-widest text-white/30">A OFERTA</p>
        <h2 className="text-xl font-bold">Acesso completo ao sistema.</h2>

        {/* Price card */}
        <motion.div
          className="w-full rounded-2xl border border-hacker-green/30 p-6"
          style={{ backgroundColor: '#071410' }}
          animate={{ borderColor: ['rgba(0,255,65,0.3)', 'rgba(0,255,65,0.6)', 'rgba(0,255,65,0.3)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="font-mono text-[11px] tracking-widest text-hacker-green/60">ASSINATURA MENSAL</p>
          <p className="mt-2 font-mono text-5xl font-bold text-hacker-green">R$89,90</p>
          <p className="font-mono text-sm text-white/40">/mês · sem fidelidade</p>
          <div className="my-5 h-px bg-white/8" />
          <ul className="flex flex-col gap-2.5 text-left">
            {BENEFITS.map((b, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                <span className="text-hacker-green">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <GreenCTA label="Ativar Conectagram" />
        <p className="font-mono text-[11px] text-white/30">
          Acesso imediato · Pagamento seguro · Cancele quando quiser
        </p>
      </SalesPageSection>

      {/* ── FAQ ── */}
      <SalesPageSection className="flex flex-col gap-5">
        <p className="font-mono text-[10px] tracking-widest text-white/30">DÚVIDAS FREQUENTES</p>
        <h2 className="text-xl font-bold">Tudo que você precisa saber.</h2>
        <FAQAccordion items={FAQ_ITEMS} />
      </SalesPageSection>

      {/* ── CTA FINAL ── */}
      <SalesPageSection className="flex flex-col items-center gap-5 text-center">
        <h2 className="text-2xl font-bold leading-tight">
          Seu próximo <span className="text-hacker-green">10k</span> está a um clique.
        </h2>
        <p className="text-sm text-white/50">
          Mais de 12.000 criadores já ativaram. Quanto tempo você ainda vai esperar?
        </p>
        <GreenCTA label="Ativar Conectagram" />
      </SalesPageSection>

      {/* ── FOOTER ── */}
      <footer className="flex flex-col items-center gap-3 border-t border-white/8 pt-8 text-center">
        <p className="font-mono text-[11px] text-white/30">© 2026 Conectagram. Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <button className="font-mono text-[10px] text-white/20 underline underline-offset-2">
            Termos de Uso
          </button>
          <button className="font-mono text-[10px] text-white/20 underline underline-offset-2">
            Privacidade
          </button>
        </div>
      </footer>
    </div>
  </div>
)

export default Stage5SalesPage
