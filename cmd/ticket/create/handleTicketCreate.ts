import type { Ticket } from '@/types/types';

import { getBranchNameFromTicketTypeAndJiraUrl } from '@/cmd/ticket/create/getBranchNameFromTicketTypeAndJiraUrl';
import { promptTicketCreate } from '@/cmd/ticket/create/index';
import { resolvedPath } from '@/config/const';
import { log } from '@/lib/logger';
import { parseJiraIssueNumber } from '@/lib/strings';
import { readConfig, syncConfig } from '@/lib/tickets';
import { $run } from '@/process';

export const handleTicketCreate = async () => {
  const { jiraUrl, title, ticketType, actions } = await promptTicketCreate();
  const jiraIssueNumber = parseJiraIssueNumber(jiraUrl);
  const branchName = getBranchNameFromTicketTypeAndJiraUrl(ticketType, jiraUrl);

  // Debug...
  console.log({ jiraUrl, title, jiraIssueNumber });
  console.log(ticketType);

  if (actions.includes('doCreateBranch') && jiraIssueNumber) {
    await $run(`git checkout -b ${branchName}`, resolvedPath.root);
  }

  const ticket: Ticket = {
    id: jiraIssueNumber,
    jiraUrl,
    ticketType,
    title,
    lastCommitMsg: '',
  };

  const ticketsConfig = await readConfig();
  if (!ticketsConfig.tickets) ticketsConfig.tickets = {};

  // Update ticket list
  ticketsConfig.tickets[jiraIssueNumber] = ticket;

  // Save current ticket id
  ticketsConfig.current = jiraIssueNumber;

  log.process(
    { task: 'Syncing config...', success: 'ticket/config.json synced!' },
    async () => await syncConfig(ticketsConfig)
  );
};
