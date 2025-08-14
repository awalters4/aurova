'use client';
import { useEffect, useState, useRef } from 'react';

const PALETTES = [
  { key: 'blush',  label: 'Blush',  emoji: '🎨' },
  { key: 'earthy', label: 'Earthy', emoji: '🌿' },
];

export default function PaletteSelector() {
  const [theme, setTheme] = useState<'blush'|'earthy'>('blush');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = (localStorage.getItem('aurova:theme') as 'blush'|'earthy'|null) || 'blush';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const apply = (t: 'blush'|'earthy') => {
    setTheme(t);
    localStorage.setItem('aurova:theme', t);
    document.documentElement.setAttribute('data-theme', t);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button className="btn-ghost" onClick={()=>setOpen(!open)} title="Theme">
        {theme === 'blush' ? '🎨' : '🌿'}
      </button>
      {open && (
        <div className="absolute mt-2 w-36 bg-white border rounded-lg shadow z-50">
          {PALETTES.map(p => (
            <button key={p.key} className="w-full text-left px-3 py-2 hover:bg-black/5"
              onClick={()=>apply(p.key as any)}>
              {p.emoji} {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
