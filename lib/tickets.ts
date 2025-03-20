import type { InquirerChoice, TicketConfig } from '@/types/types.ts';

import { resolvedPath } from '@/config/const.ts';
import fs from 'fs-extra';

/**
 * Sync config.json with the provided config object
 * @param newConfig - The new configuration object to merge with the existing config
 */
export const syncConfig = async (newConfig: TicketConfig): Promise<void> => {
  const configPath = resolvedPath.ticket.config;
  const existingConfig = await fs.readJson(configPath);
  const updatedConfig = { ...existingConfig, ...newConfig };
  await fs.writeJson(configPath, updatedConfig, { spaces: 2 });
};

export const readConfig = async (): Promise<TicketConfig> => {
  const configPath = resolvedPath.ticket.config;
  try {
    await fs.ensureFile(configPath);
    return await fs.readJson(configPath);
  } catch (e) {
    if (e instanceof SyntaxError) {
      await fs.writeJson(configPath, { tickets: {}, current: '' }, { spaces: 2 });
      return {};
    }
    throw e;
  }
};

/**
 * Get the list of tickets and the current ticket (for prompt)
 */
export const getTicketIssues = async () => {
  const { tickets, current: id = '0000' } = await readConfig();
  const currentTicket = tickets?.[id];
  const ticketList: InquirerChoice<string>[] = tickets
    ? Object.keys(tickets).map((id) => {
        const { ticketType, jiraUrl, title, lastCommitMsg } = tickets[id];
        return {
          name: `${ticketType.emoji} ${id} - ${title}\n🌍 ${jiraUrl}\n✉️ ${lastCommitMsg}\n`,
          value: id,
          description: '',
        };
      })
    : [];
  return { ticketList, currentTicket };
};
