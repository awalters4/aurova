'use client';
import { useEffect, useState } from 'react';
import { supabase } from 'lib/supabaseClient';

export default function ReminderSettings() {
  const [time, setTime] = useState('21:00');
  const [enabled, setEnabled] = useState(true);

  useEffect(() => { (async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from('reminders').select('*').limit(1).maybeSingle();
    if (data) { setTime(data.time_local); setEnabled(data.enabled); }
  })(); }, []);

  async function save() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert('Sign in first');
    const { data: u } = await supabase.auth.getUser();
    const email = u?.user?.email!;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // upsert
    const { error } = await supabase.from('reminders').upsert({
      user_id: user.id, email, time_local: time, timezone, enabled
    }, { onConflict: 'user_id' });
    if (error) alert(error.message);
    else alert('Reminder saved');
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h3 className="text-lg font-semibold mb-3">Reminder</h3>
      <div className="flex items-center gap-3">
        <input type="time" value={time} onChange={e=>setTime(e.target.value)} className="border rounded p-2"/>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)}/>
          Enabled
        </label>
        <button onClick={save} className="ml-auto rounded bg-black text-white px-4 py-2">Save</button>
      </div>
    </div>
  );
}
