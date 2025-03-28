import type { Ticket } from '@/types/types';

import { resolvedPath } from '@/config/const';
import { mergeStrings } from '@/lib/strings';
import fs from 'fs-extra';

// Ticket dividers ---
const divider = {
  char: '-',
  count: 3,
  line: `\n${'-'.repeat(3)}\n`,
};

export type TicketReportVariants = 'create' | 'select' | 'pr';

/**
 * Generates daily reports based on activity logs:
 * - created tickets
 * - selected tickets
 * - added PR links
 * @param {string} variant - The report variant
 * @param {Ticket} ticket - The ticket data
 */
export async function logIntoReport(variant?: TicketReportVariants, ticket?: Ticket) {
  if (!ticket) return;

  const { id, ticketType, jiraUrl, title, prLinks } = ticket;

  const reportPath = resolvedPath.ticket.report;
  await fs.ensureFile(reportPath);

  let entireReport = await fs.readFile(reportPath, 'utf-8');
  entireReport = entireReport.trim(); // remove trailing newlines before processing

  // Check if the report already contains the ticket ID (avoid duplicates)
  const today = new Date().toDateString();
  const todayIndex = entireReport.indexOf(`## ${today}`);
  const todayReport = todayIndex !== -1 ? entireReport.slice(todayIndex) : '';

  // Check if PR already exists in the report before adding
  const hasIssueReport = todayReport.includes(id);
  if (hasIssueReport && variant !== 'pr') {
    console.log('Daily report already contains this issue:', id);
    return;
  }

  // ensure the last PR link is already in a daily report
  const lastPrLink = variant === 'pr' && prLinks?.at(-1);
  if (lastPrLink && todayReport.includes(lastPrLink)) {
    console.log('Daily report already contains this PR:', lastPrLink.split('/').pop());
    return;
  }

  // Timestamp
  const hasTodayReport = entireReport.includes(today);
  if (!hasTodayReport) entireReport += `\n## ${today}\n`; // prepend the current date

  // Prepare the report content
  const heading = `💬 ${title}`;
  const jiraLink = `🔗 ${jiraUrl}`;
  const poolRequests = prLinks?.length ? `🗄️ PR ${prLinks.join(', ')}` : '';
  const { emoji } = ticketType;

  const formatHeading = (msg: string) => `\n${emoji} ${msg}: ${id} (${ticketType.description})`;
  const lastPrInfo = mergeStrings(`🗄️ PR ${prLinks.at(-1)}`);

  // Split the report into lines
  const reportLines = entireReport.split('\n');
  const taskLineIdx = reportLines.findLastIndex((line) => line.includes(id));
  const nextDividerIndex = reportLines
    .slice(taskLineIdx)
    .findIndex((line) => line === divider.char.repeat(divider.count));

  // Report types
  switch (variant) {
    case 'create':
      entireReport += mergeStrings(formatHeading('Start work on'), heading, jiraLink);
      break;
    case 'select':
      entireReport += mergeStrings(formatHeading('Proceed with'), heading, jiraLink, poolRequests);
      break;
    case 'pr':
      if (taskLineIdx === -1) return;
      if (nextDividerIndex !== -1) {
        // Insert the new PR info before the next divider
        reportLines.splice(taskLineIdx + nextDividerIndex, 0, lastPrInfo);
      }
      entireReport = reportLines.join('\n');
      break;
    default:
      entireReport += 'No event specified\n';
  }

  if (!entireReport.endsWith(divider.line.trim())) {
    entireReport += divider.line;
  }

  fs.writeFile(reportPath, entireReport.trim(), { encoding: 'utf-8' });
}
