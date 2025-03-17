import { Command } from 'commander';
import chalk from 'chalk';
import { getAvailableHooks } from '../utils/hooks';

export function listCommand(program: Command): void {
  program
    .command('list')
    .description('list all available hooks')
    .action(() => {
      const AVAILABLE_HOOKS = getAvailableHooks();
      
      console.log(chalk.bold('Available hooks:'));
      AVAILABLE_HOOKS.forEach(hook => {
        console.log(chalk.green(`- ${hook.name}: `) + chalk.white(hook.description));
      });
    });
}