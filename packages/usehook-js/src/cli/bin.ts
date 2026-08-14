import { Command } from 'commander'
import { registerListCommand } from './commands/list'

const program = new Command()

program
  .name('usehook-js')
  .description('usehook-js CLI — list and copy React hooks')
  .version('0.0.0')

registerListCommand(program)

program.parse(process.argv)
