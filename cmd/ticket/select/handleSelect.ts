import { promptTicketSelect } from '@/cmd/ticket/select/index';
import { readConfig, syncConfig } from '@/lib/tickets';

export const handleSelect = async () => {
  const { selectedTicket } = await promptTicketSelect();
  const ticketsConfig = await readConfig();
  ticketsConfig.current = selectedTicket;
  await syncConfig(ticketsConfig);
};
