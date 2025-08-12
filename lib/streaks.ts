import { eachDayOfInterval, isBefore, isSameDay, subDays } from 'date-fns';

export function calcStreak(dates: Date[], today = new Date()) {
  // expects list of completed dates (no duplicates)
  let streak = 0;
  let cursor = today;
  while (true) {
    const hit = dates.some(d => isSameDay(d, cursor));
    if (!hit) break;
    streak += 1;
    cursor = subDays(cursor, 1);
  }
  return streak;
}

export function milestoneFor(streak: number): { type?: string; msg?: string } {
  if (streak === 3)  return { type: 'streak_3',  msg: "3 days in a row — you're heating up 🔥" };
  if (streak === 7)  return { type: 'streak_7',  msg: "One whole week — momentum queen 👑" };
  if (streak === 14) return { type: 'streak_14', msg: "Two weeks consistent — magnetic ✨" };
  if (streak === 30) return { type: 'streak_30', msg: "30 days — aura upgraded ✨" };
  return {};
}
