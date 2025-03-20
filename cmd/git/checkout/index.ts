import { handleCheckout } from '@/cmd/git/checkout/handleCheckout';
import chalk from 'chalk';
import inquirer from 'inquirer';

export const promptCheckoutActions = async () => {
  const devBranch = chalk.green('development');
  return inquirer.prompt([
    {
      type: 'checkbox',
      name: 'actions',
      message: 'Select actions to perform:',
      choices: [
        {
          name: `Use ${chalk.red('git stash')} if your working directory is not clean`,
          value: 'doStash',
          description: 'your changes will be stashed before checkout and applied afterward',
          checked: false,
        },
        {
          name: `Submodules: reset to ${devBranch} ${chalk.red('(dangerous)')}`,
          value: 'doResetModulesToDev',
          description: 'all submodules will be reset to development',
          checked: false,
        },
        {
          name: `Submodules: checkout to ${devBranch}`,
          value: 'doCheckoutModulesToDev',
          description: 'all submodules will be reset to development',
          checked: true,
        },
        {
          name: `Main repo: checkout to ${devBranch}`,
          value: 'doCheckoutRootToDev',
          description: 'main repo will be checkout to development',
          checked: false,
        },
        {
          name: 'Rebuild shared types (recommend)',
          value: 'doBuildTypes',
          description: 'generate src/shared/types/index.ts',
          checked: true,
        },
        {
          name: 'Retrieve updates from all remotes',
          value: 'doFetch',
          description: 'git fetch --all',
        },
        {
          name: 'Update npm dependencies',
          value: 'doInstall',
          description: 'npm install',
        },
      ],
    },
  ]);
};

handleCheckout();
