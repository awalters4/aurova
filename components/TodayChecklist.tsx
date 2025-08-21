// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Shared types
type Habit = { id: string; name: string; emoji: string };

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  // If signed in: fetch today's data on the server
  if (session) {
    const today = new Date();                    // server time is fine for now
    const day = today.toISOString().slice(0, 10); // 'YYYY-MM-DD'

    const [h, e] = await Promise.all([
      supabase.from("habits").select("id,name,emoji").order("created_at", { ascending: true }),
      supabase.from("habit_entries").select("habit_id").eq("date", day),
    ]);

    const habits: Habit[] = !h.error && h.data ? (h.data as any) : [];
    const doneSet = new Set<string>((!e.error && e.data ? e.data : []).map((x: any) => x.habit_id));
    const done = habits.filter(hb => doneSet.has(hb.id));

    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <p className="text-sm opacity-70 mb-4">Signed in as {session.user.email}</p>

        <section className="grid gap-4 md:grid-cols-2">
          <Card title="Today’s Completed">
            {done.length ? (
              <ul className="space-y-2">
                {done.map(hb => (
                  <li key={hb.id} className="flex items-center gap-2">
                    <span className="text-lg">{hb.emoji}</span>
                    <span>{hb.name}</span>
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
                {habits.map(hb => (
                  <li key={hb.id} className="flex items-center gap-2">
                    <span className="text-lg">{hb.emoji}</span>
                    <span>{hb.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No habits yet.</p>
            )}
          </Card>
        </section>
      </main>
    );
  }

  // If NOT signed in: render a client component that reads localStorage
  return <GuestDashboard />;
}

// Simple card UI
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white shadow p-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}

/* ----------------------- Guest dashboard ----------------------- */
"use client";
import { useEffect, useState } from "react";

const G_HABITS_KEY = "aurova.guest.habits.v1";
const G_ENTRY_KEY = (day: string) => `aurova.guest.entries.${day}.v1`;

function lsLoad<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function GuestDashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const today = new Date();
    // Get YYYY-MM-DD in local timezone so it matches your checklist key
    const day = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);

    const hs = lsLoad<Habit[]>(G_HABITS_KEY, []);
    const em = lsLoad<Record<string, boolean>>(G_ENTRY_KEY(day), {});
    setHabits(hs);
    setDoneIds(new Set(Object.keys(em)));
  }, []);

  const done = habits.filter(h => doneIds.has(h.id));

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
      <p className="text-sm opacity-70 mb-4">Guest mode (auth disabled)</p>

      <section className="grid gap-4 md:grid-cols-2">
        <Card title="Today’s Completed">
          {done.length ? (
            <ul className="space-y-2">
              {done.map(hb => (
                <li key={hb.id} className="flex items-center gap-2">
                  <span className="text-lg">{hb.emoji}</span>
                  <span>{hb.name}</span>
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
              {habits.map(hb => (
                <li key={hb.id} className="flex items-center gap-2">
                  <span className="text-lg">{hb.emoji}</span>
                  <span>{hb.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No habits yet.</p>
          )}
        </Card>
      </section>
    </main>
  );
}
