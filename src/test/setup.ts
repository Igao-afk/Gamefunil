import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Howler globally — não funciona em jsdom
vi.mock('howler', () => ({
  Howl: vi.fn().mockImplementation(() => ({
    play: vi.fn(),
    stop: vi.fn(),
    pause: vi.fn(),
    fade: vi.fn(),
    volume: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  })),
  Howler: {
    volume: vi.fn(),
  },
}))

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock })
