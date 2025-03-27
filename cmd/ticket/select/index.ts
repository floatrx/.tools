import { handleSelect } from '@/cmd/ticket/select/handleSelect';
import { getTicketIssues } from '@/lib/tickets';
import inquirer from 'inquirer';

export const promptTicketSelect = async () => {
  const { ticketList, currentTicket } = await getTicketIssues();

  return inquirer.prompt([
    {
      type: 'list',
      name: 'selectedTicketId',
      message: 'Select the Ticket:',
      choices: [
        ...ticketList.map((t, idx) => ({
          ...t,
          name: `${idx + 1}.` + t.name,
          checked: t.value !== currentTicket?.id,
          key: idx,
        })),
        {
          name: '🏁 Exit',
          value: '',
          description: 'See ya! 👋',
        },
      ],
    },
    {
      type: 'checkbox',
      name: 'actions',
      message: 'Select actions to perform:',
      choices: [
        {
          name: `Checkout`,
          value: 'doCheckout',
          description: 'git checkout development',
        },
        {
          name: `Add PR link`,
          value: 'doAddPrLink',
          description: 'copy & paste related PR link',
        },
      ],
      when: ({ selectedTicketId }) => selectedTicketId,
    },
    {
      type: 'input',
      name: 'prLink',
      message: 'Enter PR link:',
      when: ({ actions }) => actions.includes('doAddPrLink'),
      validate: (input) => {
        const isValid = /^https:\/\/github\.com\/(.*?)\/pull\/\d+$/.test(input);
        return isValid || 'Please enter a valid PR link (e.g., https://github.com/company/repo/pull/1234)';
      },
    },
  ]);
};

handleSelect();
