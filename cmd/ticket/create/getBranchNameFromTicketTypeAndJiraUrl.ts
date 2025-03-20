import type { TicketType } from '@/config/const.ts';

import { parseJiraIssueNumber } from '@/lib/strings.ts';

export const getBranchNameFromTicketTypeAndJiraUrl = (ticketType: TicketType, jiraUrl: string) => {
  const jiraIssueNumber = parseJiraIssueNumber(jiraUrl);
  return jiraIssueNumber ? `${ticketType.name}/${jiraIssueNumber}` : '';
};
