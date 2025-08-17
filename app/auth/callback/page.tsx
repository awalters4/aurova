'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from 'lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    (async () => {
      // If OAuth / PKCE “code” is present, exchange it for a session.
      const code = sp.get('code');
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error('exchangeCodeForSession error:', error.message);
          router.replace('/login');
          return;
        }
        router.replace('/dashboard');
        return;
      }

      // Otherwise, magic-link flow with `#access_token` fragment:
      // supabase-js will parse hash and set cookies on first getSession()
      await supabase.auth.getSession();
      router.replace('/dashboard');
    })();
  }, [router, sp]);

  return (
    <div className="container-page">
      <div className="section">Signing you in…</div>
    </div>
  );
}