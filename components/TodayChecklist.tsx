'use client';
import { useEffect, useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
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
/* dependency-free emoji picker rendered in a portal (won’t clip) */
function EmojiPicker({ value, onChange }: { value: string; onChange: (v: string)=>void }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const options = ["✅","🔥","💧","📚","🧘🏽‍♀️","🥗","💪🏽","🌙","🧴","🧹","🚰","🧠","🧺","🧽","🛏️","🧑🏾‍🍳"];

  // compute panel position near the trigger
  useEffect(() => {
    if (!open || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const panelWidth = 240; // ~picker width
    const left = Math.min(Math.max(8, r.left), window.innerWidth - panelWidth - 8);
    const top = r.bottom + 8;
    setPos({ top, left });
  }, [open]);

  // close on outside click / ESC
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="w-8 h-8 text-lg"
        onClick={() => setOpen(v => !v)}
        title="Emoji"
      >
        {value}
      </button>

      {open && typeof window !== 'undefined' &&
        createPortal(
          <div
            ref={panelRef}
            className="fixed z-[9999] w-[240px] rounded-xl border bg-white shadow-lg p-2"
            style={{ top: pos.top, left: pos.left }}
            role="listbox"
          >
            <div className="grid grid-cols-6 gap-1">
              {options.map(o => (
                <button
                  key={o}
                  type="button"
                  className="w-8 h-8 text-lg rounded hover:bg-black/5"
                  onClick={() => { onChange(o); setOpen(false); }}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )
      }
    </>
  );
}


/* helpers */

// Modal to confirm clearing a day's data
export function ConfirmClear({
  selectedDate,
  onClose,
}: {
  selectedDate: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30">
      <div className="section w-[320px] text-center">
        <h3 className="h-title mb-2">Clear this day?</h3>
        <p className="muted mb-4">
          This will remove all check-ins for <strong>{selectedDate}</strong>.
        </p>
        <div className="flex justify-center gap-2">
          <button
            type="button"
            className="btn-ghost"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              try {
                const raw = localStorage.getItem('lifestack_data');
                if (raw) {
                  const data = JSON.parse(raw);
                  delete data[selectedDate];
                  localStorage.setItem('lifestack_data', JSON.stringify(data));
                }
              } catch (e) {
                console.error('Failed to clear day', e);
              } finally {
                onClose();
              }
            }}
          >
            Clear
          </button>
        </div>
      </div>
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
