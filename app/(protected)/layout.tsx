// app/(protected)/layout.tsx
import { redirect } from 'next/navigation';
import { getServerClient } from 'lib/supabaseServer';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');
  return <>{children}</>;
}