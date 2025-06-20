'use client';

import { DashboardOverview } from '@/widgets/dashboard/overview';
import React from 'react';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your AI subscriptions and groups
        </p>
      </div>
      <DashboardOverview />
    </div>
  );
};

export { DashboardPage };

