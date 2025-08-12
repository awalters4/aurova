'use client';
import { useEffect, useMemo, useState } from 'react';
import { addDays, endOfMonth, format, startOfMonth } from 'date-fns';
import { supabase } from 'lib/supabaseClient';
import { calcStreak, milestoneFor } from 'lib/streaks';
import toast, { Toaster } from 'react-hot-toast';

type Habit = { id: string; name: string; emoji: string };
type Entry = { habit_id: string; date: string };

export default function ChecklistGrid() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [monthStart, setMonthStart] = useState(startOfMonth(new Date()));

  const days = useMemo(() => {
    const arr: Date[] = [];
    const end = endOfMonth(monthStart);
    for (let d = monthStart; d <= end; d = addDays(d, 1)) arr.push(d);
    return arr;
  }, [monthStart]);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const [h, e] = await Promise.all([
        supabase.from('habits').select('*').order('created_at', { ascending: true }),
        supabase.from('habit_entries').select('habit_id,date')
          .gte('date', format(monthStart, 'yyyy-MM-dd'))
          .lte('date', format(endOfMonth(monthStart), 'yyyy-MM-dd'))
      ]);
      if (!h.error && h.data) setHabits(h.data as any);
      if (!e.error && e.data) setEntries(e.data as any);
    })();
  }, [monthStart]);

  function hasEntry(habit_id: string, day: Date) {
    const ds = format(day, 'yyyy-MM-dd');
    return entries.some(e => e.habit_id === habit_id && e.date === ds);
  }

  async function toggle(habit_id: string, day: Date) {
    const ds = format(day, 'yyyy-MM-dd');
    const on = hasEntry(habit_id, day);
    if (on) {
      const { error } = await supabase.from('habit_entries')
        .delete().eq('habit_id', habit_id).eq('date', ds);
      if (!error) setEntries(prev => prev.filter(e => !(e.habit_id===habit_id && e.date===ds)));
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { error } = await supabase.from('habit_entries')
        .insert({ habit_id, user_id: user.id, date: ds, completed: true });
      if (!error) {
        setEntries(prev => [...prev, { habit_id, date: ds }]);

        // streak + milestone toast (for "today" only to keep it simple)
        const todayStr = format(new Date(), 'yyyy-MM-dd');
        if (ds === todayStr) {
          const completedDates = prevDatesForHabit(habit_id);
          const streak = calcStreak(completedDates);
          const { type, msg } = milestoneFor(streak);
          if (msg) toast.success(msg);
        }
      }
    }
  }

  function prevDatesForHabit(habit_id: string): Date[] {
    return entries.filter(e => e.habit_id === habit_id).map(e => new Date(e.date));
  }

  return (
  <div className="section">
    <div className="flex items-center justify-between mb-3">
      <h3 className="h-title">This Month</h3>
      <div className="muted">{format(monthStart, "MMMM yyyy")}</div>
    </div>

    <div className="relative overflow-auto">
      <table className="w-full text-sm border-separate border-spacing-0">
        <thead className="sticky top-0 z-10">
          <tr>
            <th className="sticky left-0 z-20 bg-[var(--color-card)] text-left px-3 py-2 font-medium border-b">
              Habit
            </th>
            {days.map((d) => (
              <th key={+d} className="px-2 py-2 text-center font-medium border-b">
                {format(d, "d")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((h, i) => (
            <tr key={h.id} className="hover:bg-black/[0.02]">
              <td
                className="sticky left-0 z-10 bg-[var(--color-card)] px-3 py-2 whitespace-nowrap border-b"
                style={{ boxShadow: "2px 0 0 0 rgba(0,0,0,0.05)" }}
              >
                <span className="mr-2 text-lg">{h.emoji}</span>
                <span className="font-medium">{h.name}</span>
              </td>
              {days.map((d) => {
                const on = hasEntry(h.id, d);
                return (
                  <td key={h.id + +d} className="border-b">
                    <button
                      onClick={() => toggle(h.id, d)}
                      aria-pressed={on}
                      title={format(d, "EEE MMM d")}
                      className={`mx-auto my-1 block w-7 h-7 rounded-md border transition
                        ${on ? "bg-black text-white" : "bg-white hover:bg-black/[0.05]"}
                      `}
                    >
                      {on ? "✅" : ""}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Today progress bar */}
    <div className="mt-4">
      <TodayProgress entries={entries} habits={habits} />
      
    </div>
  </div>
);
}

function TodayProgress({ entries, habits }: { entries: { habit_id: string; date: string }[]; habits: any[] }) {
  const today = format(new Date(), "yyyy-MM-dd");
  const done = entries.filter(e => e.date === today).length;
  const total = habits.length || 1;
  const pct = Math.round((done / total) * 100);
  return (
    <div className="card p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">Today</span>
        <span className="text-sm muted">{done}/{total}</span>
      </div>
      <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
        <div className="h-2 bg-black rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
