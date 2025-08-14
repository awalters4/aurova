'use client';
import { useEffect, useRef, useState } from 'react';
import TodayChecklist from 'components/TodayChecklist';
import { localYYYYMMDD, formatHeader } from 'lib/dates';


function prettyHeader(ds: string) {
  const d = new Date(ds);
  const n = d.getDate();
  const suffix = (n%10===1&&n%100!==11)?'st':(n%10===2&&n%100!==12)?'nd':(n%10===3&&n%100!==13)?'rd':'th';
  return `${d.toLocaleDateString(undefined, { month:'long', day:'numeric' })}${suffix}’s habits`;
}

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [showClear, setShowClear] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => setSelectedDate(localYYYYMMDD()), []);
  if (!selectedDate) return null;

  return (
    <main className="container-page">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Command Center */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">

<h1 className="h-title">{formatHeader(selectedDate)}</h1>
            <div className="flex items-center gap-2">
              <input
                ref={dateRef}
                type="date"
                className="sr-only"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={localYYYYMMDD()}
              />
              <button className="btn-ghost" onClick={()=>dateRef.current?.showPicker?.()} title="Pick date">📅</button>
              <button className="btn-ghost text-[var(--color-accent)]" onClick={()=>setShowClear(true)}>
                Clear this day
              </button>
            </div>
          </div>

          <div className="section">
            <TodayChecklist selectedDate={selectedDate} />
          </div>
        </div>

      
      </div>

      {showClear && (
        <TodayChecklist.ConfirmClear selectedDate={selectedDate} onClose={()=>setShowClear(false)} />
      )}
    </main>
  );
}