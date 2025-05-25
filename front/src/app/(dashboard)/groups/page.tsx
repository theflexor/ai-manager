import type { Metadata } from "next"
import { GroupsList } from "@/features/groups/ui/groups-list"
import { CreateGroupButton } from "@/features/groups/ui/create-group-button"

export const metadata: Metadata = {
  title: "Groups - AI Subscription Manager",
  description: "Manage your subscription groups",
}

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
          <p className="text-muted-foreground">Manage your subscription groups and members</p>
        </div>
        <CreateGroupButton />
      </div>
      <GroupsList />
    </div>
  )
}

