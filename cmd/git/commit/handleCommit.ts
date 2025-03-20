import { createCommitMessage } from '@/cmd/git/commit/commitMessage';
import { promptGitCommit } from '@/cmd/git/commit/index';
import { resolvedPath } from '@/config/const';
import { log } from '@/lib/logger';
import { $run } from '@/process';
import chalk from 'chalk';

export const handleCommit = async () => {
  const { jiraIssue, commitMessage, selectedFiles, commitDescription } = await promptGitCommit();

  if (selectedFiles.length > 0) {
    const gitAddCommand = `git add -A ${selectedFiles.join(' ')}`;

    log.wait(`\nRun the following command to stage the selected files:`);
    console.log(chalk.green(selectedFiles));

    await $run(gitAddCommand, resolvedPath.root);
    await $run('git status', resolvedPath.root);
    await createCommitMessage(jiraIssue, commitMessage, commitDescription, resolvedPath.root);
  } else {
    log.info('No files selected.');
  }
};
