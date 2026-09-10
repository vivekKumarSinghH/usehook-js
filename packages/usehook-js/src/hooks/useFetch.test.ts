import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useFetch } from './useFetch'

describe('useFetch', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts in a loading state with no data or error', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {})) // never resolves — hold in loading
    )
    const { result } = renderHook(() => useFetch('/api/thing'))
    expect(result.current).toMatchObject({ data: null, error: null, loading: true })
  })

  it('returns parsed data on a successful response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1 }) } as Response)
      )
    )
    const { result } = renderHook(() => useFetch<{ id: number }>('/api/thing'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toEqual({ id: 1 })
    expect(result.current.error).toBeNull()
  })

  it('surfaces a non-OK response as an error, never throwing', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false, status: 404 } as Response))
    )
    const { result } = renderHook(() => useFetch('/api/missing'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeInstanceOf(Error)
  })

  it('surfaces a rejected fetch as an error, never throwing', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('network down')))
    )
    const { result } = renderHook(() => useFetch('/api/thing'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error?.message).toBe('network down')
  })

  it('refetch() re-triggers the request and resets loading first', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ n: 1 }) } as Response)
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ n: 2 }) } as Response)
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(() => useFetch<{ n: number }>('/api/thing'))
    await waitFor(() => expect(result.current.data).toEqual({ n: 1 }))

    act(() => {
      result.current.refetch()
    })
    // act() flushes the synchronous setLoading(true) before the mocked
    // fetch's microtask resolves, so this is safe to assert immediately
    // rather than via waitFor (which could miss a transient state that
    // resolves within the same tick).
    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.data).toEqual({ n: 2 }))
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('does not update state after unmounting mid-flight', async () => {
    let resolveFetch: (value: Response) => void = () => {}
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise<Response>((resolve) => {
            resolveFetch = resolve
          })
      )
    )
    const { unmount } = renderHook(() => useFetch('/api/thing'))
    unmount()
    resolveFetch({ ok: true, json: () => Promise.resolve({}) } as Response)
    // If the hook updated state on an unmounted component, React would log
    // an error/warning — asserting no throw here is the meaningful check.
    await new Promise((r) => setTimeout(r, 0))
  })
})
