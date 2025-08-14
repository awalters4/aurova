// Always work in LOCAL time for YYYY-MM-DD strings.

export function localYYYYMMDD(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Parse 'YYYY-MM-DD' as a LOCAL date object (not UTC). */
export function parseLocalDate(ds: string) {
  const [y, m, d] = ds.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

/** "August 13th’s habits" */
export function formatHeader(ds: string) {
  const d = parseLocalDate(ds);
  const n = d.getDate();
  const suf = (n % 10 === 1 && n % 100 !== 11) ? "st"
            : (n % 10 === 2 && n % 100 !== 12) ? "nd"
            : (n % 10 === 3 && n % 100 !== 13) ? "rd" : "th";
  return `${d.toLocaleDateString(undefined, { month: "long", day: "numeric" })}${suf}’s habits`;
}

/** "Aug 13" */
export function formatShort(ds: string) {
  const d = parseLocalDate(ds);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
