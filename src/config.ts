// Centralizador de variáveis de ambiente — usar este arquivo em vez de import.meta.env diretamente
export const config = {
  checkoutUrl: import.meta.env.VITE_CHECKOUT_URL || '#',
  gtmId: import.meta.env.VITE_GTM_ID || '',
  videoBaseUrl: import.meta.env.VITE_VIDEO_BASE_URL || '',
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
} as const
