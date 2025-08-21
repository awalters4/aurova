/* Drop-in replacement: dependency-free emoji picker with portal */
'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function EmojiPicker({ value, onChange }: { value: string; onChange: (v: string)=>void }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const options = ["✅","🔥","💧","📚","🧘🏽‍♀️","🥗","💪🏽","🌙","🧴","🧹","🚰","🧠","🧺","🧽","🛏️","🧑🏾‍🍳", "🙌🏽"];

  // Position the panel near the button
  useEffect(() => {
    if (!open || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const panelWidth = 240; // approx
    const left = Math.min(Math.max(8, r.left), window.innerWidth - panelWidth - 8);
    const top = r.bottom + 8;
    setPos({ top, left });
  }, [open]);

  // Close on outside click / ESC
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
