import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToggle } from './useToggle'

describe('useToggle', () => {
  it('defaults to false when no initial value is given', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current[0]).toBe(false)
  })

  it('starts at the given initial value', () => {
    const { result } = renderHook(() => useToggle(true))
    expect(result.current[0]).toBe(true)
  })

  it('flips the value when toggle is called', () => {
    const { result } = renderHook(() => useToggle(false))
    act(() => result.current[1]())
    expect(result.current[0]).toBe(true)
    act(() => result.current[1]())
    expect(result.current[0]).toBe(false)
  })

  it('sets an explicit value regardless of the current value', () => {
    const { result } = renderHook(() => useToggle(false))
    act(() => result.current[2](true))
    expect(result.current[0]).toBe(true)
    act(() => result.current[2](true))
    expect(result.current[0]).toBe(true)
    act(() => result.current[2](false))
    expect(result.current[0]).toBe(false)
  })

  it('keeps toggle and setValue referentially stable across re-renders', () => {
    const { result, rerender } = renderHook(() => useToggle())
    const [, firstToggle, firstSetValue] = result.current
    rerender()
    const [, secondToggle, secondSetValue] = result.current
    expect(secondToggle).toBe(firstToggle)
    expect(secondSetValue).toBe(firstSetValue)
  })
})
