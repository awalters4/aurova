'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from 'lib/supabaseClient';
import SignOutButton from './SignOutButton';

export default function Navbar() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setEmail(session?.user?.email ?? null)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link href="/" className="font-semibold">Aurova</Link>
        <nav className="ml-auto flex items-center gap-3 text-sm">
          {email ? (
            <>
              <span className="opacity-70">{email}</span>
              <SignOutButton />
            </>
          ) : (
            <Link href="/login" className="px-3 py-2 rounded-lg border hover:bg-gray-50">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
