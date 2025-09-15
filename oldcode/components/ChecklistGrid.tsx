'use client';

import { useEffect, useState } from 'react';
import { supabase } from 'lib/supabaseClient';
import { formatShort } from "lib/dates";


type Habit = { id: string; name: string; emoji: string };
type Entry = { habit_id: string; date: string };

/**
 * Progress Dashboard grid
 * - Habits = columns
 * - Days with any data = rows (Day N / date)
 * - Read-only; reflects Command Center check-offs automatically
 */
export default function ChecklistGrid() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // RLS should scope to current user; no explicit filter needed if policies are set.
        const [h, e] = await Promise.all([
          supabase.from('habits').select('id,name,emoji').order('created_at', { ascending: true }),
          // pull a sensible window (last 365 days) so the table stays light
          supabase.from('habit_entries')
            .select('habit_id,date')
            .gte('date', oneYearAgoISO())
            .order('date', { ascending: true }),
        ]);

        if (!h.error && h.data) setHabits(h.data as Habit[]);
        if (!e.error && e.data) setEntries(e.data as Entry[]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const rows = computeRows(entries); // [{ ds, dayNum }]
  const hasData = rows.length > 0;

  return (
    <div className="section">
      <div className="text-center mb-3">
        <h3 className="h-title">Progress Dashboard</h3>
      </div>

      <div className="relative overflow-auto">
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 bg-[var(--color-card)] text-left px-3 py-2 font-medium border-b">
                Day / Date
              </th>
              {habits.map((h) => (
                <th key={h.id} className="px-2 py-2 text-center font-medium border-b">
                  <span className="mr-1">{h.emoji}</span>
                  {h.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-6 muted" colSpan={1 + habits.length}>Loading…</td>
              </tr>
            ) : !hasData ? (
              <tr>
                <td className="px-3 py-6 muted" colSpan={1 + habits.length}>
                  No check-ins yet. Mark habits in the Command Center.
                </td>
              </tr>
            ) : (
              rows.map(({ ds, dayNum }) => (
                <tr key={ds} className="hover:bg-black/[0.02]">
                  <td
                    className="sticky left-0 z-10 bg-[var(--color-card)] px-3 py-2 whitespace-nowrap border-b"
                    style={{ boxShadow: '2px 0 0 0 rgba(0,0,0,0.05)' }}
                  >
                    Day {dayNum} / {formatShort(ds)}
                  </td>

                  {habits.map((h) => {
                    const on = entries.some((e) => e.habit_id === h.id && e.date === ds);
                    return (
                      <td key={h.id + ds} className="border-b">
                        <div
                          className={`mx-auto my-1 w-7 h-7 rounded-md border flex items-center justify-center ${
                            on ? 'bg-black text-white' : 'bg-white'
                          }`}
                          title={on ? 'Completed' : ''}
                        >
                          {on ? h.emoji : ''}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function oneYearAgoISO() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return d.toISOString().slice(0, 10);
}

function computeRows(entries: Entry[]): { ds: string; dayNum: number }[] {
  // unique dates (YYYY-MM-DD) ascending
  const uniq = Array.from(new Set(entries.map((e) => e.date))).sort();
  return uniq.map((ds, i) => ({ ds, dayNum: i + 1 }));
}

// function formatShort(ds: string) {
//   const d = new Date(ds);
//   return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); // e.g., Aug 12
// }
