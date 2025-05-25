'use client';

import { DashboardHeader } from '@/widgets/dashboard/header';
import { DashboardSidebar } from '@/widgets/dashboard/sidebar';
import type React from 'react';
import { useRouter } from 'next/navigation';
import { useSessionQuery } from '@/entities/session';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSessionQuery();
  const router = useRouter();

  if (session.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (session.status === 'error') {
    router.replace('/login');
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

