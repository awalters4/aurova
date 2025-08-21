'use client';

import { useEffect, useState } from 'react';

type Habit = { id: string; name: string; emoji: string };

const G_HABITS_KEY = 'aurova.guest.habits.v1';
const G_ENTRY_KEY = (day: string) => `aurova.guest.entries.${day}.v1`;

function lsLoad<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [day, setDay] = useState<string>('');

  useEffect(() => {
    // local "today" in YYYY-MM-DD to match TodayChecklist
    const now = new Date();
    const localDay = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    setDay(localDay);

    // load guest data
    const hs = lsLoad<Habit[]>(G_HABITS_KEY, []);
    const em = lsLoad<Record<string, boolean>>(G_ENTRY_KEY(localDay), {});
    setHabits(hs);
    setDoneIds(new Set(Object.keys(em)));
  }, []);

  const done = habits.filter(h => doneIds.has(h.id));

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <p className="text-sm opacity-70 mb-6">
        {day ? `Guest mode · ${day}` : 'Guest mode'}
      </p>

      <section className="grid gap-4 md:grid-cols-2">
        <Card title="Today’s Completed">
          {done.length ? (
            <ul className="space-y-2">
              {done.map(h => (
                <li key={h.id} className="flex items-center gap-2">
                  <span className="text-lg">{h.emoji}</span>
                  <span>{h.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No habits checked yet today.</p>
          )}
        </Card>

        <Card title="All Habits">
          {habits.length ? (
            <ul className="space-y-2">
              {habits.map(h => (
                <li key={h.id} className="flex items-center gap-2">
                  <span className="text-lg">{h.emoji}</span>
                  <span>{h.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No habits yet. Add some on the Command Center.</p>
          )}
        </Card>
      </section>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white shadow p-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}
