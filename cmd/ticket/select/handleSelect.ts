import { promptTicketSelect } from '@/cmd/ticket/select/index';
import { resolvedPath } from '@/config/const';
import { logIntoReport } from '@/lib/logIntoReport';
import { readConfig, syncConfig } from '@/lib/tickets';
import { $run } from '@/process';

export const handleSelect = async () => {
  const { selectedTicketId, prLink, actions } = await promptTicketSelect();
  if (!selectedTicketId) return;

  const ticketsConfig = await readConfig();
  ticketsConfig.current = selectedTicketId; // save the current ticket ID

  // Try to get the selected ticket by
  const ticket = ticketsConfig.tickets![selectedTicketId];
  await logIntoReport('select', ticket);

  await syncConfig(ticketsConfig);

  // The Ticket wasn't found in the config
  if (!ticket) return;

  // Checkout the selected ticket
  if (actions.includes('doCheckout')) {
    console.log(`Checking out the selected ticket: git checkout ${ticket.branchName}`);
    await $run(`git checkout ${ticket.branchName}`, resolvedPath.root);
  }

  if (actions.includes('doAddPrLink')) {
    // filter duplicate PR links
    ticket.prLinks = Array.from(new Set([...(ticket.prLinks || []), prLink]));
    await logIntoReport('pr', ticket);
    await syncConfig(ticketsConfig);
  }
};
