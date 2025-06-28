import { promises as fs } from 'fs';
import * as dotenv from 'dotenv';

export async function parseEnvFile(filePath: string): Promise<Record<string, string>> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return dotenv.parse(content);
  } catch (error) {
    return {};
  }
}
