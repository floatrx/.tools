import { handleCleanup } from '@/cmd/ticket/cleanup/handleCleanup.ts';
import { getTicketIssues } from '@/lib/tickets.ts';
import inquirer from 'inquirer';

export const promptTicketCleanup = async () => {
  const { ticketList, currentTicket } = await getTicketIssues();

  return inquirer.prompt([
    {
      type: 'checkbox',
      name: 'jiraIssues',
      message: 'Select the JIRA issue number:',
      choices: ticketList.map((t) => ({ ...t, checked: t.value !== currentTicket?.id })),
    },
  ]);
};

handleCleanup();
