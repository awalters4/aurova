'use client';
import { useState, useEffect } from "react";
import HabitTracker from 'components/HabitTracker';
import MoodTracker from 'components/MoodTracker';
import SummaryCard from 'components/SummaryCard';
import StreaksCard from 'components/StreaksCard';
import PaletteSelector from 'components/PaletteSelector';

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // forces re-renders

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  const goToToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  };

  if (!selectedDate) return null;

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <PaletteSelector />
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded px-3 py-1 text-sm shadow"
                max={new Date().toISOString().split("T")[0]}
              />
              <button
                onClick={goToToday}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
              >
                Today
              </button>
            </div>
          </div>

          <p
            className="text-sm text-blue-600 hover:underline cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Clear data for this date
          </p>

          <SummaryCard selectedDate={selectedDate} key={`summary-${refreshKey}`} />
          <StreaksCard selectedDate={selectedDate} key={`streaks-${refreshKey}`} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-1 space-y-4">
          <HabitTracker selectedDate={selectedDate} key={`habit-${refreshKey}`} />
          <MoodTracker selectedDate={selectedDate} key={`mood-${refreshKey}`} />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center animate-fade-in">
            <p className="mb-4">
              Are you sure you want to delete data for <strong>{selectedDate}</strong>?
            </p>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={() => {
                  try {
                    const raw = localStorage.getItem("lifestack_data");
                    if (raw) {
                      const data = JSON.parse(raw);
                      delete data[selectedDate];
                      localStorage.setItem("lifestack_data", JSON.stringify(data));
                    }
                    setShowModal(false);
                    setRefreshKey((k) => k + 1);
                  } catch (err) {
                    console.error("Failed to clear data", err);
                    setShowModal(false);
                  }
                }}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
