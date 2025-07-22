import { createClient } from '@/lib/supabase/server';
import { createUserInDatabase } from '@/lib/supabase/auth';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Auth callback route triggered');
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log('Exchange code for session:', { data, error });
    if (!error && data.user) {
      try {
        // Create user in database if they don't exist
        await createUserInDatabase({
          id: data.user.id,
          email: data.user.email!,
          user_metadata: data.user.user_metadata,
        });
      } catch (dbError) {
        console.error('Error creating user in database:', dbError);
        // Don't fail the auth flow if database creation fails
        // The user can still be created later
      }

      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
