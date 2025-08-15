// app/login/page.tsx
'use client';
import { useState } from 'react';
import { supabase } from 'lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function send() {
    const base =
      process.env.NEXT_PUBLIC_APP_URL ||
      (typeof window !== 'undefined' ? window.location.origin : '');
    if (!email) return alert('Enter your email');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${base}/dashboard` },
    });
    if (error) alert(error.message);
    else setSent(true);
  }

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Sign in to Aurova</h1>
      {sent ? (
        <p>Magic link sent to <b>{email}</b>. Check your inbox.</p>
      ) : (
        <>
          <input
            className="w-full border rounded-lg p-3 mb-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
          <button onClick={send} className="w-full rounded-lg bg-black text-white py-3">
            Send magic link
          </button>
        </>
      )}
    </div>
  );
}
