import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import { GroupDetails } from '@/features/groups/ui/group-details';
import { GroupMembers } from '@/features/groups/ui/group-members';
import { GroupSubscriptions } from '@/features/groups/ui/group-subscriptions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group Details - AI Subscription Manager',
  description: 'Manage your subscription group',
};

export default function GroupDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <GroupDetails id={params.id} />

      <Tabs defaultValue="subscriptions" className="w-full">
        <TabsList>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        <TabsContent value="subscriptions" className="mt-4">
          <GroupSubscriptions groupId={params.id} />
        </TabsContent>
        <TabsContent value="members" className="mt-4">
          <GroupMembers groupId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

