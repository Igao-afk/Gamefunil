import { useState, useEffect } from 'react'

// Retorna hora atual no fuso de Brasília (HH:MM)
const getBrasiliaTime = () =>
  new Date().toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
  })

// Simula a status bar do iOS com hora em tempo real (fuso Brasília)
const StatusBarIOS = () => {
  const [time, setTime] = useState(getBrasiliaTime)

  useEffect(() => {
    // Aguarda a virada do próximo minuto, depois atualiza a cada 60s
    // Evita 59 re-renders desnecessários por minuto (display só mostra HH:MM)
    const msUntilNextMinute = (60 - new Date().getSeconds()) * 1000
    let intervalId: ReturnType<typeof setInterval> | undefined

    const timeoutId = setTimeout(() => {
      setTime(getBrasiliaTime())
      intervalId = setInterval(() => setTime(getBrasiliaTime()), 60_000)
    }, msUntilNextMinute)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId !== undefined) clearInterval(intervalId)
    }
  }, [])

  return (
  <div className="flex w-full items-center justify-between px-6 pt-3 pb-1">
    {/* Hora */}
    <span className="font-semibold text-[15px] text-white tracking-tight">{time}</span>

    {/* Dynamic Island / notch placeholder */}
    <div className="h-[34px] w-[126px] rounded-full bg-black" />

    {/* Ícones direita */}
    <div className="flex items-center gap-[6px]">
      {/* Sinal celular */}
      <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
        <rect x="0" y="7" width="3" height="5" rx="0.5" />
        <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5" />
        <rect x="9" y="2" width="3" height="10" rx="0.5" />
        <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.35" />
      </svg>

      {/* WiFi */}
      <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
        <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
        <path
          d="M3.5 6.5C4.9 5.1 6.4 4.3 8 4.3s3.1.8 4.5 2.2"
          stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"
        />
        <path
          d="M1 4C3 2 5.4 1 8 1s5 1 7 3"
          stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"
        />
      </svg>

      {/* Bateria */}
      <div className="flex items-center gap-[1px]">
        <div className="relative h-[12px] w-[25px] rounded-[3px] border border-white/60 p-[2px]">
          <div className="h-full w-[70%] rounded-[1.5px] bg-white" />
        </div>
        <div className="h-[5px] w-[2px] rounded-r-full bg-white/50" />
      </div>
    </div>
  </div>
  )
}

export default StatusBarIOS
