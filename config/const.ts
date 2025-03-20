import type { Tools } from 'types/types';

import { findRootDir, getRootSrcPath, getToolDir } from '@/lib/paths';
import process from 'node:process';

// Paths to command executables
export const CMD_PATH: Record<Tools, `${string}/${string}`> = {
  git: 'cmd/git',
  ticket: 'cmd/ticket',
};

// Resolved paths for tools
export const resolvedPath = {
  root: findRootDir(),
  current: process.cwd(),
  commitMessageFile: getRootSrcPath('..', '.git', 'COMMIT_MESSAGE.txt'),
  ticket: {
    config: getToolDir('ticket', 'config.json'),
  },
  modules: {
    components: getRootSrcPath('shared-components'),
    front: getRootSrcPath('shared-front'),
    types: getRootSrcPath('shared-types'),
    web: getRootSrcPath('shared-web'),
  },
};
