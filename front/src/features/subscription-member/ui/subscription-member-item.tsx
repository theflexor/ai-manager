'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { MoreHorizontal, Crown } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { SubscriptionMember } from '@/shared/api/orval/models';
import { formatDate } from '@/shared/lib';
import { StatusBadge } from '@/shared/ui/status-badge';

interface MemberItemProps {
  member: SubscriptionMember;
  onRemove?: (memberId: number) => void;
  onToggleOwner?: (memberId: number, isOwner: boolean) => void;
}

export function MemberItem({
  member,
  onRemove,
  onToggleOwner,
}: MemberItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage
            src={member.user.profilePicture || '/placeholder.svg'}
            alt={member.user.fullName}
          />
          <AvatarFallback>
            {member.user.fullName
              ?.split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-medium">{member.user.fullName}</h4>
            {member.isOwner && <Crown className="h-4 w-4 text-yellow-500" />}
          </div>
          <p className="text-sm text-muted-foreground">{member.user.email}</p>
          {member.user.bio && (
            <p className="text-xs text-muted-foreground">{member.user.bio}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Добавлен: {formatDate(member.addedAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <StatusBadge
          isEmailVerified={member.user.isEmailVerified}
          isOwner={member.isOwner}
        />

        {!member.isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onToggleOwner?.(member.id, true)}
              >
                Сделать владельцем
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onRemove?.(member.id)}
                className="text-destructive"
              >
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

