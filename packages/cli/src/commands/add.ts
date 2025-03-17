import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { isTypeScriptProject } from '../utils/project';
import { getAvailableHooks } from '../utils/hooks';

export function addCommand(program: Command): void {
  program
    .command('add')
    .description('add hooks to your project')
    .option('-p, --path <path>', 'the path to add the hooks to', 'src/hooks')
    .action(async (requestedHooks: string[], options: { path: string }) => {
      try {
        const AVAILABLE_HOOKS = getAvailableHooks();
        
        // If no hooks specified, prompt for selection
        if (!requestedHooks?.length) {
          const { selectedHooks } = await inquirer.prompt({
            type: 'checkbox',
            name: 'selectedHooks',
            message: 'Which hooks would you like to add?',
            choices: AVAILABLE_HOOKS.map(hook => ({
              name: `${hook.name} - ${hook.description}`,
              value: hook.name,
              short: hook.name,
            })),
          });
          
          if (!selectedHooks?.length) {
            console.log(chalk.yellow('No hooks selected. Exiting.'));
            process.exit(0);
          }
          
          requestedHooks = selectedHooks;
        }

        // Validate hooks
        for (const hookName of requestedHooks) {
          if (!AVAILABLE_HOOKS.find(h => h.name === hookName)) {
            console.log(chalk.red(`Hook "${hookName}" not found.`));
            console.log(chalk.yellow('Available hooks:'));
            AVAILABLE_HOOKS.forEach(h => console.log(chalk.blue(`  - ${h.name}: ${h.description}`)));
            process.exit(1);
          }
        }

        const projectRoot = process.cwd();
        // Auto-detect TypeScript
        const isTypeScript = await isTypeScriptProject(projectRoot);
        const fileExtension = isTypeScript ? '.ts' : '.js';
        
        // Create target directory if it doesn't exist
        const targetDirectory = path.resolve(projectRoot, options.path);
        await fs.ensureDir(targetDirectory);

        const addedHooks: string[] = [];
        const existingHooks: string[] = [];

        // First check for existing files
        for (const hookName of requestedHooks) {
          const targetPath = path.join(targetDirectory, `${hookName}${fileExtension}`);
          if (await fs.pathExists(targetPath)) {
            existingHooks.push(hookName);
          }
        }

        // If there are existing files, prompt for overwrite
        let shouldOverwrite = false;
        if (existingHooks.length > 0) {
          const { overwrite } = await inquirer.prompt({
            type: 'confirm',
            name: 'overwrite',
            message: `The following hooks already exist:\n${existingHooks.map(h => `  - ${h}`).join('\n')}\nDo you want to overwrite them?`,
            default: false,
          });
          shouldOverwrite = overwrite;
        }

        // Copy hooks to target
        for (const hookName of requestedHooks) {
          // Get the template path based on whether we're using TS or JS
          const templateDir = path.join(__dirname, '../../templates');
          const hookTemplatePath = path.join(templateDir, `${hookName}${fileExtension}.template`);
          const hookTargetPath = path.join(targetDirectory, `${hookName}${fileExtension}`);
          
          // Check if template exists
          if (!await fs.pathExists(hookTemplatePath)) {
            console.log(chalk.yellow(`⚠ Template for ${hookName} not found, skipping...`));
            continue;
          }

          // Skip if file exists and no overwrite
          if (await fs.pathExists(hookTargetPath) && !shouldOverwrite) {
            continue;
          }

          // Copy template to target
          await fs.copyFile(hookTemplatePath, hookTargetPath);
          addedHooks.push(hookTargetPath);
        }
        
        // Show results
        if (addedHooks.length) {
          console.log(chalk.green(`\n✓ Added ${addedHooks.length} hook${addedHooks.length === 1 ? '' : 's'}:`));
          addedHooks.forEach(hookPath => console.log(`  - ${path.relative(projectRoot, hookPath)}`));
        }
        
        const skippedCount = existingHooks.length - (shouldOverwrite ? addedHooks.length : 0);
        if (skippedCount > 0) {
          console.log(chalk.yellow(`\n⚠ Skipped ${skippedCount} existing hook${skippedCount === 1 ? '' : 's'}`));
        }

        // Show usage example for successfully added hooks
        if (addedHooks.length) {
          console.log(chalk.blue('\nUsage example:'));
          const hookNames = addedHooks.map(file => path.basename(file, fileExtension));
          hookNames.forEach(hookName => {
            console.log(`import { ${hookName} } from '${options.path}/${hookName}';\n`);
          });
        }
      } catch (error) {
        console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
      }
    });
}