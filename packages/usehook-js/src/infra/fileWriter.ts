import { existsSync, mkdirSync, copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { TargetExistsError } from '../cli/errors'

export function getHooksSourceDir(): string {
  // This file sits two directory levels below the package root in every
  // context it runs in: `src/infra/` during dev/tests, and `dist/cli/` once
  // bundled by tsup into the CLI entry (esbuild bundling collapses every
  // imported module's `import.meta.url` to the single output file's URL) —
  // so the same "..", ".." resolution is correct both ways.
  const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
  return path.join(packageRoot, 'src', 'hooks')
}

export function writeHookFile(
  sourceFile: string,
  targetDir: string,
  options: { force?: boolean } = {}
): string {
  const sourcePath = path.join(getHooksSourceDir(), sourceFile)
  const destPath = path.join(targetDir, sourceFile)

  if (existsSync(destPath) && !options.force) {
    throw new TargetExistsError(destPath)
  }

  mkdirSync(targetDir, { recursive: true })
  copyFileSync(sourcePath, destPath)
  return destPath
}
