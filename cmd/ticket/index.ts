import 'config/const';

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
          name: '🐞 Add',
          value: getCmdByTool('ticket', 'create'),
          description: 'It helps you with commit messages and commit descriptions.',
        },
        {
          name: '🧹 Cleanup',
          value: getCmdByTool('ticket', 'cleanup'),
          description: 'It helps you with commit messages and commit descriptions.',
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
