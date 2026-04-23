import type { Metadata } from 'next';
import ToolsPage from '@/components/ToolsPage';

export const metadata: Metadata = {
  title: 'Travel Tools | Darul Safar',
  description: 'Currency converter, world clocks, itinerary planning, and live flight tracking.'
};

export default function ToolsRoutePage() {
  return <ToolsPage />;
}
