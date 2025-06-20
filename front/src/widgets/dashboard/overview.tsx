'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { GroupsSummary } from '@/features/groups/ui/groups-summary';
import { RecentActivity } from '@/features/activity/ui/recent-activity';
import { SubscriptionsSummary } from '@/features/subscriptions/ui/subscriptions-summary';
import { UpcomingPayments } from '@/features/subscriptions/ui/upcoming-payments';

export function DashboardOverview() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Spending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$249.00</div>
              <p className="text-xs text-muted-foreground">
                +$24.00 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                +1 new group this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Shared Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                Saving $120.00/month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Subscription Summary</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <SubscriptionsSummary />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <UpcomingPayments />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Groups Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <GroupsSummary />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Subscription analytics charts will be displayed here
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

