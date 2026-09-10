'use client'

import { useCallback, useState } from 'react'

export function useToggle(initial = false): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initial)

  const toggle = useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  const setExplicit = useCallback((next: boolean) => {
    setValue(next)
  }, [])

  return [value, toggle, setExplicit]
}
