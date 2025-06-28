#!/usr/bin/env node
import { program } from 'commander';
import { promises as fs } from 'fs';
import path from 'path';

program
  .version('0.1.0')
  .option('--check', 'Detects unused environment variables and validates presence of required keys')
  .parse(process.argv);

import { run } from './cli';

if (program.opts().check) {
  run();
}
