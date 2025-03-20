import { promptTicketCreate } from '@/cmd/ticket/create/index.ts';
import { readConfig, syncConfig } from '@/cmd/ticket/syncConfig.ts';
import { resolvedPath } from '@/config/const.ts';
import { log } from '@/lib/logger.ts';
import { parseJiraIssue } from '@/lib/strings.ts';
import { $run } from '@/process.ts';

// In progress...
export const handleTicketCreate = async () => {
  const { jiraUrl, type, actions } = await promptTicketCreate();

  console.log('JIRA URL:', jiraUrl);
  console.log('Type:', type);
  console.log('Actions:', actions);

  const jiraIssueNumber = parseJiraIssue(jiraUrl);

  if (actions.includes('doCreateBranch')) {
    console.log(`git checkout -b "${type}/${jiraIssueNumber}"`);
    await $run(`git checkout -b "${type.split(' ').pop()}/${jiraIssueNumber}"`, resolvedPath.root);
  }

  const config = await readConfig();

  log.process(
    { task: 'Syncing config...', success: 'ticket/config.json synced!' },
    async () => await syncConfig({ ...config, type, jiraUrl, jiraIssueNumber })
  );
};
