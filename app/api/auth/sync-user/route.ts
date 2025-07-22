import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { userService } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Verify the request is authenticated
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userId, email, fullName, avatarUrl } = body;

    // Verify the user ID matches the authenticated user
    if (userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Check if user exists in database
    const existingUser = await userService.findById(userId);

    if (!existingUser) {
      // Create new user
      const newUser = await userService.create({
        id: userId,
        email: email,
        fullName: fullName || null,
        avatarUrl: avatarUrl || null,
      });

      return NextResponse.json({
        success: true,
        user: newUser,
        action: 'created',
      });
    } else {
      // Update existing user
      const updatedUser = await userService.update(userId, {
        email: email,
        fullName: fullName || existingUser.name,
        avatarUrl: avatarUrl || existingUser.avatar,
      });

      return NextResponse.json({
        success: true,
        user: updatedUser,
        action: 'updated',
      });
    }
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
