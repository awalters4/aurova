'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from 'lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    // This will parse the #access_token fragment and set the session client-side.
    // It also covers "code" style redirects (OAuth) if you add those later.
    (async () => {
      // Force Supabase to hydrate session from the URL/hash
      await supabase.auth.getSession();

      // Optional: if you want to guard accidental direct visits, check param "type"
      const type = sp.get('type'); // e.g., 'magiclink', 'recovery', etc.

      // After session is set, go to your app
      router.replace('/dashboard'); // or '/' if you prefer
    })();
  }, [router, sp]);

  return (
    <div className="container-page">
      <div className="section">
        <p>Signing you in…</p>
      </div>
    </div>
  );
}
