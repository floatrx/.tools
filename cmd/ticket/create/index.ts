import '@/config/const';

import { handleTicketCreate } from '@/cmd/ticket/create/handleTicketCreate';
import inquirer from 'inquirer';

const taskTypes = [
  {
    type: 'fix',
    icon: ':bug:',
    emoji: '🐛',
    description: 'fix a bug',
  },
  {
    type: 'feature',
    icon: ':sparkles:',
    emoji: '✨',
    description: 'new feature',
  },
  {
    type: 'hotfix',
    icon: ':ambulance:',
    emoji: '🚑',
    description: 'urgent fix',
  },
  {
    type: 'improvement',
    icon: ':chart_with_upwards_trend:',
    emoji: '📈',
    description: 'enhance feature',
  },
  {
    type: 'perf',
    icon: ':zap:',
    emoji: '⚡️',
    description: 'improve performance',
  },
  {
    type: 'refactor',
    icon: ':recycle:',
    emoji: '♻️',
    description: 'refactor code',
  },
  {
    type: 'style',
    icon: ':art:',
    emoji: '🎨',
    description: 'improve code style',
  },
];

export const promptTicketCreate = async () => {
  return inquirer.prompt([
    {
      name: 'jiraUrl',
      type: 'input',
      message: 'Enter JIRA URL:',
      required: true,
      default: 'https://*.atlassian.net/browse/CRM-0000', // <- during debugging...
      validate: (input) => {
        const isValid = /^https:\/\/.*?\.atlassian\.net\/browse\/CRM-\d+$/.test(input);
        return isValid || 'Please enter a valid JIRA URL (e.g., https://*.atlassian.net/browse/CRM-1234)';
      },
    },
    {
      name: 'type',
      type: 'list',
      message: 'Choose ticket type:',
      choices: taskTypes.map(({ emoji, type, description, icon }) => ({
        name: `${emoji} ${type}`,
        value: `${icon} ${type}`,
        description,
      })),
    },
    {
      name: 'actions',
      type: 'checkbox',
      message: 'Select actions to perform:',
      choices: [
        {
          name: 'Create new branch',
          value: 'doCreateBranch',
          description: 'Create a new ticket',
          checked: true,
        },
      ],
    },
  ]);
};

handleTicketCreate();
