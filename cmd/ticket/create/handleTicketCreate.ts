import type { Ticket } from '@/types/types';

import { getBranchNameFromTicketTypeAndJiraUrl } from '@/cmd/ticket/create/getBranchNameFromTicketTypeAndJiraUrl';
import { promptTicketCreate } from '@/cmd/ticket/create/index';
import { resolvedPath } from '@/config/const';
import { log } from '@/lib/logger';
import { parseJiraIssueNumber } from '@/lib/strings';
import { ticketLogger } from '@/lib/ticketLogger';
import { readConfig, syncConfig } from '@/lib/tickets';
import { $run } from '@/process';

export const handleTicketCreate = async () => {
  const { jiraUrl, title, ticketType, actions } = await promptTicketCreate();
  const jiraIssueNumber = parseJiraIssueNumber(jiraUrl);
  const branchName = getBranchNameFromTicketTypeAndJiraUrl(ticketType, jiraUrl);

  if (actions.includes('doCreateBranch') && jiraIssueNumber) {
    await $run(`git checkout -b ${branchName}`, resolvedPath.root);
  }

  const ticket: Ticket = {
    id: jiraIssueNumber,
    jiraUrl,
    title,
    lastCommitMsg: '',
    branchName,
    ticketType,
    prLinks: [],
  };

  const ticketsConfig = await readConfig();
  if (!ticketsConfig.tickets) ticketsConfig.tickets = {};

  // Update a ticket list
  ticketsConfig.tickets[jiraIssueNumber] = ticket;
  await ticketLogger('create', ticket);

  // Save current ticket id
  ticketsConfig.current = jiraIssueNumber;

  log.process(
    { task: 'Syncing config...', success: 'ticket/config.json synced!' },
    async () => await syncConfig(ticketsConfig)
  );
};
