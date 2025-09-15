'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from 'lib/supabaseClient';
import PaletteSelector from 'components/PaletteSelector';
import ChecklistGrid from 'components/ChecklistGrid';

// --- COMPAT SHIM: mirror guest keys -> legacy 'lifestack_data' so ChecklistGrid sees data
const G_HABITS_KEY = 'aurova.guest.habits.v1';
const G_ENTRY_KEY = (day: string) => `aurova.guest.entries.${day}.v1`;
const localDay = () =>
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

function mirrorGuestToLegacy(day: string) {
  try {
    // read today's entries from new guest key
    const entries = JSON.parse(
      localStorage.getItem(G_ENTRY_KEY(day)) || '{}'
    ) as Record<string, boolean>;

    // read legacy object (date -> entries)
    const legacyRaw = localStorage.getItem('lifestack_data');
    const legacy = legacyRaw ? JSON.parse(legacyRaw) : {};

    // write/overwrite today's map in legacy format
    legacy[day] = entries;

    localStorage.setItem('lifestack_data', JSON.stringify(legacy));
  } catch (e) {
    console.error('Compat mirror failed', e);
  }
}

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // keep (no-op) session check if you want
    supabase.auth.getSession().then(({ data }) => {});

    // mirror once on mount so legacy readers (ChecklistGrid) see data
    const day = localDay();
    mirrorGuestToLegacy(day);

    // also mirror when other tabs modify guest data
    const onStorage = (e: StorageEvent) => {
      if (e.key === G_ENTRY_KEY(day)) mirrorGuestToLegacy(day);
      if (e.key === G_HABITS_KEY) mirrorGuestToLegacy(day); // optional
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [router]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] p-6">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2 space-y-4">
            {/* Month grid */}
            <ChecklistGrid />

            {/* Next: <SummaryCard /> and <StreaksCard /> once migrated */}
          </div>
          <div className="col-span-1 space-y-4">
            {/* You can show read-only reminders or recent milestones here later */}
          </div>
        </div>
        <footer className="text-center text-xs text-[var(--color-muted)] py-6">
          Aurova • © {new Date().getFullYear()}
        </footer>
      </div>
    </main>
  );
}
