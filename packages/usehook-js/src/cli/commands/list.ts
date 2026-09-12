import type { Command } from 'commander'
import { hooks } from '../../registry/hooks'
import type { HookMetadata } from '../../registry/types'

export function printHookList(hookList: HookMetadata[] = hooks): void {
  if (hookList.length === 0) {
    console.log('No hooks available yet.')
    return
  }
  for (const hook of hookList) {
    console.log(`${hook.id}\t${hook.name}\t${hook.category}\t${hook.description}`)
  }
}

export function registerListCommand(program: Command): void {
  program
    .command('list')
    .description('List every hook available in usehookify')
    .action(() => printHookList())
}
