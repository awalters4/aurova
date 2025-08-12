'use client';
import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { supabase } from 'lib/supabaseClient';

type Habit = { id: string; name: string; emoji: string };

export default function TodayChecklist({ selectedDate }: { selectedDate: string }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [entries, setEntries] = useState<Record<string, boolean>>({});
  const [newName, setNewName] = useState('');
  const [newEmoji, setNewEmoji] = useState('✅');

  const day = useMemo(() => selectedDate, [selectedDate]);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [h, e] = await Promise.all([
        supabase.from('habits').select('id,name,emoji').order('created_at', { ascending: true }),
        supabase.from('habit_entries').select('habit_id').eq('date', day)
      ]);

      if (!h.error && h.data) setHabits(h.data as Habit[]);
      if (!e.error && e.data) {
        const map: Record<string, boolean> = {};
        (e.data as { habit_id: string }[]).forEach((x) => (map[x.habit_id] = true));
        setEntries(map);
      }
    })();
  }, [day]);

  async function toggle(habit_id: string) {
    const on = !!entries[habit_id];
    if (on) {
      const { error } = await supabase.from('habit_entries')
        .delete().eq('habit_id', habit_id).eq('date', day);
      if (!error) setEntries((m) => ({ ...m, [habit_id]: false }));
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { error } = await supabase.from('habit_entries')
        .insert({ habit_id, user_id: user.id, date: day, completed: true });
      if (!error) setEntries((m) => ({ ...m, [habit_id]: true }));
    }
  }

  async function addHabit() {
    if (!newName.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase.from('habits').insert({
      user_id: user.id, name: newName.trim(), emoji: newEmoji
    }).select('id,name,emoji').single();
    if (error) return alert(error.message);
    setHabits((h) => [...h, data as Habit]);
    setNewName('');
  }

  async function renameHabit(id: string, name: string) {
    const { error } = await supabase.from('habits').update({ name }).eq('id', id);
    if (!error) setHabits((arr) => arr.map((h) => (h.id === id ? { ...h, name } : h)));
  }

  async function deleteHabit(id: string) {
    const { error } = await supabase.from('habits').delete().eq('id', id);
    if (!error) {
      setHabits((arr) => arr.filter((h) => h.id !== id));
      setEntries((m) => {
        const { [id]: _, ...rest } = m;
        return rest;
      });
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Today’s checklist</h3>
        <div className="text-sm opacity-70">{format(new Date(day), 'EEE, MMM d')}</div>
      </div>

      {/* Add habit */}
      <div className="flex gap-2 mb-4">
        <input
          className="w-20 border rounded-lg p-2 text-center"
          value={newEmoji}
          onChange={(e) => setNewEmoji(e.target.value)}
        />
        <input
          className="flex-1 border rounded-lg p-2"
          placeholder="Add a habit"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={addHabit} className="rounded-lg bg-black text-white px-4">Add</button>
      </div>

      {/* List */}
      <ul className="divide-y">
        {habits.map((h) => (
          <li key={h.id} className="flex items-center gap-3 py-3">
            <button
              onClick={() => toggle(h.id)}
              className={`w-6 h-6 rounded-md border ${entries[h.id] ? 'bg-black' : 'bg-white'}`}
              aria-pressed={!!entries[h.id]}
              title="Toggle complete"
            />
            <span className="text-xl">{h.emoji}</span>
            <InlineEdit
              initial={h.name}
              onSave={(val) => renameHabit(h.id, val)}
              className="flex-1"
            />
            <button
              onClick={() => deleteHabit(h.id)}
              className="text-sm px-2 py-1 rounded border hover:bg-gray-50"
              title="Delete habit"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** inline text edit */
function InlineEdit({
  initial, onSave, className
}: { initial: string; onSave: (val: string) => void; className?: string }) {
  const [val, setVal] = useState(initial);
  const [editing, setEditing] = useState(false);
  useEffect(() => setVal(initial), [initial]);

  return editing ? (
    <form
      className={className}
      onSubmit={(e) => { e.preventDefault(); setEditing(false); if (val.trim() && val !== initial) onSave(val.trim()); }}
    >
      <input
        autoFocus
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={() => { setEditing(false); if (val.trim() && val !== initial) onSave(val.trim()); }}
        className="w-full border rounded-lg p-1.5"
      />
    </form>
  ) : (
    <button onClick={() => setEditing(true)} className={`${className} text-left hover:underline`}>
      {val}
    </button>
  );
}

/** confirm-clear modal (exported for Home to use) */
function ConfirmClear({ selectedDate, onClose }: { selectedDate: string; onClose: () => void }) {
  async function clear() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return onClose();
    await supabase.from('habit_entries').delete().eq('user_id', user.id).eq('date', selectedDate);
    onClose();
  }
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
        <p className="mb-4">
          Delete all entries for <strong>{selectedDate}</strong>?
        </p>
        <div className="flex justify-around">
          <button className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600" onClick={clear}>Yes</button>
          <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}
TodayChecklist.ConfirmClear = ConfirmClear as any;
