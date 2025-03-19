import { run } from '@/process';
import { log } from '@/lib/logger';
import { resolvedPath } from '@/config/const';
import { promptCommitDetails } from './promptCommitDetails';
import { createCommitMessage } from './createCommitMessage';
import chalk from 'chalk';

export const handleCommit = async () => {
  const { jiraIssue, commitMessage, selectedFiles } = await promptCommitDetails();

  if (selectedFiles.length > 0) {
    const gitAddCommand = `git add -A ${selectedFiles.join(' ')}`;
    log.wait(`\nRun the following command to stage the selected files:\n${chalk.green(gitAddCommand)}\n`);
    await run(gitAddCommand, resolvedPath.root);
    await run('git status', resolvedPath.root);
    await createCommitMessage(jiraIssue, commitMessage, resolvedPath.root);
  } else {
    log.info('No files selected.');
  }
};

handleCommit();
