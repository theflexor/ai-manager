'use client';

import type { Subscription } from '@/shared/api/orval/models';
import { ROUTES } from '@/shared/constants/routes';
import { formatDate } from '@/shared/lib';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  MoreHorizontal,
  Pencil,
  Share2,
  Trash2,
  Calendar,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';

interface SubscriptionCardProps {
  subscription: Subscription;
  handleDelete: (id: number) => void;
  handleShare: (id: number) => void;
  handleEdit: (id: number) => void;
}

export const SubscriptionCard = ({
  subscription,
  handleDelete,
  handleShare,
  handleEdit,
}: SubscriptionCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(ROUTES.SUBSCRIPTION(subscription.id));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <Card
      className="group relative overflow-hidden bg-[#1c1c1c] text-foreground border border-border shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer rounded-2xl"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${subscription.serviceName} subscription details`}
    >
      {/* Header */}
      <div className="relative p-6 pb-4">
        {/* Background FX */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/10 -translate-y-16 translate-x-16 blur-2xl" />
        </div>

        {/* Top Bar */}
        <div className="relative flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <div className="w-5 h-5 rounded bg-foreground/30" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors duration-300">
                  {subscription.serviceName}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {subscription.description}
                </p>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-muted/50 rounded-full"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(subscription.id);
                }}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(subscription.id);
                }}
                className="cursor-pointer"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(subscription.id);
                }}
                className="text-destructive cursor-pointer focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Price */}
        <div className="relative">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl font-bold">${subscription.price}</span>
            <span className="text-sm text-muted-foreground font-medium">
              /month
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mx-6" />

      {/* Info Section */}
      <div className="p-6 pt-4 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Next billing</span>
            </div>
            <span className="text-sm font-semibold">
              {formatDate(subscription.expiresAt)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium">Category</span>
            </div>
            <Badge variant="secondary" className="text-xs font-medium">
              {subscription.type}
            </Badge>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View
          </Button>

          {subscription.id % 2 === 0 && (
            <Badge
              variant="outline"
              className="text-xs text-muted-foreground border-muted-foreground/40"
            >
              <Share2 className="h-3 w-3 mr-1" />
              Shared
            </Badge>
          )}
        </div>
      </div>

      {/* Hover FX */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
};

