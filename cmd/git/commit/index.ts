import { handleCommit } from '@/cmd/git/commit/handleCommit';
import { parseIssueAndMessage } from '@/cmd/git/commit/parseIssueAndMessage';
import { findDirtyFiles } from '@/lib/gitDirty';
import inquirer from 'inquirer';

export const promptGitCommit = async () => {
  const files = await findDirtyFiles();
  if (files.length === 0) {
    return { jiraIssue: '', commitMessage: '', commitDescription: '', selectedFiles: [] };
  }

  const { jiraIssue, commitMessage } = parseIssueAndMessage();

  return inquirer.prompt([
    {
      type: 'input',
      name: 'jiraIssue',
      message: 'Enter the JIRA issue number: CRM -',
      required: true,
      default: jiraIssue,
      validate: (input) => {
        const isValid = /^\d{4}$/.test(input);
        return isValid || 'Please enter a valid JIRA issue number e.g. CRM-1234';
      },
    },
    {
      type: 'input',
      name: 'commitMessage',
      message: 'Commit message:',
      default: commitMessage,
      validate: (input) => {
        const isValid = /^[a-z]/.test(input);
        return isValid || 'Commit message should start with a lowercase letter.';
      },
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
