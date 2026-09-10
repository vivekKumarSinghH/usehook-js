import { Command } from 'commander'
import { registerListCommand } from './commands/list'
import { registerAddCommand } from './commands/add'

const program = new Command()

program
  .name('usehook-js')
  .description('usehook-js CLI — list and copy React hooks')
  .version('0.0.0')

registerListCommand(program)
registerAddCommand(program)

program.parse(process.argv)
