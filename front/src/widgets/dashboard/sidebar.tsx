'use client';

import { CreditCard, LayoutDashboard, Settings, Users } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Subscriptions',
    href: '/subscriptions',
    icon: CreditCard,
  },
  {
    title: 'Groups',
    href: '/groups',
    icon: Users,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden w-[200px] border-r  bg-background md:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  pathname === item.href
                    ? 'bg-secondary'
                    : 'hover:bg-transparent hover:underline'
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

