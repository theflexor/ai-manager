'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  Crown,
  MoreHorizontal,
  Shield,
  User,
  UserMinus,
  UserPlus,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { toast } from 'sonner';
import { UserSearch } from '@/shared/ui/user-search';
import {
  useRemoveSubscriptionMemberMutation,
  useSubscriptionMembersQuery,
} from '@/entities/subscription-member/model/queries';
import { useParams } from 'next/navigation';

// Mock data for group members
const mockGroupMembers = {
  '1': [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'owner',
      avatar: 'JD',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'admin',
      avatar: 'JS',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'member',
      avatar: 'MJ',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'member',
      avatar: 'SW',
    },
  ],
  '2': [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'owner',
      avatar: 'JD',
    },
    {
      id: '5',
      name: 'Alex Brown',
      email: 'alex@example.com',
      role: 'admin',
      avatar: 'AB',
    },
    {
      id: '6',
      name: 'Emma Davis',
      email: 'emma@example.com',
      role: 'member',
      avatar: 'ED',
    },
    {
      id: '7',
      name: 'Ryan Wilson',
      email: 'ryan@example.com',
      role: 'member',
      avatar: 'RW',
    },
    {
      id: '8',
      name: 'Olivia Martin',
      email: 'olivia@example.com',
      role: 'member',
      avatar: 'OM',
    },
    {
      id: '9',
      name: 'Daniel Lee',
      email: 'daniel@example.com',
      role: 'member',
      avatar: 'DL',
    },
  ],
  '3': [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'owner',
      avatar: 'JD',
    },
    {
      id: '10',
      name: 'Sophia Clark',
      email: 'sophia@example.com',
      role: 'member',
      avatar: 'SC',
    },
    {
      id: '11',
      name: 'James Taylor',
      email: 'james@example.com',
      role: 'member',
      avatar: 'JT',
    },
  ],
};

interface GroupMember {
  id: string | number;
  name?: string;
  email: string;
  role?: string;
  avatar?: string;
  profilePicture?: string;
  isEmailVerified?: boolean;
}

export function GroupMembers() {
  const subscriptionId = useParams<{ id: string }>()?.id;
  const { data: members, isLoding } = useSubscriptionMembersQuery(
    Number(subscriptionId)
  );
  const { mutate } = useRemoveSubscriptionMemberMutation();

  const handleRemoveMember = async (id: string) => {
    // setMembers(members.filter((member) => member.id !== id));
    await mutate({
      subscriptionId: Number(id),
      userId: Number(id),
    });
    toast('Участник удален из группы');
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'owner':
        return (
          <Badge className="bg-yellow-500">
            <Crown className="h-3 w-3 mr-1" /> Owner
          </Badge>
        );
      case 'admin':
        return (
          <Badge className="bg-blue-500">
            <Shield className="h-3 w-3 mr-1" /> Admin
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <User className="h-3 w-3 mr-1" /> Member
          </Badge>
        );
    }
  };

  if (isLoding || !members) {
    return 'Loading...';
  }

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle>Members</CardTitle>
        {/* <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join this group.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <UserSearch
                onUserSelect={setSelectedUser}
                selectedUser={selectedUser}
                clearSelectedUser={() => setSelectedUser(null)}
                label="Email address"
                placeholder="name@example.com"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleInviteMember}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg`} />
                  <AvatarFallback>{member.user.profilePicture}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{member.user.fullName}</p>
                  <p className="text-xs text-muted-foreground">
                    {member.user.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getRoleBadge(member.user.role)}
                {member.user.role !== 'owner' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleRemoveMember(member.id.toString())}
                      >
                        <UserMinus className="mr-2 h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

