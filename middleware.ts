// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  // Make a response we can mutate cookies on
  const res = NextResponse.next({ request: { headers: req.headers } });

  // Supabase server client bound to req/res cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options) {
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // This will refresh session cookies if needed
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // Public routes (let these through)
  const publicRoutes = ['/login', '/auth/callback', '/_next', '/favicon.ico', '/icon.svg'];
  const isPublic = publicRoutes.some((p) => pathname.startsWith(p));

  // Protect anything under / (protected group pages are under / and /dashboard)
  if (!isPublic) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', pathname); // optional “return to”
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  // Match everything except static files you don’t need to process
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg).*)'],
};