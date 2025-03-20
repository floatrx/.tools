import type { TicketType } from '@/types/types';

import { parseJiraIssueNumber } from '@/lib/strings';

export const getBranchNameFromTicketTypeAndJiraUrl = (ticketType: TicketType, jiraUrl: string) => {
  const jiraIssueNumber = parseJiraIssueNumber(jiraUrl);
  return jiraIssueNumber ? `${ticketType.name}/${jiraIssueNumber}` : '';
};
