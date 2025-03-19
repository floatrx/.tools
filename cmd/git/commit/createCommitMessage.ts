import { join } from 'path';
import { writeFile } from 'fs/promises';
import { log } from '@/lib/logger';
import { run } from '@/process';

export const createCommitMessage = async (jiraIssue: string, commitMessage: string, appRoot: string) => {
  const message = `CRM-${jiraIssue}: ${commitMessage}`;
  const tempMsgFilePath = join(appRoot, '.git', 'COMMIT_MESSAGE.txt');

  // Write the commit message to a temporary file
  await writeFile(tempMsgFilePath, message);

  log.info(`Commit message template created at ${tempMsgFilePath}`);

  // Use the temporary file as the commit message template
  await run(`git commit -F ${tempMsgFilePath}`, appRoot);
};
