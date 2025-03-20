import type { Tools } from '@/types';

import { findRootDir, getRootSrcPath } from '@/lib/paths';

// Paths to command executables
export const CMD_PATH: Record<Tools, `${string}/${string}`> = {
  git: 'cmd/git',
  task: 'cmd/task',
};

// Resolved paths for tools
export const resolvedPath = {
  root: findRootDir(),
  commitMessageFile: getRootSrcPath('..', '.git', 'COMMIT_MESSAGE.txt'),
  modules: {
    components: getRootSrcPath('shared-components'),
    front: getRootSrcPath('shared-front'),
    types: getRootSrcPath('shared-types'),
    web: getRootSrcPath('shared-web'),
  },
};
