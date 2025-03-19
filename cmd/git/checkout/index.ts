import inquirer from 'inquirer';
import { handleCheckout } from '@/cmd/git/checkout/handleCheckout';

export const promptCheckoutActions = async () =>
  inquirer.prompt([
    {
      type: 'checkbox',
      name: 'actions',
      message: 'Select actions to perform:',
      choices: [
        {
          name: 'Submodules: reset to development (dangerous)',
          value: 'doResetModulesToDev',
          description: 'all submodules will be reset to development',
          checked: false,
        },
        {
          name: 'Submodules: checkout to development',
          value: 'doCheckoutModulesToDev',
          description: 'all submodules will be reset to development',
          checked: true,
        },
        {
          name: 'Main repo: checkout to development',
          value: 'doCheckoutRootToDev',
          description: 'main repo will be checkout to development',
          checked: true,
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

handleCheckout();
