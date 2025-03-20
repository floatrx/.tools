import { handleCommit } from '@/cmd/git/commit/handleCommit';
import { findDirtyFiles } from '@/lib/gitDirty';
import { getTicketIssues } from '@/lib/tickets.ts';
import inquirer from 'inquirer';

export const promptGitCommit = async () => {
  const files = await findDirtyFiles();
  if (files.length === 0) {
    return { jiraIssue: '', commitMessage: '', commitDescription: '', selectedFiles: [] };
  }

  const { ticketList, currentTicket } = await getTicketIssues();

  return inquirer.prompt([
    {
      type: 'list',
      name: 'jiraIssue',
      message: 'Select the JIRA issue number:',
      choices: ticketList,
      default: currentTicket?.id,
    },
    {
      type: 'input',
      name: 'commitMessage',
      message: 'Commit message:',
      default: currentTicket?.lastCommitMsg || 'Commit message',
      required: true,
    },
    {
      type: 'input',
      name: 'commitDescription',
      message: 'What has been done? Optional description:',
      default: '',
      required: true,
    },
    {
      type: 'checkbox',
      name: 'selectedFiles',
      message: 'Select the files to include in the commit:',
      choices: files,
    },
  ]);
};

handleCommit();
