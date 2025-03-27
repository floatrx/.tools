import '@/config/const';

import { getBranchNameFromTicketTypeAndJiraUrl } from '@/cmd/ticket/create/getBranchNameFromTicketTypeAndJiraUrl';
import { handleTicketCreate } from '@/cmd/ticket/create/handleTicketCreate';
import { TASK_TYPES } from '@/config/const';
import inquirer from 'inquirer';

export const promptTicketCreate = async () => {
  const { ticketType, title, jiraUrl } = await inquirer.prompt([
    {
      name: 'jiraUrl',
      type: 'input',
      message: 'Enter JIRA URL:',
      required: true,
      default: 'https://company.atlassian.net/browse/CRM-0000', // <- during debugging...
      validate: (input) => {
        const isValid = /^https:\/\/.*?\.atlassian\.net\/browse\/CRM-\d+$/.test(input);
        return isValid || 'Please enter a valid JIRA URL (e.g., https://*.atlassian.net/browse/CRM-1234)';
      },
    },
    {
      name: 'title',
      type: 'input',
      message: 'Provide task title (copy from jira):',
      required: true,
      default: 'Task title', // <- during debugging...
    },
    {
      name: 'ticketType',
      type: 'list',
      message: 'Choose ticket type:',
      choices: TASK_TYPES.map((ticketType) => ({
        name: `${ticketType.emoji} ${ticketType.name}`,
        value: ticketType,
        description: ticketType.description,
      })),
    },
  ]);

  const { actions } = await inquirer.prompt([
    {
      name: 'actions',
      type: 'checkbox',
      message: 'Select actions to perform:',
      choices: [
        {
          name: `Create new branch ${getBranchNameFromTicketTypeAndJiraUrl(ticketType, jiraUrl)}`,
          value: 'doCreateBranch',
          description: 'git checkout -b',
          checked: true,
        },
      ],
    },
  ]);

  return { jiraUrl, title, ticketType, actions };
};

handleTicketCreate();
