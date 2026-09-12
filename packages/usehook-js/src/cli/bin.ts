import { Command } from 'commander'
import { registerListCommand } from './commands/list'
import { registerAddCommand } from './commands/add'

const program = new Command()

program
  .name('usehookify')
  .description('usehookify CLI — list and copy React hooks')
  .version('1.0.0')

registerListCommand(program)
registerAddCommand(program)

program.parse(process.argv)
