import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';

async function generateTemplates() {
  // Path to hooks package
  const hooksDir = path.resolve(__dirname, '../../hooks/src/hooks');
  // Path to templates directory
  const templatesDir = path.resolve(__dirname, '../src/templates');

  // Ensure templates directory exists
  await fs.ensureDir(templatesDir);

  // Find all hook implementations
  const tsFiles = glob.sync('*/index.ts', { cwd: hooksDir });
  const jsFiles = glob.sync('*/index.js', { cwd: hooksDir });

  // Generate TypeScript templates
  for (const file of tsFiles) {
    const hookName = path.dirname(file);
    const sourcePath = path.join(hooksDir, file);
    const targetPath = path.join(templatesDir, `${hookName}.ts.template`);
    
    const content = await fs.readFile(sourcePath, 'utf-8');
    await fs.writeFile(targetPath, content);
    
    console.log(`Generated template for ${hookName} (TypeScript)`);
  }

  // Generate JavaScript templates
  for (const file of jsFiles) {
    const hookName = path.dirname(file);
    const sourcePath = path.join(hooksDir, file);
    const targetPath = path.join(templatesDir, `${hookName}.js.template`);
    
    const content = await fs.readFile(sourcePath, 'utf-8');
    await fs.writeFile(targetPath, content);
    
    console.log(`Generated template for ${hookName} (JavaScript)`);
  }

  console.log('All templates generated successfully!');
}

generateTemplates().catch(console.error);