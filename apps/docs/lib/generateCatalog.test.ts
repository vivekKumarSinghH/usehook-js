import { describe, it, expect } from 'vitest'
import { generateCatalog, getHookById } from './generateCatalog'
import { hooks } from 'usehook-js/registry'

describe('generateCatalog', () => {
  it('returns the real registry array', () => {
    expect(generateCatalog()).toEqual(hooks)
  })
})

describe('getHookById', () => {
  it('finds a real hook by id', () => {
    expect(getHookById('useLocalStorage')?.name).toBe('useLocalStorage')
  })

  it('returns undefined for an unknown id', () => {
    expect(getHookById('notReal')).toBeUndefined()
  })
})
