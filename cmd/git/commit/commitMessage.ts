import type { JiraIssueNumber } from '@/types/types';

import { resolvedPath } from '@/config/const';
import { log } from '@/lib/logger';
import { fixGrammar } from '@/lib/openai/grammar';
import { readConfig, syncConfig } from '@/lib/tickets';
import { $run } from '@/process';
import { writeFile } from 'fs/promises';

export const createCommitMessage = async (
  jiraIssue: JiraIssueNumber,
  commitMessage: string,
  commitDescription: string,
  appRoot: string
) => {
  const fixedCommitMessage = await fixGrammar(commitMessage + '\n' + commitDescription);
  const message = `${jiraIssue}: ${fixedCommitMessage}`.trim();
  const msgFile = resolvedPath.commitMessageFile;

  log.info(`Generating commit msg tpl at ./git`);
  await writeFile(msgFile, message);
  const ticketsConfig = await readConfig();

  // Save the last commit message
  if (ticketsConfig?.tickets) {
    ticketsConfig.tickets[jiraIssue].lastCommitMsg = message;
  }

  // Sync the last commit message with the selected ticket
  await syncConfig(ticketsConfig);

  // Commit the changes...
  await $run(`git commit -F ${msgFile}`, appRoot);
};
