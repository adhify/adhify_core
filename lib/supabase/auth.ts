import { getSupabaseClient } from './client';
import { userService } from '@/lib/db';

export async function signUp(email: string, password: string, fullName?: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  return { data, error };
}

export async function signIn(email: string, password: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signInWithProvider(provider: 'google' | 'github') {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return { data, error };
}

export async function signOut() {
  const supabase = getSupabaseClient();

  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function resetPassword(email: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  return { data, error };
}

export async function updatePassword(password: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  return { data, error };
}

// Server-side function to create user in database
export async function createUserInDatabase(user: {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}) {
  try {
    // Check if user already exists
    const existingUser = await userService.findById(user.id);
    if (existingUser) {
      return existingUser;
    }

    // Create new user in database
    const newUser = await userService.create({
      id: user.id,
      email: user.email,
      fullName: user.user_metadata?.full_name || null,
      avatarUrl: user.user_metadata?.avatar_url || null,
    });

    return newUser;
  } catch (error) {
    console.error('Error creating user in database:', error);
    throw error;
  }
}
