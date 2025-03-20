import type { Commands, GitCommands, TaskCommands, Tools } from '@/types';

import { CMD_PATH } from '@/config/const';
import fs from 'fs-extra';
import path from 'node:path';

/**
 * Find root directory with next.config.js
 * Using current __dirname navigate up to project root
 * @returns root directory
 */
export function findRootDir(): string {
  const FIND_ROOT_MAX_DEPTH = 5;
  let currentDir = __dirname;
  let depth = 0;

  while (!fs.existsSync(path.join(currentDir, 'src'))) {
    if (depth >= FIND_ROOT_MAX_DEPTH) {
      throw new Error('Maximum search depth reached');
    }
    const parentDir = path.resolve(currentDir, '..');
    if (parentDir === currentDir) {
      throw new Error('src folder not found');
    }
    currentDir = parentDir;
    depth++;
  }

  return currentDir;
}

/**
 * Get absolute path
 * @param str - path parts
 */
export function getRootSrcPath(...str: string[]) {
  return path.join(findRootDir(), 'src', ...str);
}

// Git commands
export function getCmdByTool(tool: 'git', cmd: GitCommands): string;
// Task commands
export function getCmdByTool(tool: 'task', cmd: TaskCommands): string;
/**
 * Get command index by tool
 * @param tool
 * @param cmd
 * @returns command index (for prompt) e.g. `tsx cmd/git/index.ts`
 */
export function getCmdByTool(tool: Tools, cmd: Commands): string {
  return `tsx ${CMD_PATH[tool]}/${cmd}/index.ts`.replaceAll('//', '/');
}
