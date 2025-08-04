'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Settings, LogOut, CreditCard } from 'lucide-react';
import { useAuth, useUser } from '@/util/supabase/hooks';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';

export function TopNav() {
  const { signOut } = useAuth();
  const { user, loading } = useUser();
  if (loading) {
    return (
      <header className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-6 w-32 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-24 rounded" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href={'/dashboard'}>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded text-white flex items-center justify-center font-bold">
                {' '}
                <img src="/adhify_logo_full.svg" alt="Adhify Logo" className="h-20 w-20" />
              </div>
              <span className="font-semibold text-lg">{`${user?.user_metadata.firstName}'s Team`}</span>
            </div>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <CreditCard className="h-4 w-4" />
            Upgrade
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {user?.user_metadata.firstName
                      .split(' ')
                      .map((n: any[]) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <div className="font-medium">
                    {user?.user_metadata.firstName} {user?.user_metadata.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">{user?.email}</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 text-red-600"
                onClick={async () => {
                  signOut();
                  window.location.href = '/login';
                }}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
