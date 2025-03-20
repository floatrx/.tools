// Commands
export type Tools = 'git' | 'task';
export type GitCommands = 'checkout' | 'commit';
export type TaskCommands = 'create' | 'cleanup';
export type Commands = GitCommands | TaskCommands;

export type Ticket = {
  jiraUrl: string;
  title: string;
};

export type TicketConfig = {
  tasks: Ticket[];
  currentIdx: number;
  commitMessage: string;
  commitDescription: string;
};
