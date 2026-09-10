import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { hooks } from './hooks'

const __dirname = dirname(fileURLToPath(import.meta.url))

describe('hooks registry', () => {
  it('contains a registered entry for every currently-implemented hook', () => {
    expect(hooks.map((h) => h.id)).toEqual([
      'useLocalStorage',
      'useFetch',
      'useDebounce',
      'useToggle',
    ])
  })

  it('has no duplicate ids', () => {
    const ids = hooks.map((h) => h.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("every entry's sourceFile resolves to a real file on disk (BR-1/FC-1 gate)", () => {
    for (const hook of hooks) {
      const sourcePath = resolve(__dirname, '..', 'hooks', hook.sourceFile)
      expect(
        existsSync(sourcePath),
        `${hook.id}: sourceFile "${hook.sourceFile}" does not exist`
      ).toBe(true)
    }
  })
})
