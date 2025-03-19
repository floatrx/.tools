import { getRootSrcPath, findRootDir } from '@/lib/paths';
import type { Tools } from '@/types';

// Paths to command executables
export const CMD_PATH: Record<Tools, `${string}/${string}`> = {
  git: 'cmd/git',
};

// Resolved paths for tools
export const resolvedPath = {
  root: findRootDir(),
  modules: {
    components: getRootSrcPath('shared-components'),
    front: getRootSrcPath('shared-front'),
    types: getRootSrcPath('shared-types'),
    web: getRootSrcPath('shared-web'),
  },
};
