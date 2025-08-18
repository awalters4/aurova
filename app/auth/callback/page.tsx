// app/auth/callback/page.tsx
import { Suspense } from "react";
import CallbackClient from "./callback-client";

export const dynamic = "force-dynamic"; // prevent static prerender
export const revalidate = 0;            // no ISR for auth callback

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm">Finishing sign-in…</div>}>
      <CallbackClient />
    </Suspense>
  );
}
