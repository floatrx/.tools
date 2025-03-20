import type { TicketConfig } from '@/types/types.ts';

import { resolvedPath } from 'config/const';
import fs from 'fs-extra';

/**
 * Sync config.json with the provided config object
 * @param newConfig - The new configuration object to merge with the existing config
 */
export const syncConfig = async (newConfig: TicketConfig): Promise<void> => {
  const configPath = resolvedPath.ticket.config;

  // Read the existing config file
  const existingConfig = await fs.readJson(configPath);

  // Merge the existing config with the new config
  const updatedConfig = { ...existingConfig, ...newConfig };

  // Write the updated config back to the config file
  await fs.writeJson(configPath, updatedConfig, { spaces: 2 });
};

export const readConfig = async (): Promise<TicketConfig> => {
  return await fs.readJson(resolvedPath.ticket.config);
};
