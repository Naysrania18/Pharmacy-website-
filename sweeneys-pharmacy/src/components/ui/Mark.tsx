/** Mortar-and-pestle mark, drawn to echo the shopfront logo. Uses currentColor. */
export function Mark({ className = "", cut = "var(--color-ink)", size }: { className?: string; cut?: string; size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <path d="M13 20C11.5 13 15 8 22.5 6c1.6 6.5-1.6 12-9.5 14z" fill="currentColor" opacity=".85" />
      <path d="M21 20c-.4-5.2 2.4-8.6 8-9.6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M35.5 4.5 26.5 21" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
      <rect x="4" y="19" width="40" height="4.5" rx="2.25" fill="currentColor" />
      <path d="M7 23.5h34c0 9.6-6.9 17-17 17S7 33.1 7 23.5z" fill="currentColor" />
      <path d="M24 26.5v9M19.5 31h9" stroke={cut} strokeWidth="2.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}
