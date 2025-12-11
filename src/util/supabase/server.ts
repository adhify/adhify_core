/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { env } from '@/env';
import { createServerClient as supabaseCreateServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const supabaseServer = () => {
  const cookieStore = cookies();
  return supabaseCreateServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => {
        return cookieStore.then((store) => store.getAll());
      },
      // setAll is intentionally omitted to avoid modifying cookies outside Server Actions or Route Handlers
    },
  });
};
