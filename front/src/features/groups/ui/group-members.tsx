'use client';

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
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { toast } from 'sonner';
import { useState } from 'react';

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

interface GroupMembersProps {
  groupId: string;
}

export function GroupMembers({ groupId }: GroupMembersProps) {
  const [members, setMembers] = useState(
    mockGroupMembers[groupId as keyof typeof mockGroupMembers] || []
  );
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
    toast(`{
      title: 'Member removed',
      description: 'The member has been removed from the group.',
    }`);
  };

  const handleInviteMember = () => {
    if (!inviteEmail) return;

    // In a real app, this would send an invitation to the email

    toast(
      <div>
        title: Invitation sent, description: `An invitation has been sent to $
        {inviteEmail}`,
      </div>
    );

    setInviteEmail('');
    setInviteDialogOpen(false);
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

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle>Members</CardTitle>
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
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
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="mt-2"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleInviteMember}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`/placeholder.png`} />
                  <AvatarFallback>{member.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getRoleBadge(member.role)}
                {member.role !== 'owner' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleRemoveMember(member.id)}
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

