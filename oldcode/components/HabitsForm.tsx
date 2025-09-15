'use client';

import { useState } from 'react';
import { supabase } from 'lib/supabaseClient';

/* -------- guest-mode helpers (localStorage) -------- */
const G_HABITS_KEY = 'aurova.guest.habits.v1';

function lsLoad<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function lsSave<T>(key: string, value: T) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
function uuid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}

export default function HabitForm({ onCreated }: { onCreated?: () => void }) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('✅');
  const [busy, setBusy] = useState(false);

  async function create() {
    if (!name.trim()) return;

    setBusy(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      // --- Guest mode: store locally ---
      if (!user) {
        const list = lsLoad<{ id: string; name: string; emoji: string }[]>(G_HABITS_KEY, []);
        const next = [...list, { id: uuid(), name: name.trim(), emoji }];
        lsSave(G_HABITS_KEY, next);
        setName('');
        setEmoji('✅');
        onCreated?.();
        return;
      }

      // --- Signed-in path: write to Supabase ---
      const { error } = await supabase
        .from('habits')
        .insert({ user_id: user.id, name: name.trim(), emoji });

      if (error) {
        alert(error.message);
        return;
      }

      setName('');
      setEmoji('✅');
      onCreated?.();
    } catch (e: any) {
      console.error(e);
      alert(e?.message || 'Could not create habit');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h3 className="text-lg font-semibold mb-3">Add a habit</h3>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Read"
          disabled={busy}
        />
        <input
          className="w-20 border rounded-lg p-2 text-center"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          disabled={busy}
        />
        <button
          onClick={create}
          className="rounded-lg bg-black text-white px-4 disabled:opacity-60"
          disabled={busy || !name.trim()}
        >
          {busy ? 'Adding…' : 'Add'}
        </button>
      </div>
      {/* Optional helper note while auth is off */}
      {/* <p className="mt-2 text-xs text-gray-500">Data is saved to this browser while sign-in is disabled.</p> */}
    </div>
  );
}
