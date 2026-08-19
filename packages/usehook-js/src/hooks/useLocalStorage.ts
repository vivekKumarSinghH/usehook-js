'use client'

import { useCallback, useState } from 'react'

export type SetValue<T> = T | ((prev: T) => T)

export function readValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') return initialValue // SSR guard
  try {
    const stored = window.localStorage.getItem(key)
    return stored ? (JSON.parse(stored) as T) : initialValue
  } catch {
    return initialValue // corrupt/foreign data in that key must not crash the caller
  }
}

export function writeValue<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return // SSR guard — no-op if ever called server-side
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Quota exceeded, storage disabled, or a serialization error — in-memory
    // state already updated by the caller; only persistence silently fails,
    // matching this hook's contract of never throwing into the caller's
    // render/update path.
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => readValue(key, initialValue))

  const setValue = useCallback(
    (value: SetValue<T>) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value
        writeValue(key, next)
        return next
      })
    },
    [key]
  )

  return [storedValue, setValue]
}
