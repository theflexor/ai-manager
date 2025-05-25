'use client';

import {
  CreditCard,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';

import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <span className="font-bold">AI Subscription Manager</span>
        </Link>
        <div className="mt-8 flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'justify-start',
                pathname === item.href && 'bg-secondary'
              )}
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

