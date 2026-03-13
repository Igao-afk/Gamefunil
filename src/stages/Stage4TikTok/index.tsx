import { motion } from 'framer-motion'
import TikTokFeedSimulator from '../../components/simulators/TikTokFeedSimulator'
import { useFunnelStore } from '../../store/funnelStore'
import { useAudio } from '../../hooks/useAudio'
import type { VideoConfig } from '../../types/funnel'

// Configuração dos 4 vídeos — src aponta para placeholders em /videos/
// Substitua pelos vídeos reais de prova social do Conectagram
const VIDEOS: VideoConfig[] = [
  {
    src: '/videos/codeVideo1.mp4',
    title: 'De 340 para 12k seguidores em 21 dias',
    description: 'Sem comprar seguidores. Sem bot. Só o método.',
    initialLikeCount: 8743,
    comments: [
      { username: '@carol.mkt', text: 'Que método é esse?? Preciso urgente 😱', likes: 312, avatarColor: '#E040FB' },
      { username: '@pedro_criador', text: 'Fiz igual e no 14º dia já tinha passado de 5k. Funciona mesmo.', likes: 874, avatarColor: '#29B6F6' },
      { username: '@ana.fitness__', text: 'Alguém sabe o nome do sistema que ele usa?', likes: 156, avatarColor: '#FF7043' },
      { username: '@code.system', text: '👆 Conectagram. Link na bio.', likes: 1203, avatarColor: '#00FF41' },
      { username: '@thiago.digital', text: 'Já perdi a conta de quantas vezes tentei crescer organicamente. Dessa vez tô testando isso', likes: 98, avatarColor: '#FFCA28' },
      { username: '@mariana_real', text: 'Achei que era mais um viral falso mas os prints são reais demais 👀', likes: 445, avatarColor: '#EF5350' },
      { username: '@bruna.conteudo', text: 'Comecei ontem com 890 seguidores. Já vou atualizando aqui nos comentários', likes: 203, avatarColor: '#26C6DA' },
      { username: '@vinicius.ads', text: 'Quanto tempo levou pra sair dos 340?', likes: 67, avatarColor: '#AB47BC' },
      { username: '@code.system', text: '↑ Os primeiros resultados aparecem entre 7 e 14 dias. Depende do nicho também.', likes: 891, avatarColor: '#00FF41' },
      { username: '@lari.moda', text: 'Tava prestes a pagar uma agência de R$2000/mês. Salvei essa thread 🙏', likes: 534, avatarColor: '#EC407A' },
      { username: '@daniel.foto', text: 'Nicho de fotografia funciona?', likes: 44, avatarColor: '#FFA726' },
      { username: '@code.system', text: '↑ Sim, funciona em qualquer nicho visual. Fotografia responde muito bem.', likes: 677, avatarColor: '#00FF41' },
      { username: '@jessica.nutri', text: 'Que absurdo esse crescimento. E o engajamento continua real?', likes: 289, avatarColor: '#66BB6A' },
      { username: '@rafael.tech', text: 'Seguidores comprados eu já tentei. Isso aqui é diferente, dá pra ver na qualidade dos comentários dele', likes: 412, avatarColor: '#29B6F6' },
      { username: '@cris.coach', text: 'Compartilhei no meu grupo de empreendedores. Todo mundo quer saber mais', likes: 178, avatarColor: '#E040FB' },
      { username: '@pablo.mkt', text: 'A parte que mais me convenceu foi o print do painel mostrando os dados reais', likes: 356, avatarColor: '#FF7043' },
      { username: '@nath.estilo', text: 'Esses 21 dias mudaram minha vida online literalmente', likes: 621, avatarColor: '#FFCA28' },
      { username: '@tomas.negócios', text: 'Alguém aqui assina há mais de 6 meses? Quero saber se sustenta', likes: 133, avatarColor: '#EF5350' },
      { username: '@code.system', text: '↑ Temos usuários ativos desde o lançamento. O algoritmo aprende seu perfil e melhora com o tempo.', likes: 1045, avatarColor: '#00FF41' },
      { username: '@fernanda.vlogs', text: 'Fui de 1.2k pra 7.8k em 30 dias. Não tem comparação com nada que já testei', likes: 987, avatarColor: '#26C6DA' },
      { username: '@gui.empreende', text: 'Achei caro no começo. Depois do primeiro mês nunca mais questionei o preço', likes: 743, avatarColor: '#AB47BC' },
      { username: '@lu.receitas', text: 'Minha conta de receitas cresceu mais em 2 semanas do que em 1 ano postando todo dia', likes: 1122, avatarColor: '#66BB6A' },
      { username: '@igor.startup', text: 'Esse sistema deveria custar 10x mais pelo que entrega', likes: 834, avatarColor: '#FFA726' },
      { username: '@mari.decor', text: 'Consegui minha primeira parceria de marca no 18º dia de uso 🎉', likes: 567, avatarColor: '#EC407A' },
      { username: '@joao.video', text: 'Preciso de mais proof. Tem algum grupo de usuários pra entrar em contato?', likes: 45, avatarColor: '#29B6F6' },
      { username: '@code.system', text: '↑ Entra no conectagram.com.br, tem depoimentos em vídeo na página.', likes: 892, avatarColor: '#00FF41' },
      { username: '@babi.fashion', text: 'Já indiquei pra 4 amigas. Todas com resultado positivo em menos de 3 semanas', likes: 445, avatarColor: '#E040FB' },
      { username: '@diego.personal', text: 'Crescimento orgânico real é isso. Meus clientes chegam pelo perfil agora', likes: 678, avatarColor: '#FF7043' },
      { username: '@bia.artesanato', text: 'Nunca imaginei que artesanato ia explodir no IG. Obrigada @code.system', likes: 312, avatarColor: '#FFCA28' },
      { username: '@rafa.games', text: 'Achei que era só pra nicho de negócios mas funciona em games também. Top', likes: 234, avatarColor: '#EF5350' },
      { username: '@carol.yoga', text: 'Terceira semana usando. Acabei de fechar minha primeira turma de yoga online', likes: 891, avatarColor: '#26C6DA' },
      { username: '@henrique.foto', text: 'Fotografei 3 eventos esse mês por causa do alcance que o perfil ganhou', likes: 523, avatarColor: '#AB47BC' },
      { username: '@nina.beauty', text: 'Minha renda do IG dobrou desde que comecei. Não tem como não recomendar', likes: 764, avatarColor: '#66BB6A' },
      { username: '@mateus.dev', text: 'Fiz análise dos dados: engajamento médio subiu 340% em 30 dias', likes: 1203, avatarColor: '#FFA726' },
      { username: '@code.system', text: 'Obrigado a todos que compartilharam os resultados aqui 🙏 Isso é o que nos motiva a continuar', likes: 2341, avatarColor: '#00FF41' },
    ],
  },
  {
    src: '/videos/codeVideo2.mp4',
    title: 'Como o algoritmo funciona de verdade',
    description: 'O que eles não te contam nas aulas de marketing.',
    initialLikeCount: 14201,
    comments: [
      { username: '@lucas.growth', text: 'Essa janela de 30 min que ele fala é REAL. Testei ontem e meu post explodiu', likes: 2341, avatarColor: '#26C6DA' },
      { username: '@prof_vanessa', text: 'Estudo algoritmos há 3 anos e confirmo tudo isso aqui. É exatamente assim.', likes: 1876, avatarColor: '#AB47BC' },
      { username: '@rafa.design', text: 'Então é por isso que meus posts às 7h da manhã nunca pegavam…', likes: 934, avatarColor: '#FF7043' },
      { username: '@bela.nutrição', text: 'Meu Deus acabei de entender porque meu perfil travou nos 800', likes: 567, avatarColor: '#66BB6A' },
      { username: '@joao_empreende', text: 'Conteúdo de R$5000 sendo dado de graça aqui 🫡', likes: 3102, avatarColor: '#FFA726' },
      { username: '@gi.copywriter', text: 'Compartilhei com toda a minha mentoria. Obrigada @code.system', likes: 712, avatarColor: '#EC407A' },
      { username: '@code.system', text: 'A janela crítica começa logo após a publicação. É aí que o Conectagram age.', likes: 1876, avatarColor: '#00FF41' },
      { username: '@camila.mkt', text: 'Sempre soube que tinha algo errado quando postava de manhã e não engajava. Agora entendi', likes: 445, avatarColor: '#E040FB' },
      { username: '@leo.digital', text: 'O que mais me chocou foi descobrir que o horário que eu achava ideal era o pior possível', likes: 789, avatarColor: '#29B6F6' },
      { username: '@tati.conteudo', text: 'Isso explica POR QUE meus posts bons ficavam com 60 views. Era o timing mesmo', likes: 1023, avatarColor: '#FFCA28' },
      { username: '@pedro.coach', text: 'Passei 2 anos tomando conselho de guru de instagram e nenhum falou isso', likes: 1567, avatarColor: '#EF5350' },
      { username: '@code.system', text: '↑ O algoritmo muda constantemente. O que os gurus ensinam já está desatualizado.', likes: 2134, avatarColor: '#00FF41' },
      { username: '@nanda.loja', text: 'Mandei esse vídeo pro meu marido e ele me olhou diferente kkkkk "você tava certa"', likes: 3421, avatarColor: '#26C6DA' },
      { username: '@rodrigo.ads', text: 'Faz sentido total. O algoritmo precisa de sinal inicial forte pra distribuir', likes: 678, avatarColor: '#AB47BC' },
      { username: '@sol.receitas', text: 'Isso aqui é literalmente o que nenhuma mentoria de R$5k ensina', likes: 2890, avatarColor: '#FF7043' },
      { username: '@kaio.tech', text: 'Trabalho com dados e posso confirmar: esse comportamento do algoritmo está documentado internamente no Meta', likes: 1234, avatarColor: '#66BB6A' },
      { username: '@ana.influencer', text: 'Por isso que criadores menores nunca conseguem alcançar os maiores sem ajuda externa', likes: 987, avatarColor: '#FFA726' },
      { username: '@code.system', text: '↑ Exato. O sistema foi projetado para manter quem já tem audiência. O Conectagram inverte essa lógica.', likes: 3102, avatarColor: '#00FF41' },
      { username: '@pri.estilo', text: 'Nunca vi ninguém explicar isso de forma tão clara. Salvei esse vídeo', likes: 445, avatarColor: '#EC407A' },
      { username: '@marco.empreende', text: 'Usava 5 ferramentas diferentes de agendamento. Todas inúteis sem entender isso aqui', likes: 567, avatarColor: '#E040FB' },
      { username: '@luca.fitness', text: 'Vídeo mais importante que já vi sobre crescimento no IG. Sem exagero', likes: 1789, avatarColor: '#29B6F6' },
      { username: '@dani.arte', text: 'Me sinto enganada por todos os cursos que fiz. Esse conteúdo aqui vale mais', likes: 834, avatarColor: '#FFCA28' },
      { username: '@fel.negócios', text: 'Quanto custa o Conectagram? Quero entrar agora', likes: 123, avatarColor: '#EF5350' },
      { username: '@code.system', text: '↑ R$89,90/mês. Acesso em conectagram.com.br. Sem fidelidade, cancela quando quiser.', likes: 2567, avatarColor: '#00FF41' },
      { username: '@isa.vlogs', text: 'Testei postar às 22h depois de ver esse vídeo. 4x mais alcance que o normal 😭', likes: 1456, avatarColor: '#26C6DA' },
      { username: '@bil.photo', text: 'Esse cara sabe demais. Onde ele aprendeu isso tudo?', likes: 234, avatarColor: '#AB47BC' },
      { username: '@gio.marketing', text: 'Enviei pra minha equipe inteira. Reunião cancelada, vídeo obrigatório kkk', likes: 891, avatarColor: '#FF7043' },
      { username: '@cris.saude', text: 'Minha conta de saúde mental cresceu 3x depois que entendi e apliquei isso', likes: 1123, avatarColor: '#66BB6A' },
      { username: '@tom.startup', text: 'Mais valioso que qualquer curso pago que fiz sobre Instagram', likes: 743, avatarColor: '#FFA726' },
      { username: '@lu.empreende', text: 'Finalmente alguém que explica o mecanismo e não só diz "poste mais"', likes: 2134, avatarColor: '#EC407A' },
      { username: '@code.system', text: 'O algoritmo é uma ferramenta. Quem entende como ele funciona, vence. 🎯', likes: 4521, avatarColor: '#00FF41' },
      { username: '@fer.moda', text: 'Esse vídeo mudou minha estratégia completamente. Obrigada por ser transparente', likes: 678, avatarColor: '#E040FB' },
      { username: '@wal.personal', text: 'Já salvei, compartilhei e assisti 3 vezes. Conteúdo ouro', likes: 1345, avatarColor: '#29B6F6' },
      { username: '@teo.games', text: 'Nem os maiores criadores de conteúdo sobre IG falam isso tão abertamente', likes: 987, avatarColor: '#FFCA28' },
      { username: '@maya.decor', text: 'Meu perfil de decoração travou nos 2k por 8 meses. Agora tá em 11k. Esse vídeo foi o gatilho', likes: 1789, avatarColor: '#EF5350' },
    ],
  },
  {
    src: '/videos/codeVideo3.mp4',
    title: 'Perfil nicho saúde: +4.800 em 2 semanas',
    description: 'Resultados reais. Print do painel mostrado ao vivo.',
    initialLikeCount: 6382,
    comments: [
      { username: '@dra.camila', text: 'Sou médica e tava com 620 seguidores há 1 ano. Usei o Conectagram e hoje tenho 9.400 😭', likes: 4521, avatarColor: '#29B6F6' },
      { username: '@nutrifit.br', text: 'Print ao vivo sem corte. Isso não é montagem gente', likes: 1123, avatarColor: '#66BB6A' },
      { username: '@renato.coach', text: 'Nicho de saúde é o mais difícil de crescer no IG. Impressionante esses números', likes: 876, avatarColor: '#FF7043' },
      { username: '@tati.pilates', text: 'Testando a partir de hoje. Volto aqui em 2 semanas pra contar 🙏', likes: 345, avatarColor: '#E040FB' },
      { username: '@marcos.pessoal', text: 'Qual o link pra entrar?', likes: 89, avatarColor: '#FFCA28' },
      { username: '@code.system', text: '↑ conectagram.com.br', likes: 2034, avatarColor: '#00FF41' },
      { username: '@psico.ana', text: 'Psicóloga aqui. Minha conta saiu de 400 pra 6.200 em 3 semanas. Confirmando os dados', likes: 3456, avatarColor: '#AB47BC' },
      { username: '@edu.nutri', text: 'Nicho de nutrição é muito competitivo. Esses números em 2 semanas são absurdos', likes: 1234, avatarColor: '#26C6DA' },
      { username: '@code.system', text: '↑ Quanto mais nichado o perfil, mais rápido o algoritmo entrega para o público certo.', likes: 1876, avatarColor: '#00FF41' },
      { username: '@vivi.fisio', text: 'Fisioterapeuta com 3 anos de perfil parado nos 800. Entrei hoje. Obrigada pela prova', likes: 567, avatarColor: '#EF5350' },
      { username: '@ale.farmacia', text: 'Farmacêutica aqui. Nicho regulado é ainda mais difícil. Esse resultado em saúde geral me convenceu', likes: 445, avatarColor: '#FFA726' },
      { username: '@ju.esporte', text: 'Treino funcional, fui de 1.1k pra 5.8k em 20 dias. Os alunos começaram a me reconhecer na rua', likes: 2134, avatarColor: '#66BB6A' },
      { username: '@dr.marcus', text: 'Médico também. A ética do CFM não deixa fazer publi mas crescimento orgânico é permitido. Perfeito', likes: 987, avatarColor: '#29B6F6' },
      { username: '@code.system', text: '↑ Crescimento orgânico 100% dentro das diretrizes. Nada que viole os termos de nenhuma plataforma.', likes: 1567, avatarColor: '#00FF41' },
      { username: '@nat.yoga', text: 'Instrutora de yoga. Meus retiros lotaram depois que o perfil cresceu. ROI imediato', likes: 789, avatarColor: '#E040FB' },
      { username: '@carol.emagre', text: 'Especialista em emagrecimento. Fui de 2k pra 14k. Minha lista de espera nunca foi tão grande', likes: 3102, avatarColor: '#EC407A' },
      { username: '@bio.rafael', text: 'Biólogo. Achei que ciência não engajava. Meu perfil de divulgação científica explodiu', likes: 678, avatarColor: '#FF7043' },
      { username: '@patri.mentoria', text: 'Consegui 12 clientes novos de mentoria só no primeiro mês. Investimento recuperado em 3 dias', likes: 2345, avatarColor: '#FFCA28' },
      { username: '@code.system', text: '↑ Isso é o que nos motiva. Não é só sobre seguidores — é sobre resultado de negócio real. 💪', likes: 4102, avatarColor: '#00FF41' },
      { username: '@leo.esportivo', text: 'Personal trainer. Lotei minha agenda em 10 dias depois de entrar no Conectagram', likes: 1890, avatarColor: '#26C6DA' },
      { username: '@helen.nutri', text: 'Consultório de nutrição online. Nunca tive tanta demanda. Precisei contratar assistente', likes: 1234, avatarColor: '#AB47BC' },
      { username: '@rob.fisico', text: 'Fisiculturista. O alcance do meu perfil triplicou. Patrocínio chegou na 4ª semana', likes: 876, avatarColor: '#EF5350' },
      { username: '@san.terapia', text: 'Terapeuta holística. As pessoas dizem que me encontraram no IG. Nunca tinha acontecido antes', likes: 543, avatarColor: '#FFA726' },
      { username: '@lu.corrida', text: 'Coach de corrida. Meu grupo online saiu de 40 pra 380 membros em 1 mês', likes: 1678, avatarColor: '#66BB6A' },
      { username: '@pedro.medico', text: 'A plataforma entende que saúde precisa de credibilidade. Os seguidores são qualificados', likes: 789, avatarColor: '#29B6F6' },
      { username: '@code.system', text: '↑ O algoritmo entrega para quem realmente quer aquele conteúdo. Seguidores que viram clientes.', likes: 2890, avatarColor: '#00FF41' },
      { username: '@cla.estetica', text: 'Esteticista. Minha clínica agenda lotada. Tudo pelo IG agora', likes: 934, avatarColor: '#E040FB' },
      { username: '@teo.esportes', text: 'Professor de natação. Fui de 300 a 4.100 em 18 dias. Turmas lotadas pela primeira vez', likes: 1123, avatarColor: '#EC407A' },
      { username: '@gi.saude', text: 'Enfermeira. Meu conteúdo sobre saúde preventiva finalmente está chegando em quem precisa', likes: 567, avatarColor: '#FF7043' },
      { username: '@max.corpo', text: 'Osteopata. Clientes me perguntam como apareci no feed deles. Respondo: algoritmo 😂', likes: 445, avatarColor: '#FFCA28' },
      { username: '@bia.pilates', text: 'Studio de pilates. 23 alunas novas esse mês. Tudo vindo do Instagram', likes: 1890, avatarColor: '#EF5350' },
      { username: '@code.system', text: 'Saúde é o nicho com maior potencial de impacto real. Fico feliz em ver vocês ajudando mais pessoas 🙏', likes: 5234, avatarColor: '#00FF41' },
      { username: '@lara.nutri', text: 'Atendo online agora pra todo Brasil. Era impossível sem esse alcance', likes: 2134, avatarColor: '#26C6DA' },
      { username: '@thais.coach', text: 'Vou postar meu resultado aqui em 2 semanas. Entrei hoje com 890 seguidores', likes: 312, avatarColor: '#AB47BC' },
      { username: '@dani.wellness', text: 'Minha comunidade de bem-estar saiu de 500 pra 8.900. As pessoas me param na rua agora', likes: 3456, avatarColor: '#66BB6A' },
    ],
  },
  {
    src: '/videos/codeVideo4.mp4',
    title: 'Acesso ao sistema completo',
    description: 'Veja o painel e todas as funcionalidades.',
    initialLikeCount: 21056,
    comments: [
      { username: '@felipe.ads', text: 'O painel é muito limpo. Uso há 3 meses e nunca tive problema', likes: 1892, avatarColor: '#29B6F6' },
      { username: '@karina.social', text: 'A parte de relatório semanal me ajudou a entender quando postar. Game changer', likes: 2341, avatarColor: '#EC407A' },
      { username: '@igor.creator', text: 'R$89 por mês com esse resultado? Tá de brincadeira 😂', likes: 3456, avatarColor: '#FFA726' },
      { username: '@sabrina.loja', text: 'Minha loja saiu de 200 para 8k em 40 dias. Vendo muito mais pelo IG agora', likes: 5102, avatarColor: '#66BB6A' },
      { username: '@leo.mkt', text: 'Cancelamento sem burocracia também é um diferencial enorme', likes: 678, avatarColor: '#AB47BC' },
      { username: '@clara.estudio', text: 'Assino há 5 meses e nunca precisei cancelar porque os resultados são constantes 🔥', likes: 4231, avatarColor: '#EF5350' },
      { username: '@code.system', text: 'Mostrando o painel completo sem corte. Transparência total com quem confia no nosso trabalho.', likes: 3102, avatarColor: '#00FF41' },
      { username: '@dan.negócios', text: 'A funcionalidade de agendamento integrado ao horário de pico é genial', likes: 1234, avatarColor: '#E040FB' },
      { username: '@bia.empreende', text: 'Testei 4 ferramentas antes dessa. Nenhuma tinha relatório tão detalhado', likes: 876, avatarColor: '#26C6DA' },
      { username: '@code.system', text: '↑ Cada dado do relatório tem uma ação sugerida. Não é só número, é direção.', likes: 1567, avatarColor: '#00FF41' },
      { username: '@gab.marketing', text: 'O suporte respondeu minha dúvida em 8 minutos. Isso não existe em outras plataformas', likes: 987, avatarColor: '#FF7043' },
      { username: '@rosi.loja', text: 'Minha loja de roupas saiu do vermelho depois que o IG virou canal de vendas sério', likes: 2134, avatarColor: '#FFCA28' },
      { username: '@paul.foto', text: 'Fotógrafo freelance. Lotei minha agenda pra 3 meses pela primeira vez na carreira', likes: 1678, avatarColor: '#EF5350' },
      { username: '@code.system', text: '↑ Resultados assim são o combustível do nosso trabalho. Parabéns pela persistência! 🎉', likes: 2345, avatarColor: '#00FF41' },
      { username: '@vi.fashion', text: 'Influenciadora micro aqui. Primeiro contrato de publi chegou no 22º dia de uso', likes: 3456, avatarColor: '#AB47BC' },
      { username: '@cel.chef', text: 'Chef de cozinha. Meu delivery dobrou porque as pessoas me conhecem do IG agora', likes: 1890, avatarColor: '#26C6DA' },
      { username: '@jo.arq', text: 'Arquiteta. Projeto novo todo mês vindo pelo perfil. Nunca precisei de indicação', likes: 2567, avatarColor: '#FF7043' },
      { username: '@mat.academia', text: 'Dono de academia. 34 matrículas novas em 1 mês. Tudo pelo Instagram', likes: 4102, avatarColor: '#66BB6A' },
      { username: '@code.system', text: '↑ Quando o perfil cresce certo, vira canal de aquisição de cliente. É isso que o Conectagram faz.', likes: 3789, avatarColor: '#00FF41' },
      { username: '@amanda.decor', text: 'Decoradora de interiores. Projeto com maior ticket que já fechei veio pelo IG depois do Conectagram', likes: 1345, avatarColor: '#EC407A' },
      { username: '@davi.musica', text: 'Músico independente. Shows marcados pela DM do Instagram. Nunca imaginei isso', likes: 789, avatarColor: '#FFA726' },
      { username: '@carol.pet', text: 'Pet shop. Fui de 500 pra 9.200 seguidores. Agendamentos online lotados', likes: 1567, avatarColor: '#E040FB' },
      { username: '@ale.advocacia', text: 'Advogado. OAB permite presença digital. Fui de 300 pra 7.100 e captei 4 clientes novos', likes: 2134, avatarColor: '#29B6F6' },
      { username: '@code.system', text: '↑ Profissões liberais têm ótima resposta. O público qualificado encontra quem precisa.', likes: 2890, avatarColor: '#00FF41' },
      { username: '@mi.artesanato', text: 'Faturei R$8.400 em 1 mês de vendas pelo IG. Antes era R$600 média', likes: 3102, avatarColor: '#FFCA28' },
      { username: '@tony.barber', text: 'Barbeiro. Agenda cheia até o fim do mês. Clientes novos todo dia pelo perfil', likes: 1234, avatarColor: '#EF5350' },
      { username: '@pri.consultoria', text: 'Consultora de RH. Primeiro contrato enterprise veio depois do crescimento do perfil', likes: 1890, avatarColor: '#26C6DA' },
      { username: '@nico.games', text: 'Streamer pequeno. Passei de 400 pra 11k no IG. Crescimento no Twitch veio junto', likes: 2345, avatarColor: '#AB47BC' },
      { username: '@code.system', text: 'Ver vocês crescendo e transformando isso em negócio real é o motivo de tudo. Obrigado pela confiança 🙏', likes: 6234, avatarColor: '#00FF41' },
      { username: '@isa.eventos', text: 'Cerimonialista. Agenda lotada por 6 meses. Precisei contratar 2 assistentes', likes: 2789, avatarColor: '#FF7043' },
      { username: '@edu.financas', text: 'Educador financeiro. Minha mentoria de R$2k encheu em 48h depois do perfil explodir', likes: 3456, avatarColor: '#66BB6A' },
      { username: '@nati.coach', text: 'Coach de carreira. 18 clientes novos em 1 mês. Nunca tinha tido tanta demanda', likes: 1678, avatarColor: '#FFA726' },
      { username: '@rafa.imob', text: 'Corretor de imóveis. Leads qualificados todos os dias pelo IG. Melhor investimento do ano', likes: 2134, avatarColor: '#EC407A' },
      { username: '@ju.maquiagem', text: 'Maquiadora. Agenda lotada, workshop online com 80 alunas e tudo começou com esse sistema', likes: 4567, avatarColor: '#E040FB' },
      { username: '@code.system', text: 'Cada resultado aqui é uma vida transformada. É por isso que fazemos o que fazemos. 💚', likes: 7891, avatarColor: '#00FF41' },
    ],
  },
]

const Stage4TikTok = () => {
  const advanceStage = useFunnelStore((s) => s.advanceStage)
  const { stopAll } = useAudio()

  const handleCTA = () => {
    stopAll()
    advanceStage()
  }

  return (
    <motion.div
      className="relative h-full w-full bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <TikTokFeedSimulator videos={VIDEOS} onCTAClick={handleCTA} />
    </motion.div>
  )
}

export default Stage4TikTok
