import { writeFile } from 'fs/promises';
import { log } from '@/lib/logger';
import { run } from '@/process';
import { resolvedPath } from '@/config/const';

export const createCommitMessage = async (jiraIssue: string, commitMessage: string, appRoot: string) => {
  const message = `CRM-${jiraIssue}: ${commitMessage}`;
  const msgFile = resolvedPath.commitMessageFile;

  log.info(`Generating commit msg tpl at ./git`);
  await writeFile(msgFile, message);

  // Commit the changes...
  await run(`git commit -F ${msgFile}`, appRoot);
};
