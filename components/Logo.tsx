export default function Logo({ size = 24 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* Aura ring + check uses currentColor so it adapts to theme/accent */}
      <svg width={size} height={size} viewBox="0 0 24 24" className="text-[var(--accent)]" aria-hidden>
        <defs>
          <radialGradient id="aur" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.85"/>
            <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#aur)"/>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".35"/>
        <path d="M8.2 12.4l2.3 2.3 5.2-5.2" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="font-semibold tracking-tight">Aurova</span>
    </div>
  );
}
