import { describe, it, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useLocalStorage, useFetch, useDebounce, useToggle } from './index'

describe('public entry (index.ts)', () => {
  it('re-exports useLocalStorage as a working hook', () => {
    window.localStorage.clear()
    const { result } = renderHook(() => useLocalStorage('smoke-test', 'default'))
    expect(result.current[0]).toBe('default')
    act(() => {
      result.current[1]('updated')
    })
    expect(result.current[0]).toBe('updated')
    expect(window.localStorage.getItem('smoke-test')).toBe('"updated"')
  })

  it('re-exports useFetch as a working hook', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) } as Response)
      )
    )
    const { result } = renderHook(() => useFetch('/api/smoke-test'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toEqual({ ok: true })
    vi.unstubAllGlobals()
  })

  it('re-exports useDebounce as a working hook', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
      initialProps: { value: 'a' },
    })
    rerender({ value: 'b' })
    act(() => vi.advanceTimersByTime(100))
    expect(result.current).toBe('b')
    vi.useRealTimers()
  })

  it('re-exports useToggle as a working hook', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current[0]).toBe(false)
    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(true)
  })
})
