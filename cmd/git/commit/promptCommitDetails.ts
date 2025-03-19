import { getChangedFiles } from '@/cmd/git/commit/getChangedFiles';
import inquirer from 'inquirer';

export const promptCommitDetails = async () => {
  const files = await getChangedFiles();

  console.log('Changed files:', files);

  if (files.length === 0) {
    console.log('No changed files to select.');
    return { jiraIssue: '', commitMessage: '', selectedFiles: [] };
  }

  return inquirer.prompt([
    {
      type: 'input',
      name: 'jiraIssue',
      message: 'Enter the JIRA issue number: CRM-',
    },
    {
      type: 'input',
      name: 'commitMessage',
      message: 'What has been done? Commit description:',
    },
    {
      type: 'checkbox',
      name: 'selectedFiles',
      message: 'Select the files to include in the commit:',
      choices: files,
    },
  ]);
};
