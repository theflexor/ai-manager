'use client';

import Link from 'next/link';
import { MobileNav } from './mobile-nav';
import { ModeToggle } from '@/features/theme/ui/mode-toggle';
import { UserNav } from '@/features/auth/ui/user-nav';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link
            href="/dashboard"
            className="hidden items-center space-x-2 md:flex"
          >
            <span className="hidden font-bold sm:inline-block">
              AI Subscription Manager
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}

