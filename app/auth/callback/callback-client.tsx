"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function CallbackClient() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = params.get("code");        // or whatever your provider returns
    const error = params.get("error");

    // bail fast on error states
    if (error) {
      console.error("OAuth error:", error);
      router.replace(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    async function run() {
      // If you’re using Supabase OAuth (PKCE):
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      if (code) {
        // Example for Supabase PKCE:
        // await supabase.auth.exchangeCodeForSession({ code });

        // If you’re using deep-link/URL parsing that sets session elsewhere,
        // do it here; then route to your app:
      }

      router.replace("/"); // or wherever you want users to land post-auth
    }

    run().catch((e) => {
      console.error(e);
      router.replace("/login?error=auth-callback-failed");
    });
  }, [params, router]);

  return null; // nothing to render; we redirect
}
