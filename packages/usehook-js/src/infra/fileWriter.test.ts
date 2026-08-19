import { describe, it, expect, afterEach } from 'vitest'
import { mkdtempSync, rmSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { getHooksSourceDir, writeHookFile } from './fileWriter'
import { TargetExistsError } from '../cli/errors'

describe('getHooksSourceDir', () => {
  it('resolves to a real src/hooks directory containing useLocalStorage.ts', () => {
    const dir = getHooksSourceDir()
    expect(existsSync(path.join(dir, 'useLocalStorage.ts'))).toBe(true)
  })
})

describe('writeHookFile', () => {
  let tempDir: string

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true })
  })

  it('copies the real source file byte-identically into a fresh target directory', () => {
    tempDir = mkdtempSync(path.join(tmpdir(), 'usehook-js-'))
    const targetDir = path.join(tempDir, 'hooks')

    const written = writeHookFile('useLocalStorage.ts', targetDir)

    const original = readFileSync(path.join(getHooksSourceDir(), 'useLocalStorage.ts'))
    expect(readFileSync(written)).toEqual(original)
  })

  it('throws TargetExistsError on a second write without force, leaving the file untouched', () => {
    tempDir = mkdtempSync(path.join(tmpdir(), 'usehook-js-'))
    const targetDir = path.join(tempDir, 'hooks')
    writeHookFile('useLocalStorage.ts', targetDir)
    const before = readFileSync(path.join(targetDir, 'useLocalStorage.ts'))

    expect(() => writeHookFile('useLocalStorage.ts', targetDir)).toThrow(TargetExistsError)
    expect(readFileSync(path.join(targetDir, 'useLocalStorage.ts'))).toEqual(before)
  })

  it('overwrites when force is true', () => {
    tempDir = mkdtempSync(path.join(tmpdir(), 'usehook-js-'))
    const targetDir = path.join(tempDir, 'hooks')
    writeHookFile('useLocalStorage.ts', targetDir)

    expect(() => writeHookFile('useLocalStorage.ts', targetDir, { force: true })).not.toThrow()
  })
})
