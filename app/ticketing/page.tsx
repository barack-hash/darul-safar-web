import type { Metadata } from 'next';
import TicketingPage from '@/components/TicketingPage';

export const metadata: Metadata = {
  title: 'Global Ticketing | Darul Safar',
  description: 'International flight ticketing and logistics through Darul Safar’s airline partner network.'
};

export default function TicketingRoutePage() {
  return <TicketingPage />;
}
