import fs from 'fs-extra';
import path from 'path';

// Helper function to check if project uses TypeScript
export async function isTypeScriptProject(projectRoot: string): Promise<boolean> {
  const possibleTSConfigs = [
    'tsconfig.json',
    'tsconfig.base.json',
    'tsconfig.app.json'
  ];

  for (const config of possibleTSConfigs) {
    if (await fs.pathExists(path.join(projectRoot, config))) {
      return true;
    }
  }
  return false;
}