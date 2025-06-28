import fg from 'fast-glob';
import { promises as fs } from 'fs';
import path from 'path';

export async function scanForEnvUsage(dir: string): Promise<string[]> {
  const pattern = path.join(dir, '**', '*.{js,ts,jsx,tsx}').replace(/\\/g, '/');
  const files = await fg([pattern], {
    ignore: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    absolute: true
  });
  
  const envVars = new Set<string>();

  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      const matches = content.match(/(process\.env|import\.meta\.env)\.(\w+)/g) || [];
      matches.forEach(match => {
        const parts = match.split('.');
        if (parts.length === 3) {
          envVars.add(parts[2]);
        }
      });
    } catch (error) {
      // Skip files that can't be read
      console.warn(`Warning: Could not read file ${file}`);
    }
  }

  return Array.from(envVars);
}
