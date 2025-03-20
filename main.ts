import { CMD_PATH } from '@/config/const';
import inquirer from 'inquirer';

import { promptCommands } from './process.ts';

console.clear();

const selectMainCommand = async () =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'cmd',
      message: 'Run:',
      choices: [
        {
          name: '🗄️ GIT Tools',
          value: `tsx ${CMD_PATH.git}/index.ts`,
          description: 'Proceed with git tools',
        },
        {
          name: '📁 Tickets',
          value: `tsx ${CMD_PATH.ticket}/index.ts`,
          description: 'Proceed with ticket',
        },
        {
          name: '🏁 Exit',
          value: 'clear',
          description: 'See ya! 👋',
        },
      ],
    },
  ]);

promptCommands(selectMainCommand);
