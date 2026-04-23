import type { Metadata } from 'next';
import HomePage from '@/components/home/HomePage';

export const metadata: Metadata = {
  title: 'Darul Safar | Premium Travel & Pilgrimage for Ethiopian Travelers',
  description:
    'Darul Safar helps Ethiopian travelers with premium pilgrimage planning, global ticketing, visa services, and modern travel tools with a refined digital experience.'
};

export default function Page() {
  return <HomePage />;
}
