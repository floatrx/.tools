// Commands

export type Tools = 'git' | 'ticket' | 'ai';
export type GitCommands = 'checkout' | 'commit';
export type TicketCommands = 'create' | 'cleanup' | 'select';
export type Commands = GitCommands | TicketCommands;

export type JiraIssueNumber = string;

export type TicketType = {
  name: string;
  icon: string;
  emoji: string;
  description: string;
};

export type Ticket = {
  // jira issue number (parsed from jiraUrl)
  id: JiraIssueNumber;
  jiraUrl: string;
  // Copy from jira
  title: string;
  lastCommitMsg: string;
  ticketType: TicketType;
  branchName: string;
  prLinks: string[];
};

export type TicketConfig = Partial<{
  tickets: Record<JiraIssueNumber, Ticket>;
  current: JiraIssueNumber;
}>;

export type InquirerChoice<Value> = {
  value: Value;
  name?: string;
  description?: string;
};
