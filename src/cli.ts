import { scanForEnvUsage } from './scanner';
import { parseEnvFile } from './parser';
import path from 'path';

export async function run() {
  const rootDir = process.cwd();
  const envPath = path.join(rootDir, '.env');
  const envExamplePath = path.join(rootDir, '.env.example');

  const [env, envExample, usedInCode] = await Promise.all([
    parseEnvFile(envPath),
    parseEnvFile(envExamplePath),
    scanForEnvUsage(path.join(rootDir, 'src')),
  ]);

  const envKeys = Object.keys(env);
  const envExampleKeys = Object.keys(envExample);
  const hasEnvFile = envKeys.length > 0;
  const hasEnvExampleFile = envExampleKeys.length > 0;

  // Check if .env file exists
  if (!hasEnvFile) {
    console.log('ℹ️  No .env file found. This is okay if you don\'t use environment variables.');
  }

  const unused = envKeys.filter(k => !usedInCode.includes(k));
  const missing = usedInCode.filter(k => !envExampleKeys.includes(k));

  // Report unused variables in .env
  if (unused.length) {
    console.log('🧹 Unused variables in .env:');
    unused.forEach(k => console.log(`- ${k}`));
  }

  // Report missing variables in .env.example
  if (missing.length && usedInCode.length > 0) {
    if (!hasEnvExampleFile) {
      console.log('⚠️  No .env.example file found. Consider creating one with these variables:');
    } else {
      console.log('🔍 Missing variables in .env.example:');
    }
    missing.forEach(k => console.log(`- ${k}`));
  }

  // Success message
  if (!unused.length && !missing.length) {
    if (usedInCode.length === 0) {
      console.log('✅ No environment variables detected in your code.');
    } else {
      console.log('✅ All environment variables are properly documented!');
    }
  }

  // Helpful suggestion when no .env.example exists but env vars are used
  if (!hasEnvExampleFile && usedInCode.length > 0) {
    console.log('\n💡 Tip: Create a .env.example file to document required environment variables for your team.');
  }
}
