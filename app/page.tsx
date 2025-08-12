'use client';
import { useState, useEffect } from 'react';
import PaletteSelector from 'components/PaletteSelector';
import TodayChecklist from 'components/TodayChecklist';
import ReminderSettings from 'components/ReminderSettings';

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, []);

  const goToToday = () => setSelectedDate(new Date().toISOString().split('T')[0]);

  if (!selectedDate) return null;

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: controls + checklists */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <PaletteSelector />
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded px-3 py-1 text-sm shadow"
                max={new Date().toISOString().split('T')[0]}
              />
              <button onClick={goToToday} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm">
                Today
              </button>
            </div>
          </div>

          <button className="text-sm text-blue-600 hover:underline text-left" onClick={() => setShowModal(true)}>
            Clear data for this date
          </button>

          <TodayChecklist selectedDate={selectedDate} />
        </div>

        {/* RIGHT: reminders (and mood when you’re ready) */}
        <div className="col-span-1 space-y-4">
          <ReminderSettings />
          {/* <MoodTracker selectedDate={selectedDate} />  <-- migrate to Supabase next */}
        </div>
      </div>

      {showModal && (
        <TodayChecklist.ConfirmClear selectedDate={selectedDate} onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}
