'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from 'lib/supabaseClient';
import PaletteSelector from 'components/PaletteSelector';
import ChecklistGrid from 'components/ChecklistGrid';
// (Next step) import StreaksCard and SummaryCard once migrated to Supabase

export default function DashboardPage() {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/login');
    });
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
