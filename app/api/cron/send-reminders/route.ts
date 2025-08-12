import { NextResponse } from 'next/server';
import { supabaseAdmin } from 'lib/supabaseAdmin';
import { Resend } from 'resend';
import { zonedTimeToUtc, format } from 'date-fns-tz';

export const dynamic = 'force-dynamic';

export async function GET() {
  const admin = supabaseAdmin();
  const { data: reminders, error } = await admin
    .from('reminders')
    .select('id,user_id,email,time_local,timezone,enabled')
    .eq('enabled', true);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const nowUtc = new Date();

  const due = reminders?.filter(r => {
    // build today's local datetime at the user's reminder time, convert to UTC, compare within ±2.5 mins
    try {
      const [hh, mm] = (r.time_local as string).split(':').map(Number);
      const localMidnight = new Date(new Intl.DateTimeFormat('en-CA', { timeZone: r.timezone as string })
        .format(nowUtc) + 'T00:00:00');
      const localDate = new Date(localMidnight);
      localDate.setHours(hh, mm, 0, 0);
      const utcDate = zonedTimeToUtc(localDate, r.timezone as string);

      const diff = Math.abs(nowUtc.getTime() - utcDate.getTime());
      return diff <= 2.5 * 60 * 1000; // 5-min window split
    } catch {
      return false;
    }
  }) ?? [];

  if (due.length === 0) return NextResponse.json({ sent: 0 });

  const resend = new Resend(process.env.RESEND_API_KEY!);

  let sent = 0;
  for (const r of due) {
    try {
      await resend.emails.send({
        from: 'Aurova <reminder@yourdomain.com>',
        to: r.email as string,
        subject: 'Aurova reminder',
        html: `
          <div style="font-family:Inter,system-ui,Arial">
            <p>Time to check in for <b>${format(nowUtc, 'yyyy-MM-dd')}</b> ✨</p>
            <p><a href="${process.env.APP_URL}/">Open Aurova</a></p>
          </div>`
      });
      sent++;
    } catch (e) {
      // swallow and continue
    }
  }
  return NextResponse.json({ sent, checked: due.length });
}
