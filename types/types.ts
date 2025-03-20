// Commands
import type { TicketType } from '@/config/const.ts';

export type Tools = 'git' | 'ticket';
export type GitCommands = 'checkout' | 'commit';
export type TicketCommands = 'create';
export type Commands = GitCommands | TicketCommands;

export type JiraIssueNumber = string;

export type Ticket = {
  // jira issue number (parsed from jiraUrl)
  id: JiraIssueNumber;
  jiraUrl: string;
  // Copy from jira
  title: string;
  lastCommitMsg: string;
  ticketType: TicketType;
};

export type TicketConfig = Partial<{
  tickets: Record<JiraIssueNumber, Ticket>;
  current: JiraIssueNumber;
}>;
