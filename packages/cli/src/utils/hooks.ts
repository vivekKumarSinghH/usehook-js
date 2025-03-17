import path from 'path';
import fs from 'fs-extra';

export interface Hook {
  name: string;
  description: string;
}

// This function will eventually load hooks from the @workspace/hooks package
export function getAvailableHooks(): Hook[] {
  // For now, return hardcoded hooks
  return [
    {
      name: 'useFetch',
      description: 'A hook for making HTTP requests with fetch API',
    },
    {
      name: 'useLocalStorage',
      description: 'A hook for storing and retrieving values from localStorage',
    },
    {
      name: 'useDarkMode',
      description: 'A hook for managing dark mode in your application',
    },
  ];
}

// In the future, this function will get the hook implementation from the @workspace/hooks package
export async function getHookImplementation(hookName: string, isTypeScript: boolean): Promise<string> {
  const fileExtension = isTypeScript ? '.ts' : '.js';
  const templatePath = path.join(__dirname, `../../templates/${hookName}${fileExtension}.template`);
  
  try {
    return await fs.readFile(templatePath, 'utf-8');
  } catch (error) {
    throw new Error(`Template for ${hookName} not found`);
  }
}