import type { Metadata } from 'next';
import PilgrimagePage from '@/components/PilgrimagePage';

export const metadata: Metadata = {
  title: 'Sacred Journey | Darul Safar',
  description:
    'Premium Umrah and Hajj journey planning for Ethiopian travelers with guided rituals, tailored packages, and modern preparation tools.'
};

export default function PilgrimageRoutePage() {
  return <PilgrimagePage />;
}
