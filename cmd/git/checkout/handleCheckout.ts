import { promptGitCheckoutActions } from '@/cmd/git/checkout/index';
import { resolvedPath } from '@/config/const';
import { log } from '@/lib/logger';
import { $run, runBulk } from '@/process';

// Silent run multiple commands for each submodule
const $eachSubmoduleRun = async (commands: string[]) => {
  for (const cmd of commands.filter(Boolean)) {
    await Promise.all(Object.values(resolvedPath.modules).map(async (path) => await $run(cmd, path, true)));
  }
};

export const handleCheckout = async () => {
  const { actions } = await promptGitCheckoutActions();
  const { root } = resolvedPath;

  await $run('git status', root, true);

  if (actions.includes('doFetch')) {
    await log.process(
      {
        task: 'Fetching all remotes [10-15s]',
        success: 'Remotes fetched',
      },
      () => $run('git fetch --all', root, true)
    );
  }

  if (actions.includes('doCheckoutRootToDev')) {
    await runBulk(
      [
        // Root repo
        'git checkout development',
        'git reset --hard origin/development', // force pull
      ],
      root,
      true
    );
    log.info('Main repo checked out to development.');
  }

  // Update submodules after root repo
  if (actions.includes('doResetModulesToDev')) {
    await $eachSubmoduleRun([
      //
      'git reset --hard origin/development',
      'git checkout development',
    ]);
    log.info('Submodules reset to development.');
  }

  if (actions.includes('doCheckoutModulesToDev')) {
    await $eachSubmoduleRun([
      //
      'git checkout development',
      'git pull',
    ]);

    log.info('Submodules checked out to development.');
  }

  if (actions.includes('doBuildTypes')) {
    await log.process(
      {
        task: 'Building types',
        success: 'Types rebuilt',
      },
      () => $run('node utils/build-shared-types.mjs', root, true)
    );
  }

  if (actions.includes('doInstall')) {
    await log.process(
      {
        task: 'Installing npm dependencies [5-30s]',
        success: 'Dependencies updated',
      },
      () => $run('npm install', root, true)
    );
  }

  log.done('Done!');
};
