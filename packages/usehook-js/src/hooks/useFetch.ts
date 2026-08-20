'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseFetchResult<T> {
  data: T | null
  error: Error | null
  loading: boolean
  refetch: () => void
}

export function useFetch<T>(url: string, options?: RequestInit): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState(0)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(url, options)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return (await response.json()) as T
      })
      .then((result) => {
        if (!mountedRef.current) return
        setData(result)
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (!mountedRef.current) return
        setError(err instanceof Error ? err : new Error(String(err)))
        setLoading(false)
      })
  }, [url, version])

  const refetch = useCallback(() => {
    setVersion((v) => v + 1)
  }, [])

  return { data, error, loading, refetch }
}
