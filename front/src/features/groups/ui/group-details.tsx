'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { Button } from '@/shared/ui/button';
import { Pencil } from 'lucide-react';

// Mock data for group details
const mockGroupDetails = {
  '1': {
    id: '1',
    name: 'Family Plan',
    description: 'Shared subscriptions with family members',
    created: 'March 15, 2025',
    owner: 'John Doe',
  },
  '2': {
    id: '2',
    name: 'Work Team',
    description: 'AI tools for our design team',
    created: 'January 10, 2025',
    owner: 'John Doe',
  },
  '3': {
    id: '3',
    name: 'Friends',
    description: 'Entertainment subscriptions',
    created: 'April 5, 2025',
    owner: 'John Doe',
  },
};

interface GroupDetailsProps {
  id: string;
}

export function GroupDetails({ id }: GroupDetailsProps) {
  const group = mockGroupDetails[id as keyof typeof mockGroupDetails] || {
    id: 'unknown',
    name: 'Unknown Group',
    description: 'Group not found',
    created: 'Unknown',
    owner: 'Unknown',
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{group.name}</CardTitle>
            <CardDescription>{group.description}</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Group
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Created:</span>
            <span className="font-medium">{group.created}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Owner:</span>
            <span className="font-medium">{group.owner}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

