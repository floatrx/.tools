import type { Ticket } from '@/types/types';

import { resolvedPath } from '@/config/const';
import { log } from '@/lib/logger';
import chalk from 'chalk';
import fs from 'fs-extra';

export type TicketLoggerEvents = 'create' | 'select' | 'pr';
export async function ticketLogger(event?: TicketLoggerEvents, ticket?: Ticket) {
  if (!ticket) return;

  const reportPath = resolvedPath.ticket.report;
  await fs.ensureFile(reportPath);

  const stats = await fs.stat(reportPath);
  const lastModified = new Date(stats.mtime);
  const today = new Date();

  // We don't need outdated reports -> cleanup
  if (lastModified.toDateString() !== today.toDateString()) {
    await fs.writeFile(reportPath, '');
  }

  let reportContent = await fs.readFile(reportPath, 'utf-8');
  const { id, ticketType, jiraUrl, title, prLinks } = ticket;

  const heading = `💬 ${title}`;
  const jiraLink = `🔗 ${jiraUrl}`;
  const poolRequests = prLinks?.length ? `🗄️ PR ${prLinks.join(',')}` : '';
  const divider = '---\n\n';
  const dividerRegex = new RegExp(`${divider}$`);
  const { emoji } = ticketType;

  const getHeading = (msg: string) => `${emoji} ${msg}: ${id} (${ticketType.description})`;
  const merge = (...strings: string[]) => strings.filter(Boolean).join('\n');

  switch (event) {
    case 'create':
      reportContent += merge(getHeading('Start work on'), heading, jiraLink, divider);
      break;
    case 'select':
      reportContent += merge(getHeading('Proceed with'), heading, jiraLink, poolRequests, divider);
      break;
    case 'pr':
      // remove the last divider and add new entry with a PR link
      reportContent = reportContent.replace(dividerRegex, '');
      reportContent += merge(`👀 PR ${prLinks.at(-1)}`, divider);
      break;
    default:
      reportContent += 'No event specified\n';
  }

  await log.process({ task: 'Report sync' }, () => fs.writeFile(reportPath, reportContent, { encoding: 'utf-8' }));
  console.log(chalk.green(`Report saved in:`), reportPath);
}
