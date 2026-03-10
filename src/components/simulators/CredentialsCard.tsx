import { motion } from 'framer-motion'

interface CredentialsCardProps {
  username: string
  password: string
  onAccess: () => void
}

const CredentialsCard = ({ username, password, onAccess }: CredentialsCardProps) => (
  <div className="w-full max-w-[280px]">
    {/* Card com borda verde pulsando */}
    <motion.div
      className="relative rounded-xl p-4"
      style={{ backgroundColor: '#0D1F17' }}
      animate={{
        boxShadow: [
          '0 0 0 1px rgba(0,255,65,0.3)',
          '0 0 0 2px rgba(0,255,65,0.6)',
          '0 0 0 1px rgba(0,255,65,0.3)',
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Badge topo */}
      <div className="mb-3 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-hacker-green" />
        <span className="font-mono text-[10px] tracking-widest text-hacker-green/70">
          ACESSO CRIPTOGRAFADO
        </span>
      </div>

      {/* Credenciais */}
      <div className="space-y-3">
        <div>
          <p className="mb-1 font-mono text-[10px] text-white/30">USUÁRIO</p>
          <p className="font-mono text-sm tracking-wider text-white">{username}</p>
        </div>
        <div className="h-px bg-hacker-green/10" />
        <div>
          <p className="mb-1 font-mono text-[10px] text-white/30">SENHA</p>
          <p className="font-mono text-sm tracking-wider text-hacker-green">{password}</p>
        </div>
      </div>
    </motion.div>

    {/* Botão de acesso */}
    <motion.button
      onClick={onAccess}
      className="mt-3 w-full rounded-xl py-4 font-mono text-sm font-bold tracking-widest text-black transition-opacity active:opacity-80"
      style={{ backgroundColor: '#00FF41' }}
      animate={{
        boxShadow: [
          '0 0 12px rgba(0,255,65,0.4)',
          '0 0 24px rgba(0,255,65,0.7)',
          '0 0 12px rgba(0,255,65,0.4)',
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      aria-label="Acessar TikTok secreto"
    >
      ACESSAR TIKTOK SECRETO →
    </motion.button>
  </div>
)

export default CredentialsCard
