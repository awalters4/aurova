'use client';
import { supabase } from 'lib/supabaseClient';

export default function SignOutButton() {
  return (
    <button
      onClick={() => supabase.auth.signOut()}
      className="px-3 py-2 rounded-lg border hover:bg-gray-50"
    >
      Sign out
    </button>
  );
}
