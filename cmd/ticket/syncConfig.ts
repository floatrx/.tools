import type { TicketConfig } from '@/types/types.ts';

import { resolvedPath } from 'config/const';
import fs from 'fs-extra';

/**
 * Sync config.json with the provided config object
 * @param newConfig - The new configuration object to merge with the existing config
 */
export const syncConfig = async (newConfig: TicketConfig): Promise<void> => {
  const configPath = resolvedPath.ticket.config;

  // Read
  const existingConfig = await fs.readJson(configPath);

  // Merge
  const updatedConfig = { ...existingConfig, ...newConfig };

  // Write
  await fs.writeJson(configPath, updatedConfig, { spaces: 2 });
};

export const readConfig = async (): Promise<TicketConfig> => {
  const configPath = resolvedPath.ticket.config;
  try {
    await fs.ensureFile(configPath);
    return await fs.readJson(configPath);
  } catch (e) {
    if (e instanceof SyntaxError) {
      await fs.writeJson(configPath, {});
      return {};
    }
    throw e;
  }
};
