'use client';
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "lib/supabaseClient";
import Logo from "components/Logo"

function ThemeButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("click", on); return () => document.removeEventListener("click", on);
  }, []);
  const apply = (t: "blush" | "earthy") => { document.documentElement.setAttribute("data-theme", t); setOpen(false); };
  return (
    <div className="relative" ref={ref}>
      <button type="button" className="btn-ghost" onClick={()=>setOpen(!open)} title="Theme">🎨</button>
      {open && (
        <div className="absolute mt-2 w-36 bg-white border rounded-lg shadow z-50">
          <button type="button" className="w-full text-left px-3 py-2 hover:bg-black/5" onClick={()=>apply("blush")}>Blush</button>
          <button type="button" className="w-full text-left px-3 py-2 hover:bg-black/5" onClick={()=>apply("earthy")}>Earthy</button>
        </div>
      )}
    </div>
  );
}

function UserBadge({ email }: { email: string | null }) {
  return (
    <div className="relative group">
      <button type="button" className="btn-ghost" title={email ?? ""}>👤</button>
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
  const pathname = usePathname();
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setEmail(s?.user?.email ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  const links = [
    { href: "/", label: "Command Center" },
    { href: "/dashboard", label: "Dashboard" },
  ].filter(l => l.href !== pathname);

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 grid grid-cols-3 items-center">
        {/* Left cluster: theme, other page link(s), sign out */}
        <div className="flex items-center gap-2">
          <ThemeButton />
          {links.map(l => <Link key={l.href} href={l.href} className="btn-ghost">{l.label}</Link>)}
          <button type="button" className="btn-ghost" onClick={()=>supabase.auth.signOut()}>Sign out</button>
        </div>

        {/* Center title */}
        <div className="flex justify-center"><Logo /></div>


        {/* Right cluster: user icon */}
        <div className="flex items-center justify-end gap-2">
          <UserBadge email={email} />
        </div>
      </div>
    </header>
  );
}
