import type { Metadata } from 'next';
import VisaPage from '@/components/VisaPage';

export const metadata: Metadata = {
  title: 'Visa Services | Darul Safar',
  description: 'Visa consultation and requirements guidance for Ethiopian travelers.'
};

export default function VisasRoutePage() {
  return <VisaPage />;
}
