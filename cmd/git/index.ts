import '@/config/const';

import { getCmdByTool } from '@/lib/paths';
import { promptCommands } from '@/process';
import inquirer from 'inquirer';

const selectCommand = async () =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'cmd',
      message: 'What would you like to do?',
      default: 'commit',
      choices: [
        {
          name: '⚙️ I start work on new feature. Need actualise git from development',
          value: getCmdByTool('git', 'checkout'),
          description: 'Checkout to development, fetch all, install dependencies and build types',
        },
        {
          name: '✅ I want make a commit',
          value: getCmdByTool('git', 'commit'),
          description: 'Stage files and create a commit',
        },
        {
          name: '🏁 Exit',
          value: `clear`,
          description: 'See ya! 👋',
        },
      ],
    },
  ]);

promptCommands(selectCommand);
