import path from 'node:path'
import type { Command } from 'commander'
import { hooks } from '../../registry/hooks'
import type { HookMetadata } from '../../registry/types'
import { writeHookFile } from '../../infra/fileWriter'
import { InvalidHookIdError, TargetExistsError } from '../errors'

export function resolveHook(hookId: string, hookList: HookMetadata[] = hooks): HookMetadata {
  const hook = hookList.find((h) => h.id === hookId)
  if (!hook) {
    throw new InvalidHookIdError(
      hookId,
      hookList.map((h) => h.id)
    )
  }
  return hook
}

export function runAdd(
  hookId: string,
  options: { path?: string; force?: boolean }
): { writtenPath: string; importLine: string } {
  const hook = resolveHook(hookId)
  const targetDir = options.path ?? './hooks'
  const writtenPath = writeHookFile(hook.sourceFile, targetDir, { force: options.force })

  // Relative to cwd (not to targetDir's own string form) so an absolute
  // --path still produces a sensible import path instead of the literal
  // absolute path with a nonsensical "./" prefix glued on.
  const relativeFromCwd = path.relative(process.cwd(), path.resolve(targetDir))
  const normalizedDir = relativeFromCwd.split(path.sep).join('/')
  const importDir = normalizedDir.startsWith('.') ? normalizedDir : `./${normalizedDir}`
  const importLine = `import { ${hook.name} } from '${importDir}/${hookId}'`

  return { writtenPath, importLine }
}

export function registerAddCommand(program: Command): void {
  program
    .command('add <hookId>')
    .description("Copy a hook's source file into your project")
    .option('-p, --path <dir>', 'Directory to copy the hook into', './hooks')
    .option('-f, --force', 'Overwrite the target file if it already exists', false)
    .action((hookId: string, options: { path: string; force: boolean }) => {
      try {
        const { writtenPath, importLine } = runAdd(hookId, options)
        console.log(`Copied to ${writtenPath}`)
        console.log(`Add this import: ${importLine}`)
      } catch (err) {
        if (err instanceof InvalidHookIdError || err instanceof TargetExistsError) {
          console.error(`Error: ${err.message}`)
          process.exit(1)
          return
        }
        throw err
      }
    })
}
