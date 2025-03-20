import { resolvedPath } from '@/config/const';
import { log } from '@/lib/logger';
import { $run } from '@/process';
import { writeFile } from 'fs/promises';

export const createCommitMessage = async (jiraIssue: string, commitMessage: string, commitDescription: string, appRoot: string) => {
  const message = `CRM-${jiraIssue}: ${commitMessage}\n${commitDescription}`.trim();
  const msgFile = resolvedPath.commitMessageFile;

  log.info(`Generating commit msg tpl at ./git`);
  await writeFile(msgFile, message);

  // Commit the changes...
  await $run(`git commit -F ${msgFile}`, appRoot);
};
