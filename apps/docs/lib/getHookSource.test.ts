import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { getHookSource } from './getHookSource'
import { getHookById } from './generateCatalog'

describe('getHookSource', () => {
  it('reads the real hook source, byte-identical to the package file on disk', () => {
    const hook = getHookById('useLocalStorage')!
    const expected = readFileSync(
      path.resolve(process.cwd(), '../../packages/usehook-js/src/hooks/useLocalStorage.ts'),
      'utf-8'
    )
    expect(getHookSource(hook)).toBe(expected)
  })
})
