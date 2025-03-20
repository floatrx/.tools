import type { Ticket } from '@/types/types.ts';

import { getBranchNameFromTicketTypeAndJiraUrl } from '@/cmd/ticket/create/getBranchNameFromTicketTypeAndJiraUrl.ts';
import { promptTicketCreate } from '@/cmd/ticket/create/index.ts';
import { readConfig, syncConfig } from '@/cmd/ticket/syncConfig.ts';
import { resolvedPath } from '@/config/const.ts';
import { log } from '@/lib/logger.ts';
import { parseJiraIssueNumber } from '@/lib/strings.ts';
import { $run } from '@/process.ts';

export const handleTicketCreate = async () => {
  const { jiraUrl, title, ticketType, actions } = await promptTicketCreate();
  const jiraIssueNumber = parseJiraIssueNumber(jiraUrl);
  const branchName = getBranchNameFromTicketTypeAndJiraUrl(ticketType, jiraUrl);

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
