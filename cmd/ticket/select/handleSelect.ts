import { promptTicketSelect } from '@/cmd/ticket/select/index';
import { resolvedPath } from '@/config/const';
import { readConfig, syncConfig } from '@/lib/tickets';
import { $run } from '@/process';

export const handleSelect = async () => {
  const { selectedTicket, doCheckout } = await promptTicketSelect();
  const ticketsConfig = await readConfig();
  ticketsConfig.current = selectedTicket;

  const ticket = ticketsConfig.tickets![selectedTicket];

  // Checkout the selected ticket
  if (ticket && doCheckout) {
    console.log(`Checking out the selected ticket: git checkout ${ticket.branchName}`);
    await $run(`git checkout ${ticket.branchName}`, resolvedPath.root);
  }

  await syncConfig(ticketsConfig);
};
