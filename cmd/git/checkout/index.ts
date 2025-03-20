import { handleCheckout } from '@/cmd/git/checkout/handleCheckout';
import chalk from 'chalk';
import inquirer from 'inquirer';

export const promptGitCheckoutActions = async () => {
  const devBranch = chalk.green('development');
  return inquirer.prompt([
    {
      type: 'checkbox',
      name: 'actions',
      message: 'Select actions to perform:',
      choices: [
        {
          name: 'Retrieve updates from all remotes',
          value: 'doFetch',
          description: 'git fetch --all',
          checked: true,
        },
        {
          name: `Submodules: checkout to ${devBranch}`,
          value: 'doCheckoutModulesToDev',
          description: 'all submodules will be checkout to development',
          checked: true,
        },
        {
          name: `Submodules: reset to ${devBranch} ${chalk.red('(dangerous)')}`,
          value: 'doResetModulesToDev',
          description: 'all submodules will be reset to development',
        },
        {
          name: `Main repo: to ${devBranch}`,
          value: 'doCheckoutRootToDev',
          description: `main repo will be checkout to development ${chalk.red('(working directory must be clean)')}`,
        },
        {
          name: 'Rebuild shared types',
          value: 'doBuildTypes',
          description: 'generate src/shared/types/index.ts',
          checked: true,
        },
        {
          name: 'Update npm dependencies',
          value: 'doInstall',
          description: 'npm install may take a while',
        },
      ],
    },
  ]);
};

handleCheckout();
