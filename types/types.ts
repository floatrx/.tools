// Commands
export type Tools = 'git' | 'ticket';
export type GitCommands = 'checkout' | 'commit';
export type TicketCommands = 'create';
export type Commands = GitCommands | TicketCommands;

export type Ticket = {
  jiraUrl: string;
  title: string;
};

export type TicketConfig = Partial<{
  // tasks: Ticket[];
  // currentIdx: number;
  commitMessage: string;
  commitDescription: string;
  type: string;
  jiraUrl: string | null;
  jiraIssueNumber: string;
}>;
