#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import ora from 'ora';
import Conf from 'conf';

const config = new Conf({ projectName: 'react-hooks-cli' });

const program = new Command();

program
    .name('react-hooks-cli')
    .description('CLI to add React hooks to your project')
    .version('0.1.0');

program
    .command('add <hook>')
    .description('Add a hook to your project')
    .action(async (hook: string) => {
        const spinner = ora('Fetching hook information').start();

        try {
            const registryUrl = config.get('registryUrl') as string || 'https://your-registry-url.com/hooks.json';
            const response = await axios.get(registryUrl);
            const hooks = response.data;

            spinner.succeed('Hook information fetched');

            const selectedHook = hooks.find((h: any) => h.name === hook);

            if (!selectedHook) {
                console.error(chalk.red(`Hook ${hook} not found in the registry`));
                return;
            }

            const { directory } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'directory',
                    message: 'Where would you like to add the hook? (e.g., src/hooks)',
                    default: 'src/hooks'
                }
            ]);

            spinner.start('Adding hook to your project');

            await fs.ensureDir(directory);
            const filePath = path.join(process.cwd(), directory, `${hook}.ts`);

            const hookContent = await axios.get(selectedHook.url);
            await fs.writeFile(filePath, hookContent.data);

            spinner.succeed(chalk.green(`Added ${hook} to ${filePath}`));
        } catch (error) {
            spinner.fail(chalk.red(`Failed to add hook: ${error.message}`));
        }
    });

program
    .command('init')
    .description('Initialize the CLI configuration')
    .action(async () => {
        const { registryUrl } = await inquirer.prompt([
            {
                type: 'input',
                name: 'registryUrl',
                message: 'Enter the URL of your hooks registry:',
                default: 'https://your-registry-url.com/hooks.json'
            }
        ]);

        config.set('registryUrl', registryUrl);
        console.log(chalk.green('Configuration saved successfully'));
    });

program.parse();