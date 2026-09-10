import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('a', 300))
    expect(result.current).toBe('a')
  })

  it('returns the latest value only after the delay elapses', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })
    rerender({ value: 'b' })
    act(() => vi.advanceTimersByTime(299))
    expect(result.current).toBe('a') // not yet
    act(() => vi.advanceTimersByTime(1))
    expect(result.current).toBe('b')
  })

  it('only keeps the last value when changed rapidly within the delay window', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })
    rerender({ value: 'b' })
    act(() => vi.advanceTimersByTime(150))
    rerender({ value: 'c' }) // resets the timer before 'b' ever fires
    act(() => vi.advanceTimersByTime(150))
    expect(result.current).toBe('a') // still not settled — only 150ms since 'c'
    act(() => vi.advanceTimersByTime(150))
    expect(result.current).toBe('c') // 'b' was skipped entirely
  })

  it('does not update after unmounting mid-delay', () => {
    vi.useFakeTimers()
    const { unmount } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })
    unmount()
    expect(() => act(() => vi.advanceTimersByTime(300))).not.toThrow()
  })
})
