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

  const doStash = actions.includes('doStash');

  if (actions.includes('doFetch')) {
    await log.process(
      {
        task: 'Fetching all remotes [10-15s]',
        success: 'Remotes fetched',
      },
      () => $run('git fetch --all', root, true)
    );
  }

  if (actions.includes('doResetModulesToDev')) {
    await $eachSubmoduleRun(['git reset --hard']);
    log.info('Submodules reset to development.');
  }

  if (actions.includes('doCheckoutModulesToDev')) {
    await $eachSubmoduleRun([
      //
      doStash && 'git stash',
      'git checkout development',
      'git pull',
    ]);

    log.info('Submodules checked out to development.');
  }

  if (actions.includes('doCheckoutRootToDev')) {
    await runBulk(
      [
        //
        doStash && 'git stash',
        'git checkout development',
        'git pull',
      ],
      root,
      true
    );
    await $eachSubmoduleRun(['git stash apply']);
    log.info('Main repo checked out to development.');
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
