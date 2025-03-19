import inquirer from 'inquirer';
import { promptCommands } from './process.ts';
import { CMD_PATH } from '@/config/const';

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
          name: '🏁 Exit',
          value: 'clear',
          description: 'See ya! 👋',
        },
      ],
    },
  ]);

promptCommands(selectMainCommand);
