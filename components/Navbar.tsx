'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from 'lib/supabaseClient';
import Logo from 'components/Logo';

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

function UserBadge({ email }: { email: string | null }) {
  return (
    <div className="relative group">
      <button type="button" className="btn-ghost" title={email ?? ''}>
        👤
      </button>
      {email && (
        <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border rounded-md shadow px-2 py-1 text-xs">
          {email}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [email, setEmail] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Initialize from current session
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(!!data.session);
      setEmail(data.session?.user?.email ?? null);
    });

    // Keep in sync
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);
      setEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Build nav links; hide the current page and /login when you're on it
  const allLinks = [
    { href: '/', label: 'Command Center' },
    { href: '/dashboard', label: 'Dashboard' },
  ];
  const links = allLinks.filter((l) => l.href !== pathname);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

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

          {signedIn ? (
            <button type="button" className="btn-ghost" onClick={handleSignOut}>
              Sign out
            </button>
          ) : pathname !== '/login' ? (
            <Link href="/login" className="btn-ghost">
              Sign in
            </Link>
          ) : null}
        </div>

        {/* Center title */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Right cluster */}
        <div className="flex items-center justify-end gap-2">
          <UserBadge email={email} />
        </div>
      </div>
    </header>
  );
}
