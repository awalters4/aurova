'use client';
import { useState } from 'react';
import { supabase } from 'lib/supabaseClient';

export default function HabitForm({ onCreated }: { onCreated?: ()=>void }) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('✅');

  async function create() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert('Sign in first');
    const { error } = await supabase.from('habits').insert({
      user_id: user.id, name, emoji
    });
    if (error) return alert(error.message);
    setName(''); onCreated?.();
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h3 className="text-lg font-semibold mb-3">Add a habit</h3>
      <div className="flex gap-2">
        <input className="flex-1 border rounded-lg p-2" value={name}
          onChange={e=>setName(e.target.value)} placeholder="e.g., Read" />
        <input className="w-20 border rounded-lg p-2 text-center" value={emoji}
          onChange={e=>setEmoji(e.target.value)} />
        <button onClick={create} className="rounded-lg bg-black text-white px-4">Add</button>
      </div>
    </div>
  );
}
