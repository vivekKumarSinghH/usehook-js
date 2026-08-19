import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage, readValue, writeValue } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns the initial value when nothing is stored yet', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))
    expect(result.current[0]).toBe(0)
  })

  it('reads an existing value from localStorage on mount', () => {
    window.localStorage.setItem('count', JSON.stringify(42))
    const { result } = renderHook(() => useLocalStorage('count', 0))
    expect(result.current[0]).toBe(42)
  })

  it('falls back to the initial value when stored JSON is corrupted', () => {
    window.localStorage.setItem('count', '{not valid json')
    const { result } = renderHook(() => useLocalStorage('count', 0))
    expect(result.current[0]).toBe(0)
  })

  it('updates state and persists when called with a direct value', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))
    act(() => {
      result.current[1](5)
    })
    expect(result.current[0]).toBe(5)
    expect(window.localStorage.getItem('count')).toBe('5')
  })

  it('updates state based on the previous value when called with an updater function', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))
    act(() => {
      result.current[1]((prev) => prev + 1)
    })
    act(() => {
      result.current[1]((prev) => prev + 1)
    })
    expect(result.current[0]).toBe(2)
    expect(window.localStorage.getItem('count')).toBe('2')
  })

  it('re-reads the persisted value on a fresh mount (round-trip)', () => {
    const first = renderHook(() => useLocalStorage('count', 0))
    act(() => {
      first.result.current[1](7)
    })
    first.unmount()
    const second = renderHook(() => useLocalStorage('count', 0))
    expect(second.result.current[0]).toBe(7)
  })

  it('keeps state correct even if persisting throws (e.g. quota exceeded)', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError')
    })
    const { result } = renderHook(() => useLocalStorage('count', 0))
    act(() => {
      result.current[1](9)
    })
    expect(result.current[0]).toBe(9)
    setItemSpy.mockRestore()
  })

  describe("readValue (SSR guard, tested directly — avoids fighting jsdom's global window)", () => {
    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('returns the initial value when window is undefined', () => {
      vi.stubGlobal('window', undefined)
      expect(readValue('count', 7)).toBe(7)
    })
  })

  describe('writeValue (SSR guard, tested directly)', () => {
    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('is a no-op when window is undefined — never throws', () => {
      vi.stubGlobal('window', undefined)
      expect(() => writeValue('count', 1)).not.toThrow()
    })
  })
})
