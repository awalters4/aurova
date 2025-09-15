'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from 'components/Logo';

/* ---------- Theme Button (unchanged) ---------- */
function ThemeButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', on);
    return () => document.removeEventListener('click', on);
  }, []);

  const apply = (t: 'blush' | 'earthy') => {
    document.documentElement.setAttribute('data-theme', t);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button type="button" className="btn-ghost" onClick={() => setOpen(!open)} title="Theme">
        🎨
      </button>
      {open && (
        <div className="absolute mt-2 w-36 bg-white border rounded-lg shadow z-50">
          <button type="button" className="w-full text-left px-3 py-2 hover:bg-black/5" onClick={() => apply('blush')}>
            Blush
          </button>
          <button type="button" className="w-full text-left px-3 py-2 hover:bg-black/5" onClick={() => apply('earthy')}>
            Earthy
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- User Badge (kept, but no email while auth is disabled) ---------- */
function UserBadge() {
  return (
    <div className="relative">
      <button type="button" className="btn-ghost" title="">
        👤
      </button>
    </div>
  );
}

/* ---------- NAVBAR (auth-free) ---------- */
export default function Navbar() {
  const pathname = usePathname();

  // Public links only; hide the current page link
  const allLinks = [
    { href: '/', label: 'Command Center' },
    { href: '/dashboard', label: 'Dashboard' },
  ];
  const links = allLinks.filter((l) => l.href !== pathname);

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 grid grid-cols-3 items-center">
        {/* Left cluster */}
        <div className="flex items-center gap-2">
          <ThemeButton />
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="btn-ghost">
              {l.label}
            </Link>
          ))}

          {/* Auth controls temporarily disabled */}
          {/* <Link href="/login" className="btn-ghost">Sign in</Link> */}
          {/* <button type="button" className="btn-ghost" onClick={handleSignOut}>Sign out</button> */}
        </div>

        {/* Center title */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Right cluster */}
        <div className="flex items-center justify-end gap-2">
          <UserBadge />
        </div>
      </div>
    </header>
  );
}
