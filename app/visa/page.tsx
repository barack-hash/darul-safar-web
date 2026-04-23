import { redirect } from 'next/navigation';

/** Legacy path; canonical route is /visas */
export default function VisaAliasPage() {
  redirect('/visas');
}
