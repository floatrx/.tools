import { handleSelect } from '@/cmd/ticket/select/handleSelect';
import { getTicketIssues } from '@/lib/tickets';
import inquirer from 'inquirer';

export const promptTicketSelect = async () => {
  const { ticketList, currentTicket } = await getTicketIssues();

  return inquirer.prompt([
    {
      type: 'list',
      name: 'selectedTicket',
      message: 'Select the Ticket:',
      choices: [
        ...ticketList.map((t) => ({
          ...t,
          name: t.name!.replace(/(CRM-\d+).*(https.*)/gs, '$1 $2'),
          checked: t.value !== currentTicket?.id,
        })),
        {
          name: '🏁 Exit',
          value: `exit`,
          description: 'See ya! 👋',
        },
      ],
    },
  ]);
};

handleSelect();
