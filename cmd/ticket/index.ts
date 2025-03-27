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
          name: '✅ Select and proceed',
          value: getCmdByTool('ticket', 'select'),
          description: 'Checkout / Add PR link',
        },
        {
          name: '🐞 Add new',
          value: getCmdByTool('ticket', 'create'),
          description: 'Add new ticket to config.json',
        },
        {
          name: '🧹 Cleanup',
          value: getCmdByTool('ticket', 'cleanup'),
          description: 'Remove outdated tickets from config.json',
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
