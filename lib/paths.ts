import fs from 'fs-extra';
import path from 'node:path';
import type { Tools } from '@/types';
import { CMD_PATH } from '@/config/const';

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

/**
 * Get command index by tool
 * @param tool
 * @param cmd
 * @returns command index (for prompt) e.g. `tsx cmd/git/index.ts`
 */
export function getCmdByTool(tool: Tools, cmd: `/${string}` | '' = '') {
  return `tsx ${CMD_PATH[tool]}${cmd}/index.ts`;
}
