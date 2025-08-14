// app/api/send-reminders/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { DateTime } from 'luxon'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE! // needs service key to read all
)

export async function GET() {
  try {
    const nowUTC = DateTime.utc()

    // Get all enabled reminders
    const { data: reminders, error } = await supabase
      .from('reminders')
      .select('email, time_local, timezone')
      .eq('enabled', true)

    if (error) throw error

    const toSend = reminders.filter(r => {
      const localTime = nowUTC.setZone(r.timezone).toFormat('HH:mm')
      return localTime === r.time_local
    })

    for (const r of toSend) {
      await resend.emails.send({
        from: 'Aurova <reminders@aurova.xyz>',
        to: r.email,
        subject: 'Aurova Habit Reminder',
        html: `<p>Hey — don't forget your habits today! ✅</p>`
      })
    }

    return NextResponse.json({ sent: toSend.length })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
