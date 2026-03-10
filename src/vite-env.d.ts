/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHECKOUT_URL: string
  readonly VITE_GTM_ID: string
  readonly VITE_VIDEO_BASE_URL: string
  readonly VITE_DEBUG_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
