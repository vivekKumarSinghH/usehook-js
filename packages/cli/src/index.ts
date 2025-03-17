#!/usr/bin/env node
import { Command } from 'commander';
import { addCommand } from './commands/add';
import { listCommand } from './commands/list';

const program = new Command();

program
  .name('add-hooks')
  .description('CLI to add React hooks to your project')
  .version('0.1.0');

// Register commands
addCommand(program);
listCommand(program);

program.parse();