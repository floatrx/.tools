import { handleCommit } from '@/cmd/git/commit/handleCommit.ts';
import { resolvedPath } from '@/config/const.ts';
import chalk from 'chalk';
import fs from 'fs';

export const parseIssueAndMessage = () => {
  const msgFile = resolvedPath.commitMessageFile;
  let jiraIssue = '000';
  let commitMessage = 'add new feature';

  try {
    const commitMessageContent = fs.readFileSync(msgFile, 'utf-8');
    console.log('Commit message content:', commitMessageContent);
    const match = commitMessageContent.match(/CRM-(\d+):\s*(.*)/);
    if (match) {
      jiraIssue = match[1];
      commitMessage = match[2];
    }
    console.log('Prev:', chalk.yellow(`CRM-${jiraIssue}`), chalk.blue(commitMessage));
  } catch (error) {
    console.error('Error reading commit message file:', error);
  }

  return { jiraIssue, commitMessage };
};

handleCommit();
