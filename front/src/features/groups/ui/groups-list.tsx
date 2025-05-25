'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, Users } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Mock data for groups
const mockGroups = [
  {
    id: '1',
    name: 'Family Plan',
    description: 'Shared subscriptions with family members',
    members: 4,
    subscriptions: 3,
    totalSavings: 45,
  },
  {
    id: '2',
    name: 'Work Team',
    description: 'AI tools for our design team',
    members: 6,
    subscriptions: 5,
    totalSavings: 120,
  },
  {
    id: '3',
    name: 'Friends',
    description: 'Entertainment subscriptions',
    members: 3,
    subscriptions: 2,
    totalSavings: 25,
  },
];

export function GroupsList() {
  const router = useRouter();
  const [groups, setGroups] = useState(mockGroups);

  const handleDelete = (id: string) => {
    setGroups(groups.filter((group) => group.id !== id));
    toast(`{
      title: 'Group deleted',
      description: 'The group has been removed.',
    }`);
  };

  const handleViewGroup = (id: string) => {
    router.push(`/groups/${id}`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <Card
          key={group.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleViewGroup(group.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{group.name}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/groups/${group.id}/edit`);
                    }}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(group.id);
                    }}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Members:</span>
                <div className="flex -space-x-2">
                  {Array.from({ length: Math.min(3, group.members) }).map(
                    (_, i) => (
                      <Avatar
                        key={i}
                        className="h-6 w-6 border-2 border-background"
                      >
                        <AvatarImage src={`/placeholder.png`} />
                        <AvatarFallback className="text-xs">
                          U{i + 1}
                        </AvatarFallback>
                      </Avatar>
                    )
                  )}
                  {group.members > 3 && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                      +{group.members - 3}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Subscriptions:
                </span>
                <Badge variant="outline">{group.subscriptions}</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {group.members} members
                </span>
              </div>
              <div className="text-sm font-medium text-green-600">
                ${group.totalSavings}/mo saved
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

