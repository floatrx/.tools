import { log } from '@/lib/logger';
import { run } from '@/process';
import { resolvedPath } from '@/config/const';
import { promptCheckoutActions } from '@/cmd/git/checkout/index';

const submodulesForEach = async (cmd: string) => Object.values(resolvedPath.modules).map(async (path) => await run(cmd, path, true));

export const handleCheckout = async () => {
  const { actions } = await promptCheckoutActions();

  if (actions.includes('doResetModulesToDev')) {
    await submodulesForEach('git reset --hard');
    log.info('All submodules already in development.');
  }

  if (actions.includes('doCheckoutModulesToDev')) {
    await submodulesForEach('git checkout development');
    log.info('All submodules already in development.');
  }

  if (actions.includes('doCheckoutRootToDev')) {
    await run('git checkout development', resolvedPath.root, true);
    log.info('Checked out root repo to development.');
  }

  if (actions.includes('doBuildTypes')) {
    log.wait('Building types');
    await run('node utils/build-shared-types.mjs', resolvedPath.root, true);
  }

  if (actions.includes('doFetch')) {
    log.wait('Fetching all remotes');
    await run('git fetch --all', resolvedPath.root, true);
  }

  if (actions.includes('doInstall')) {
    log.wait('Installing dependencies');
    await run('npm install', resolvedPath.root, true);
  }

  log.done('Done!');
};
