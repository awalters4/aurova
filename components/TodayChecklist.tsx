'use client';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from 'lib/supabaseClient';

type Habit = { id: string; name: string; emoji: string };
type Entry = { habit_id: string; date: string };

export default function TodayChecklist({ selectedDate }: { selectedDate: string }) {
  const day = useMemo(() => selectedDate, [selectedDate]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});
  const [adding, setAdding] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmoji, setNewEmoji] = useState('✅');
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => { void reload(); }, [day]);

  async function reload() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const [h, e] = await Promise.all([
      supabase.from('habits').select('id,name,emoji').order('created_at', { ascending: true }),
      supabase.from('habit_entries').select('habit_id').eq('date', day)
    ]);
    if (!h.error && h.data) setHabits(h.data as Habit[]);
    const map: Record<string, boolean> = {};
    if (!e.error && e.data) (e.data as Entry[]).forEach(x => (map[x.habit_id] = true));
    setDoneMap(map);
  }

  async function toggle(habit_id: string) {
    try {
      setBusy(habit_id);
      const on = !!doneMap[habit_id];
      if (on) {
        const { error } = await supabase.from('habit_entries')
          .delete().eq('habit_id', habit_id).eq('date', day);
        if (error) throw error;
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not signed in');
        const { error } = await supabase.from('habit_entries')
          .insert({ habit_id, user_id: user.id, date: day, completed: true });
        if (error) throw error;
      }
      // optimistic update so you see it instantly
      setDoneMap(m => ({ ...m, [habit_id]: !m[habit_id] }));
    } catch (err: any) {
      alert(err?.message || 'Could not update');
      console.error(err);
    } finally {
      setBusy(null);
    }
  }

  async function addHabit() {
    if (!newName.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert('Sign in first');
    const { data, error } = await supabase.from('habits')
      .insert({ user_id: user.id, name: newName.trim(), emoji: newEmoji })
      .select('id,name,emoji').single();
    if (error) return alert(error.message);
    setHabits(h => [...h, data as Habit]);
    setNewName(''); setNewEmoji('✅'); setAdding(false);
  }

  async function deleteHabit(id: string) {
    const { error } = await supabase.from('habits').delete().eq('id', id);
    if (error) return alert(error.message);
    setHabits(arr => arr.filter(h => h.id !== id));
    setDoneMap(m => { const { [id]: _, ...rest } = m; return rest; });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="h-title">  </h3>
        <div className="flex items-center gap-2">
          <button type="button" className={`btn-ghost ${deleteMode ? 'border-red-500 text-red-600' : ''}`} onClick={() => setDeleteMode(v=>!v)} title="Delete mode">❌</button>
          <button type="button" className="btn-ghost" onClick={() => setAdding(v=>!v)} title="Add habit">➕</button>
        </div>
      </div>

      <ul className="divide-y">
  {habits.map(h => {
    const on = !!doneMap[h.id];
    return (
      <li key={h.id} className="flex items-center gap-3 py-3">
        {/* VISIBLE CHECKBOX SQUARE */}
        <button
  type="button"
  onClick={() => toggle(h.id)}
  className={`chk ${on ? 'chk-on' : ''}`}
  aria-label={on ? 'Uncheck habit' : 'Check habit'}
  aria-pressed={on}
>
  {on && (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l3 3 7-7" />
    </svg>
  )}
</button>


        <EmojiPicker
          value={h.emoji}
          onChange={async emo => {
            const { error } = await supabase.from('habits').update({ emoji: emo }).eq('id', h.id);
            if (!error) setHabits(list => list.map(x => x.id === h.id ? { ...x, emoji: emo } : x));
          }}
        />

        <InlineEdit
          initial={h.name}
          onSave={val => supabase.from('habits').update({ name: val }).eq('id', h.id)
            .then(({ error }) => {
              if (!error) setHabits(list => list.map(x => x.id === h.id ? { ...x, name: val } : x));
            })}
          className="flex-1"
        />

        {deleteMode && (
          <button type="button" className="btn-ghost text-xs" onClick={() => deleteHabit(h.id)}>
            Delete
          </button>
        )}
      </li>
    );
  })}
  {habits.length === 0 && <li className="py-6 muted">No habits yet — click ➕ to add.</li>}
</ul>


      {adding && (
        <div className="mt-4 flex gap-2">
          <EmojiPicker value={newEmoji} onChange={setNewEmoji} />
          <input className="flex-1 input" placeholder="Habit name" value={newName} onChange={e=>setNewName(e.target.value)} />
          <button type="button" className="btn-primary" onClick={addHabit}>Add</button>
        </div>
      )}
    </div>
  );
}

/* helpers */
function EmojiPicker({ value, onChange }: { value: string; onChange: (v: string)=>void }) {
  const [open, setOpen] = useState(false);
  const options = ["✅","🔥","💧","📚","🧘🏽‍♀️","🥗","💪🏽","🌙","🧴","🧹"];
  return (
    <div className="relative">
      <button type="button" className="w-8 h-8 text-lg" onClick={()=>setOpen(v=>!v)} title="Emoji">{value}</button>
      {open && (
        <div className="absolute z-50 mt-1 bg-white border rounded-lg shadow p-2 grid grid-cols-5 gap-1">
          {options.map(o => (
            <button type="button" key={o} className="w-8 h-8 text-lg hover:bg-black/5 rounded" onClick={()=>{ onChange(o); setOpen(false); }}>
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InlineEdit({ initial, onSave, className }:{ initial:string; onSave:(v:string)=>void; className?:string }) {
  const [val, setVal] = useState(initial);
  const [editing, setEditing] = useState(false);
  useEffect(()=>setVal(initial),[initial]);
  return editing ? (
    <form className={className} onSubmit={(e)=>{e.preventDefault(); setEditing(false); if(val.trim()&&val!==initial) onSave(val.trim());}}>
      <input autoFocus value={val} onChange={e=>setVal(e.target.value)} onBlur={()=>{ setEditing(false); if(val.trim()&&val!==initial) onSave(val.trim()); }} className="w-full border rounded-lg p-1.5"/>
    </form>
  ) : (
    <button type="button" onClick={()=>setEditing(true)} className={`${className} text-left hover:underline`}>{val}</button>
  );
}
