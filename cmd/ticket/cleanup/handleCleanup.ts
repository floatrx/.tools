import type { JiraIssueNumber } from '@/types/types.ts';

import { promptTicketCleanup } from '@/cmd/ticket/cleanup/index.ts';
import { log } from '@/lib/logger.ts';
import { readConfig, syncConfig } from '@/lib/tickets.ts';

export const handleCleanup = async () => {
  const { jiraIssues } = await promptTicketCleanup();
  const ticketsConfig = await readConfig();

  // Clean up the selected tickets
  jiraIssues.forEach((issueId: JiraIssueNumber) => {
    delete ticketsConfig.tickets?.[issueId];
  });

  // Reset the current ticket if it was deleted
  if (jiraIssues.includes(ticketsConfig.current)) {
    ticketsConfig.current = '';
  }

  log.process(
    { task: 'Syncing config...', success: 'ticket/config.json synced!' },
    async () => await syncConfig(ticketsConfig)
  );
};
