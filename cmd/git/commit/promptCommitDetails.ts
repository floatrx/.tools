import { getChangedFiles } from '@/cmd/git/commit/getChangedFiles';
import inquirer from 'inquirer';
import fs from 'fs';
import { resolvedPath } from '@/config/const';
import chalk from 'chalk';

export const promptCommitDetails = async () => {
  const files = await getChangedFiles();
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

  console.log(chalk.blue('✏️ Changed files:\n'), files.map(({ name }) => chalk.green(`  ${name}`)).join('\n'), '\n');

  if (files.length === 0) {
    console.log('No changed files to select.');
    return { jiraIssue: '', commitMessage: '', selectedFiles: [] };
  }

  return inquirer.prompt([
    {
      type: 'input',
      name: 'jiraIssue',
      message: 'Enter the JIRA issue number: CRM -',
      required: true,
      default: jiraIssue,
      validate: (input) => {
        const isValid = /^\d{4}$/.test(input);
        return isValid || 'Please enter a valid JIRA issue number (CRM-000 to CRM-9999)';
      },
    },
    {
      type: 'input',
      name: 'commitMessage',
      message: 'What has been done? Commit description:',
      default: commitMessage,
      validate: (input) => {
        const isValid = /^[a-z]/.test(input);
        return isValid || 'Commit message should start with a lowercase letter.';
      },
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
